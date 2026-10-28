import { notFound } from "next/navigation";

import { getSitePage } from "@/lib/content/site-pages";
import { buildMetadata } from "@/lib/seo/metadata";
// import SchemaOrg from "@/components/seo/schema-org";
import JsonLd from "@/components/seo/json-ld";
import { schemaNodes } from "@/lib/seo/prune";

import ConsultingHero from "@/components/sections/consulting/consulting-hero";
import ProofStats from "@/components/sections/consulting/proof-stats";
import ClientLogos from "@/components/common/client-logos";
import StickyTabs from "@/components/sections/domain/sticky-navbar";
import WhyLandD from "@/components/sections/learning_development_consulting/whylandd";
import Maturity from "@/components/sections/learning_development_consulting/maturity";
import CtaBand from "@/components/sections/consulting/cta-band";
import Methodology from "@/components/sections/learning_development_consulting/methodology";
import Platform from "@/components/sections/organizational_development_consulting/platform";
import Transform from "@/components/sections/learning_development_consulting/transform";
import LdServices from "@/components/sections/learning_development_consulting/ld-services";
import Engagements from "@/components/sections/learning_development_consulting/engagements";
import WhyUs from "@/components/sections/consulting/why-us";
import RelatedServices from "@/components/sections/consulting/related-services";
import Faq from "@/components/common/faq";
import ConsultingForm from "@/components/forms/consulting-form";
import StickyFooter from "@/components/common/sticky-footer";
import BrochureGate from "@/components/common/brochure-gate";
import { consultingBrochure } from "@/lib/content/shape/consulting-brochure";

export const revalidate = 300;

const CMS_SLUG = "organizational-development-consulting";
const PATH = "/organizational-development-consulting";

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
    path: PATH,
    image: seo?.og_image_url,
  });
}

export default async function OrganizationalDevelopmentConsultingPage() {
  const cms = await getSitePage(CMS_SLUG);
  if (!cms) notFound();

  const BASE = "https://www.edstellar.com";
  const pageUrl = `${BASE}/organizational-development-consulting`;
  const name = cms.consulting_Hero?.heroLeft?.title;
  const nodes = schemaNodes(cms.consultingSchema);

  return (
    <BrochureGate {...consultingBrochure("organizational-development-consulting")}>
      {/* WebPage */}
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        "url": pageUrl,
        "name": cms.seo?.meta_title?.replace(/\s*\|\s*Edstellar\s*$/i, "").trim(),
        ...(cms.seo?.Meta_description && { "description": cms.seo?.Meta_description }),
        "inLanguage": "en-US"
      }} />

      {/* BreadcrumbList */}
      {cms.breadcrumbs?.items?.length > 0 && (
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "@id": `${pageUrl}#breadcrumb`,
          "itemListElement": cms.breadcrumbs.items.map((item, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": item.label,
            "item": item.href === "/" ? BASE : item.href?.startsWith("http") ? item.href : item.href ? `${BASE}${item.href}` : pageUrl
          }))
        }} />
      )}

      {/* <SchemaOrg
        breadcrumbs={cms.breadcrumbs?.items}
        faqs={cms.faqs?.items}
      /> */}
      {/* CMS schema nodes (Service, HowTo, etc.) — each emitted separately */}
      {nodes.map((node, i) => (
        <JsonLd key={i} data={{ "@context": "https://schema.org", ...node }} />
      ))}

      <ConsultingHero
        data={cms.consulting_Hero}
        breadcrumbItems={cms.breadcrumbs?.items}
      />
      <ProofStats data={cms.generalProof} />
      <ClientLogos />
      <StickyTabs data={cms.stickyNavbar} />
      <WhyLandD data={cms.why_ld} />
      <Maturity data={cms.maturity_model} />
      <CtaBand data={cms.why_cta_banner} />
      <Methodology data={cms.methodology} />
      <Platform data={cms.ld_Platform} />
      <Transform data={cms.transformation} />
      {/* OD hub shows its services in 3 columns (design `.grid.g3`); the CMS
          `services` component doesn't carry `columns`, so set it here. */}
      <LdServices data={cms.services && { ...cms.services, columns: 3 }} />
      <Engagements data={cms.engagement_models} />
      <WhyUs id="why-edstellar" data={cms.ld_why_edstellar} />
      <RelatedServices bgColor="bg-paper-warm" data={cms.relatedServices} />
      <Faq
        id="faq"
        faqs={cms.faqs}
        innerClassName="max-w-[920px] mx-auto"
        headingClassName="mx-auto text-center"
        showCta={false}
      />
      <ConsultingForm id="apply" background="navy" data={cms.leadForm} />
      <StickyFooter data={{ ...cms.stickyFooter, email: true }} />
    </BrochureGate>
  );
}
