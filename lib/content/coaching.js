import "server-only";

import { cache } from "react";

import { getSitePage } from "@/lib/content/site-pages";

const CMS_HUB_SLUG = "coaching-solutions";
const PILLAR = "coaching-solutions";

/**
 * Coaching Solutions hub (`/coaching-solutions`). The CMS supplies every
 * section. Why-us merges two components: `ld_why_edstellar` (text/icons) and
 * `coaching_why_eds` (visuals + CTA + related link labels).
 *
 * `null` when the CMS has no published page → route turns it into a 404.
 */
export async function getCoachingHub() {
  const cms = await getSitePage(CMS_HUB_SLUG);
  if (!cms) return null;

  return {
    seo: cms.seo,
    breadcrumbs: cms.breadcrumbs,
    consulting_Hero: cms.consulting_Hero,
    generalProof: cms.generalProof,
    stickyNavbar: cms.stickyNavbar,
    paths: cms.coaching_paths,
    paths_cta: cms.coaching_path_cta,
    benefits: cms.coaching_benefits,
    meridian: cms.meridian,
    process: cms.coaching_process,
    meridian_cta: cms.meridian_cta,
    confidential: cms.coaching_confidential,
    schedules: cms.coaching_schedules,
    readiness: cms["coaching-radiness"],
    ...buildWhy(cms),
    faqs: cms.faqs,
    lead_form: cms.leadForm,
    stickyFooter: cms.stickyFooter,
    coachingSchema: cms.coachingSchema ?? null,
  };
}

/**
 * Sub-page slugs published in the CMS at `coaching-solutions/{slug}`.
 * Listed here so generateStaticParams and the sitemap pick them up.
 */
const CMS_SUB_PAGES = [
  "career-transition-coaching",
  "executive-coaching",
  "leadership-coaching",
  "first-time-manager-coaching",
  "performance-coaching",
  "team-coaching",
];

/**
 * CMS component slug → the record key read by [slug]/page.js.
 * Keys the CMS does not send for a page remain null (section renders nothing).
 */
const CMS_MAP = {
  consulting_Hero:               "consulting_Hero",
  breadcrumbs:                   "breadcrumbs",
  generalProof:                  "generalProof",
  stickyNavbar:                  "stickyNavbar",
  coaching_who_for:              "who",
  coaching_tracks:               "tracks",
  coaching_benefits:             "benefits",
  meridian:                      "meridian",
  coaching_process:              "process",
  coaching_confidential_compare: "confidential",
  faqs:                          "faqs",
  leadForm:                      "lead_form",
  stickyFooter:                  "stickyFooter",
};

const LOCAL_SUB_PAGES = {};

/** All valid coaching sub-page slugs — source for generateStaticParams and sitemap. */
export function getCoachingSubPageSlugs() {
  return [...CMS_SUB_PAGES, ...Object.keys(LOCAL_SUB_PAGES)];
}

/**
 * Load a coaching sub-page by slug.
 * CMS pages are fetched from the API; others fall back to local JSON.
 * Returns `null` for unknown slugs (→ 404).
 */
export const getCoachingSubPage = cache(async (slug) => {
  if (CMS_SUB_PAGES.includes(slug)) {
    const cms = await getSitePage(`${PILLAR}/${slug}`);
    if (!cms) return null;
    return { ...fromCms(cms), coachingSchema: cms.coachingSchema ?? null };
  }

  const loader = LOCAL_SUB_PAGES[slug];
  if (!loader) return null;
  return (await loader()).default;
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Build the `why` record from the two CMS components that together make up
 * the Why-Edstellar section (`ld_why_edstellar` + `coaching_why_eds`), with
 * related-service link labels merged from `talent_related_services`.
 * Returns `{ why: ... }` so it can be spread into either the hub or a sub-page record.
 */
function buildWhy(cms) {
  const why = cms.ld_why_edstellar;
  const whyExtra = cms.coaching_why_eds;
  const related = cms.talent_related_services;

  if (!why) return { why: null };

  const visualByTitle = new Map(
    (whyExtra?.items ?? []).map((item) => [item.title, item.visual]),
  );
  const linkByHref = new Map(
    (whyExtra?.related?.items ?? []).map((item) => [item.href, item.link]),
  );

  return {
    why: {
      section_id: whyExtra?.section_id ?? "why",
      heading: why.heading,
      description: why.description,
      difference_label: why.difference_label,
      items: (why.items ?? []).map((item) => ({
        ...item,
        visual: visualByTitle.get(item.title),
      })),
      cta: whyExtra?.cta,
      related: related && {
        heading: related.heading,
        description: related.description,
        items: (related.items ?? []).map((item) => ({
          ...item,
          link: linkByHref.get(item.href),
        })),
      },
    },
  };
}

/** Build a sub-page record from a CMS response. */
function fromCms(cms) {
  const record = {};
  for (const [cmsSlug, key] of Object.entries(CMS_MAP)) {
    record[key] = cms[cmsSlug] ?? null;
  }

  record.seo = cms.seo ?? null;
  Object.assign(record, buildWhy(cms));

  return record;
}
