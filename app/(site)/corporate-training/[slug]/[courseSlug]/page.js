import { notFound } from "next/navigation";

import { getCourse } from "@/lib/content/courses";
import { buildMetadata } from "@/lib/seo/metadata";
import JsonLd from "@/components/seo/json-ld";
import CoursePage from "@/components/templates/training/course-page";

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
  const course = await getCourse(slug, courseSlug);

  if (!course) return {};

  const rawTitle = course.seo?.meta_title ?? course.name;
  const title = rawTitle.replace(/\s*\|\s*Edstellar\s*$/i, "").trim();

  return buildMetadata({
    title,
    description: course.seo?.Meta_description,
    path: `/corporate-training/${slug}/${courseSlug}`,
    image: course.seo?.og_image_url || course.banner_image,
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

  const BASE = "https://www.edstellar.com";
  const courseUrl = `${BASE}/corporate-training/${slug}/${courseSlug}`;
  const rawTitle = course.seo?.meta_title ?? course.name;
  const pageTitle = rawTitle.replace(/\s*\|\s*Edstellar\s*$/i, "").trim();
  const pageDescription = course.seo?.Meta_description ?? "";

  // API sends course.schema = { faq: [], course: {}, service: {} }
  // WebSite / WebPage / BreadcrumbList are always auto-generated here.
  const schema = course.schema ?? null;
  const faqItems = schema?.faq?.length
    ? schema.faq
    : (course.faqs ?? course.Faqs)?.items ?? [];

  return (
    <>
      {/* 1 — WebSite + WebPage (always rendered for every course) */}
      <JsonLd data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebSite",
            "@id": `${BASE}/#website`,
            "url": BASE,
            "name": "Edstellar"
          },
          {
            "@type": "WebPage",
            "@id": `${courseUrl}#webpage`,
            "url": courseUrl,
            "name": pageTitle,
            ...(pageDescription && { "description": pageDescription }),
            "inLanguage": "en-US",
            "isPartOf": { "@id": `${BASE}/#website` },
            "mainEntity": { "@id": `${courseUrl}#course` },
            "about": { "@id": `${courseUrl}#service` },
            "breadcrumb": { "@id": `${courseUrl}#breadcrumb` },
            ...(faqItems.length && { "hasPart": { "@id": `${courseUrl}#faq` } })
          }
        ]
      }} />

      {/* 2 — BreadcrumbList (always rendered for every course) */}
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": `${courseUrl}#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE },
          { "@type": "ListItem", "position": 2, "name": "Corporate Training", "item": `${BASE}/corporate-training` },
          { "@type": "ListItem", "position": 3, "name": course.domain_name, "item": `${BASE}/corporate-training/${slug}` },
          { "@type": "ListItem", "position": 4, "name": pageTitle, "item": courseUrl }
        ]
      }} />

      {/* 3 — FAQPage (uses schema.faq from API if present, falls back to course.faqs) */}
      {faqItems.length > 0 && (
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${courseUrl}#faq`,
          "isPartOf": { "@id": `${courseUrl}#webpage` },
          "inLanguage": "en-US",
          "mainEntity": faqItems.map((item) => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": { "@type": "Answer", "text": item.answer }
          }))
        }} />
      )}

      {/* 4 — Course (only when API sends schema.course) */}
      {schema?.course && (
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "Course",
          "@id": `${courseUrl}#course`,
          "name": pageTitle,
          "description": pageDescription,
          "url": courseUrl,
          "provider": { "@type": "Organization", "name": "Edstellar", "url": BASE },
          "inLanguage": "en",
          "learningResourceType": "Instructor-led corporate training",
          "mainEntityOfPage": { "@id": `${courseUrl}#webpage` },
          "image": schema.course.image || course.banner_image,
          ...(schema.course.timeRequired && { "timeRequired": schema.course.timeRequired }),
          ...(schema.course.teaches?.length && { "teaches": schema.course.teaches }),
          ...(schema.course.coursePrerequisites && { "coursePrerequisites": schema.course.coursePrerequisites }),
          ...(schema.course.audience && { "audience": { "@type": "Audience", "audienceType": schema.course.audience } }),
          "educationalCredentialAwarded": "Edstellar course completion certificate",
          "hasCourseInstance": [
            { "@type": "CourseInstance", "@id": `${courseUrl}#onsite`, "courseMode": "Onsite" },
            { "@type": "CourseInstance", "@id": `${courseUrl}#virtual`, "courseMode": "Live virtual" },
            { "@type": "CourseInstance", "@id": `${courseUrl}#hybrid`, "courseMode": "Hybrid" }
          ]
        }} />
      )}

      {/* 5 — Service (only when API sends schema.service) */}
      {schema?.service && (
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `${courseUrl}#service`,
          "name": pageTitle,
          "description": schema.service.description,
          "url": courseUrl,
          "serviceType": "Customized instructor-led corporate training",
          "provider": { "@type": "Organization", "name": "Edstellar", "url": BASE },
          "image": schema.course?.image || course.banner_image,
          "areaServed": schema.service.areaServed || ["North America", "Europe", "Asia-Pacific", "Middle East", "Africa", "Latin America and the Caribbean"],
          "subjectOf": { "@id": `${courseUrl}#webpage` },
          "audience": { "@type": "Audience", "audienceType": "Enterprise and Corporate Organizations" }
        }} />
      )}

      <CoursePage course={course} />
    </>
  );
}
