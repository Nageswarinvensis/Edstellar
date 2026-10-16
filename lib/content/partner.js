import "server-only";

import partnerProgram from "@/content/company/partner-program.json";

/**
 * Partner Program (`/partner-program`). Local JSON
 * (`content/company/partner-program.json`) until the CMS has a site page for
 * it: `seo`, `breadcrumbs`, `hero`, `choice_comparison`, `process_rail`,
 * `services_tabs`, `challenge_cards`, `concept`, `contact_form`, `faq`.
 */
export function getPartnerProgramPage() {
  return partnerProgram;
}
