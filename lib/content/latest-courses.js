import "server-only";

import { cache } from "react";

import { LATEST_COURSE_SLUGS } from "@/content/latest-courses";
import { courseLabel, getSitemapIndex } from "@/lib/content/training-catalog";

/**
 * "Latest corporate training courses" — the hand-picked list in
 * `content/latest-courses.js`, shown on trainer profiles and case studies,
 * each as `{ label, href }` linking to its page on this site.
 *
 * Labels come from the CMS title (in the catalog's "… Training" form), and
 * a slug the CMS does not list — or whose domain is unpublished — is dropped
 * rather than rendered as a link that would 404.
 *
 * `[]` when the CMS index is unavailable: both sections render nothing on an
 * empty list, so a CMS outage hides the section instead of failing the page.
 */
export const getLatestCourses = cache(async () => {
  const index = await getSitemapIndex().catch(() => null);
  if (!index) return [];

  const domains = new Set((index.domains ?? []).map((domain) => domain.slug));
  const bySlug = new Map((index.courses ?? []).map((course) => [course.slug, course]));

  return LATEST_COURSE_SLUGS.map((slug) => bySlug.get(slug))
    .filter((course) => course && domains.has(course.slug.split("/")[0]))
    .map((course) => ({
      label: courseLabel(course),
      href: `/corporate-training/${course.slug}`,
    }));
});
