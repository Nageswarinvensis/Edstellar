import TNAHero from "@/components/sections/training_needs_analysis/tnahero";
import LearningStats from "@/components/sections/learning_development_consulting/learningstats";
import ClientLogos from "@/components/common/client-logos";
import StickyTabs from "@/components/sections/domain/sticky-navbar";
import LdChallenge from "@/components/sections/learning_development_consulting/ld-challenge";
import LdReadiness from "@/components/sections/learning_development_consulting/ld-readiness";
import LdOffering from "@/components/sections/learning_development_consulting/ld-offering";
import LdSoftCta from "@/components/sections/learning_development_consulting/ld-soft-cta";
import LdPlatforms from "@/components/sections/learning_development_consulting/ld-platforms";
import LdBlueprint from "@/components/sections/learning_development_consulting/ld-blueprint";
import LdMethod from "@/components/sections/learning_development_consulting/ld-method";
import LdWhy from "@/components/sections/learning_development_consulting/ld-why";
import LdCtaBand from "@/components/sections/learning_development_consulting/ld-cta-band";
import TnaRelated from "@/components/sections/training_needs_analysis/tnarelated";
import Faq from "@/components/common/faq";
import LeadForm from "@/components/forms/lead-form";
import StickyFooter from "@/components/common/sticky-footer";

/**
 * Learning technology sub-service page —
 * `/learning-development-consulting-services/learning-technology-consulting`.
 *
 * The learning strategy design's sections with readiness moved above the
 * offering, the soft CTA straight after the offering, and a platforms strip
 * (LMS & LXP, authoring tools, integrations) before the blueprint, which
 * runs full width here.
 *
 * Design: `learning-technology-consulting (9).html`.
 */
export default function LearningTechnologyPage({ data }) {
  return (
    <>
      <TNAHero data={data.heroData} breadcrumbItems={data.BreadcrumbData} />
      <LearningStats data={data.proof} />
      <ClientLogos />
      <StickyTabs data={data.stickyNavbarData} />
      <LdChallenge data={data.challengeData} />
      <LdReadiness data={data.readinessData} />
      <LdOffering data={data.offeringData} />
      <LdSoftCta data={data.blueprintCtaData} />
      <LdPlatforms data={data.platformsData} />
      <LdBlueprint data={data.blueprintData} narrow={false} />
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
