import { notFound } from "next/navigation";

import { getManagedTrainingPage } from "@/lib/content/managed-training";
import { buildMetadata } from "@/lib/seo/metadata";
import SchemaOrg from "@/components/seo/schema-org";

import ConsultingHero from "@/components/sections/consulting/consulting-hero";
import ProofStats from "@/components/sections/consulting/proof-stats";
import ClientLogos from "@/components/common/client-logos";
import StickyTabs from "@/components/sections/domain/sticky-navbar";
import OwnershipMatrix from "@/components/sections/managed_training_services/ownership-matrix";
import Workstreams from "@/components/sections/managed_training_services/workstreams";
import ReadinessStatus from "@/components/sections/managed_training_services/readiness-status";
import CoverageModels from "@/components/sections/managed_training_services/coverage-models";
import Methodology from "@/components/sections/learning_development_consulting/methodology";
import WhyUs from "@/components/sections/consulting/why-us";
import CtaBand from "@/components/sections/consulting/cta-band";
import Faq from "@/components/common/faq";
import RelatedServices from "@/components/sections/consulting/related-services";
import ConsultingForm from "@/components/forms/consulting-form";
import StickyFooter from "@/components/common/sticky-footer";

export const revalidate = 3600;

const PATH = "/managed-learning-services/managed-training";

export async function generateMetadata() {
  const page = await getManagedTrainingPage();
  if (!page) return {};
  const { seo } = page;

  // The CMS title carries the brand suffix the root layout's title template
  // already adds — stripped so it does not render twice. The path is set
  // here: the CMS `canonical_url` points at the parent pillar.
  return buildMetadata({
    title: seo?.meta_title?.replace(/\s*\|\s*Edstellar\s*$/i, "").trim(),
    description: seo?.Meta_description,
    path: PATH,
    image: seo?.og_image_url,
  });
}

/**
 * Managed Training Services — a child of Managed Learning Services, served
 * entirely from the CMS (see `lib/content/managed-training.js`). Section
 * anchors are set here to match the CMS sticky-nav tab ids, and the readiness
 * CTA falls back to the lead form when the CMS sends no link.
 */
export default async function ManagedTrainingServicesPage() {
  const page = await getManagedTrainingPage();
  if (!page) notFound();

  const breadcrumbs = page.breadcrumbs?.items;

  return (
    <>
      <SchemaOrg
        service={{
          name: page.consulting_Hero?.heroLeft?.title,
          description: page.seo?.Meta_description,
          path: PATH,
          serviceType: "Managed training services",
        }}
        breadcrumbs={breadcrumbs}
        faqs={page.faqs?.items}
      />

      <ConsultingHero data={page.consulting_Hero} breadcrumbItems={breadcrumbs} />
      <ProofStats data={page.generalProof} />
      <ClientLogos />
      <StickyTabs data={page.stickyNavbar} />
      <OwnershipMatrix data={{ ...page.ownership, section_id: "how-it-works" }} />
      <Workstreams data={{ ...page.workstreams, section_id: "services" }} />
      <ReadinessStatus
        data={
          page.readinessData && {
            ...page.readinessData,
            section_id: "ready",
            cta: page.readinessData.cta && {
              ...page.readinessData.cta,
              href: page.readinessData.cta.href || "#apply",
            },
          }
        }
      />
      <CoverageModels data={{ ...page.models, section_id: "outsourcing-models" }} />
      <Methodology data={{ ...page.methodology, section_id: "method" }} />
      <WhyUs id="why-us" data={page.ld_why_edstellar} />
      <CtaBand data={page.why_cta_banner} />
      <Faq
        id="faq"
        faqs={page.faqs}
        innerClassName="max-w-[920px] mx-auto"
        headingClassName="mx-auto text-center"
        showCta={false}
      />
      <RelatedServices id="related" data={page.relatedServices} columns={4} />
      <ConsultingForm id="apply" background="navy" data={page.leadForm} />
      <StickyFooter data={page.stickyFooter && { ...page.stickyFooter, email: true }} />
    </>
  );
}
