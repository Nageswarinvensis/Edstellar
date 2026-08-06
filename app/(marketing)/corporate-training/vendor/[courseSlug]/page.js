import { notFound } from "next/navigation";

import { getVendorCourse, getVendorCourseSlugs } from "@/lib/content/courses";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, courseJsonLd } from "@/lib/seo/json-ld";
import JsonLd from "@/components/seo/json-ld";
import VendorHero from "@/components/sections/vendor/vendor-hero";
import VendorInfo from "@/components/sections/vendor/vendorInfo";
import VendorAbout from "@/components/sections/vendor/vendor-about";

export const revalidate = 3600;

function pathFor(slug) {
  return `/corporate-training/vendor/${slug}`;
}

export async function generateStaticParams() {
  const slugs = await getVendorCourseSlugs();
  return slugs.map((courseSlug) => ({ courseSlug }));
}

export async function generateMetadata({ params }) {
  const { courseSlug } = await params;
  const course = await getVendorCourse(courseSlug);
  if (!course) return {};

  return buildMetadata({
    title: course.seo.title,
    description: course.seo.description,
    path: pathFor(courseSlug),
    image: course.seo.ogImage,
  });
}

export default async function VendorCoursePage({ params }) {
  const { courseSlug } = await params;
  const course = await getVendorCourse(courseSlug);

  if (!course) notFound();

  const workload = course.proof?.stats?.find((stat) => stat.label === "Hours");

  return (
    <>
      <JsonLd
        data={[
          courseJsonLd({
            name: course.name,
            description: course.seo.description,
            path: pathFor(courseSlug),
            workload: workload ? `${workload.value} hours` : undefined,
          }),
          breadcrumbJsonLd(course.breadcrumbs),
        ]}
      />

      <VendorHero hero={course.hero} breadcrumbs={course.breadcrumbs} />
      <VendorInfo
        topics={course.hero?.topics}
        groupQuote={course.hero?.groupQuote}
        proof={course.proof}
      />
      <VendorAbout about={course.about} />
    </>
  );
}
