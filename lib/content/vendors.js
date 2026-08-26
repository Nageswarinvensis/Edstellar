import { cache } from "react";

/**
 * Vendor reads. A vendor pages lists that vendor's courses and links each one
 * to its canonical URL under the course's own domain (TASTE.md §1.2).
 *
 * No vendor content is modeled yet — see the note in `industries.js`. Add
 * `content/vendors/` and wire it up here.
 */

const VENDORS = {};

export const getVendor = cache(async (slug) => VENDORS[slug] ?? null);

export const getVendorSlugs = cache(async () => Object.keys(VENDORS));
