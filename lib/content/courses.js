import { cache } from "react";

import mlModelMonitoring from "@/data/course.json";

/**
 * COURSES — data for each course page.
 *
 * Each entry is a JSON file under /data/{slug}.json.
 * The shape is consumed directly by the course page and its components.
 * Only the exported functions below are the public API.
 */
const COURSES = {
  "ml-model-monitoring": mlModelMonitoring,
};

/* ========================================================================== */
/* READS — the only surface pages depend on                                    */
/* ========================================================================== */

/**
 * Wrapped in `cache()` so `generateMetadata` and the page body share one read
 * per request instead of doing the work twice (TASTE.md §5.2).
 * Returns `null` for a missing record — calling `notFound()` is the page's call.
 */

export const getCategoryCourse = cache(async (slug) => COURSES[slug] ?? null);

export const getCategoryCourseSlugs = cache(async () => Object.keys(COURSES));

export const getCategoryCourses = cache(async () => Object.values(COURSES));
