import { SITE } from "@/lib/constants";
import { getTrainingSlugs } from "@/lib/content/taxonomy";
import { getAllCoursePaths } from "@/lib/content/courses";
import { getBlogSlugs } from "@/lib/content/blog";
import { CONSULTING_PILLARS } from "@/lib/content/consulting";
import { RESOURCE_TYPES } from "@/lib/content/resources";

/**
 * Generated from the content layer, never hand-maintained — a new course must
 * appear here without anyone remembering to add it (TASTE.md §4.3).
 *
 * **Courses come from `getAllCoursePaths`, not the prerendered subset.**
 * Catalog pagination is client-side, so page two of a listing is a query
 * string on a static page and gives crawlers no link path to the courses on
 * it. This file is the only discovery route for the long tail; building it
 * from the prerender cutoff would make most of the catalog invisible
 * (TASTE.md §2.3).
 */
export const revalidate = 3600;

export default async function sitemap() {
  const entry = (path, priority, changeFrequency = "weekly") => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  });

  const [trainingSlugs, coursePaths, blogSlugs] = await Promise.all([
    getTrainingSlugs(),
    getAllCoursePaths(),
    getBlogSlugs(),
  ]);

  return [
    entry("/", 1, "daily"),
    entry("/corporate-training", 0.8, "daily"),
    ...trainingSlugs.map((slug) => entry(`/corporate-training/${slug}`, 0.7)),
    ...coursePaths.map(({ domain, course }) =>
      entry(`/corporate-training/${domain}/${course}`, 0.8),
    ),
    ...CONSULTING_PILLARS.map(({ slug }) => entry(`/${slug}`, 0.7)),
    entry("/resources", 0.6),
    ...RESOURCE_TYPES.map(({ slug }) => entry(`/resources/${slug}`, 0.5)),
    entry("/blog", 0.6, "daily"),
    ...blogSlugs.map((slug) => entry(`/blog/${slug}`, 0.6)),
    entry("/trainers", 0.5),
    entry("/about-us", 0.4, "monthly"),
    entry("/contact-us", 0.4, "monthly"),
    entry("/privacy-policy", 0.1, "yearly"),
    entry("/terms-and-conditions", 0.1, "yearly"),
  ];
}
