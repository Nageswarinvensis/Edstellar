import { TALENT_ASSESSMENT_SERVICES as DATA } from "@/content/talent-assessment-services";
import { buildMetadata } from "@/lib/seo/metadata";
import { serviceJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo/json-ld";
import JsonLd from "@/components/seo/json-ld";

import ConsultingHero from "@/components/sections/consulting/consulting-hero";
import ProofStats from "@/components/sections/consulting/proof-stats";
import ClientLogos from "@/components/common/client-logos";
import StickyTabs from "@/components/sections/domain/sticky-navbar";
import WhyUs from "@/components/sections/consulting/why-us";
import Faq from "@/components/common/faq";
import LeadForm from "@/components/forms/lead-form";
import StickyFooter from "@/components/common/sticky-footer";

import Positioning from "@/components/sections/talent_assessment_services/positioning";
import MaturityModel from "@/components/sections/talent_assessment_services/maturity-model";
import ReadinessCta from "@/components/sections/talent_assessment_services/readiness-cta";
import AssessmentExplorer from "@/components/sections/talent_assessment_services/assessment-explorer";
import Suite from "@/components/sections/talent_assessment_services/suite";
import Centers from "@/components/sections/talent_assessment_services/centers";
import Process from "@/components/sections/talent_assessment_services/process";
import Transformation from "@/components/sections/talent_assessment_services/transformation";
import RelatedLinks from "@/components/sections/talent_assessment_services/related-links";

const PATH = "/talent-assessment-services";

export const metadata = buildMetadata({
  title: DATA.seo.title,
  description: DATA.seo.description,
  path: PATH,
  image: DATA.seo.image,
});

/**
 * Talent Assessment Services consulting pillar/hub — a hand-built, pure-SSG page
 * (TASTE.md §2.2). Content is a single local record (`content/
 * talent-assessment-services.js`); this file owns section order and structured
 * data. Its sub-pages (behavioral assessment, assessment & development centers)
 * live under the `[slug]` route.
 */
export default function TalentAssessmentServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({
            name: "Talent Assessment Services",
            description: DATA.seo.description,
            path: PATH,
            serviceType: "Talent assessment",
          }),
          breadcrumbJsonLd(DATA.breadcrumbs),
          faqJsonLd(DATA.faqs.items),
        ]}
      />

      <ConsultingHero data={DATA.hero} breadcrumbItems={DATA.breadcrumbs} />
      <ProofStats data={DATA.proof} />
      <ClientLogos />
      <StickyTabs data={DATA.sticky_nav} />

      <Positioning data={DATA.positioning} />
      <MaturityModel data={DATA.maturity_model} />
      <ReadinessCta data={DATA.readiness_cta} />
      <AssessmentExplorer data={DATA.explorer} />
      <Suite data={DATA.suite} />
      <Centers data={DATA.centers} />
      <Process data={DATA.engagement} />
      <Transformation data={DATA.transformation} />
      <WhyUs id="why" data={DATA.why} />
      <RelatedLinks data={DATA.related_links} />
      <Faq
        id="faq"
        faqs={DATA.faqs}
        innerClassName="max-w-[920px] mx-auto"
        headingClassName="mx-auto text-center"
        showCta={false}
      />

      <LeadForm id="apply" background="navy" data={DATA.lead_form} />
      <StickyFooter data={DATA.sticky_footer} />
    </>
  );
}
