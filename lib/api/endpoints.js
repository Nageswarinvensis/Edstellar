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
const BLOG_BASE =
  process.env.BLOG_API_URL || "https://webflow-blog-api.vercel.app/api/blogs";

export const endpoints = {
  /** A CMS page and its resolved components, by slug. */
  cmsPage: (slug) => `${CMS_BASE}/api/v2/pages/${encodeURIComponent(slug)}`,

  /** Every published blog post. */
  blogPosts: () => BLOG_BASE,

  /** One blog post by slug. */
  blogPost: (slug) => `${BLOG_BASE}/${encodeURIComponent(slug)}`,
};

/**
 * Revalidation windows, colocated with the endpoints they apply to so a page
 * and its data can never disagree about freshness.
 */
export const REVALIDATE = {
  cms: 3600,
  blog: 300,
};
