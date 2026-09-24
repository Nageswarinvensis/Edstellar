import TNAHero from "@/components/sections/training_needs_analysis/tnahero";
import LearningStats from "@/components/sections/learning_development_consulting/learningstats";
import ClientLogos from "@/components/common/client-logos";
import StickyTabs from "@/components/sections/domain/sticky-navbar";
import LdChallenge from "@/components/sections/learning_development_consulting/ld-challenge";
import LdReadiness from "@/components/sections/learning_development_consulting/ld-readiness";
import LdOffering from "@/components/sections/learning_development_consulting/ld-offering";
import LdBlueprint from "@/components/sections/learning_development_consulting/ld-blueprint";
import LdMethod from "@/components/sections/learning_development_consulting/ld-method";
import TnaWhyEdstellar from "@/components/sections/training_needs_analysis/tnawhyedstellar";
import TnaRelated from "@/components/sections/training_needs_analysis/tnarelated";
import Faq from "@/components/common/faq";
import LeadForm from "@/components/forms/lead-form";
import StickyFooter from "@/components/common/sticky-footer";

/**
 * Consulting sub-service page — e.g. `/learning-development-consulting-services/learning-strategy`.
 *
 * Composition only: one record from `getConsultingService`, handed to the
 * sections in design order. Hero, proof strip, logos, sticky nav, why-us,
 * related, FAQ and lead form are the same sections the L&D and TNA pillar
 * pages use; challenge, readiness, offering, blueprint and method are this
 * design's own.
 *
 * Design: `learning-strategy-design final 23sep.html`.
 */
export default function ServicePage({ data }) {
  return (
    <>
      <TNAHero data={data.heroData} breadcrumbItems={data.BreadcrumbData} />
      <LearningStats data={data.proof} />
      <ClientLogos data={data.ClientsLogosData} />
      <StickyTabs data={data.stickyNavbarData} />
      <LdChallenge data={data.challengeData} />
      <LdReadiness data={data.readinessData} />
      <LdOffering data={data.offeringData} />
      <LdBlueprint data={data.blueprintData} />
      <LdMethod data={data.methodData} />
      <TnaWhyEdstellar data={data.whyEdstellarData} />
      <TnaRelated data={data.relatedData} />
      <Faq
        id="faq"
        faqs={data.faqData}
        innerClassName="max-w-[920px] mx-auto"
        headingClassName="mx-auto text-center"
        showCta={false}
      />
      <LeadForm id="contact" background="navy" data={data.leadFormData} />
      <StickyFooter data={data.stickyFooter} />
    </>
  );
}
