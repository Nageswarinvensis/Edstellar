import { SITE } from "@/lib/constants";
import { getDomainCourseSlugs, getVendorCourseSlugs } from "@/lib/content/courses";

/**
 * Generated from the content layer, never hand-maintained — a new course must
 * appear here without anyone remembering to add it (TASTE.md §4.3).
 */
export default async function sitemap() {
  const [domainSlugs, vendorSlugs] = await Promise.all([
    getDomainCourseSlugs(),
    getVendorCourseSlugs(),
  ]);

  const entry = (path, priority, changeFrequency = "weekly") => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  });

  return [
    entry("/", 1, "daily"),
    ...domainSlugs.map((slug) =>
      entry(`/corporate-training/domain/${slug}`, 0.9)
    ),
    ...vendorSlugs.map((slug) =>
      entry(`/corporate-training/vendor/${slug}`, 0.8)
    ),
  ];
}
