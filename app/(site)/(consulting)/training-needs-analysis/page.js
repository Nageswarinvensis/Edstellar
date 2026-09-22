import { buildMetadata } from "@/lib/seo/metadata";
import TNAHero from "@/components/sections/training needs analysis/tnahero";
import DomainInfo from "@/components/sections/domain/domain-info";
import ClientLogos from "@/components/common/client-logos";
import StickyTabs from "@/components/sections/domain/sticky-navbar";
import CtaTrainer from "@/components/sections/trainers details/ctatrainer";
import TnaEngine from "@/components/sections/training needs analysis/tnaengine";
import Benefits from "@/components/sections/training needs analysis/tnabenifits";
import TnaProcess from "@/components/sections/training needs analysis/tnaprocess";
import TnaSteps from "@/components/sections/training needs analysis/tnasteps";
import TnaDeliverable from "@/components/sections/training needs analysis/tnadeliverable";
import TnaWhyEdstellar from "@/components/sections/training needs analysis/tnawhyedstellar";
import Outcome from "@/components/sections/domain/outcome";
import RelatedCategories from "@/components/sections/domain/related-categories";
import Faq from "@/components/common/faq";
import LeadForm from "@/components/forms/lead-form";

import heroData from "@/content/training needs analysis/TNA.json";

export const metadata = buildMetadata({
  title: "Training Needs Analysis Services",
  description:
    "Edstellar's training needs analysis finds the skill gaps that hold teams back, ranks them by business impact, and delivers a roadmap you can defend to finance.",
  path: "/training-needs-analysis",
});

export default function TrainingNeedsAnalysisPage() {
  return (
    <>
      <TNAHero
        data={heroData.trainingNeedsAnalysis}
        breadcrumbItems={heroData.BreadcrumbData}
      />
      <DomainInfo proof={heroData.proof} />
      <ClientLogos data={heroData.ClientsLogosData} />
      <StickyTabs data={heroData.stickyNavbarData} />
      <CtaTrainer data={heroData.ctaTrainerData} />
      <TnaEngine data={heroData.tnaEngineData} />
      <Benefits data={heroData.benefitsData} />
      <TnaProcess data={heroData.processData} />
      <TnaSteps data={heroData.stepsData} />
      <TnaDeliverable data={heroData.tnadeliverableData} />
      <TnaWhyEdstellar data={heroData.whyEdstellarData} />
      <Outcome id="when" columns={3} data={heroData.whenData} />
      <Outcome id="integrations" columns={4} data={heroData.integrationsData} />
      <RelatedCategories id="related" data={heroData.relatedData} />
      <Faq id="faq" showCta={false} faqs={heroData.faqData} />
      <LeadForm id="contact" background="navy" data={heroData.leadFormData} />
    </>
  );
}
