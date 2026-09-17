"use server";

import { getBlogCategory } from "@/lib/content/blog";

/**
 * Server Action backing the category page's in-place pagination and search
 * (components/blog/common/blog-posts.jsx) — same pattern as
 * lib/actions/blog-author.js, just against `getBlogCategory`. `q` searches
 * only this category's posts — see `getBlogCategory`.
 */
export async function fetchCategoryPosts(slug, page, q) {
  const { category } = await getBlogCategory(slug, page, q);
  return category?.blogs ?? null;
}
