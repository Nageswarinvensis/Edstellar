"use server";

import { getBlogAuthor } from "@/lib/content/blog";

/**
 * Server Action backing the author page's in-place pagination
 * (components/blog/common/blog-posts.jsx): the URL never changes, so page 2+
 * has to be fetched after the initial render instead of via a route. Still
 * goes through `getBlogAuthor` — the sanctioned content-read layer
 * (CLAUDE.md #9) — rather than adding a second `fetch`.
 */
export async function fetchAuthorPosts(slug, page) {
  const author = await getBlogAuthor(slug, page);
  return author?.blogs ?? null;
}
