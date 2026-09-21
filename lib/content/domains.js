import { cache } from "react";

import { apiGet } from "@/lib/api/client";
import { endpoints, REVALIDATE } from "@/lib/api/endpoints";
import { deepMerge } from "@/lib/content/shape/deep-merge";
import { DOMAINS } from "@/content/domains";
import { DOMAIN_DEFAULTS } from "@/content/domains/default";

/**
 * Domain reads. A domain is a training category — `artificial-intelligence`,
 * and the level courses are created under.
 *
 * Every read is wrapped in `cache()` so `generateMetadata` and the page body
 * share one read per request instead of doing the work twice (TASTE.md §5.2).
 * A missing record returns `null`; calling `notFound()` is the page's decision.
 */

/**
 * Shape a CMS page response into the domain view model, deep-merged over
 * whatever local content already exists for this slug (same layering as
 * `toCourse` in `lib/content/courses.js`: the CMS wins on every field it
 * actually sends, local content covers what it does not).
 */
function toDomain(payload, local, slug) {
  const { domain, components } = payload;

  const fromCms = Object.fromEntries(
    components.map(({ component_slug, config }) => [component_slug, config]),
  );

  return {
    // The route slug, not `domain.slug` — the CMS's own domain record uses a
    // short code (e.g. "ai") that can differ from the route slug this page
    // actually lives at (see `cmsSlug` below). Anything downstream building
    // a self-link off this view-model needs the real route.
    slug,
    name: domain.name,
    ...deepMerge(deepMerge(DOMAIN_DEFAULTS, local ?? {}), fromCms),
  };
}

/**
 * **The CMS is tried first, local content (`content/domains/`) is the
 * fallback — not the other way round.** `GET /api/v2/domains/{cmsSlug}` is
 * its own endpoint (`endpoints.domainPage`), not the generic `cmsPage` used
 * for consulting pages — its status vocabulary is `active`, not `published`.
 * A network failure while checking the CMS must not take down every
 * `/corporate-training/*` page on the site, so it is swallowed and treated
 * the same as "the CMS has nothing for this slug" rather than surfaced.
 */
export const getDomain = cache(async (slug) => {
  const local = DOMAINS[slug] ?? null;

  // The CMS's own domain slug is not guaranteed to match the route slug
  // (e.g. `ai` vs `artificial-intelligence`) — `cmsSlug` on the local entry
  // is what bridges that, defaulting to the route slug when the two agree.
  const cmsSlug = local?.cmsSlug ?? slug;

  const payload = await apiGet(endpoints.domainPage(cmsSlug), {
    revalidate: REVALIDATE.cms,
  }).catch(() => null);

  if (payload?.domain && (!payload.domain.status || payload.domain.status === "active")) {
    return toDomain(payload, local, slug);
  }

  return local ? deepMerge(DOMAIN_DEFAULTS, local) : null;
});

export const getDomainSlugs = cache(async () => Object.keys(DOMAINS));

export const getDomains = cache(async () => Object.values(DOMAINS));
