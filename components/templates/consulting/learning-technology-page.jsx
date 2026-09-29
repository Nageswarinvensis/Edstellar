import ConsultingHero from "@/components/sections/consulting/consulting-hero";
import ProofStats from "@/components/sections/consulting/proof-stats";
import ClientLogos from "@/components/common/client-logos";
import StickyTabs from "@/components/sections/domain/sticky-navbar";
import LdChallenge from "@/components/sections/learning_development_consulting/ld-challenge";
import Readiness from "@/components/sections/consulting/readiness";
import LdOffering from "@/components/sections/learning_development_consulting/ld-offering";
import LdSoftCta from "@/components/common/ld-soft-cta";
import LdPlatforms from "@/components/sections/learning_development_consulting/ld-platforms";
import LdBlueprint from "@/components/sections/learning_development_consulting/ld-blueprint";
import Method from "@/components/sections/consulting/method";
import WhyUs from "@/components/sections/consulting/why-us";
import CtaBand from "@/components/sections/consulting/cta-band";
import RelatedServices from "@/components/sections/consulting/related-services";
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
      <ConsultingHero data={data.heroData} breadcrumbItems={data.BreadcrumbData} />
      <ProofStats data={data.proof} />
      <ClientLogos />
      <StickyTabs data={data.stickyNavbarData} />
      <LdChallenge data={data.challengeData} />
      <Readiness data={data.readinessData} />
      <LdOffering data={data.offeringData} />
      <LdSoftCta data={data.blueprintCtaData} />
      <LdPlatforms data={data.platformsData} />
      <LdBlueprint data={data.blueprintData} narrow={false} />
      <Method data={data.methodData} />
      <WhyUs data={data.whyEdstellarData} />
      <CtaBand data={data.whyCtaData} />
      <Faq
        id="faq"
        faqs={data.faqData}
        innerClassName="max-w-[920px] mx-auto"
        headingClassName="mx-auto text-center"
        showCta={false}
      />
      <RelatedServices data={data.relatedData} />
      <LeadForm id="contact" background="navy" data={data.leadFormData} />
      <StickyFooter data={data.stickyFooter} />
    </>
  );
}
