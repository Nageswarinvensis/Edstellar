import { Fragment } from "react";
import { notFound } from "next/navigation";

import {
  getTalentAssessmentService,
  getTalentAssessmentServiceSlugs,
} from "@/lib/content/talent-assessment";
import { buildMetadata } from "@/lib/seo/metadata";
import { serviceJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo/json-ld";
import JsonLd from "@/components/seo/json-ld";

import ConsultingHero from "@/components/sections/consulting/consulting-hero";
import ProofStats from "@/components/sections/consulting/proof-stats";
import ClientLogos from "@/components/common/client-logos";
import StickyTabs from "@/components/sections/domain/sticky-navbar";
import Readiness from "@/components/sections/consulting/readiness";
import WhyUs from "@/components/sections/consulting/why-us";
import Faq from "@/components/common/faq";
import LeadForm from "@/components/forms/lead-form";
import StickyFooter from "@/components/common/sticky-footer";

import Concept from "@/components/sections/talent_assessment_services/concept";
import Benefits from "@/components/sections/talent_assessment_services/benefits";
import Instruments from "@/components/sections/talent_assessment_services/instruments";
import Inside from "@/components/sections/talent_assessment_services/inside";
import Services from "@/components/sections/talent_assessment_services/services";
import Process from "@/components/sections/talent_assessment_services/process";
import Methodology from "@/components/sections/learning_development_consulting/methodology";
import Outputs from "@/components/sections/talent_assessment_services/outputs";
import RelatedAssessments from "@/components/sections/talent_assessment_services/related-assessments";
import Suite from "@/components/sections/talent_assessment_services/suite";
import ToolSpotlight from "@/components/sections/talent_assessment_services/tool-spotlight";

const PILLAR = "talent-assessment-services";

/**
 * The middle of every talent-assessment sub-page, by record key. Each record's
 * `sections` lists which of these it carries and in what order (TASTE.md §6.3);
 * a section whose data is absent renders nothing. The frame (hero, proof, logos,
 * sticky nav above; lead form and sticky footer below) is written out in the
 * page, exactly as the OD sub-page route does.
 */
const SECTIONS = {
  concept: (data) => <Concept data={data} />,
  benefits: (data) => <Benefits data={data} />,
  instruments: (data) => <Instruments data={data} />,
  inside: (data) => <Inside data={data} />,
  readiness: (data) => <Readiness id="readiness" data={data} />,
  services: (data) => <Services data={data} />,
  suite: (data) => <Suite data={data} />,
  // One Edstellar tool (e.g. Polaris); only pages whose CMS sends it.
  tool: (data) => <ToolSpotlight data={data} />,
  process: (data) => <Process data={data} />,
  // Shared L&D methodology section (TASTE.md §6.1), driven by the CMS
  // `methodology` component. Takes the "process" slot/anchor on CMS-backed
  // sub-pages; its steps may carry `chips`, shown only when present.
  methodology: (data) => (
    <Methodology
      data={
        data && {
          ...data,
          section_id: data.section_id ?? "process",
          showSoftCta: data.showSoftCta ?? false,
        }
      }
    />
  ),
  outputs: (data) => <Outputs data={data} />,
  why: (data) => <WhyUs id="why" data={data} />,
  related: (data) => <RelatedAssessments data={data} />,
  faqs: (data) => (
    <Faq
      id="faq"
      faqs={data}
      innerClassName="max-w-[920px] mx-auto"
      headingClassName="mx-auto text-center"
      showCta={false}
    />
  ),
};

// The section order for every sub-page (all are CMS-served; a record could
// still override it with its own `sections`). `methodology` (shared L&D
// section) takes the "process" slot/anchor.
const DEFAULT_SECTIONS = [
  "concept",
  "benefits",
  "instruments",
  "inside",
  "readiness",
  "services",
  "suite",
  "tool",
  "methodology",
  "outputs",
  "why",
  "related",
  "faqs",
];

// SSG: every sub-page is prerendered at build from `generateStaticParams`, and
// `dynamicParams = false` makes any slug not in that list a 404 instead of being
// rendered on demand. The CMS is read once at build, so nothing revalidates.
export const dynamicParams = false;
export const revalidate = 30;

export async function generateStaticParams() {
  const slugs = await getTalentAssessmentServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = await getTalentAssessmentService(slug);
  if (!service) return {};

  return buildMetadata({
    title: service.seo.title,
    description: service.seo.description,
    path: `/${PILLAR}/${slug}`,
    image: service.seo.image,
  });
}

export default async function TalentAssessmentServicePage({ params }) {
  const { slug } = await params;

  const service = await getTalentAssessmentService(slug);
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
          breadcrumbJsonLd(service.breadcrumbs),
          faqJsonLd(service.faqs?.items),
        ]}
      />

      <ConsultingHero data={service.hero} breadcrumbItems={service.breadcrumbs} />
      <ProofStats data={service.proof} />
      <ClientLogos />
      <StickyTabs data={service.sticky_nav} />

      {(service.sections ?? DEFAULT_SECTIONS).map((key) => {
        const render = SECTIONS[key];
        return render ? <Fragment key={key}>{render(service[key])}</Fragment> : null;
      })}

      <LeadForm id="apply" background="navy" data={service.lead_form} />
      <StickyFooter data={service.sticky_footer} />
    </>
  );
}
