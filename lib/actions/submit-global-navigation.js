"use server";

import { headers } from "next/headers";

import { submitLead } from "@/lib/leads/submit-lead";

/**
 * Server Action behind the header's "Build your brief" composer
 * (`components/layout/brief-composer.jsx`) — sends the brief through the
 * shared lead pipeline (`lib/leads/`) to Zoho's "GlobalNavigationForm".
 * Returns `{ ok: true }`, `{ errors }` (field → message) or `{ error }`.
 */
export async function submitGlobalNavigation(values) {
  const ip =
    (await headers()).get("x-forwarded-for")?.split(",")[0].trim() || "unknown";

  const { body } = await submitLead({ ...values, source: "global-navigation" }, ip);
  return body;
}
