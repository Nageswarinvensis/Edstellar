import artificialIntelligence from "./artificial-intelligence";

/**
 * The domain registry. One entry per domain, keyed by URL slug.
 *
 * `lib/content/domains.js` is the only module that reads this — everything
 * else goes through those reads (TASTE.md §5.2).
 */
export const DOMAINS = {
  "artificial-intelligence": artificialIntelligence,
};
