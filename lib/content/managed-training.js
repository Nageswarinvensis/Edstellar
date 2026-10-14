import "server-only";

import { getSitePage } from "@/lib/content/site-pages";

const CMS_SLUG = "managed-learning-services/managed-training";

/**
 * Managed Training Services, served entirely from the CMS
 * (`site-pages/managed-learning-services/managed-training`) as
 * `{ [component_slug]: config }` — field names verbatim (TASTE.md §5.4).
 *
 * `null` when the CMS has no published page, which the route turns into a 404.
 */
export function getManagedTrainingPage() {
  return getSitePage(CMS_SLUG);
}
