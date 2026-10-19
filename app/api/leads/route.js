import { submitLead } from "@/lib/leads/submit-lead";

/**
 * Lead capture over HTTP. The pipeline itself — rate limit, honeypot,
 * validation, delivery — lives in `lib/leads/submit-lead.js`, shared with the
 * form Server Actions in `lib/actions/`; this only adapts it to a JSON POST.
 */

export const runtime = "nodejs";

export async function POST(request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";

  let body;
  try {
    body = await request.json();
  } catch {
    body = null;
  }

  const { status, body: response } = await submitLead(body, ip);
  return Response.json(response, {
    status,
    headers: status === 429 ? { "Retry-After": "60" } : undefined,
  });
}
