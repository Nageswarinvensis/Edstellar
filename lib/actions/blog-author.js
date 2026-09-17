"use server";

import { getBlogAuthor } from "@/lib/content/blog";

/**
 * Server Action backing the author page's in-place pagination and search
 * (components/blog/common/blog-posts.jsx): the URL never changes, so page 2+
 * (or a new search term) has to be fetched after the initial render instead
 * of via a route. Still goes through `getBlogAuthor` — the sanctioned
 * content-read layer (CLAUDE.md #9) — rather than adding a second `fetch`.
 * `q` searches only this author's posts — see `getBlogAuthor`.
 */
export async function fetchAuthorPosts(slug, page, q) {
  const { author } = await getBlogAuthor(slug, page, q);
  return author?.blogs ?? null;
}
