import "server-only";

import { cache } from "react";

import { getSitePage } from "@/lib/content/site-pages";

const CMS_HUB_SLUG = "coaching-solutions";
const PILLAR = "coaching-solutions";

/**
 * Coaching Solutions hub (`/coaching-solutions`). The CMS supplies every
 * section. Why-us merges two components: `ld_why_edstellar` (text/icons) and
 * `coaching_why_edstellar` (visuals + CTA + related link labels).
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
 * the Why-Edstellar section (`ld_why_edstellar` + `coaching_why_edstellar`), with
 * related-service link labels merged from `talent_related_services`.
 * Returns `{ why: ... }` so it can be spread into either the hub or a sub-page record.
 */
function buildWhy(cms) {
  const whyExtra = cms.coaching_why_edstellar;
  const related = cms.talent_related_services;

  // All data lives inside whyExtra.config (CMS nested structure).
  // heading, description, cards are in whyExtra.config.
  // difference_label, section_id are at whyExtra top level.
  const inner = whyExtra?.config;
  const cards = inner?.cards;

  if (!cards?.length) return { why: null };

  const items = cards.map((card) => ({
    title: card.title,
    icon: card.card_icon,
    description: card.description,
    difference: card.difference_text,
    visual: buildCardVisual(card),
  }));

  const linkByHref = new Map(
    (whyExtra?.related?.items ?? []).map((item) => [item.href, item.link]),
  );

  return {
    why: {
      section_id: whyExtra?.section_id ?? "why",
      heading: inner?.heading ?? null,
      description: inner?.description ?? null,
      difference_label: whyExtra?.difference_label ?? null,
      items,
      cta: inner?.bottom_banner ? {
        heading: inner.bottom_banner.title ?? null,
        description: inner.bottom_banner.description ?? null,
        buttons: inner.bottom_banner.primary_cta
          ? [{ variant: "primary", ...inner.bottom_banner.primary_cta }]
          : [],
      } : whyExtra?.cta ?? null,
      related: related ? {
        heading: related.heading,
        description: related.description,
        items: (related.items ?? []).map((item) => ({
          ...item,
          link: linkByHref.get(item.href),
        })),
      } : null,
    },
  };
}

/**
 * Extract a renderable visual from a CMS card.
 * The CMS wraps screenshot PNGs in an SVG pattern — we pull the PNG out
 * directly so the browser doesn't have to resolve xlink:href + pattern + use.
 */
function buildCardVisual(card) {
  if (card.illustration_type !== "svg" || !card.card_illustration_svg) return null;
  const val = card.card_illustration_svg;
  // CMS now sends a hosted URL instead of inline SVG
  if (val.startsWith("http://") || val.startsWith("https://")) {
    return { type: "png-img", src: val };
  }
  // Legacy: inline SVG wrapping a PNG screenshot — extract the PNG directly
  const png = val.match(/href="data:image\/png;base64,([^"]+)"/)?.[1]
    ?? val.match(/xlink:href="data:image\/png;base64,([^"]+)"/)?.[1];
  if (png) return { type: "png-img", src: `data:image/png;base64,${png}` };
  return { type: "svg-img", svg: val };
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
