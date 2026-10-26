"use server";

import { headers } from "next/headers";

import { submitLead } from "@/lib/leads/submit-lead";

/**
 * Server Action behind the gated-download form
 * (`components/forms/download-form.jsx`: the blog rail's catalog card and the
 * domain/course brochure drawer) — sends the
 * name, company and email through the shared lead pipeline (`lib/leads/`) to Zoho's
 * "DownloadCatalog" form. Returns `{ ok: true }`, `{ errors }` or `{ error }`.
 */
export async function submitCatalogDownload(values) {
  const ip =
    (await headers()).get("x-forwarded-for")?.split(",")[0].trim() || "unknown";

  const { body } = await submitLead({ ...values, source: "catalog-download" }, ip);
  return body;
}
