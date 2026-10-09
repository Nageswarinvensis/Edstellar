import { cache } from "react";

import { getSitePage } from "@/lib/content/site-pages";
import { deepMerge } from "@/lib/content/shape/deep-merge";
import learningContentDevelopment from "@/content/learning_development_consulting/learning-content-development.json";
import learningTechnology from "@/content/learning_development_consulting/learning-technology.json";
import changeManagement from "@/content/organizational_development_consulting/change-management-consulting.json";

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
  "organizational-development-consulting/change-management-consulting":
    changeManagement,
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
  "learning-development-consulting-services/learning-technology-consulting",
];

/**
 * OD sub-pages served entirely from the CMS — no local file at all. The record
 * (name, seo, breadcrumbs and every section) is built from the CMS page via
 * `fromCmsOnly(cms, OD_CMS)`. Listed here so the route prerenders them and the
 * sitemap includes them; the route sets their section order (`DEFAULT_SECTIONS`).
 */
const OD_CMS_SERVICES = [
  "organizational-development-consulting/dei-consulting",
  // Migrated off local files once the CMS published each page's own content
  // for every section (hero, challenge, the `representation` journey band,
  // `whatwedeliver` with per-step `tab_title`, method, frameworks, why,
  // readiness, CTA, FAQ, related). Verified page-specific — not the shared
  // config that keeps `change-management-consulting` on a local overlay.
  "organizational-development-consulting/culture-transformation-consulting",
  "organizational-development-consulting/employee-engagement-consulting",
  "organizational-development-consulting/leadership-effectiveness-consulting",
  "organizational-development-consulting/organization-design-consulting",
  "organizational-development-consulting/performance-management-consulting",
  "organizational-development-consulting/strategic-workforce-planning-consulting",
  "organizational-development-consulting/succession-planning-consulting",
];

/**
 * OD sub-pages served from the CMS for most sections, but whose CMS `config`
 * for a few components is shared/global (it carries another page's content, not
 * this page's), so those sections are kept in a small local file and laid over
 * the CMS record. `OD_CMS_SHARED` lists the CMS component slugs to skip for
 * these pages — their record keys come from the local file instead.
 */
const OD_CMS_OVERLAY = [
  "organizational-development-consulting/change-management-consulting",
];
// `ld_why_edstellar`'s CMS config for change-management is still the shared
// (DEI) one — it sends "...your DEI consulting..." copy, not this page's — so
// `whyEdstellarData` stays local until the CMS publishes change-management's own
// `ld_why_edstellar`. `representation` was the same until the CMS published this
// page's own journey content, so it now comes from the CMS (it is no longer
// listed here) and the local `changeJourneyData` was removed.
const OD_CMS_SHARED = ["ld_why_edstellar"];

/**
 * CMS component slug → OD record key, the OD counterpart of `FULL_CMS`. The OD
 * pages use a different set of component slugs than the learning pages. A key
 * whose component the CMS does not send is `null`, so that section is not shown
 * (the route still supplies the section order and the per-section anchors).
 */
const OD_CMS = {
  consulting_Hero: "heroData",
  generalProof: "proof",
  stickyNavbar: "stickyNavbarData",
  challenge: "challengeData",
  representation: "representationData",
  whatwedeliver: "whatWeDeliverData",
  methodology: "methodData",
  frameworks: "frameworksData",
  ld_why_edstellar: "whyEdstellarData",
  readinessData: "readinessData",
  "section-cta": "whyCtaData",
  faqs: "faqData",
  relatedServices: "relatedData",
  leadForm: "leadFormData",
  stickyFooter: "stickyFooter",
};

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

function fromCmsOnly(cms, map = FULL_CMS) {
  // The page's name is its hero title.
  const name = cms.consulting_Hero?.heroLeft?.title;
  const record = { name };
  for (const [cmsSlug, key] of Object.entries(map)) record[key] = cms[cmsSlug] ?? null;

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
  const odCmsOnly = OD_CMS_SERVICES.includes(key);
  const odOverlay = OD_CMS_OVERLAY.includes(key);
  if (!local && !cmsOnly && !odCmsOnly) return null;

  // OD sub-pages are SSG (see the route's `dynamicParams`/`revalidate`), so
  // their CMS data is fetched once at build and never revalidated — `false`.
  const cms = await getSitePage(key, odCmsOnly || odOverlay ? false : undefined);
  if (!cms) return null;

  if (cmsOnly) return fromCmsOnly(cms);
  if (odCmsOnly) return fromCmsOnly(cms, OD_CMS);

  // CMS for most sections, local for the shared/global ones. Build from the CMS
  // with the shared slugs skipped, then lay the small local file on top.
  if (odOverlay) {
    const map = Object.fromEntries(
      Object.entries(OD_CMS).filter(([cmsSlug]) => !OD_CMS_SHARED.includes(cmsSlug)),
    );
    return { ...fromCmsOnly(cms, map), ...(local ?? {}) };
  }

  // CMS-first overlay: the local file is the base, each mapped CMS component
  // wins over (merged into) its local section, and breadcrumbs/seo are lifted
  // from the CMS's own shape.
  const cmsFirstMap = CMS_FIRST.includes(key) ? FULL_CMS : null;
  if (cmsFirstMap) {
    const record = { ...local };
    for (const [cmsSlug, field] of Object.entries(cmsFirstMap)) {
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
  [...Object.keys(SERVICES), ...CMS_SERVICES, ...OD_CMS_SERVICES]
    .filter((key) => key.startsWith(`${pillar}/`))
    .map((key) => key.slice(pillar.length + 1)),
);
