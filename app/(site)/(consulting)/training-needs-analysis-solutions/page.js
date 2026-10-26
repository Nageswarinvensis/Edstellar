import { notFound } from "next/navigation";

import { getSitePage } from "@/lib/content/site-pages";
import { buildMetadata } from "@/lib/seo/metadata";
// import SchemaOrg from "@/components/seo/schema-org";
import ConsultingHero from "@/components/sections/consulting/consulting-hero";
import TnaInfo from "@/components/sections/training_needs_analysis/tnainfo";
import ClientLogos from "@/components/common/client-logos";
import StickyTabs from "@/components/sections/domain/sticky-navbar";
import CtaTrainer from "@/components/sections/trainers details/ctatrainer";
import TnaEngine from "@/components/sections/training_needs_analysis/tnaengine";
import Benefits from "@/components/sections/training_needs_analysis/tnabenifits";
import TnaProcess from "@/components/sections/training_needs_analysis/tnaprocess";
import StageSteps from "@/components/sections/consulting/stage-steps";
import TnaWhyEdstellar from "@/components/sections/training_needs_analysis/tnawhyedstellar";
import TnaCardGrid from "@/components/sections/training_needs_analysis/tnacardgrid";
import Readiness from "@/components/sections/consulting/readiness";
import RelatedServices from "@/components/sections/consulting/related-services";
import Faq from "@/components/common/faq";
import ConsultingForm from "@/components/forms/consulting-form";
import StickyFooter from "@/components/common/sticky-footer";
import BrochureGate from "@/components/common/brochure-gate";
import { consultingBrochure } from "@/lib/content/shape/consulting-brochure";

export const revalidate = 300;

const CMS_SLUG = "training-needs-analysis-solutions";

export async function generateMetadata() {
  const tna = await getSitePage(CMS_SLUG);
  if (!tna) return {};
  const { seo } = tna;

  // The CMS title carries the brand suffix the root layout's title template
  // already adds — stripped so it does not render twice, as the course route does.
  const title = seo?.meta_title?.replace(/\s*\|\s*Edstellar\s*$/i, "").trim();

  return buildMetadata({
    title,
    description: seo?.Meta_description,
    path: "/training-needs-analysis-solutions",
    image: seo?.og_image_url,
  });
}

export default async function TrainingNeedsAnalysisPage() {
  const tna = await getSitePage(CMS_SLUG);
  if (!tna) notFound();

  return (
    <BrochureGate {...consultingBrochure("training-needs-analysis-solutions")}>
      {/* <SchemaOrg
        breadcrumbs={tna.breadcrumbs?.items}
        faqs={tna.faqs?.items}
      /> */}
      <ConsultingHero
        data={tna.consulting_Hero}
        breadcrumbItems={tna.breadcrumbs?.items}
      />
      <TnaInfo proof={tna.generalProof} layout="spread" />
      <ClientLogos />
      <StickyTabs data={tna.stickyNavbar} />
      <CtaTrainer id="still" data={tna.tnaProblemStatement} emphasisClassName="block" />
      <TnaEngine id="engine" data={tna.tnaEngineIntro} />
      <Benefits id="benefits" data={tna.tnaBenifits} />
      <TnaProcess id="process" data={tna.tnaProcessFlow} />
      <StageSteps id="steps" data={tna.tnaEngineStages} />
      <TnaCardGrid id="integrations" data={tna.tnaIntegrations} columns={4} />
      <TnaWhyEdstellar id="why-edstellar" data={tna.tnaWhyEdstellar} />
      <TnaCardGrid id="when" data={tna.tnaWhenToRun} columns={3} background="warm" />
      <Readiness id="readiness" data={tna.readinessData} />
      <RelatedServices data={tna.relatedServices} />
      <Faq
        id="faq"
        faqs={tna.faqs}
        innerClassName="max-w-[920px] mx-auto"
        headingClassName="mx-auto text-center"
        showCta={false}
      />
      {/* The consulting form, as on the live TNA page (Zoho
          "EdstellarLDConsultingform1"). */}
      <ConsultingForm id="apply" background="navy" data={tna.leadForm} />
      <StickyFooter data={{ ...tna.stickyFooter, email: true }} />
    </BrochureGate>
  );
}
