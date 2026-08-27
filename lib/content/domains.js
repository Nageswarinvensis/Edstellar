import { cache } from "react";

import { apiGet } from "@/lib/api/client";
import { endpoints, REVALIDATE } from "@/lib/api/endpoints";
import { deepMerge } from "@/lib/content/shape/deep-merge";
import { DOMAINS } from "@/content/domains";

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
function toDomain(payload, local) {
  const { page, components } = payload;

  const fromCms = Object.fromEntries(
    components.map(({ component_slug, config }) => [component_slug, config]),
  );

  return {
    slug: page.slug,
    name: page.title,
    ...deepMerge(local ?? {}, fromCms),
  };
}

/**
 * **The CMS is tried first, local content (`content/domains/`) is the
 * fallback — not the other way round.** As of writing the CMS has not
 * modeled any domain page yet, so every domain resolves from local content
 * today; the moment the backend publishes a page at this slug, it takes over
 * per-field with no code change here. A network failure while checking the
 * CMS must not take down every `/corporate-training/*` page on the site, so
 * it is swallowed and treated the same as "the CMS has nothing for this
 * slug" rather than surfaced.
 */
export const getDomain = cache(async (slug) => {
  const local = DOMAINS[slug] ?? null;

  const payload = await apiGet(endpoints.cmsPage(slug), {
    revalidate: REVALIDATE.cms,
  }).catch(() => null);

  if (payload?.page && (!payload.page.status || payload.page.status === "published")) {
    return toDomain(payload, local);
  }

  return local;
});

export const getDomainSlugs = cache(async () => Object.keys(DOMAINS));

export const getDomains = cache(async () => Object.values(DOMAINS));
