import { cache } from "react";

/**
 * Consulting reads.
 *
 * Pillar pages are bespoke and hand-built, so their copy lives in the page
 * files themselves — there is nothing for this module to read. Sub-services
 * share one template per pillar and are content-driven, which is what these
 * reads serve.
 *
 * `CONSULTING_PILLARS` keys are URL segments and are load-bearing: they sit at
 * the site root, so each one reserves that word in the root namespace
 * (TASTE.md §1.5).
 */
export const CONSULTING_PILLARS = [
  {
    // These slugs must match the route folders exactly — sitemap.js builds
    // URLs from them, and a mismatch publishes a 404 to search engines. The
    // `-services` suffix is kept because it is the live, ranking URL; see
    // TASTE.md §13 for the rename decision, which is still open.
    slug: "learning-development-consulting-services",
    label: "Learning & development consulting",
  },
  {
    slug: "organizational-development-consulting",
    label: "Organizational development consulting",
  },
  { slug: "talent-assessment-services", label: "Talent assessment services" },
  { slug: "coaching-services", label: "Coaching services" },
];

const SERVICES = {};

export const getConsultingService = cache(
  async (pillar, slug) => SERVICES[`${pillar}/${slug}`] ?? null,
);

export const getConsultingServiceSlugs = cache(async (pillar) =>
  Object.keys(SERVICES)
    .filter((key) => key.startsWith(`${pillar}/`))
    .map((key) => key.slice(pillar.length + 1)),
);
