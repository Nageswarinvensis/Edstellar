"use server";

import { headers } from "next/headers";

import { submitLead } from "@/lib/leads/submit-lead";

/**
 * Server Action behind `components/forms/rfp-form.jsx` — sends the RFP and
 * its documents through the shared lead pipeline (`lib/leads/`) to Zoho's
 * "RequestForProposal" form. Returns `{ ok: true }`, `{ errors }` (field →
 * message, keyed by the form's own field names) or `{ error }`.
 */
export async function submitRfp(values) {
  const ip =
    (await headers()).get("x-forwarded-for")?.split(",")[0].trim() || "unknown";

  const { body } = await submitLead({ ...values, source: "rfp" }, ip);
  return body;
}
