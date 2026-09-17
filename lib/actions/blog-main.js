"use server";

import { getBlogMain } from "@/lib/content/blog";

/**
 * Server Action backing the blog index's in-place pagination and search
 * (components/blog/common/blog-posts.jsx) — same pattern as
 * lib/actions/blog-author.js/blog-category.js, just against `getBlogMain`.
 * The index has no per-item identifier to paginate by, so the first
 * argument BlogPosts always passes is simply ignored. `q` searches every
 * published post's title/excerpt — see `getBlogMain`.
 */
export async function fetchMainPosts(_identifier, page, q) {
  const payload = await getBlogMain(page, q);
  return payload?.blogs ?? null;
}
