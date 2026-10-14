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
