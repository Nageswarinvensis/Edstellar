import JsonLd from "@/components/seo/json-ld";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/seo/json-ld";

import ConsultingHero from "@/components/sections/consulting/consulting-hero";
import ProofStats from "@/components/sections/consulting/proof-stats";
import ClientLogos from "@/components/common/client-logos";
import StickyTabs from "@/components/sections/domain/sticky-navbar";
import WhyLandD from "@/components/sections/learning_development_consulting/whylandd";
import Maturity from "@/components/sections/learning_development_consulting/maturity";
import CtaBand from "@/components/sections/consulting/cta-band";
import Methodology from "@/components/sections/learning_development_consulting/methodology";
import LdPlatformSection from "@/components/sections/organizational_development_consulting/ldplatformsec";
import Transform from "@/components/sections/learning_development_consulting/transform";
import LdServices from "@/components/sections/learning_development_consulting/ld-services";
import Engagements from "@/components/sections/learning_development_consulting/engagements";
import WhyUs from "@/components/sections/consulting/why-us";
import RelatedServices from "@/components/sections/consulting/related-services";
import Faq from "@/components/common/faq";
import LeadForm from "@/components/forms/lead-form";
import StickyFooter from "@/components/common/sticky-footer";

// 1. IMPORT YOUR JSON DATA DIRECTLY
import service from "@/content/organizational_development_consulting/OD-consulting.json";


// 5. METADATA GENERATION
export const metadata = {
  title: service.seo.title,
  description: service.seo.description,
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({
            name: service.name,
            description: service.seo.description,
            path: `/consulting/${service.slug}`,
            serviceType: service.name,
          }),
          breadcrumbJsonLd(service.BreadcrumbData),
          faqJsonLd(service.faqData?.items),
        ]}
      />

      <ConsultingHero data={service.heroData} breadcrumbItems={service.BreadcrumbData} />
      <ProofStats data={service.proof} />
      <ClientLogos />
      <StickyTabs data={service.stickyNavbarData} />
      <WhyLandD data={service.whyLandDData} />
      <Maturity data={service.maturityData} />
      <CtaBand data={service.ctaBandData}/>
      <Methodology data={service.methodologyData} />
      <LdPlatformSection data={service.ldPlatformData}/>
      <Transform data={service.transformData}/>
      <LdServices data={service.ldServicesData}/>
      <Engagements data={service.engagementsData}/>
      <WhyUs data={service.whyusData} />
      <RelatedServices data={service.relatedData} />
      <Faq data={service.faqData} />
      <LeadForm data={service.leadFormData} />
      <StickyFooter data={service.stickyFooter} />
    </>
  );
}