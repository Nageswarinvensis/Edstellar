"use server";

import { headers } from "next/headers";

import { submitLead } from "@/lib/leads/submit-lead";

/**
 * Server Action behind `components/forms/enquiry-form.jsx` — sends the
 * training enquiry through the shared lead pipeline (`lib/leads/`) to Zoho.
 * Returns `{ ok: true }`, `{ errors }` (field → message) or `{ error }`; the
 * form renders each.
 */
export async function submitEnquiry(values) {
  const ip =
    (await headers()).get("x-forwarded-for")?.split(",")[0].trim() || "unknown";

  const { body } = await submitLead(
    {
      ...values,
      message: values?.requirements,
      source: "training-enquiry",
    },
    ip,
  );
  return body;
}
