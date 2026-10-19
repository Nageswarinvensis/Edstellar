"use server";

import { headers } from "next/headers";

import { submitLead } from "@/lib/leads/submit-lead";

/**
 * Server Action behind `components/forms/partner-form.jsx` — sends a partner
 * application (either tab) through the shared lead pipeline (`lib/leads/`)
 * to Zoho's "PartnershipForm". Returns `{ ok: true }`, `{ errors }` (field →
 * message, keyed by the form's own field names) or `{ error }`.
 */
export async function submitPartnership(values) {
  const ip =
    (await headers()).get("x-forwarded-for")?.split(",")[0].trim() || "unknown";

  const { body } = await submitLead(
    {
      ...values,
      message: values?.comments,
      source: "partnership",
    },
    ip,
  );

  // The pipeline calls the free-text field `message`; this form calls it `comments`.
  if (body.errors?.message) {
    const { message, ...rest } = body.errors;
    return { errors: { ...rest, comments: message } };
  }
  return body;
}
