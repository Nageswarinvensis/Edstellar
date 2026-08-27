import { cache } from "react";

import { apiGet } from "@/lib/api/client";
import { endpoints, REVALIDATE } from "@/lib/api/endpoints";
import { deepMerge } from "@/lib/content/shape/deep-merge";
import { COURSES_BY_DOMAIN, COURSE_FALLBACKS } from "@/content/courses";
import { COURSE_DEFAULTS } from "@/content/courses/defaults";
import { getDomain } from "@/lib/content/domains";

/**
 * Course reads.
 *
 * Content comes from the CMS through `lib/api/client.js` — the only `fetch` in
 * the codebase. This module's job is to turn that response into a view model
 * with stable, consistent keys, so no template ever sees a CMS field name
 * (TASTE.md §5.2).
 */

/**
 * Shape a CMS page response into the course view model.
 *
 * **There is no key translation here, by design.** The CMS component slug is
 * the view-model key and the CMS field name is the field name components read —
 * `heading_parts` stays `heading_parts` all the way to the JSX. One convention
 * end to end means no mapping table to keep in sync, and a section that breaks
 * can be traced by grepping the CMS field name itself.
 *
 * The trade this accepts: renaming a field in the CMS now ripples out to every
 * component that reads it, instead of being absorbed by one line in a map.
 *
 * `page_components[].config` is already fully-resolved render data (see the
 * backend's PageController), so no per-component shaping is needed.
 */
function toCourse(payload, domain) {
  const { page, components } = payload;

  const fromCms = Object.fromEntries(
    components.map(({ component_slug, config }) => [component_slug, config]),
  );

  const { slug, name, category, ...fallback } = COURSE_FALLBACKS[page.slug] ?? {};

  // Three layers, lowest priority first:
  //   1. COURSE_DEFAULTS  — scaffolding shared by every course
  //   2. per-course JSON  — this course's own unmodeled sections
  //   3. the CMS response — wins on every field it actually sends
  //
  // Layer 1 is what lets a course with no fallback file of its own still
  // render complete: the delivery meta row, hero buttons and section CTAs
  // come from defaults rather than being absent.
  const merged = deepMerge(deepMerge(COURSE_DEFAULTS, fallback), fromCms);

  return { slug: page.slug, name: page.title, domain, ...merged };
}

/* ========================================================================== */
/* READS — the only surface pages depend on                                   */
/* ========================================================================== */

/**
 * One course, scoped to its domain.
 *
 * **Both arguments are required, and that is the point.** A one-argument read
 * would happily render a course under any parent slug, including an industry
 * or vendor (TASTE.md §1.2).
 *
 * Wrapped in `cache()` so `generateMetadata` and the page body share one
 * request rather than fetching twice (TASTE.md §5.2).
 *
 * @returns {Promise<object|null>} `null` for a missing course, an unpublished
 *   one, a parent that is not a domain, or a course whose CMS `meta.category`
 *   names a different domain.
 */
export const getCourse = cache(async (domain, slug) => {
  // The parent must be a real domain. Industries and vendors list courses but
  // never host them, so they can never be a course's parent (TASTE.md §1.2).
  if (!(await getDomain(domain))) return null;

  // The CMS models a course page's slug as `{domain}/{slug}`, not the bare
  // course slug — the domain is part of the page identity, not just a field
  // on it.
  const payload = await apiGet(endpoints.cmsPage(`${domain}/${slug}`), {
    revalidate: REVALIDATE.cms,
  });

  if (!payload?.page) return null;
  if (payload.page.status && payload.page.status !== "published") return null;

  // **The CMS decides which domain owns a course.** Checking it here rather
  // than against a local list is what makes any published course work at its
  // URL with no code change — and still 404 under the wrong parent, because a
  // mismatch fails this test.
  //
  // A record with no `meta.category` is unreachable by design: without it
  // ownership cannot be proven, and guessing would let any domain host any
  // course. A 404 is a loud, greppable failure; the alternative is a course
  // quietly resolving at several URLs and splitting its own ranking.
  if (payload.page.meta?.category !== domain) return null;

  return toCourse(payload, domain);
});

/**
 * Every `{ domain, course }` pair on the site.
 *
 * Used by `sitemap.js`. **This is deliberately not the same set as
 * `getPrerenderedCoursePaths`** — catalog pagination is client-side, so the
 * sitemap is the only crawl path to courses beyond page one. Building it from
 * the prerender subset would make the long tail uncrawlable (TASTE.md §2.3).
 */
export const getAllCoursePaths = cache(async () =>
  Object.entries(COURSES_BY_DOMAIN).flatMap(([domain, courses]) =>
    courses.map((course) => ({ domain, course })),
  ),
);

/**
 * The subset prerendered at build time. Everything else renders on first
 * request and is cached from then on (`dynamicParams` stays `true`).
 *
 * The cutoff is the whole catalog while it is small enough to build. See
 * TASTE.md §13 — "top N" needs a real rule (traffic, or a CMS flag) before
 * the catalog reaches a few thousand courses.
 */
export const getPrerenderedCoursePaths = cache(async () => getAllCoursePaths());

/** Course slugs owned by one domain, for that domain's catalog. */
export const getDomainCourseSlugs = cache(
  async (domain) => COURSES_BY_DOMAIN[domain] ?? [],
);
