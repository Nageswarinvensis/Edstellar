import { cache } from "react";

import { apiGet } from "@/lib/api/client";
import { endpoints, REVALIDATE } from "@/lib/api/endpoints";

/**
 * A CMS site page (`/api/v2/site-pages/{slug}` — e.g. the TNA page, the L&D
 * hub, or an L&D sub-page as `learning-development-consulting-services/{slug}`)
 * as `{ [component_slug]: config }`, straight from the CMS — `null`
 * when it has no published page (the route turns that into a real 404).
 *
 * Keys are the CMS's own component slugs and field names are the CMS's own
 * — no translation (TASTE.md §5.4). There is no local backup: a CMS failure
 * other than a 404 is deliberately not caught, so `apiGet` throws, a build
 * fails loudly, and on revalidation Next keeps serving the last good page
 * instead of a blank one. Values the CMS does not send are set by the page.
 */
export const getSitePage = cache(async (slug, revalidate = REVALIDATE.cms) => {
  const payload = await apiGet(endpoints.sitePage(slug), { revalidate });

  if (payload?.page?.status !== "published") return null;

  // `.trim()`: the CMS has sent at least one slug with a leading space
  // (" tnaEngineStages"), which would otherwise silently miss its key.
  return Object.fromEntries(
    (payload.components ?? [])
      .map(({ component_slug, config }) => [component_slug?.trim(), config])
      .filter(([slug]) => slug),
  );
});
