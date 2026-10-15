import "server-only";

import { getSitePage } from "@/lib/content/site-pages";
import local from "@/content/coaching/coaching-hub.json";

const CMS_SLUG = "coaching-solutions";

/**
 * Coaching Solutions hub (`/coaching-solutions`). The CMS
 * (`site-pages/coaching-solutions`) owns the SEO, breadcrumbs, proof bar
 * (`generalProof`), sticky nav (`stickyNavbar`) and sticky footer
 * (`stickyFooter`). Everything else is still local JSON
 * (`content/coaching/coaching-hub.json`): the CMS either does not send it or
 * sends it in a shape the coaching design does not use (its hero, why-us,
 * FAQs, lead form and readiness). Field names are read verbatim on both
 * sides (TASTE.md §5.4); a CMS key wins over a local one of the same name.
 *
 * `null` when the CMS has no published page, which the route turns into a 404.
 */
export async function getCoachingHub() {
  const cms = await getSitePage(CMS_SLUG);
  if (!cms) return null;

  return {
    ...local,
    seo: cms.seo,
    breadcrumbs: cms.breadcrumbs,
    generalProof: cms.generalProof,
    stickyNavbar: cms.stickyNavbar,
    stickyFooter: cms.stickyFooter,
  };
}

/**
 * Sub-page slug → local JSON loader. Adding a new coaching type is one line here.
 */
const COACHING_SUB_PAGES = {
  "executive-coaching": () => import("@/content/coaching/executive-coaching.json"),
  "leadership-coaching": () => import("@/content/coaching/leadership-coaching.json"),
  "first-time-manager-coaching": () => import("@/content/coaching/first-time-manager-coaching.json"),
  "career-transition-coaching": () => import("@/content/coaching/career-transition-coaching.json"),
  "performance-coaching": () => import("@/content/coaching/performance-coaching.json"),
  "team-coaching": () => import("@/content/coaching/team-coaching.json"),
};

/** All valid coaching sub-page slugs — used by generateStaticParams and sitemap. */
export function getCoachingSubPageSlugs() {
  return Object.keys(COACHING_SUB_PAGES);
}

/** Load a sub-page by slug. Returns `null` for unknown slugs (→ 404). */
export async function getCoachingSubPage(slug) {
  const loader = COACHING_SUB_PAGES[slug];
  if (!loader) return null;
  return (await loader()).default;
}
