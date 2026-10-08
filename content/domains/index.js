/**
 * The domain registry. One entry per domain, keyed by URL slug.
 *
 * `lib/content/domains.js` is the only module that reads this — everything
 * else goes through those reads (TASTE.md §5.2).
 *
 * A domain that is served entirely from the CMS needs no content file — just a
 * registry entry carrying `cmsSlug` (the CMS's own short code, which can differ
 * from the route slug) and `name` (used for the breadcrumb/JSON-LD; the CMS
 * domain record's name is the short code). Everything else comes from the CMS,
 * merged over `DOMAIN_DEFAULTS`.
 */
export const DOMAINS = {
  "artificial-intelligence": { cmsSlug: "ai", name: "Artificial Intelligence" },
};
