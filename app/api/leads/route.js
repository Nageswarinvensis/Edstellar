import { COUNTRY_DIAL_CODES } from "@/lib/constants";

/**
 * Lead capture. The site's only write endpoint and its only conversion path.
 *
 * Validation runs here as well as in the form because client-side validation
 * is a UX affordance, not a control — this handler must assume the request did
 * not come from the form (TASTE.md §7.1).
 *
 * **Nothing here logs a submitted value.** Names, emails and phone numbers are
 * PII; a stack trace carrying a lead's email into a log aggregator is a real
 * incident, so failures are logged by shape only.
 */

export const runtime = "nodejs";

/** Max requests per window, per IP. */
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;

/**
 * In-memory rate limiting. Correct for a single instance and useless across
 * several, which is the honest state of this until a shared store exists —
 * see TASTE.md §13. It is here because no limit at all means an open relay
 * into the sales pipeline.
 */
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Bound the map so a spray of unique IPs cannot grow it without limit.
  if (hits.size > 10_000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
    }
  }

  return recent.length > RATE_LIMIT;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const COUNTRIES = new Set(COUNTRY_DIAL_CODES.map((c) => c.name));

function validate(body) {
  const errors = {};
  const str = (value) => (typeof value === "string" ? value.trim() : "");

  const name = str(body.name);
  const email = str(body.email);
  const phone = str(body.phone);
  const country = str(body.country);
  const message = str(body.message);

  if (name.length < 2 || name.length > 100) errors.name = "Enter your name.";
  if (!EMAIL.test(email) || email.length > 254) {
    errors.email = "Enter a valid work email address.";
  }
  if (phone.replace(/\D/g, "").length < 6) {
    errors.phone = "Enter a valid phone number.";
  }
  if (country && !COUNTRIES.has(country)) errors.country = "Unknown country.";
  if (message.length > 5000) errors.message = "Message is too long.";

  return {
    errors,
    lead: { name, email, phone, country, message },
  };
}

export async function POST(request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";

  if (rateLimited(ip)) {
    return Response.json(
      { error: "Too many requests. Try again in a minute." },
      { status: 429, headers: { "Retry-After": "60" } },
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Malformed request." }, { status: 400 });
  }

  // Honeypot: a real browser never fills a hidden field. Answer 200 so a bot
  // learns nothing from the response (TASTE.md §7.1).
  if (typeof body.company_website === "string" && body.company_website !== "") {
    return Response.json({ ok: true }, { status: 200 });
  }

  const { errors, lead } = validate(body);

  if (Object.keys(errors).length > 0) {
    return Response.json({ errors }, { status: 422 });
  }

  try {
    await deliverLead(lead, { source: str(body.source), ip });
  } catch (error) {
    // Shape only — never the lead, and never the upstream response body.
    console.error("[leads] delivery failed:", error?.name ?? "Error");
    return Response.json(
      { error: "We could not submit your enquiry. Please try again." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true }, { status: 201 });
}

function str(value) {
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Hand the lead to whatever owns it — CRM, transactional email, or a CMS
 * endpoint. Unimplemented: the destination is a business decision, not a
 * technical one (TASTE.md §13). It throws rather than silently succeeding,
 * because a form that reports success while discarding the lead is worse than
 * one that reports failure.
 */
async function deliverLead(lead, meta) {
  throw new Error("LeadDestinationNotConfigured");
}
