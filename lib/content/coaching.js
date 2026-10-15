import "server-only";

import { getSitePage } from "@/lib/content/site-pages";

const CMS_SLUG = "coaching-solutions";

/**
 * Coaching Solutions hub (`/coaching-solutions`). The CMS
 * (`site-pages/coaching-solutions`) supplies every section; there is no local
 * content. Field names are read verbatim (TASTE.md §5.4); the page's own
 * section names map onto the CMS component slugs below (the readiness
 * component's slug is spelled `coaching-radiness` in the CMS).
 *
 * Why-us is two CMS components: `ld_why_edstellar` (heading, intro and each
 * card's text and icon) and `coaching_why_eds` (each card's `visual` diagram,
 * the CTA block, and the related cards' `link` labels), with the related
 * cards themselves from `talent_related_services`.
 *
 * `null` when the CMS has no published page, which the route turns into a 404.
 */
export async function getCoachingHub() {
  const cms = await getSitePage(CMS_SLUG);
  if (!cms) return null;

  const why = cms.ld_why_edstellar;
  const whyExtra = cms.coaching_why_eds;
  const related = cms.talent_related_services;
  const visualByTitle = new Map((whyExtra?.items ?? []).map((item) => [item.title, item.visual]));
  const linkByHref = new Map((whyExtra?.related?.items ?? []).map((item) => [item.href, item.link]));

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
    why: why && {
      section_id: whyExtra?.section_id ?? "why",
      heading: why.heading,
      description: why.description,
      difference_label: why.difference_label,
      items: why.items.map((item) => ({ ...item, visual: visualByTitle.get(item.title) })),
      cta: whyExtra?.cta,
      related: related && {
        heading: related.heading,
        description: related.description,
        items: related.items.map((item) => ({ ...item, link: linkByHref.get(item.href) })),
      },
    },
    faqs: cms.faqs,
    lead_form: cms.leadForm,
    stickyFooter: cms.stickyFooter,
  };
}
