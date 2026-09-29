import ConsultingHero from "@/components/sections/consulting/consulting-hero";
import ProofStats from "@/components/sections/consulting/proof-stats";
import ClientLogos from "@/components/common/client-logos";
import StickyTabs from "@/components/sections/domain/sticky-navbar";
import Managed from "@/components/sections/managed_training_services/managed";
import StageSteps from "@/components/sections/consulting/stage-steps";
import { SCOPE_SCREENS } from "@/components/sections/managed_training_services/scope-screens";
import EngModules from "@/components/sections/managed_training_services/eng-module";
import Method from "@/components/sections/consulting/method";
import WhyUs from "@/components/sections/consulting/why-us";
import CtaBand from "@/components/sections/consulting/cta-band";
import Faq from "@/components/common/faq";
import RelatedServices from "@/components/sections/consulting/related-services";
import LeadForm from "@/components/forms/lead-form";
import StickyFooter from "@/components/common/sticky-footer";

import pageData from "@/content/managed-training-services/managed-training-services.json";

export default function ServicePage({ data }) {
  return (
    <>
      <ConsultingHero data={pageData.heroData} breadcrumbItems={pageData.BreadcrumbData} />
      <ProofStats data={pageData.proof} />
      <ClientLogos data={pageData.ClientsLogosData} />
      <StickyTabs data={pageData.stickyNavbarData} />
      <Managed data={pageData.managedData}/>
      <StageSteps
        id="what-we-manage"
        data={pageData.stepsData}
        screens={SCOPE_SCREENS}
        variant="scope"
      />
      <EngModules data={pageData.engModulesData}/>
      <Method data={pageData.methodData}/>
      <WhyUs data={pageData.whyEdstellarData} />
      <CtaBand data={pageData.whyCtaData} />
      
      <Faq
        id="faq"
        faqs={pageData.faqData}
        innerClassName="max-w-[920px] mx-auto"
        headingClassName="mx-auto text-center"
        showCta={false}
      />
      <RelatedServices data={pageData.relatedData} />
      <LeadForm id="contact" background="navy" data={pageData.leadFormData} />
      <StickyFooter data={pageData.stickyFooter} />
    </>
  );
}