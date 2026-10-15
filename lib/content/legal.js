import "server-only";

import { getSitePage } from "@/lib/content/site-pages";

/**
 * Legal pages, all in the CMS's shape (TASTE.md §5.4): `seo`, `legal_hero`,
 * `legal_body` `{ sections }` and `legal_contact_cta`, rendered by
 * `components/templates/legal-page.jsx`.
 *
 * All three come from the CMS: Privacy Policy (`site-pages/privacy-policy`),
 * Terms and Conditions (`site-pages/terms-conditions`) and the Modern Slavery Statement
 * (`site-pages/modern-slavery-statement`). Each returns `null` when the CMS
 * has no published page, which the route turns into a 404.
 */

export function getTermsPage() {
  return getSitePage("terms-conditions");
}

export function getModernSlaveryPage() {
  return getSitePage("modern-slavery-statement");
}

export function getPrivacyPage() {
  return getSitePage("privacy-policy");
}
