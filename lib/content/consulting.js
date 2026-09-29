import { cache } from "react";

import { getSitePage } from "@/lib/content/site-pages";
import { deepMerge } from "@/lib/content/shape/deep-merge";
import learningStrategy from "@/content/learning_development_consulting/learning-strategy.json";
import learningContentDevelopment from "@/content/learning_development_consulting/learning-content-development.json";
import learningTechnology from "@/content/learning_development_consulting/learning-technology.json";

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

/**
 * Sub-service records, keyed `pillar/slug`. Adding a sub-service is one JSON
 * file in `content/` and one line here — the route and sitemap pick it up
 * from this map. Each record's `sections` lists its page sections in order.
 */
const SERVICES = {
  "learning-development-consulting-services/learning-strategy-design-consulting":
    learningStrategy,
  "learning-development-consulting-services/learning-content-development-services":
    learningContentDevelopment,
  "learning-development-consulting-services/learning-technology-consulting":
    learningTechnology,
};

/**
 * CMS component slug → the local record key it fills, for the sections
 * already moved to the CMS. A page whose CMS entry lacks one does not render
 * that section at all — there is no local fallback. The local file keeps
 * only what the CMS does not carry (`faqs` has no `footer_cta`,
 * `readinessData` no `section_id`, `stickyFooter` no `email` or `brochure`).
 */
const FROM_CMS = {
  faqs: "faqData",
  readinessData: "readinessData",
  stickyFooter: "stickyFooter",
};

/**
 * A sub-service record: the local file, with the CMS page
 * (`site-pages/{pillar}/{slug}`) laid over the sections in `FROM_CMS`.
 *
 * `null` when there is no local record or the CMS has no published page for
 * it. A CMS failure other than a 404 is not caught (`getSitePage` throws), so
 * a build fails and revalidation keeps the last good page.
 */
export const getConsultingService = cache(async (pillar, slug) => {
  const local = SERVICES[`${pillar}/${slug}`];
  if (!local) return null;

  const cms = await getSitePage(`${pillar}/${slug}`);
  if (!cms) return null;

  const record = { ...local };
  for (const [cmsSlug, key] of Object.entries(FROM_CMS)) {
    record[key] = cms[cmsSlug] ? deepMerge(local[key], cms[cmsSlug]) : null;
  }
  return record;
});

export const getConsultingServiceSlugs = cache(async (pillar) =>
  Object.keys(SERVICES)
    .filter((key) => key.startsWith(`${pillar}/`))
    .map((key) => key.slice(pillar.length + 1)),
);
