import { notFound } from "next/navigation";

import { getCourse } from "@/lib/content/courses";
import { courseMetadata } from "@/lib/seo/course-seo";
import CourseSchema from "@/components/seo/course-schema";
import CoursePage from "@/components/templates/training/course-page";
import { getCourseV2 } from "@/lib/content/course-v2";
import CoursePageV2 from "@/components/templates/training/v2/course-page-v2";

/**
 * `/corporate-training/{domain}/{course-slug}` — a course page.
 *
 * A course belongs to exactly one domain, which is what gives it exactly one
 * canonical URL. Industry and vendor pages list courses and link here; they
 * never host one (TASTE.md §1.2).
 */

export const revalidate = 300;

/**
 * Nothing is prerendered at build time (SSG is off until launch), but this
 * export is what makes the route ISR: each course is cached on its first
 * visit and re-rendered at most every 5 minutes. Without it the route
 * renders on every request, and a course removed from the CMS stays live
 * indefinitely — Next keeps serving the stale cached CMS response, because it
 * only ever replaces a cached fetch with a 200, never with the CMS's 404.
 * Same fix as `/blog/[slug]`.
 */
export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }) {
  const { slug, courseSlug } = await params;
  // Both designs: SEO comes from the live CMS course (`seo` component).
  const course = await getCourse(slug, courseSlug);
  return course ? courseMetadata(course, slug, courseSlug) : {};
}

export default async function CourseRoute({ params }) {
  const { slug, courseSlug } = await params;

  // Both segments. A one-argument read would render this course under any
  // parent slug, including an industry or a vendor (TASTE.md §1.2).
  const course = await getCourse(slug, courseSlug);

  // Covers two distinct failures at once: no such course, or the course
  // belongs to a different domain than the one in the URL. Both are real 404s.
  if (!course) notFound();

  // New v2 design: only for a course whose CMS page sets
  // `meta.is_new_design: "yes"`. Its `course_*` components (over any local
  // JSON in content/courses/v2/) feed the design; SEO, schema and breadcrumbs
  // stay the course's own CMS components, exactly as the old layout uses them.
  // The old layout below is untouched.
  if (course.is_new_design) {
    const v2 = await getCourseV2(slug, courseSlug);
    // FAQPage must match the questions visible on the page: the v2 FAQ.
    const v2Faqs = (v2.course_faq?.groups ?? []).flatMap((group) => group.items);
    return (
      <>
        <CourseSchema course={course} slug={slug} courseSlug={courseSlug} faqItems={v2Faqs} />
        <CoursePageV2 course={v2} cmsCourse={course} />
      </>
    );
  }

  return (
    <>
      <CourseSchema course={course} slug={slug} courseSlug={courseSlug} />
      <CoursePage course={course} />
    </>
  );
}
