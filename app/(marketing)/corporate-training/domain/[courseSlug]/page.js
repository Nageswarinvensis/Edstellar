import { notFound } from "next/navigation";

import { getDomainCourse, getDomainCourseSlugs } from "@/lib/content/courses";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo/json-ld";
import JsonLd from "@/components/seo/json-ld";
import DomainHero from "@/components/sections/domain/domain-hero-banner";
import DomainAbout from "@/components/sections/domain/domain-about";

export const revalidate = 3600;

function pathFor(slug) {
  return `/corporate-training/domain/${slug}`;
}

export async function generateStaticParams() {
  const slugs = await getDomainCourseSlugs();
  return slugs.map((courseSlug) => ({ courseSlug }));
}

export async function generateMetadata({ params }) {
  const { courseSlug } = await params;
  const course = await getDomainCourse(courseSlug);
  if (!course) return {};

  return buildMetadata({
    title: course.seo.title,
    description: course.seo.description,
    path: pathFor(courseSlug),
    image: course.seo.ogImage,
  });
}

export default async function DomainCoursePage({ params }) {
  const { courseSlug } = await params;
  const course = await getDomainCourse(courseSlug);

  if (!course) notFound();

  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({
            name: course.name,
            description: course.seo.description,
            path: pathFor(courseSlug),
          }),
          breadcrumbJsonLd(course.breadcrumbs),
        ]}
      />

      <DomainHero
        hero={course.hero}
        breadcrumbs={course.breadcrumbs}
        proof={course.proof}
      />
      <DomainAbout about={course.about} />
    </>
  );
}
