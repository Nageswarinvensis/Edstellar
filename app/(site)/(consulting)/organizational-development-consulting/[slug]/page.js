import { Fragment } from "react";
import { notFound } from "next/navigation";

import {
  getConsultingService,
  getConsultingServiceSlugs,
} from "@/lib/content/consulting";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/seo/json-ld";
import JsonLd from "@/components/seo/json-ld";
import ConsultingHero from "@/components/sections/consulting/consulting-hero";
import ProofStats from "@/components/sections/consulting/proof-stats";
import ClientLogos from "@/components/common/client-logos";
import StickyTabs from "@/components/sections/domain/sticky-navbar";
import ChallengeGrid from "@/components/sections/organizational_development_consulting/challenge-grid";
import ShiftSection from "@/components/sections/organizational_development_consulting/shift-section";
import WhatWeDeliver from "@/components/sections/organizational_development_consulting/what-we-deliver";
import Methodology from "@/components/sections/learning_development_consulting/methodology";
import ChangeFrameworks from "@/components/sections/organizational_development_consulting/change-frameworks";
import WhyUs from "@/components/sections/consulting/why-us";
import Readiness from "@/components/sections/consulting/readiness";
import ChangeCtaStrip from "@/components/sections/organizational_development_consulting/change-cta-strip";
import Faq from "@/components/common/faq";
import ChangeRelatedSlider from "@/components/sections/organizational_development_consulting/change-related-slider";
import LeadForm from "@/components/forms/lead-form";
import StickyFooter from "@/components/common/sticky-footer";

const PILLAR = "organizational-development-consulting";

/**
 * The middle of every OD sub-page, by record key. Each record's `sections`
 * lists which of these it carries and in what order (TASTE.md §6.3); a section
 * whose data is absent renders nothing. OD has no CMS page yet, so the record
 * is served from a local file alone (see `lib/content/consulting.js`).
 */
const SECTIONS = {
  challengeData: (data) => (
    <ChallengeGrid data={data && { ...data, section_id: data.section_id ?? "challenge" }} />
  ),
  changeJourneyData: (data) => <ShiftSection data={data} />,
  cultureShiftData: (data) => <ShiftSection data={data} />,
  representationData: (data) => <ShiftSection data={data} />,
  whatWeDeliverData: (data) => <WhatWeDeliver data={data} />,
  methodData: (data) => <Methodology data={data} />,
  frameworksData: (data) => (
    <ChangeFrameworks data={data && { ...data, section_id: data.section_id ?? "frameworks" }} />
  ),
  whyEdstellarData: (data) => (
    <WhyUs id={data?.section_id ?? "why"} data={data} />
  ),
  readinessData: (data) => (
    <Readiness id={data?.section_id ?? "readiness"} data={data} />
  ),
  whyCtaData: (data) => <ChangeCtaStrip data={data} />,
  faqData: (data) => (
    <Faq
      id="faq"
      faqs={data}
      innerClassName="max-w-[920px] mx-auto"
      headingClassName="mx-auto text-center"
      showCta={false}
    />
  ),
  relatedData: (data) => (
    <ChangeRelatedSlider id={data?.sectionId ?? "related"} data={data} />
  ),
};

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getConsultingServiceSlugs(PILLAR);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = await getConsultingService(PILLAR, slug);
  if (!service) return {};

  return buildMetadata({
    title: service.seo.title,
    description: service.seo.description,
    path: `/${PILLAR}/${slug}`,
    image: service.seo.image,
  });
}

export default async function OrganizationalDevelopmentServicePage({ params }) {
  const { slug } = await params;

  // Both segments — a sub-service only exists under its own pillar.
  const service = await getConsultingService(PILLAR, slug);
  if (!service) notFound();

  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({
            name: service.name,
            description: service.seo.description,
            path: `/${PILLAR}/${slug}`,
            serviceType: service.name,
          }),
          breadcrumbJsonLd(service.BreadcrumbData),
          faqJsonLd(service.faqData?.items),
        ]}
      />
      <ConsultingHero
        data={service.heroData}
        breadcrumbItems={service.BreadcrumbData}
      />
      <ProofStats data={service.proof} />
      <ClientLogos />
      <StickyTabs data={service.stickyNavbarData} />

      {service.sections?.map((key) => {
        const render = SECTIONS[key];
        return render ? (
          <Fragment key={key}>{render(service[key])}</Fragment>
        ) : null;
      })}

      <LeadForm id="apply" background="navy" data={service.leadFormData} />
      <StickyFooter
        data={service.stickyFooter && { ...service.stickyFooter, email: true }}
      />
    </>
  );
}
