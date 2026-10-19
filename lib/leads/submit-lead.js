import "server-only";

import { COUNTRIES } from "@/lib/countries";
import { deliverTrainingEnquiry } from "@/lib/leads/zoho";

/**
 * Lead capture — the one pipeline behind both `app/api/leads/route.js` and
 * the form Server Actions in `lib/actions/`. Rate limit, honeypot, validate,
 * deliver; it answers `{ status, body }` and the caller turns that into an
 * HTTP response or an action result.
 *
 * Validation runs here as well as in the form because client-side validation
 * is a UX affordance, not a control — this must assume the submission did not
 * come from the form (TASTE.md §7.1).
 *
 * **Nothing here logs a submitted value.** Names, emails and phone numbers are
 * PII; a stack trace carrying a lead's email into a log aggregator is a real
 * incident, so failures are logged by shape only.
 */

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

/**
 * Where each form's leads go, keyed by the `source` it submits with, plus
 * the fields that destination needs beyond name/email/phone. A source with
 * no entry has no destination yet and fails loudly (`deliver` below) —
 * a form that reports success while discarding the lead is worse than one
 * that reports failure.
 */
const DESTINATIONS = {
  "training-enquiry": {
    required: ["company", "jobTitle", "country"],
    deliver: deliverTrainingEnquiry,
  },
};

const REQUIRED_MESSAGES = {
  company: "Enter your company name.",
  jobTitle: "Enter your job title.",
  country: "Select your country.",
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const COUNTRY_NAMES = new Set(COUNTRIES.map((c) => c.name));

function str(value) {
  return typeof value === "string" ? value.trim() : "";
}

function validate(body, required) {
  const errors = {};

  const lead = {
    name: str(body.name),
    email: str(body.email),
    phone: str(body.phone),
    country: str(body.country),
    message: str(body.message),
    company: str(body.company),
    jobTitle: str(body.jobTitle),
    program: str(body.program),
    page: str(body.page),
    dialCode: str(body.dialCode).replace(/\D/g, ""),
  };

  if (lead.name.length < 2 || lead.name.length > 100) errors.name = "Enter your name.";
  if (!EMAIL.test(lead.email) || lead.email.length > 254) {
    errors.email = "Enter a valid work email address.";
  }
  if (lead.phone.replace(/\D/g, "").length < 6) {
    errors.phone = "Enter a valid phone number.";
  }
  if (lead.country && !COUNTRY_NAMES.has(lead.country)) errors.country = "Unknown country.";
  if (lead.message.length > 5000) errors.message = "Message is too long.";
  if (lead.dialCode.length > 4) errors.phone = "Enter a valid phone number.";
  for (const key of ["company", "jobTitle", "program", "page"]) {
    if (lead[key].length > 255) errors[key] = "Too long.";
  }
  for (const key of required) {
    if (!lead[key] && !errors[key]) errors[key] = REQUIRED_MESSAGES[key];
  }

  return { errors, lead };
}

/**
 * Run one submission through the pipeline.
 *
 * @param {object} body  The submitted fields, plus `source` (which form) and
 *   `company_website` (the honeypot).
 * @param {string} ip    The caller's IP, for rate limiting.
 * @returns {Promise<{ status: number, body: object }>}
 */
export async function submitLead(body, ip) {
  if (rateLimited(ip)) {
    return { status: 429, body: { error: "Too many requests. Try again in a minute." } };
  }

  if (!body || typeof body !== "object") {
    return { status: 400, body: { error: "Malformed request." } };
  }

  // Honeypot: a real browser never fills a hidden field. Answer success so a
  // bot learns nothing from the response (TASTE.md §7.1).
  if (typeof body.company_website === "string" && body.company_website !== "") {
    return { status: 200, body: { ok: true } };
  }

  const destination = DESTINATIONS[str(body.source)];
  const { errors, lead } = validate(body, destination?.required ?? []);

  if (Object.keys(errors).length > 0) {
    return { status: 422, body: { errors } };
  }

  try {
    if (!destination) throw new Error("LeadDestinationNotConfigured");
    await destination.deliver(lead);
  } catch (error) {
    // Shape only — never the lead, and never the upstream response body.
    // An ApiError's message is safe to log: URL without query, status, and
    // the destination's own field-level reason — never a submitted value.
    console.error(
      "[leads] delivery failed:",
      error?.name === "ApiError" ? error.message : (error?.name ?? "Error"),
    );
    return {
      status: 502,
      body: { error: "We could not submit your enquiry. Please try again." },
    };
  }

  return { status: 201, body: { ok: true } };
}
