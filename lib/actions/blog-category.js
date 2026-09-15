"use server";

import { getBlogCategory } from "@/lib/content/blog";

/**
 * Server Action backing the category page's in-place pagination
 * (components/blog/common/blog-posts.jsx) — same pattern as
 * lib/actions/blog-author.js, just against `getBlogCategory`.
 */
export async function fetchCategoryPosts(slug, page) {
  const category = await getBlogCategory(slug, page);
  return category?.blogs ?? null;
}
