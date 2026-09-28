import TNAHero from "@/components/sections/training_needs_analysis/tnahero";
import LearningStats from "@/components/sections/learning_development_consulting/learningstats";
import ClientLogos from "@/components/common/client-logos";
import StickyTabs from "@/components/sections/domain/sticky-navbar";
import Managed from "@/components/sections/managed_training_services/managed";
import TnaSteps from "@/components/sections/training_needs_analysis/tnasteps";
import EngModules from "@/components/sections/managed_training_services/eng-module";
import LdMethod from "@/components/sections/learning_development_consulting/ld-method";
import LdWhy from "@/components/sections/learning_development_consulting/ld-why";
import LdCtaBand from "@/components/sections/learning_development_consulting/ld-cta-band";
import Faq from "@/components/common/faq";
import TnaRelated from "@/components/sections/training_needs_analysis/tnarelated";
import LeadForm from "@/components/forms/lead-form";
import StickyFooter from "@/components/common/sticky-footer";

import pageData from "@/content/managed-training-services/managed-training-services.json";

export default function ServicePage({ data }) {
  return (
    <>
      <TNAHero data={pageData.heroData} breadcrumbItems={pageData.BreadcrumbData} />
      <LearningStats data={pageData.proof} />
      <ClientLogos data={pageData.ClientsLogosData} />
      <StickyTabs data={pageData.stickyNavbarData} />
      <Managed data={pageData.managedData}/>
      <TnaSteps data={pageData.stepsData}/>
      <EngModules data={pageData.engModulesData}/>
      <LdMethod data={pageData.methodData}/>
      <LdWhy data={pageData.whyEdstellarData} />
      <LdCtaBand data={pageData.whyCtaData} />
      
      <Faq
        id="faq"
        faqs={pageData.faqData}
        innerClassName="max-w-[920px] mx-auto"
        headingClassName="mx-auto text-center"
        showCta={false}
      />
      <TnaRelated data={pageData.relatedData} />
      <LeadForm id="contact" background="navy" data={pageData.leadFormData} />
      <StickyFooter data={pageData.stickyFooter} />
    </>
  );
}