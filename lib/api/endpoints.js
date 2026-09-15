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

export const endpoints = {
  /** A CMS page and its resolved components, by slug. */
  cmsPage: (slug) => `${CMS_BASE}/api/v2/pages/${encodeURIComponent(slug)}`,

  /** A single blog post with its resolved author and category, by slug. */
  blogPost: (slug) => `${CMS_BASE}/api/v2/blog/${encodeURIComponent(slug)}`,

  /** A blog author's profile, bio, and paginated post list, by slug. */
  blogAuthor: (slug, page = 1) =>
    `${CMS_BASE}/api/v2/blog/authors/${encodeURIComponent(slug)}${
      page > 1 ? `?page=${page}` : ""
    }`,

  /** A blog category's name/description and paginated post list, by slug. */
  blogCategory: (slug, page = 1) =>
    `${CMS_BASE}/api/v2/blog/categories/${encodeURIComponent(slug)}${
      page > 1 ? `?page=${page}` : ""
    }`,

  /** The blog index's paginated post list plus the category list, own CMS. */
  blogMain: (page = 1) =>
    `${CMS_BASE}/api/v2/blog${page > 1 ? `?page=${page}` : ""}`,
};

/**
 * Revalidation windows, colocated with the endpoints they apply to so a page
 * and its data can never disagree about freshness.
 */
export const REVALIDATE = {
  cms: 3600,
  author: 300,
  category: 300,
  main: 300,
};
