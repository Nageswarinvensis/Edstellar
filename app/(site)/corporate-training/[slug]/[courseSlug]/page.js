import { notFound } from "next/navigation";

import { getCourse } from "@/lib/content/courses";
import { buildMetadata } from "@/lib/seo/metadata";
import SchemaOrg from "@/components/seo/schema-org";
import CoursePage from "@/components/templates/training/course-page";

/**
 * `/corporate-training/{domain}/{course-slug}` — a course page.
 *
 * A course belongs to exactly one domain, which is what gives it exactly one
 * canonical URL. Industry and vendor pages list courses and link here; they
 * never host one (TASTE.md §1.2).
 */

export const revalidate = 20;

export async function generateMetadata({ params }) {
  const { slug, courseSlug } = await params;
  const course = await getCourse(slug, courseSlug);

  if (!course) return {};

  const rawTitle = course.seo?.meta_title ?? course.name;
  const title = rawTitle.replace(/\s*\|\s*Edstellar\s*$/i, "").trim();

  return buildMetadata({
    title,
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

  // Covers two distinct failures at once: no such course, or the course
  // belongs to a different domain than the one in the URL. Both are real 404s.
  if (!course) notFound();

  return (
    <>
      <SchemaOrg
        course={{
          name: course.name,
          description: course.seo?.Meta_description,
          path: `/corporate-training/${slug}/${courseSlug}`,
          image: course.seo?.og_image_url,
          audience: course.audience?.[0],
        }}
        breadcrumbs={course.breadcrumbs?.items}
        faqs={course.faqs?.items ?? course.Faqs?.items}
      />
      <CoursePage course={course} />
    </>
  );
}
