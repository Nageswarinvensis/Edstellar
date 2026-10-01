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
import LdChallenge from "@/components/sections/learning_development_consulting/ld-challenge";
import Readiness from "@/components/sections/consulting/readiness";
import LdOffering from "@/components/sections/learning_development_consulting/ld-offering";
import LdFormats from "@/components/sections/learning_development_consulting/ld-formats";
import LdSoftCta from "@/components/common/ld-soft-cta";
import LdPlatforms from "@/components/sections/learning_development_consulting/ld-platforms";
import Methodology from "@/components/sections/learning_development_consulting/methodology";
import LdBlueprint from "@/components/sections/learning_development_consulting/ld-blueprint";
import LdFrameworks from "@/components/sections/learning_development_consulting/ld-frameworks";
import WhyUs from "@/components/sections/consulting/why-us";
import CtaBand from "@/components/sections/consulting/cta-band";
import Faq from "@/components/common/faq";
import RelatedServices from "@/components/sections/consulting/related-services";
import LeadForm from "@/components/forms/lead-form";
import StickyFooter from "@/components/common/sticky-footer";

const PILLAR = "learning-development-consulting-services";

/**
 * Section order for the sub-pages served entirely from the CMS (the design's
 * order — the CMS `sort_order` does not match it). A section the CMS does not
 * send is skipped. Pages with a local file carry their own `sections`.
 */
const CMS_PAGE_SECTIONS = {
  "learning-strategy-design-consulting": [
    "challengeData",
    "offeringData",
    "readinessData",
    "blueprintData",
    "methodData",
    "whyEdstellarData",
    "whyCtaData",
    "faqData",
    "relatedData",
  ],
};

/**
 * The middle of every L&D sub-page, by record key. Each record's `sections`
 * lists which of these it carries and in what order (TASTE.md §6.3); a
 * section whose data is absent renders nothing.
 */
const SECTIONS = {
  challengeData: (data) => (
    <LdChallenge data={data && { ...data, section_id: data.section_id ?? "challenge" }} />
  ),
  readinessData: (data) => (
    <Readiness id={data?.section_id ?? "readiness"} data={data} />
  ),
  offeringData: (data) => (
    <LdOffering data={data && { ...data, section_id: data.section_id ?? "offering" }} />
  ),
  formatsData: (data) => <LdFormats data={data} />,
  blueprintCtaData: (data) => <LdSoftCta data={data} />,
  platformsData: (data) => <LdPlatforms data={data} />,
  blueprintData: (data) => (
    <LdBlueprint data={data && { ...data, section_id: data.section_id ?? "blueprint" }} />
  ),
  methodData: (data) => <Methodology data={data} />,
  frameworksData: (data) => (
    <LdFrameworks data={data && { ...data, section_id: data.section_id ?? "frameworks" }} />
  ),
  whyEdstellarData: (data) => (
    <WhyUs id={data?.section_id ?? "why-us"} data={data} />
  ),
  whyCtaData: (data) => <CtaBand data={data} />,
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
    <RelatedServices id={data?.sectionId ?? "related"} data={data} />
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

export default async function LearningDevelopmentServicePage({ params }) {
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

      {(service.sections ?? CMS_PAGE_SECTIONS[slug])?.map((key) => {
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
