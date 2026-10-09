import { notFound } from "next/navigation";

import { getSitePage } from "@/lib/content/site-pages";
import { buildMetadata } from "@/lib/seo/metadata";
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
import Platform from "@/components/sections/organizational_development_consulting/platform";
import Transform from "@/components/sections/learning_development_consulting/transform";
import LdServices from "@/components/sections/learning_development_consulting/ld-services";
import Engagements from "@/components/sections/learning_development_consulting/engagements";
import WhyUs from "@/components/sections/consulting/why-us";
import RelatedServices from "@/components/sections/consulting/related-services";
import Faq from "@/components/common/faq";
import LeadForm from "@/components/forms/lead-form";
import StickyFooter from "@/components/common/sticky-footer";

export const revalidate = 3600;

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

  const name = cms.consulting_Hero?.heroLeft?.title;

  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({
            name,
            description: cms.seo?.Meta_description,
            path: PATH,
            serviceType: name,
          }),
          breadcrumbJsonLd(cms.breadcrumbs?.items),
          faqJsonLd(cms.faqs?.items),
        ]}
      />

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
      <LeadForm id="apply" background="navy" data={cms.leadForm} />
      <StickyFooter data={{ ...cms.stickyFooter, email: true }} />
    </>
  );
}
