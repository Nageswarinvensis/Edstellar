import { SITE } from "@/lib/constants";
import courses from "@/lib/content/courses";

/**
 * Generated from the content layer, never hand-maintained — a new course must
 * appear here without anyone remembering to add it (TASTE.md §4.3).
 */
export default function sitemap() {
  const entry = (path, priority, changeFrequency = "weekly") => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  });

  return [
    entry("/", 1, "daily"),
    ...courses.map((course) =>
      entry(`/corporate-training/${course.category}/${course.slug}`, 0.8)
    ),
  ];
}
