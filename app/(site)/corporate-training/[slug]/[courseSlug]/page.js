import { notFound } from "next/navigation";

import { getCourse, getPrerenderedCoursePaths } from "@/lib/content/courses";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, courseJsonLd } from "@/lib/seo/json-ld";
import JsonLd from "@/components/seo/json-ld";
import CoursePage, {
  courseWorkload,
} from "@/components/templates/training/course-page";

/**
 * `/corporate-training/{domain}/{course-slug}` — a course page.
 *
 * A course belongs to exactly one domain, which is what gives it exactly one
 * canonical URL. Industry and vendor pages list courses and link here; they
 * never host one (TASTE.md §1.2).
 */

export const revalidate = 3600;

/**
 * Top N only — the long tail renders on first request and is cached from then
 * on, since `dynamicParams` stays at its default `true` (TASTE.md §2.3).
 *
 * Only domain-owned pairs are emitted, so an industry or vendor slug never
 * appears as a course parent here.
 */
export async function generateStaticParams() {
  const paths = await getPrerenderedCoursePaths();
  return paths.map(({ domain, course }) => ({
    slug: domain,
    courseSlug: course,
  }));
}

export async function generateMetadata({ params }) {
  const { slug, courseSlug } = await params;
  const course = await getCourse(slug, courseSlug);

  if (!course) return {};

  return buildMetadata({
    // Falls back to the page title if the CMS sends no seo component at all.
    // This cannot catch seo copy that is present but *wrong* — see TASTE.md
    // §13 on `meta_title` being duplicated across courses upstream.
    title: course.seo?.meta_title ?? course.name,
    description: course.seo?.Meta_description,
    path: `/corporate-training/${slug}/${courseSlug}`,
    image: course.seo?.og_image_url,
  });
}

export default async function CourseRoute({ params }) {
  const { slug, courseSlug } = await params;

  // Both segments. A one-argument read would render this course under any
  // parent slug, including an industry or a vendor (TASTE.md §1.2).
  const course = await getCourse(slug, courseSlug);

  // Covers three distinct failures at once: no such course, the parent is not
  // a domain, or the course belongs to a different domain. All are real 404s.
  if (!course) notFound();

  return (
    <>
      <JsonLd
        data={[
          courseJsonLd({
            name: course.name,
            description: course.seo?.Meta_description,
            path: `/corporate-training/${slug}/${courseSlug}`,
            workload: courseWorkload(course),
          }),
          breadcrumbJsonLd(course.breadcrumbs?.items),
        ]}
      />
      <CoursePage course={course} />
    </>
  );
}
