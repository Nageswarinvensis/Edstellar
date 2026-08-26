import { cache } from "react";

/**
 * Resource reads.
 *
 * `RESOURCE_TYPES` is the single source of truth for which resource types
 * exist — consumed by the hub page, each type's listing, and `sitemap.js`
 * (TASTE.md §1.1). Blog is deliberately **not** here: `/blog/{slug}` is the
 * canonical URL for a post, and listing posts under a second URL would create
 * duplicate content.
 *
 * Each type has its own route and its own design, so there is no shared
 * template and no whitelist check inside one — the routes are the whitelist.
 * These reads return empty until content is modeled.
 */
export const RESOURCE_TYPES = [
  { slug: "articles", label: "Articles" },
  { slug: "case-studies", label: "Case studies" },
  { slug: "templates", label: "Templates" },
  { slug: "tools", label: "Tools" },
  { slug: "brochures", label: "Brochures" },
];

const RESOURCES = {};

export const getResource = cache(
  async (type, slug) => RESOURCES[`${type}/${slug}`] ?? null,
);

export const getResourceSlugs = cache(async (type) =>
  Object.keys(RESOURCES)
    .filter((key) => key.startsWith(`${type}/`))
    .map((key) => key.slice(type.length + 1)),
);
