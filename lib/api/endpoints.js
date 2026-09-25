import "server-only";

/**
 * Every external URL this site talks to, in one place.
 *
 * Base URLs are read from the environment here and nowhere else. Neither name
 * carries the `NEXT_PUBLIC_` prefix, so neither is embedded in the client
 * bundle (TASTE.md §5.2) — which is only true as long as these stay behind
 * `server-only`.
 */
const CMS_BASE = process.env.CMS_API_URL || "http://localhost:8000";

/**
 * `page` and `q` (the search term — searches `title`/`excerpt`, scoped by
 * whichever of the three listing endpoints below is called) share the same
 * query-string assembly across all three, so it's built once here.
 */
function listingQuery({ page = 1, q } = {}) {
  const params = new URLSearchParams();
  if (page > 1) params.set("page", String(page));
  if (q?.trim()) params.set("q", q.trim());
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export const endpoints = {
  /** A CMS page and its resolved components, by slug. */
  cmsPage: (slug) => `${CMS_BASE}/api/v2/pages/${encodeURIComponent(slug)}`,

  /** A single blog post with its resolved author and category, by slug. */
  blogPost: (slug) => `${CMS_BASE}/api/v2/blog/${encodeURIComponent(slug)}`,

  /** A blog author's profile, bio, and paginated post list, by slug —
   * `q` searches only this author's posts. */
  blogAuthor: (slug, page = 1, q) =>
    `${CMS_BASE}/api/v2/blog/authors/${encodeURIComponent(slug)}${listingQuery({ page, q })}`,

  /** A blog category's name/description and paginated post list, by slug —
   * `q` searches only this category's posts. */
  blogCategory: (slug, page = 1, q) =>
    `${CMS_BASE}/api/v2/blog/categories/${encodeURIComponent(slug)}${listingQuery({ page, q })}`,

  /** The blog index's paginated post list plus the category list, own CMS —
   * `q` searches every published post. */
  blogMain: (page = 1, q) =>
    `${CMS_BASE}/api/v2/blog${listingQuery({ page, q })}`,

  /** A trainer's profile, by slug. No index endpoint exists — see
   * `content/trainers/trainersdata.js`'s `otherTrainers`. */
  trainer: (slug) => `${CMS_BASE}/api/v2/trainer/${encodeURIComponent(slug)}`,

  /** A domain page and its resolved components, by slug — its own endpoint,
   * distinct from `cmsPage`. The CMS's domain slug is not guaranteed to
   * match the site's route slug (e.g. `ai` vs `artificial-intelligence`);
   * `lib/content/domains.js` resolves that via each domain's `cmsSlug`
   * before calling this. */
  domainPage: (slug) => `${CMS_BASE}/api/v2/domains/${encodeURIComponent(slug)}`,
};

/**
 * Revalidation windows, colocated with the endpoints they apply to so a page
 * and its data can never disagree about freshness.
 */
export const REVALIDATE = {
  cms: 3600,
  course: 20,
  author: 300,
  category: 300,
  main: 300,
  trainer: 3600,
};
