"use server";

import { headers } from "next/headers";

import { submitLead } from "@/lib/leads/submit-lead";
import { resolveBrochure } from "@/lib/content/brochures";

/**
 * Server Action behind the gated-download form
 * (`components/forms/download-form.jsx`: the blog rail's catalog card and the
 * domain/course brochure drawer) — sends the
 * name, company and email through the shared lead pipeline (`lib/leads/`) to Zoho's
 * "DownloadCatalog" form. Returns `{ ok: true }`, `{ errors }` or `{ error }`.
 *
 * The browser sends only a `brochureKey`; the brochure URL is looked up here
 * and goes to Zoho for the thank-you email, never back to the browser — so
 * no brochure URL appears in the page source (SEO team's requirement).
 */
export async function submitCatalogDownload({ brochureKey, ...values }) {
  const ip =
    (await headers()).get("x-forwarded-for")?.split(",")[0].trim() || "unknown";

  const brochure = await resolveBrochure(brochureKey);
  if (!brochure) {
    return { error: "This brochure is not available right now. Please email us at contact@edstellar.com." };
  }

  const { body } = await submitLead({ ...values, brochure, source: "catalog-download" }, ip);
  return body;
}
