import { cache } from "react";

import { BEHAVIORAL_ASSESSMENT } from "@/content/talent-assessment/behavioral-assessment";
import { ASSESSMENT_DEVELOPMENT_CENTERS } from "@/content/talent-assessment/assessment-development-centers-consulting";

/**
 * Talent Assessment Services sub-service reads.
 *
 * The pillar (`/talent-assessment-services`) is a hand-built page; its sub-pages
 * follow the OD sub-page pattern (TASTE.md §6.3): one `[slug]` route renders any
 * sub-service from a record through a section registry. Unlike the OD/L&D
 * sub-pages these have no CMS page yet, so the record is a local content file.
 *
 * **Adding a sub-page is two edits:** a file in `content/talent-assessment/`,
 * and one line in `SUB_SERVICES` below. No route, section or template change.
 */
const SUB_SERVICES = {
  "behavioral-assessment": BEHAVIORAL_ASSESSMENT,
  "assessment-development-centers-consulting": ASSESSMENT_DEVELOPMENT_CENTERS,
};

/** The sub-service record for a slug, or `null` for an unknown one (the page
 * turns that into `notFound()` — the read never decides, per TASTE.md §5.2). */
export const getTalentAssessmentService = cache(
  async (slug) => SUB_SERVICES[slug] ?? null,
);

/** Every sub-service slug — the source for `generateStaticParams` and the
 * sitemap, so a new sub-page is crawlable and prerendered automatically. */
export const getTalentAssessmentServiceSlugs = cache(async () =>
  Object.keys(SUB_SERVICES),
);
