import { notFound } from "next/navigation";

import { getSitePage } from "@/lib/content/site-pages";
import { buildMetadata } from "@/lib/seo/metadata";
import JsonLd from "@/components/seo/json-ld";

import ConsultingHero from "@/components/sections/consulting/consulting-hero";
import ProofStats from "@/components/sections/consulting/proof-stats";
import ClientLogos from "@/components/common/client-logos";
import StickyTabs from "@/components/sections/domain/sticky-navbar";
import WhyLandD from "@/components/sections/learning_development_consulting/whylandd";
import Maturity from "@/components/sections/learning_development_consulting/maturity";
import LandDCTA from "@/components/sections/learning_development_consulting/ldcta";
import Methodology from "@/components/sections/learning_development_consulting/methodology";
import Transform from "@/components/sections/learning_development_consulting/transform";
import LdServices from "@/components/sections/learning_development_consulting/ld-services";
import Engagements from "@/components/sections/learning_development_consulting/engagements";
import WhyUs from "@/components/sections/consulting/why-us";
import CtaBand from "@/components/sections/consulting/cta-band";
import RelatedServices from "@/components/sections/consulting/related-services";
import Faq from "@/components/common/faq";
import ConsultingForm from "@/components/forms/consulting-form";
import StickyFooter from "@/components/common/sticky-footer";
import BrochureGate from "@/components/common/brochure-gate";
import { consultingBrochure } from "@/lib/content/shape/consulting-brochure";

export const revalidate = 300;

const CMS_SLUG = "learning-development-consulting-services";

export async function generateMetadata() {
  const cms = await getSitePage(CMS_SLUG);
  if (!cms) return {};
  const { seo } = cms;

  // The CMS title carries the brand suffix the root layout's title template
  // already adds — stripped so it does not render twice.
  const title = seo?.meta_title?.replace(/\s*\|\s*Edstellar\s*$/i, "").trim();

  return buildMetadata({
    title,
    description: seo?.Meta_description,
    path: "/learning-development-consulting-services",
    image: seo?.og_image_url,
  });
}

export default async function LDConsultingPage() {
  const cms = await getSitePage(CMS_SLUG);
  if (!cms) notFound();

  return (
    <BrochureGate {...consultingBrochure("learning-development-consulting-services")}>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": "https://www.edstellar.com/learning-development-consulting-services#webpage",
            "url": "https://www.edstellar.com/learning-development-consulting-services",
            "name": "Learning and Development Consulting Services | Edstellar",
            "description": "Align learning with business goals through Edstellar's L&D consulting services, covering strategy, content, technology, governance and training delivery.",
            "inLanguage": "en-US",
            "isPartOf": { "@id": "https://www.edstellar.com/#website" },
            "mainEntity": { "@id": "https://www.edstellar.com/learning-development-consulting-services#service" },
            "breadcrumb": { "@id": "https://www.edstellar.com/learning-development-consulting-services#breadcrumb" }
          },
          {
            "@type": "Service",
            "@id": "https://www.edstellar.com/learning-development-consulting-services#service",
            "name": "Learning and Development Consulting Services",
            "description": "Edstellar is a learning and development consulting firm helping enterprises connect learning strategy, content, technology, governance and delivery with business priorities. Our expert consultants work with organizational teams to build a coordinated learning function that addresses capability gaps and supports ongoing workforce development.",
            "url": "https://www.edstellar.com/learning-development-consulting-services",
            "serviceType": "Learning and development consulting",
            "provider": { "@type": "Organization", "name": "Edstellar", "url": "https://www.edstellar.com" },
            "image": "https://media.edstellar.com/consulting/learning-&-developement-services.webp",
            "areaServed": ["North America", "Europe", "Asia-Pacific", "Middle East", "Africa", "Latin America and Caribbean"],
            "audience": { "@type": "Audience", "audienceType": "Enterprise and Corporate Organizations" },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "@id": "https://www.edstellar.com/learning-development-consulting-services#offer-catalog",
              "name": "Learning and Development Consulting Services Catalog",
              "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "Service", "@id": "https://www.edstellar.com/training-needs-analysis-solutions#service", "name": "Training Needs Analysis Services", "url": "https://www.edstellar.com/training-needs-analysis-solutions" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "@id": "https://www.edstellar.com/learning-development-consulting-services/learning-strategy-design#service", "name": "Learning Strategy Consulting", "url": "https://www.edstellar.com/learning-development-consulting-services/learning-strategy-design" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "@id": "https://www.edstellar.com/learning-development-consulting-services/learning-technology#service", "name": "Learning Technology Consulting", "url": "https://www.edstellar.com/learning-development-consulting-services/learning-technology" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "@id": "https://www.edstellar.com/learning-development-consulting-services/learning-content-development#service", "name": "Learning Content Design & Development Services", "url": "https://www.edstellar.com/learning-development-consulting-services/learning-content-development" } }
              ]
            }
          },
          {
            "@type": "BreadcrumbList",
            "@id": "https://www.edstellar.com/learning-development-consulting-services#breadcrumb",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.edstellar.com" },
              { "@type": "ListItem", "position": 2, "name": "Learning & Development Consulting Services", "item": "https://www.edstellar.com/learning-development-consulting-services" }
            ]
          }
        ]
      }} />
      <ConsultingHero
        data={cms.consulting_Hero}
        breadcrumbItems={cms.breadcrumbs?.items}
      />
      <ProofStats data={cms.generalProof} />
      <ClientLogos />
      <StickyTabs data={cms.stickyNavbar} />
      <WhyLandD data={cms.why_ld} />
      <Maturity data={cms.maturity_model}/>
      <LandDCTA data={cms.ld_cta} />
      <Methodology data={cms.methodology}/>
      <Transform data={cms.transformation}/>
      <LdServices data={cms.services}/>
      <Engagements data={cms.engagement_models}/>
      <WhyUs id="why-edstellar" data={cms.ld_why_edstellar} />
      <CtaBand data={cms.why_cta_banner} />
      <RelatedServices
        id="capability-consulting"
        bgColor="bg-paper-warm"
        data={cms.relatedServices}
      />
      <Faq
        id="faq"
        faqs={cms.faqs}
        innerClassName="max-w-[920px] mx-auto"
        headingClassName="mx-auto text-center"
        showCta={false}
      />
      <ConsultingForm
        id="apply"
        background="navy"
        data={cms.leadForm}
      />
      <StickyFooter data={{ ...cms.stickyFooter, email: true }} />
    </BrochureGate>
  );
}
