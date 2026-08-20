import { notFound } from "next/navigation";

import { getCategoryCourse } from "@/lib/content/courses";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, courseJsonLd } from "@/lib/seo/json-ld";
import JsonLd from "@/components/seo/json-ld";
import CategoryHero from "@/components/sections/course/course-hero";
import CategoryInfo from "@/components/sections/course/courseInfo";
import ClientLogos from "@/components/sections/course/client-logo";
import CategoryAbout from "@/components/sections/course/course-about";
import Skills from "@/components/sections/course/skills";
import Curriculum from "@/components/sections/course/curriculum";
import Audience from "@/components/sections/course/audience";
import DeliveryModes from "@/components/sections/course/delivery-modes";
import PageToc from "@/components/sections/course/page-toc";
import GroupQuote from "@/components/sections/course/group-quote";
import Testimonials from "@/components/sections/course/testimonials";
import MapSection from "@/components/sections/course/mapsection";
import SlideSection from "@/components/sections/course/SlideSection";
import Trainers from "@/components/sections/course/trainers";
import Certificate from "@/components/sections/course/certificate";
import WhyEds from "@/components/sections/course/whyEds";
import Faq from "@/components/sections/course/faq";
import LeadForm from "@/components/sections/course/lead-form";
import StickyFooter from "@/components/sections/course/sticky-footer";

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
      <CategoryAbout
        about={course.about}
        customizedTraining={course.customizedTraining}
      />

      <PageToc toc={course.pageToc} modules={course.curriculum?.modules}>
        <Skills skills={course.skills} />
        <Curriculum curriculum={course.curriculum} />
        <Audience audience={course.audience} />
        <Certificate certificate={course.certificate} />
        <DeliveryModes deliveryModes={course.deliveryModes} />
        <Trainers trainers={course.trainers} />
        <Faq faqs={course.faqs} />
        <Testimonials testimonials={course.testimonials} />
        <SlideSection data={course.SlideData} />
      </PageToc>

      <WhyEds data={course.WhyEds} />

      <MapSection data={course.mapsectionData} />
      <GroupQuote data={course.groupQuote} />

      <LeadForm data={course.leadForm} />
      <StickyFooter data={course.stickyFooter} />
    </>
  );
}
