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

  const BASE = "https://www.edstellar.com";
  const pageUrl = `${BASE}/learning-development-consulting-services`;
  const pageTitle = cms.seo?.meta_title || "Learning and Development Consulting Services | Edstellar";
  const pageDescription = cms.seo?.Meta_description;

  const breadcrumbItems = cms.breadcrumbs?.items ?? [];
  const faqItems = cms.faqs?.items ?? [];

  return (
    <BrochureGate {...consultingBrochure("learning-development-consulting-services")}>
      {/* 1 — WebSite + WebPage */}
      <JsonLd data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebSite",
            "@id": `${BASE}/#website`,
            "url": BASE,
            "name": "Edstellar"
          },
          {
            "@type": "WebPage",
            "@id": `${pageUrl}#webpage`,
            "url": pageUrl,
            "name": pageTitle,
            ...(pageDescription && { "description": pageDescription }),
            "inLanguage": "en-US",
            "isPartOf": { "@id": `${BASE}/#website` },
            "mainEntity": { "@id": `${pageUrl}#service` },
            "breadcrumb": { "@id": `${pageUrl}#breadcrumb` },
            ...(faqItems.length && { "hasPart": { "@id": `${pageUrl}#faq` } })
          }
        ]
      }} />
      {/* 2 — BreadcrumbList + FAQPage */}
      <JsonLd data={{
        "@context": "https://schema.org",
        "@graph": [
          ...(breadcrumbItems.length ? [{
            "@type": "BreadcrumbList",
            "@id": `${pageUrl}#breadcrumb`,
            "itemListElement": breadcrumbItems.map((item, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": item.label,
              "item": item.href?.startsWith("http") ? item.href : `${BASE}${item.href}`
            }))
          }] : []),
          ...(faqItems.length ? [{
            "@type": "FAQPage",
            "@id": `${pageUrl}#faq`,
            "isPartOf": { "@id": `${pageUrl}#webpage` },
            "inLanguage": "en-US",
            "mainEntity": faqItems.map((faq) => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
            }))
          }] : [])
        ]
      }} />
      {/* 3 — Service (standalone block, detected independently) */}
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        "name": "Learning and Development Consulting Services",
        "description": "Edstellar is a learning and development consulting firm helping enterprises connect learning strategy, content, technology, governance and delivery with business priorities. Our expert consultants work with organizational teams to build a coordinated learning function that addresses capability gaps and supports ongoing workforce development.",
        "url": pageUrl,
        "serviceType": "Learning and development consulting",
        "provider": { "@type": "Organization", "name": "Edstellar", "url": BASE },
        "image": "https://media.edstellar.com/consulting/learning-&-developement-services.webp",
        "areaServed": ["North America", "Europe", "Asia-Pacific", "Middle East", "Africa", "Latin America and Caribbean"],
        "audience": { "@type": "Audience", "audienceType": "Enterprise and Corporate Organizations" },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "@id": `${pageUrl}#offer-catalog`,
          "name": "Learning and Development Consulting Services Catalog",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "@id": `${BASE}/training-needs-analysis-solutions#service`, "name": "Training Needs Analysis Services", "url": `${BASE}/training-needs-analysis-solutions` } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "@id": `${BASE}/learning-development-consulting-services/learning-strategy-design#service`, "name": "Learning Strategy Consulting", "url": `${BASE}/learning-development-consulting-services/learning-strategy-design` } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "@id": `${BASE}/learning-development-consulting-services/learning-technology#service`, "name": "Learning Technology Consulting", "url": `${BASE}/learning-development-consulting-services/learning-technology` } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "@id": `${BASE}/learning-development-consulting-services/learning-content-development#service`, "name": "Learning Content Design & Development Services", "url": `${BASE}/learning-development-consulting-services/learning-content-development` } }
          ]
        }
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
