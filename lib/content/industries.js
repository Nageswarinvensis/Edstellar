import { cache } from "react";

/**
 * Industry reads. An industry page lists the courses relevant to a sector and
 * links each one to its canonical URL under the course's own domain
 * (TASTE.md §1.2) — it never hosts a course itself.
 *
 * No industry content is modeled yet, so these return empty. The shape is here
 * so `taxonomy.js` can resolve industry slugs the moment content lands, with
 * no change to any route. Add `content/industries/` and wire it up here.
 */

const INDUSTRIES = {};

export const getIndustry = cache(async (slug) => INDUSTRIES[slug] ?? null);

export const getIndustrySlugs = cache(async () => Object.keys(INDUSTRIES));
