import { SITE } from "@/lib/constants";
import {
  getDomainCourseSlugs,
  getCategoryCourseSlugs,
} from "@/lib/content/courses";

/**
 * Generated from the content layer, never hand-maintained — a new course must
 * appear here without anyone remembering to add it (TASTE.md §4.3).
 */
export default async function sitemap() {
  const entry = (path, priority, changeFrequency = "weekly") => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  });

  const [domainSlugs, categorySlugs] = await Promise.all([
    getDomainCourseSlugs(),
    getCategoryCourseSlugs(),
  ]);

  return [
    entry("/", 1, "daily"),
    ...domainSlugs.map((slug) =>
      entry(`/corporate-training/domain/${slug}`, 0.8)
    ),
    ...categorySlugs.map((slug) =>
      entry(`/corporate-training/vendor/${slug}`, 0.8)
    ),
  ];
}
