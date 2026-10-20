"use server";

import { headers } from "next/headers";

import { submitLead } from "@/lib/leads/submit-lead";

/**
 * Server Action behind `components/forms/guest-author-form.jsx` — sends the
 * guest-author pitch through the shared lead pipeline (`lib/leads/`) to
 * Zoho's "BecomeAGuestAuthor" form. Returns `{ ok: true }`, `{ errors }`
 * (field → message, keyed by the form's own field names) or `{ error }`.
 */
export async function submitGuestAuthor(values) {
  const ip =
    (await headers()).get("x-forwarded-for")?.split(",")[0].trim() || "unknown";

  const { body } = await submitLead(
    {
      ...values,
      message: values?.idea,
      source: "guest-author",
    },
    ip,
  );

  // The pipeline calls the blog idea `message`; this form calls it `idea`.
  if (body.errors?.message) {
    const { message, ...rest } = body.errors;
    return { errors: { ...rest, idea: message } };
  }
  return body;
}
