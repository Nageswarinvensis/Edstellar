import { cache } from "react";

import { getSitePage } from "@/lib/content/site-pages";
import { deepMerge } from "@/lib/content/shape/deep-merge";
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
 * Sub-services that still have a local content file, keyed `pillar/slug`.
 * Each record's `sections` lists its page sections in order. The route and
 * sitemap pick these up from this map.
 */
const SERVICES = {
  "learning-development-consulting-services/learning-content-development-services":
    learningContentDevelopment,
  "learning-development-consulting-services/learning-technology-consulting":
    learningTechnology,
};

/**
 * Sub-services served entirely from the CMS — no local file. Listed here so
 * the route prerenders them and the sitemap includes them; the route sets
 * their section order.
 */
const CMS_SERVICES = [
  "learning-development-consulting-services/learning-strategy-design-consulting",
];

/**
 * CMS component slug → the local record key it fills, for the sections
 * already moved to the CMS. A page whose CMS entry lacks one does not render
 * that section at all — there is no local fallback. The local file keeps
 * only what the CMS does not carry (`faqs` has no `footer_cta`,
 * `readinessData` and `frameworksData` no `section_id`, `stickyFooter` no
 * `email` or `brochure`).
 */
const FROM_CMS = {
  faqs: "faqData",
  readinessData: "readinessData",
  stickyFooter: "stickyFooter",
  ld_content_format: "formatsData",
  ld_content_frameworks: "frameworksData",
};

/**
 * Pages with a local file that take *every* section the CMS has, not just
 * `FROM_CMS`: a CMS component wins over its local section (merged, so local
 * leftovers the CMS lacks — anchors, a footer line — survive), and a section
 * the CMS does not have yet stays local. Their files keep only those.
 */
const CMS_FIRST = [
  "learning-development-consulting-services/learning-content-development-services",
];

/**
 * For a `CMS_SERVICES` page: every record key it renders, by the CMS
 * component that fills it. Nothing falls back to local content — a key whose
 * component the CMS does not send is `null`, so that section is not shown.
 */
const FULL_CMS = {
  consulting_Hero: "heroData",
  generalProof: "proof",
  stickyNavbar: "stickyNavbarData",
  learning_strategy_capability: "challengeData",
  offering: "offeringData",
  readinessData: "readinessData",
  blueprint: "blueprintData",
  methodology: "methodData",
  ld_why_edstellar: "whyEdstellarData",
  why_cta_banner: "whyCtaData",
  faqs: "faqData",
  relatedServices: "relatedData",
  leadForm: "leadFormData",
  stickyFooter: "stickyFooter",
  ld_content_format: "formatsData",
  ld_content_frameworks: "frameworksData",
};

function fromCmsOnly(cms) {
  // The page's name is its hero title.
  const name = cms.consulting_Hero?.heroLeft?.title;
  const record = { name };
  for (const [cmsSlug, key] of Object.entries(FULL_CMS)) record[key] = cms[cmsSlug] ?? null;

  // The route reads these two in its own shape.
  record.BreadcrumbData = cms.breadcrumbs?.items ?? [];
  record.seo = {
    title: cms.seo?.meta_title?.replace(/\s*\|\s*Edstellar\s*$/i, "").trim() || name,
    description: cms.seo?.Meta_description,
    image: cms.seo?.og_image_url,
  };
  return record;
}

/**
 * A sub-service record: the local file, with the CMS page
 * (`site-pages/{pillar}/{slug}`) laid over the sections in `FROM_CMS` — or,
 * for a `CMS_SERVICES` page, built from the CMS alone (`FULL_CMS`).
 *
 * `null` when there is no local record or the CMS has no published page for
 * it. A CMS failure other than a 404 is not caught (`getSitePage` throws), so
 * a build fails and revalidation keeps the last good page.
 */
export const getConsultingService = cache(async (pillar, slug) => {
  const key = `${pillar}/${slug}`;
  const local = SERVICES[key];
  const cmsOnly = CMS_SERVICES.includes(key);
  if (!local && !cmsOnly) return null;

  const cms = await getSitePage(key);
  if (!cms) return null;

  if (cmsOnly) return fromCmsOnly(cms);

  if (CMS_FIRST.includes(key)) {
    const record = { ...local };
    for (const [cmsSlug, field] of Object.entries(FULL_CMS)) {
      if (cms[cmsSlug]) record[field] = deepMerge(local[field], cms[cmsSlug]);
    }
    if (cms.breadcrumbs?.items) record.BreadcrumbData = cms.breadcrumbs.items;
    if (cms.seo?.meta_title) {
      record.seo = {
        title: cms.seo.meta_title.replace(/\s*\|\s*Edstellar\s*$/i, "").trim(),
        description: cms.seo.Meta_description,
        image: cms.seo.og_image_url,
      };
    }
    return record;
  }

  const record = { ...local };
  for (const [cmsSlug, key] of Object.entries(FROM_CMS)) {
    record[key] = cms[cmsSlug] ? deepMerge(local[key], cms[cmsSlug]) : null;
  }
  return record;
});

export const getConsultingServiceSlugs = cache(async (pillar) =>
  [...Object.keys(SERVICES), ...CMS_SERVICES]
    .filter((key) => key.startsWith(`${pillar}/`))
    .map((key) => key.slice(pillar.length + 1)),
);
