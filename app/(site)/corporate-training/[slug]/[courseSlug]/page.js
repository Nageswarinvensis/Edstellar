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
  const course = await getSeoCourse(slug, courseSlug);
  return course ? courseMetadata(course, slug, courseSlug) : {};
}

export default async function CourseRoute({ params }) {
  const { slug, courseSlug } = await params;

  // New v2 design (testing): local JSON, switched in content/courses/v2/index.js.
  // The old layout below is untouched and still serves every other course.
  const v2 = getCourseV2(slug, courseSlug);
  if (v2) {
    const seoCourse = await getSeoCourse(slug, courseSlug);
    // FAQPage must match the questions visible on the page: the v2 FAQ.
    const v2Faqs = (v2.course_faq?.groups ?? []).flatMap((group) => group.items);
    return (
      <>
        <CourseSchema course={seoCourse} slug={slug} courseSlug={courseSlug} faqItems={v2Faqs} />
        <CoursePageV2 course={v2} />
      </>
    );
  }

  // Both segments. A one-argument read would render this course under any
  // parent slug, including an industry or a vendor (TASTE.md §1.2).
  const course = await getCourse(slug, courseSlug);

  // Covers two distinct failures at once: no such course, or the course
  // belongs to a different domain than the one in the URL. Both are real 404s.
  if (!course) notFound();

  return (
    <>
      <CourseSchema course={course} slug={slug} courseSlug={courseSlug} />
      <CoursePage course={course} />
    </>
  );
}

/**
 * The course whose SEO a page uses — metadata and schema go through the same
 * `courseMetadata` / `CourseSchema` for both designs, exactly as live.
 *
 * Live layout: the CMS course. v2 design: its JSON's `course_seo` and
 * `course_schema` — its own CMS components, with the same fields as live
 * (`meta_title`, `Meta_description`, `og_image_url`…, `Course` / `Service`) —
 * over the CMS course for what the JSON does not carry (`noindex`, banner
 * image, domain name).
 */
async function getSeoCourse(slug, courseSlug) {
  const v2 = getCourseV2(slug, courseSlug);
  const cms = await getCourse(slug, courseSlug);
  if (!v2) return cms;

  const crumbs = v2.course_breadcrumbs ?? [];
  return {
    ...(cms ?? {}),
    name: cms?.name ?? v2.name,
    domain_name: cms?.domain_name ?? crumbs[crumbs.length - 2]?.label,
    seo: v2.course_seo ?? cms?.seo,
    schema: v2.course_schema ?? cms?.schema,
  };
}
