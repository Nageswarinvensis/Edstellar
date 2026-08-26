import { cache } from "react";

import { DOMAINS } from "@/content/domains";

/**
 * Domain reads. A domain is a training category — `artificial-intelligence`,
 * and the level courses are created under.
 *
 * Every read is wrapped in `cache()` so `generateMetadata` and the page body
 * share one read per request instead of doing the work twice (TASTE.md §5.2).
 * A missing record returns `null`; calling `notFound()` is the page's decision.
 */

export const getDomain = cache(async (slug) => DOMAINS[slug] ?? null);

export const getDomainSlugs = cache(async () => Object.keys(DOMAINS));

export const getDomains = cache(async () => Object.values(DOMAINS));
