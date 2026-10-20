"use server";

import { headers } from "next/headers";

import { submitLead } from "@/lib/leads/submit-lead";

/**
 * Server Action behind `components/forms/leadership-retreat-form.jsx` — sends
 * the retreat invitation request through the shared lead pipeline
 * (`lib/leads/`) to Zoho's "Impremium" form. Returns `{ ok: true }`,
 * `{ errors }` (field → message, keyed by the form's own field names) or
 * `{ error }`.
 */
export async function submitRetreat(values) {
  const ip =
    (await headers()).get("x-forwarded-for")?.split(",")[0].trim() || "unknown";

  const { body } = await submitLead(
    {
      ...values,
      email: values?.workEmail,
      source: "leadership-retreat",
    },
    ip,
  );

  // The pipeline calls the email field `email`; this form calls it `workEmail`.
  if (body.errors?.email) {
    const { email, ...rest } = body.errors;
    return { errors: { ...rest, workEmail: email } };
  }
  return body;
}
