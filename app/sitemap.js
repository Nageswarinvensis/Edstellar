import { SITE } from "@/lib/constants";
import {
  getDomainCourseSlugs,
  getCategoryCourses,
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

  const [categorySlugs, categoryCourses] = await Promise.all([
    getDomainCourseSlugs(),
    getCategoryCourses(),
  ]);

  return [
    entry("/", 1, "daily"),
    ...categorySlugs.map((slug) => entry(`/corporate-training/${slug}`, 0.7)),
    ...categoryCourses.map((course) =>
      entry(`/corporate-training/${course.category}/${course.slug}`, 0.8)
    ),
  ];
}
