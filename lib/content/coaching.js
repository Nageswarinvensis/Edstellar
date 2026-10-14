import "server-only";

import page from "@/content/coaching/coaching-hub.json";

/**
 * Coaching Solutions hub (`/coaching-solutions`) — a static page whose copy
 * lives in local JSON (`content/coaching/coaching-hub.json`), not the CMS.
 * Sections shared with the consulting pages read their usual CMS shapes from
 * it (`proof` as `generalProof`, `sticky_nav` as `stickyNavbar`, `faqs`,
 * `lead_form` as `leadForm`, `sticky_footer` as `stickyFooter`); the
 * coaching-only sections read their own keys. Field names are snake_case and
 * read verbatim (TASTE.md §5.4).
 */
export function getCoachingHub() {
  return page;
}
