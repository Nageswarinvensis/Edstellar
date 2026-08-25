import { cache } from "react";

import mlModelMonitoring from "@/data/course.json";

/**
 * COURSES — static fallback data, still used for:
 *   - getCategoryCourseSlugs / getCategoryCourses (category listing, sitemap.js,
 *     home page.js) — out of scope for the API swap, untouched for now.
 *   - ClientsLogosData on a course fetched from the API (see fetchCourseFromApi)
 *     — not yet modeled as a CMS component.
 *
 * Each entry is a JSON file under /data/{slug}.json.
 */
const COURSES = {
  "ml-model-monitoring": mlModelMonitoring,
};

const CMS_API_URL = process.env.CMS_API_URL || "http://localhost:8000";

/**
 * Fetch a course page from the backend CMS (`GET /api/v2/pages/{slug}`) and
 * reshape it into the flat view model the course page and its sections
 * expect: one key per component slug (`hero`, `seo`, `curriculum`, …), same
 * as the static JSON this replaces.
 *
 * `page_components.config` is already the fully-resolved render data (see
 * the backend's PageController) — no further shaping needed per component.
 *
 * ClientsLogosData has no backing Component yet, so it's merged in from the
 * static fallback until the backend models it too.
 *
 * @return {Promise<object|null>} null for a missing or unpublished page —
 *   the page decides whether that means notFound().
 */
async function fetchCourseFromApi(slug) {
  const res = await fetch(`${CMS_API_URL}/api/v2/pages/${slug}`, {
    next: { revalidate: 3600 },
  });

  if (res.status === 404) return null;

  if (!res.ok) {
    throw new Error(`CMS API request failed for page "${slug}": ${res.status}`);
  }

  const { page, components } = await res.json();

  const configBySlug = Object.fromEntries(
    components.map((component) => [component.component_slug, component.config]),
  );

  return {
    slug: page.slug,
    name: page.title,
    category: page.meta?.category ?? null,
    ...configBySlug,
    ClientsLogosData: COURSES[slug]?.ClientsLogosData,
  };
}

/* ========================================================================== */
/* READS — the only surface pages depend on                                    */
/* ========================================================================== */

/**
 * Wrapped in `cache()` so `generateMetadata` and the page body share one read
 * per request instead of doing the work twice (TASTE.md §5.2).
 * Returns `null` for a missing record — calling `notFound()` is the page's call.
 */

export const getCategoryCourse = cache(async (slug) =>
  fetchCourseFromApi(slug),
);

export const getCategoryCourseSlugs = cache(async () => Object.keys(COURSES));

export const getCategoryCourses = cache(async () => Object.values(COURSES));
