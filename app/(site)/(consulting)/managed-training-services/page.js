import { notFound } from "next/navigation";

import { getSitePage } from "@/lib/content/site-pages";
import { buildMetadata } from "@/lib/seo/metadata";

import ConsultingHero from "@/components/sections/consulting/consulting-hero";
import ProofStats from "@/components/sections/consulting/proof-stats";
import ClientLogos from "@/components/common/client-logos";
import StickyTabs from "@/components/sections/domain/sticky-navbar";
import Managed from "@/components/sections/managed_training_services/managed";
import StageSteps from "@/components/sections/consulting/stage-steps";
import { SCOPE_SCREENS } from "@/components/sections/managed_training_services/scope-screens";
import EngModules from "@/components/sections/managed_training_services/eng-module";
import Methodology from "@/components/sections/learning_development_consulting/methodology";
import WhyUs from "@/components/sections/consulting/why-us";
import CtaBand from "@/components/sections/consulting/cta-band";
import Faq from "@/components/common/faq";
import RelatedServices from "@/components/sections/consulting/related-services";
import LeadForm from "@/components/forms/lead-form";
import StickyFooter from "@/components/common/sticky-footer";

export const revalidate = 3600;

const CMS_SLUG = "managed-training-services";

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
    path: "/managed-training-services",
    image: seo?.og_image_url,
  });
}

/**
 * Managed training services. The CMS (`site-pages/managed-training-services`)
 * owns the frame — SEO, hero copy, breadcrumbs, proof bar, sticky nav, FAQ,
 * related services, why-us, the lead form and the sticky footer, and the
 * page's own sections. Only section anchors and lead-form labels are set here.
 */
export default async function ManagedTrainingServicesPage() {
  const cms = await getSitePage(CMS_SLUG);
  if (!cms) notFound();

  return (
    <>
      <ConsultingHero
        data={cms.consulting_Hero}
        breadcrumbItems={cms.breadcrumbs?.items}
      />
      <ProofStats data={cms.generalProof} />
      <ClientLogos />
      <StickyTabs data={cms.stickyNavbar} />
      <Managed data={{ ...cms.managed_Data, section_id: "in-house-managed" }} />
      <StageSteps
        id="what-we-manage"
        data={cms.managed_screens_data}
        screens={SCOPE_SCREENS}
        variant="scope"
      />
      <EngModules data={{ ...cms.managed_eng_data, section_id: "engagement" }} />
      <Methodology data={{ ...cms.methodology, section_id: "transition" }} />
      <WhyUs id="why-us" data={cms.ld_why_edstellar} />
      <CtaBand data={cms.why_cta_banner} />
      <Faq
        id="faq"
        faqs={cms.faqs}
        innerClassName="max-w-[920px] mx-auto"
        headingClassName="mx-auto text-center"
        showCta={false}
      />
      <RelatedServices id="related" data={cms.relatedServices} />
      <LeadForm
        id="apply"
        background="navy"
        data={{ ...LEAD_FORM_COPY, ...cms.leadForm }}
      />
      <StickyFooter data={{ ...cms.stickyFooter, email: true }} />
    </>
  );
}
