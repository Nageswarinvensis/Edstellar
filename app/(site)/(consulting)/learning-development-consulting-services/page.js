import { notFound } from "next/navigation";

import { getSitePage } from "@/lib/content/site-pages";
import { buildMetadata } from "@/lib/seo/metadata";

import ConsultingHero from "@/components/sections/consulting/consulting-hero";
import ProofStats from "@/components/sections/consulting/proof-stats";
import ClientLogos from "@/components/common/client-logos";
import StickyTabs from "@/components/sections/domain/sticky-navbar";
import WhyLandD from "@/components/sections/learning_development_consulting/whylandd";
import Maturity from "@/components/sections/learning_development_consulting/maturity";
import LandDCTA from "@/components/sections/learning_development_consulting/ldcta";
import Methodology from "@/components/sections/learning_development_consulting/methodology";
import Transform from "@/components/sections/learning_development_consulting/transform";
import LdServices from "@/components/sections/learning_development_consulting/ld-services";
import Engagements from "@/components/sections/learning_development_consulting/engagements";
import WhyUs from "@/components/sections/consulting/why-us";
import CtaBand from "@/components/sections/consulting/cta-band";
import RelatedServices from "@/components/sections/consulting/related-services";
import Faq from "@/components/common/faq";
import LeadForm from "@/components/forms/lead-form";
import StickyFooter from "@/components/common/sticky-footer";

import heroData from "@/content/learning_development_consulting/LD_Consulting.json";

export const revalidate = 3600;

const CMS_SLUG = "learning-development-consulting-services";

export async function generateMetadata() {
  const cms = await getSitePage(CMS_SLUG);
  if (!cms) return {};
  const { seo } = cms;

  // The CMS title carries the brand suffix the root layout's title template
  // already adds — stripped so it does not render twice.
  const title = seo?.meta_title?.replace(/\s*\|\s*Edstellar\s*$/i, "").trim();

  return buildMetadata({
    title,
    description: seo?.Meta_description,
    path: "/learning-development-consulting-services",
    image: seo?.og_image_url,
  });
}

// Lead-form copy the CMS `leadForm` component does not carry. Anything the
// CMS does send wins over these.
const LEAD_FORM_COPY = {
  requirements_label: "Your requirements",
  requirements_placeholder:
    "Tell us about your team: size, roles in scope, timing, and the outcomes you are trying to move.",
  thanks_heading: "Request received.",
  thanks_body:
    "Thanks. A specialist will reply within one business day with a scoped response.",
};

export default async function LDConsultingPage() {
  const cms = await getSitePage(CMS_SLUG);
  if (!cms) notFound();

  return (
    <>
      <ConsultingHero
        data={cms.tnaHero}
        breadcrumbItems={cms.breadcrumbs?.items}
        customWeight="font-normal"
        customColor="text-ink-muted"
      />
      <ProofStats data={cms.generalProof} />
      <ClientLogos />
      <StickyTabs data={cms.stickyNavbar} />
      <WhyLandD data={heroData.WhyLandDData} />
      <Maturity data={heroData.maturityData}/>
      <LandDCTA data={heroData.landdctaData}/>
      <Methodology data={heroData.methodologyData}/>
      <Transform data={heroData.transformData}/>
      <RelatedServices data={heroData.relatedData}/>
      <LdServices data={heroData.ldServicesData}/>
      <Engagements data={heroData.engagementsData}/>
      <WhyUs data={heroData.whyEdstellarData} />
      <CtaBand data={heroData.whyCtaData} />
      <RelatedServices
        id="capability-consulting"
        bgColor="bg-paper-warm"
        data={cms.relatedServices}
      />
      <Faq
        id="faq"
        faqs={cms.faqs}
        innerClassName="max-w-[920px] mx-auto"
        headingClassName="mx-auto text-center"
        showCta={false}
      />
      <LeadForm
        id="contact"
        background="navy"
        data={{ ...LEAD_FORM_COPY, ...cms.leadForm }}
      />
      <StickyFooter data={{ ...cms.stickyFooter, email: "hello@edstellar.com" }} />
    </>
  );
}
