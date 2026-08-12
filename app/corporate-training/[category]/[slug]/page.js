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
<<<<<<< HEAD
import Lifecycle from "@/components/sections/course/lifecycle";
import Skills from "@/components/sections/course/skills";
import Outcomes from "@/components/sections/course/outcomes";
import Curriculum from "@/components/sections/course/curriculum";
import Audience from "@/components/sections/course/audience";
import DeliveryModes from "@/components/sections/course/delivery-modes";
import QuoteRail from "@/components/sections/course/quote-rail";
import Trainers from "@/components/sections/course/trainers";
=======
import MapSection from "@/components/sections/course/mapsection";
>>>>>>> be8e438db064019fc64bcea7c85436d20331f6d6
import Certificate from "@/components/sections/course/certificate";
import Faq from "@/components/sections/course/faq";
import CustomizedTraining from "@/components/sections/course/customizedTraining";
import StickyFooter from "@/components/sections/course/sticky-footer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
<<<<<<< HEAD
      <Lifecycle lifecycle={course.lifecycle} />
      <QuoteRail>
        <Skills skills={course.skills} />
        <Outcomes outcomes={course.outcomes} />
        <Curriculum curriculum={course.curriculum} />
        <Audience audience={course.audience} />
        <DeliveryModes deliveryModes={course.deliveryModes} />
      </QuoteRail>
      <Trainers trainers={course.trainers} />
=======
      <MapSection data={course.mapsectionData} />
>>>>>>> be8e438db064019fc64bcea7c85436d20331f6d6
      <Certificate certificate={course.certificate} />
      <Faq faqs={course.faqs} />
      <CustomizedTraining data={course.customizedTraining} />
      <StickyFooter data={course.stickyFooter} />
    </>
  );
}
