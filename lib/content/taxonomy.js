import { cache } from "react";

import { getDomain, getDomainSlugs } from "@/lib/content/domains";
import { getIndustry, getIndustrySlugs } from "@/lib/content/industries";
import { getVendor, getVendorSlugs } from "@/lib/content/vendors";

/**
 * The taxonomy layer — the single module that knows what kind of thing a
 * `/corporate-training/{slug}` slug is.
 *
 * All three entity types share one route because route groups create no
 * separate URL namespace, so two `[slug]` folders at the same depth is a build
 * error (TASTE.md §1.2). The type is therefore resolved here, at build time,
 * and the design is chosen by picking a template.
 *
 * Everything that route needs comes from this file. Nothing else should
 * import `industries.js` or `vendors.js` directly.
 */

/** Resolution order. First match wins — but a collision throws before that
 *  can matter, so the order is not load-bearing. */
const TYPES = [
  { type: "domain", read: getDomain, slugs: getDomainSlugs },
  { type: "industry", read: getIndustry, slugs: getIndustrySlugs },
  { type: "vendor", read: getVendor, slugs: getVendorSlugs },
];

/**
 * Every slug served by `/corporate-training/{slug}`, across all three types.
 *
 * **Throws on a collision.** Two types claiming one slug means one of them is
 * unreachable — a live page silently shadowed, which is the kind of failure
 * you would otherwise discover from a traffic graph weeks later. A failed
 * build is enormously cheaper (TASTE.md §1.2).
 */
export const getTrainingSlugs = cache(async () => {
  const lists = await Promise.all(TYPES.map(({ slugs }) => slugs()));

  const owner = new Map();
  for (const [index, list] of lists.entries()) {
    const { type } = TYPES[index];
    for (const slug of list) {
      const existing = owner.get(slug);
      if (existing) {
        throw new Error(
          `Slug collision in /corporate-training: "${slug}" is registered as ` +
            `both a ${existing} and a ${type}. Slugs must be globally unique ` +
            `across domains, industries and vendors (TASTE.md §1.2).`,
        );
      }
      owner.set(slug, type);
    }
  }

  return [...owner.keys()];
});

/**
 * Resolve a slug to its type and content.
 *
 * @returns {Promise<{type: "domain"|"industry"|"vendor", data: object}|null>}
 *   `null` for an unknown slug — the page decides that means `notFound()`.
 */
export const resolveTrainingSlug = cache(async (slug) => {
  for (const { type, read } of TYPES) {
    const data = await read(slug);
    if (data) return { type, data };
  }
  return null;
});

/** True when this slug can parent a course URL. Only domains can. */
export const isDomainSlug = cache(async (slug) => {
  const entry = await resolveTrainingSlug(slug);
  return entry?.type === "domain";
});
