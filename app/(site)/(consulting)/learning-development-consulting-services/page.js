import { buildMetadata } from "@/lib/seo/metadata";

import TNAHero from "@/components/sections/training_needs_analysis/tnahero";
import LearningStats from "@/components/sections/learning_development_consulting/learningstats";
import ClientLogos from "@/components/common/client-logos";
import StickyTabs from "@/components/sections/domain/sticky-navbar";
import WhyLandD from "@/components/sections/learning_development_consulting/whylandd";
import Maturity from "@/components/sections/learning_development_consulting/maturity";
import LandDCTA from "@/components/sections/learning_development_consulting/ldcta";
import Methodology from "@/components/sections/learning_development_consulting/methodology";
import Transform from "@/components/sections/learning_development_consulting/transform";
import TnaRelated from "@/components/sections/training_needs_analysis/tnarelated";
import Engagements from "@/components/sections/learning_development_consulting/engagements";
import TnaWhyEdstellar from "@/components/sections/training_needs_analysis/tnawhyedstellar";
import Faq from "@/components/common/faq";
import LeadForm from "@/components/forms/lead-form";
import StickyFooter from "@/components/common/sticky-footer";

import heroData from "@/content/learning_development_consulting/LD_Consulting.json";

export const metadata = buildMetadata({
  title: "Learning and Development Consulting",
  description: "Design a learning strategy your organization can actually run — capability mapping, program architecture and measurement.",
  path: "/learning-development-consulting-services",
});

export default function LDConsultingPage() {
  return (
    <>
      <TNAHero data={heroData.ldheroData} breadcrumbItems={heroData.BreadcrumbData} />
      <LearningStats data={heroData.proof} />
      <ClientLogos data={heroData.clientsLogosData}/>
      <StickyTabs data={heroData.stickyNavbarData} />
      <WhyLandD data={heroData.WhyLandDData} />
      <Maturity data={heroData.maturityData}/>
      <LandDCTA data={heroData.landdctaData}/>
      <Methodology data={heroData.methodologyData}/>
      <Transform data={heroData.transformData}/>
      <TnaRelated data={heroData.relatedData}/>
      <Engagements data={heroData.engagementsData}/>
      <TnaWhyEdstellar data={heroData.whyEdstellarData}/>
      <TnaRelated data={heroData.capabiltyData}/>
      <Faq
        id="faq"
        faqs={heroData.faqData}
        innerClassName="max-w-[920px] mx-auto"
        headingClassName="mx-auto text-center"
        showCta={false}
      />
      <LeadForm id="contact" background="navy" data={heroData.leadFormData} />
      <StickyFooter data={heroData.stickyFooter} />
    </>
  );
}
