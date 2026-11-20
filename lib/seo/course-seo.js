import { buildMetadata } from "@/lib/seo/metadata";

/**
 * Course-page SEO, shared by every course design (the live layout and the v2
 * test design), so both emit the same metadata and the same schema.
 *
 * Input is the course as `getCourse` shapes it from the CMS — `seo`
 * (`meta_title`, `Meta_description`, `og_image_url`), `schema` (`Course`,
 * `Service`, `faq`), `name`, `banner_image`, `noindex`, `domain_name`. The v2
 * page passes the same object: its JSON carries `seo` and `schema` in the
 * CMS's own field names, so the same reads work for both.
 */

const BASE = "https://www.edstellar.com";

export function courseUrl(slug, courseSlug) {
  return `${BASE}/corporate-training/${slug}/${courseSlug}`;
}

/** The page title without the " | Edstellar" suffix `buildMetadata` re-adds. */
export function coursePageTitle(course) {
  const rawTitle = course.seo?.meta_title ?? course.name ?? "";
  return rawTitle.replace(/\s*\|\s*Edstellar\s*$/i, "").trim();
}

/** Meta description — the CMS field, spelled as the CMS sends it. */
export function coursePageDescription(course) {
  return course.seo?.Meta_description ?? "";
}

/** `generateMetadata` for a course page. */
export function courseMetadata(course, slug, courseSlug) {
  const metadata = buildMetadata({
    title: coursePageTitle(course),
    description: coursePageDescription(course) || undefined,
    path: `/corporate-training/${slug}/${courseSlug}`,
    image: course.seo?.og_image_url || course.banner_image,
  });
  // CMS `meta.noindex: "yes"` — out of search results, links still followed
  // (`buildMetadata`'s `noIndex` would also set nofollow).
  return course.noindex ? { ...metadata, robots: { index: false, follow: true } } : metadata;
}
