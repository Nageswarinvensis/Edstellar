import { cache } from "react";

import { getSitePage } from "@/lib/content/site-pages";

/**
 * Talent Assessment Services sub-service reads.
 *
 * The pillar (`/talent-assessment-services`) is a hand-built page. Its sub-pages
 * follow the OD sub-page pattern (TASTE.md §6.3): one `[slug]` route renders any
 * sub-service from a record through a section registry. Every sub-service is a
 * CMS site page, built from the CMS alone.
 *
 * **Adding a sub-page is one edit:** its slug in `CMS_SERVICES`. The slug is the
 * part after `talent-assessment-services/` in the CMS page slug, and it is also
 * the URL segment.
 */
const PILLAR = "talent-assessment-services";

/** Sub-services served entirely from the CMS site page (`site-pages/{pillar}/
 * {slug}`) — no local file. The record (name, seo, breadcrumbs and every
 * section) is built from the CMS; the route supplies the section order
 * (`DEFAULT_SECTIONS`). Listed here so the route prerenders them and the sitemap
 * includes them, exactly like the OD pillar's `OD_CMS_SERVICES`. */
const CMS_SERVICES = [
  "assessment-development-centers-consulting",
  "behavioral-assessment-services",
  "cognitive-ability-assessment",
  "culture-assessment",
  "emotional-intelligence-assessment",
  "employee-engagement-survey",
  "language-proficiency-assessment",
  "leadership-assessment",
  "organizational-alignment-consulting",
  "pre-employment-assessment",
  "psychometric-assessment",
  "skill-gap-competency-assessment",
  "team-effectiveness-assessment-services",
];

/**
 * CMS component slug → the record key it fills. A slug the CMS does not send is
 * `null`, so that section renders nothing (every section component no-ops on
 * absent data). `methodology` is new to these pages — it is rendered by the
 * shared L&D methodology section (TASTE.md §6.1), and its steps may carry
 * `chips`, shown only when present.
 */
const CMS_MAP = {
  consulting_Hero: "hero",
  generalProof: "proof",
  stickyNavbar: "sticky_nav",
  concepts: "concept",
  benifits: "benefits",
  instruments: "instruments",
  Inside: "inside",
  readinessData: "readiness",
  "talent-services": "services",
  methodology: "methodology",
  output: "outputs",
  ld_why_edstellar: "why",
  talent_related_services: "related",
  faqs: "faqs",
  suite: "suite",
  tool_spotlight: "tool",
  leadForm: "lead_form",
  stickyFooter: "sticky_footer",
};

/** Build a sub-service record from the CMS page alone. Fields stay in the CMS's
 * own names — no adapter layer (TASTE.md §5.4). The route reads breadcrumbs and
 * seo in its own shape, and supplies the section order. */
function fromCmsOnly(cms) {
  const record = {};
  for (const [slug, key] of Object.entries(CMS_MAP)) record[key] = cms[slug] ?? null;

  // `tool_spotlight` was entered with its import file's `config` wrapper
  // still around it — read the inner object when present.
  if (record.tool?.config) record.tool = record.tool.config;

  record.name = cms.consulting_Hero?.heroLeft?.title;
  record.breadcrumbs = cms.breadcrumbs?.items ?? [];
  record.seo = {
    title:
      cms.seo?.meta_title?.replace(/\s*\|\s*Edstellar\s*$/i, "").trim() ||
      record.name,
    description: cms.seo?.Meta_description,
    image: cms.seo?.og_image_url,
  };
  return record;
}

/** The sub-service record for a slug, or `null` for an unknown one (the page
 * turns that into `notFound()` — the read never decides, per TASTE.md §5.2). A
 * CMS failure other than a 404 is not caught (`getSitePage` throws), so a build
 * fails loudly and revalidation keeps the last good page. */
export const getTalentAssessmentService = cache(async (slug) => {
  if (!CMS_SERVICES.includes(slug)) return null;

  // SSG: the route sets `revalidate = false`, so the CMS page is fetched once
  // at build and never revalidated.
  const cms = await getSitePage(`${PILLAR}/${slug}`, false);
  if (!cms) return null;

  return fromCmsOnly(cms);
});

/** Every sub-service slug — the source for `generateStaticParams` and the
 * sitemap, so a new sub-page is crawlable and prerendered automatically. */
export const getTalentAssessmentServiceSlugs = cache(async () => [...CMS_SERVICES]);

/**
 * The Talent Assessment Services hub CMS page, as `{ [component_slug]: config }`
 * (or `null` if unpublished). The hub is otherwise hand-built; the page reads
 * the components whose CMS config carries this page's content and falls back to
 * local content for the sections the CMS has no component for.
 *
 * SSG: fetched once at build and never revalidated. A CMS failure other than a
 * 404 throws, so a build fails loudly.
 */
export const getTalentAssessmentHub = cache(async () => getSitePage(PILLAR, false));
