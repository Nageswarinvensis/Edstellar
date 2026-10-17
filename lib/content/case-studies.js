import "server-only";

import { CASE_STUDIES, CASE_STUDIES_PAGE } from "@/content/case-studies";

/**
 * Case study reads (`/case-studies`, `/case-study/{slug}`) — local content
 * (`content/case-studies/index.js`) until the CMS models them.
 */

/** The listing page's own copy: `seo`, `breadcrumbs`, `hero`, `cta`. */
export function getCaseStudiesPage() {
  return CASE_STUDIES_PAGE;
}

/** Every case study, in listing order. */
export function getCaseStudies() {
  return Object.values(CASE_STUDIES);
}

/** Every slug, for `generateStaticParams` and `sitemap.js`. */
export function getCaseStudySlugs() {
  return Object.keys(CASE_STUDIES);
}

/** `null` for an unknown slug — the route turns that into a 404. */
export function getCaseStudy(slug) {
  return CASE_STUDIES[slug] ?? null;
}
