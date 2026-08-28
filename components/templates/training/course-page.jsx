import Hero from "@/components/sections/shared/hero";
import HeroInfo from "@/components/sections/shared/hero-info";
import ClientLogos from "@/components/sections/shared/client-logos";
import About from "@/components/sections/shared/about";
import Trainers from "@/components/sections/shared/trainers";
import Faq from "@/components/sections/shared/faq";
import MapSection from "@/components/sections/shared/map-section";
import StickyFooter from "@/components/sections/shared/sticky-footer";

import PageToc from "@/components/sections/course/page-toc";
import Curriculum from "@/components/sections/course/curriculum";
import Skills from "@/components/sections/course/skills";
import Audience from "@/components/sections/course/audience";
import Certificate from "@/components/sections/course/certificate";
import DeliveryModes from "@/components/sections/course/delivery-modes";

import WhyEdstellar from "@/components/sections/course/why-edstellar";

import GroupQuote from "@/components/forms/group-quote";
import LeadForm from "@/components/forms/lead-form";

/**
 * Course page design.
 *
 * A template composes sections and nothing else — no fetching, no data
 * shaping, no `"use client"` (TASTE.md §6.3). Keys below are the CMS's own
 * component slugs, unchanged, because the CMS shape *is* the view model.
 *
 * `SlideSection` is deliberately absent: the CMS models that content as
 * `Testimonials`, and rendering both would put the same quotes on the page
 * twice. The component is kept in `sections/course/` — it is the alternative
 * visual treatment of the same data, and which one ships is a design call.
 */
export default function CoursePage({ course }) {
  return (
    <>
      <Hero hero={course.hero} breadcrumbs={course.breadcrumbs?.items} />
      <HeroInfo topics={course.hero?.topics} proof={course.proof} />
      <ClientLogos data={course.ClientsLogosData} />
      <About about={course.about} />

      <PageToc toc={course.pageToc} modules={course.curriculum?.modules}>
        <Curriculum curriculum={course.curriculum} />
        <Skills skills={course.skills} />
        <Audience audience={course.audience} />
        <Certificate certificate={course.certificate} />
        <DeliveryModes deliveryModes={course.deliveryModes} />
        <Trainers trainers={course.trainers} />
        <Faq faqs={course.faqs} />
      </PageToc>

      <WhyEdstellar data={course.WhyEds} />
      <MapSection data={course.mapsectionData} />
      <GroupQuote />
      <LeadForm data={course.leadForm} />
      <StickyFooter data={course.stickyFooter} />
    </>
  );
}

/** Workload for the `Course` JSON-LD the route emits. */
export function courseWorkload(course) {
  const stat = course.proof?.stats?.find((item) => item.label === "Hours");
  return stat ? `${stat.value} hours` : undefined;
}
