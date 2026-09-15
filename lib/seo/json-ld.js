import { SITE } from "@/lib/constants";

/**
 * Structured-data builders (TASTE.md §4.2).
 *
 * Every builder must only describe content that is actually rendered on the
 * page. Marking up things the visitor cannot see is cloaking.
 */

function absolute(path) {
  if (!path) return undefined;
  return path.startsWith("http") ? path : `${SITE.url}${path}`;
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    description: SITE.description,
  };
}

/**
 * `BreadcrumbList` from the same array the visible breadcrumb rail renders, so
 * the two can never drift apart.
 */
export function breadcrumbJsonLd(items = []) {
  if (!items.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: absolute(item.href),
    })),
  };
}

/**
 * `Course` for an individual course page.
 */
export function courseJsonLd({
  name,
  description,
  path,
  provider = SITE.name,
  workload,
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    url: absolute(path),
    provider: {
      "@type": "Organization",
      name: provider,
      url: SITE.url,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: ["Onsite", "Online", "Blended"],
      ...(workload ? { courseWorkload: workload } : {}),
    },
  };
}

/**
 * `BlogPosting` for a blog post.
 *
 * `authorName` is optional: the Webflow-sourced bulk listing still has no
 * name-resolution for its author reference id (see lib/content/blog.js), so
 * callers reading from that upstream have nothing to pass here.
 */
export function blogPostingJsonLd({
  title,
  description,
  path,
  image,
  datePublished,
  dateModified,
  authorName,
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    ...(description ? { description } : {}),
    url: absolute(path),
    ...(image ? { image: absolute(image) } : {}),
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    ...(authorName ? { author: { "@type": "Person", name: authorName } } : {}),
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
  };
}

/**
 * `Service` for a category hub, which sells a training capability rather than a
 * single scheduled course.
 */
export function serviceJsonLd({ name, description, path }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: `${name} corporate training`,
    name,
    description,
    url: absolute(path),
    provider: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    areaServed: "Worldwide",
  };
}
