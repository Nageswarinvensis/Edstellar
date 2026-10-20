import "server-only";

import railData from "@/content/blog/rail-categories.json";
import { getTrainingDomains } from "@/lib/content/training-catalog";

/**
 * The blog post rail's training categories. Which group a domain sits in is
 * local (`content/blog/rail-categories.json` lists domain slugs per group —
 * the CMS has no grouping); each domain's name, link and course count are
 * live, from the CMS sitemap through `getTrainingDomains`, so the rail always
 * matches the catalog. Within a group, domains run by course count, most
 * first. A listed slug the CMS no longer has is dropped; a published domain
 * no group lists yet goes under "More domains", so nothing is left out.
 */
export async function getBlogRailCategories() {
  const domains = await getTrainingDomains();
  const bySlug = new Map(
    domains.map((domain) => [
      domain.slug,
      { name: domain.name, href: domain.href, course_count: domain.courses.length },
    ]),
  );

  const toDomains = (slugs) =>
    slugs
      .map((slug) => bySlug.get(slug))
      .filter(Boolean)
      .sort((a, b) => b.course_count - a.course_count || a.name.localeCompare(b.name));

  const listed = new Set(railData.categories.flatMap((group) => group.domains));
  const unlisted = domains.map((domain) => domain.slug).filter((slug) => !listed.has(slug));

  return [
    ...railData.categories.map((group) => ({ ...group, domains: toDomains(group.domains) })),
    ...(unlisted.length ? [{ key: "more", label: "More domains", domains: toDomains(unlisted) }] : []),
  ].filter((group) => group.domains.length);
}
