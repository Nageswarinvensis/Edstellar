import TNAHero from "@/components/sections/training_needs_analysis/tnahero";
import LearningStats from "@/components/sections/learning_development_consulting/learningstats";
import ClientLogos from "@/components/common/client-logos";
import StickyTabs from "@/components/sections/domain/sticky-navbar";
import LdChallenge from "@/components/sections/learning_development_consulting/ld-challenge";
import LdReadiness from "@/components/sections/learning_development_consulting/ld-readiness";
import LdOffering from "@/components/sections/learning_development_consulting/ld-offering";
import LdFormats from "@/components/sections/learning_development_consulting/ld-formats";
import LdSoftCta from "@/components/common/ld-soft-cta";
import LdBlueprint from "@/components/sections/learning_development_consulting/ld-blueprint";
import LdMethod from "@/components/sections/learning_development_consulting/ld-method";
import LdFrameworks from "@/components/sections/learning_development_consulting/ld-frameworks";
import LdWhy from "@/components/sections/learning_development_consulting/ld-why";
import LdCtaBand from "@/components/sections/learning_development_consulting/ld-cta-band";
import TnaRelated from "@/components/sections/training_needs_analysis/tnarelated";
import Faq from "@/components/common/faq";
import LeadForm from "@/components/forms/lead-form";
import StickyFooter from "@/components/common/sticky-footer";

/**
 * Content design & development sub-service page —
 * `/learning-development-consulting-services/learning-content-development-services`.
 *
 * The learning strategy design's sections with readiness moved above the
 * offering, plus a formats gallery (after the offering) and a frameworks
 * strip (after the method). The blueprint runs full width here.
 *
 * Design: `learning-content-development (16).html`.
 */
export default function ContentDevelopmentPage({ data }) {
  return (
    <>
      <TNAHero data={data.heroData} breadcrumbItems={data.BreadcrumbData} />
      <LearningStats data={data.proof} />
      <ClientLogos />
      <StickyTabs data={data.stickyNavbarData} />
      <LdChallenge data={data.challengeData} />
      <LdReadiness data={data.readinessData} />
      <LdOffering data={data.offeringData} />
      <LdFormats data={data.formatsData} />
      <LdSoftCta data={data.blueprintCtaData} />
      <LdBlueprint data={data.blueprintData} narrow={false} />
      <LdMethod data={data.methodData} />
      <LdFrameworks data={data.frameworksData} />
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
