import { notFound } from "next/navigation";

import { getCategoryCourse } from "@/lib/content/courses";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, courseJsonLd } from "@/lib/seo/json-ld";

import JsonLd from "@/components/seo/json-ld";
import CategoryHero from "@/components/sections/course/course-hero";
import CategoryInfo from "@/components/sections/course/courseInfo";
import ClientLogos from "@/components/sections/course/client-logo";
import StickyTabs from "@/components/sections/course/sticky-navbar";
import CategoryAbout from "@/components/sections/course/course-about";
import WhyNow from "@/components/sections/course/why-now";
import Certificate from "@/components/sections/course/certificate";
import Faq from "@/components/sections/course/faq";

export const revalidate = 3600;

function pathFor(category, slug) {
  return `/corporate-training/${category}/${slug}`;
}

export async function generateMetadata({ params }) {
  const { category, slug } = await params;

  const course = await getCategoryCourse(slug);

  if (!course) return {};

  return buildMetadata({
    title: course.seo.title,
    description: course.seo.description,
    path: pathFor(category, slug),
    image: course.seo.ogImage,
  });
}

export default async function CoursePage({ params }) {
  const { category, slug } = await params;

  const course = await getCategoryCourse(slug);

  if (!course) notFound();

  const workload = course.proof?.stats?.find((stat) => stat.label === "Hours");

  return (
    <>
      <JsonLd
        data={[
          courseJsonLd({
            name: course.name,
            description: course.seo.description,
            path: pathFor(category, slug),
            workload: workload ? `${workload.value} hours` : undefined,
          }),
          breadcrumbJsonLd(course.breadcrumbs),
        ]}
      />

      <CategoryHero hero={course.hero} breadcrumbs={course.breadcrumbs} />

      <CategoryInfo
        topics={course.hero?.topics}
        groupQuote={course.hero?.groupQuote}
        proof={course.proof}
      />

      <ClientLogos data={course.ClientsLogosData} />
      <StickyTabs data={course.stickyNavbarData} />
      <CategoryAbout about={course.about} />
      <WhyNow whyNow={course.whyNow} />
      <Certificate certificate={course.certificate} />
      <Faq faqs={course.faqs} />
    </>
  );
}
