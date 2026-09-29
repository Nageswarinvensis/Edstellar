import ConsultingHero from "@/components/sections/consulting/consulting-hero";
import ProofStats from "@/components/sections/consulting/proof-stats";
import ClientLogos from "@/components/common/client-logos";
import StickyTabs from "@/components/sections/domain/sticky-navbar";
import LdChallenge from "@/components/sections/learning_development_consulting/ld-challenge";
import Readiness from "@/components/sections/consulting/readiness";
import LdOffering from "@/components/sections/learning_development_consulting/ld-offering";
import LdBlueprint from "@/components/sections/learning_development_consulting/ld-blueprint";
import Method from "@/components/sections/consulting/method";
import WhyUs from "@/components/sections/consulting/why-us";
import CtaBand from "@/components/sections/consulting/cta-band";
import RelatedServices from "@/components/sections/consulting/related-services";
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
      <ConsultingHero data={data.heroData} breadcrumbItems={data.BreadcrumbData} />
      <ProofStats data={data.proof} />
      <ClientLogos />
      <StickyTabs data={data.stickyNavbarData} />
      <LdChallenge data={data.challengeData} />
      <LdOffering data={data.offeringData} />
      <Readiness data={data.readinessData} />
      <LdBlueprint data={data.blueprintData} />
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
