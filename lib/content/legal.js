import "server-only";

import terms from "@/content/legal/terms-and-conditions.json";
import modernSlavery from "@/content/legal/modern-slavery-statement.json";
import privacy from "@/content/legal/privacy-policy.json";

/**
 * Legal pages whose copy lives in local JSON (`content/legal/`), not the CMS.
 * Each body is `sections[]` of typed `blocks` (`p`, `h3`, `list`, `callout`,
 * `emphasis`) rendered by `components/sections/legal/legal-body.jsx`. Block
 * text may carry inline `<a>`, `<em>` and `<strong>` only.
 */
export function getTermsPage() {
  return terms;
}

export function getModernSlaveryPage() {
  return modernSlavery;
}

export function getPrivacyPage() {
  return privacy;
}
