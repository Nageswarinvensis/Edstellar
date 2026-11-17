import { cache } from "react";

import { apiGet } from "@/lib/api/client";
import { endpoints, REVALIDATE } from "@/lib/api/endpoints";
import { hideBrochureUrls } from "@/lib/content/shape/brochure";

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
 *
 * Brochure URLs in the CMS data become `#brochure` (`hideBrochureUrls`) so
 * they never reach the page source; `BrochureGate` handles the click. Tool
 * buttons get the page's `meta.tool` (`withToolLink`).
 */
const getSitePagePayload = cache(async (slug, revalidate = REVALIDATE.cms) => {
  const payload = await apiGet(endpoints.sitePage(slug), { revalidate });
  return payload?.page?.status === "published" ? payload : null;
});

export const getSitePage = cache(async (slug, revalidate = REVALIDATE.cms) => {
  const payload = await getSitePagePayload(slug, revalidate);
  if (!payload) return null;
  const tool = payload.page.meta?.tool;

  // `.trim()`: the CMS has sent at least one slug with a leading space
  // (" tnaEngineStages"), which would otherwise silently miss its key.
  return Object.fromEntries(
    (payload.components ?? [])
      .map(({ component_slug, config }) => [
        component_slug?.trim(),
        hideBrochureUrls(withToolLink(config, tool)),
      ])
      .filter(([slug]) => slug),
  );
});

/**
 * The page's own links from `page.meta` — `{ tool, "consulting-brochure" }`
 * on the consulting pages (field names verbatim from the CMS). `{}` when the
 * page has none or is not published.
 */
export async function getSitePageMeta(slug) {
  const meta = (await getSitePagePayload(slug))?.page?.meta;
  return meta && !Array.isArray(meta) ? meta : {};
}

/** A readiness tool on the media host (`/tool/` or `/tools/`). */
const TOOL_URL = /^https?:\/\/media\.edstellar\.com\/tools?\/\S+\.html$/i;

/**
 * `value` with every tool button pointed at the page's `meta.tool`: a `#tool`
 * href, or a tool URL typed into a section, at any depth. `meta.tool` is the
 * one place the CMS sets a consulting page's readiness tool, so a tool moved
 * on the media host is changed once there rather than in every section.
 * Unchanged when the page has no `meta.tool`.
 */
function withToolLink(value, tool) {
  if (!tool) return value;
  if (typeof value === "string") {
    const link = value.trim();
    return link === "#tool" || TOOL_URL.test(link) ? tool : value;
  }
  if (Array.isArray(value)) return value.map((item) => withToolLink(item, tool));
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, withToolLink(item, tool)]));
  }
  return value;
}
