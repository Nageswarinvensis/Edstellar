import TNAHero from "@/components/sections/training_needs_analysis/tnahero";
import LearningStats from "@/components/sections/learning_development_consulting/learningstats";
import ClientLogos from "@/components/common/client-logos";
import StickyTabs from "@/components/sections/domain/sticky-navbar";
import LdChallenge from "@/components/sections/learning_development_consulting/ld-challenge";
import LdReadiness from "@/components/sections/learning_development_consulting/ld-readiness";
import LdOffering from "@/components/sections/learning_development_consulting/ld-offering";
import LdBlueprint from "@/components/sections/learning_development_consulting/ld-blueprint";
import LdMethod from "@/components/sections/learning_development_consulting/ld-method";
import LdSoftCta from "@/components/sections/learning_development_consulting/ld-soft-cta";
import LdWhy from "@/components/sections/learning_development_consulting/ld-why";
import LdCtaBand from "@/components/sections/learning_development_consulting/ld-cta-band";
import TnaRelated from "@/components/sections/training_needs_analysis/tnarelated";
import Faq from "@/components/common/faq";
import LeadForm from "@/components/forms/lead-form";
import StickyFooter from "@/components/common/sticky-footer";

/**
 * Consulting sub-service page — e.g. `/learning-development-consulting-services/learning-strategy`.
 *
 * Composition only: one record from `getConsultingService`, handed to the
 * sections in design order. Hero, proof strip, logos, sticky nav, related,
 * FAQ and lead form are the same sections the L&D and TNA pillar pages use;
 * challenge, offering, readiness, blueprint, method, why-us and the two
 * mid-page CTAs are this design's own.
 *
 * Design: `learning-strategy-design (48).html`.
 */
export default function ServicePage({ data }) {
  return (
    <>
      <TNAHero data={data.heroData} breadcrumbItems={data.BreadcrumbData} />
      <LearningStats data={data.proof} />
      <ClientLogos data={data.ClientsLogosData} />
      <StickyTabs data={data.stickyNavbarData} />
      <LdChallenge data={data.challengeData} />
      <LdOffering data={data.offeringData} />
      <LdReadiness data={data.readinessData} />
      <LdBlueprint data={data.blueprintData} />
      <LdSoftCta data={data.blueprintCtaData} />
      <LdMethod data={data.methodData} />
      <LdWhy data={data.whyEdstellarData} />
      <LdCtaBand data={data.whyCtaData} />
      <Faq
        id="faq"
        faqs={data.faqData}
        innerClassName="max-w-[920px] mx-auto"
        headingClassName="mx-auto text-center"
        showCta={false}
      />
      <TnaRelated data={data.relatedData} />
      <LeadForm id="contact" background="navy" data={data.leadFormData} />
      <StickyFooter data={data.stickyFooter} />
    </>
  );
}
