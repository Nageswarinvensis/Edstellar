import railData from "@/content/blog/rail-categories.json";

/**
 * The blog post rail's training categories — six groups, each with its
 * catalog domains and course counts (local content; the CMS has no
 * equivalent). Read here so components never import content directly
 * (CLAUDE.md #9).
 */
export function getBlogRailCategories() {
  return railData.categories;
}
