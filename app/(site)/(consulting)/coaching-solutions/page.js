import { notFound } from "next/navigation";

import { getCoachingHub } from "@/lib/content/coaching";
import { buildMetadata } from "@/lib/seo/metadata";
// import SchemaOrg from "@/components/seo/schema-org";

import ProofStats from "@/components/sections/consulting/proof-stats";
import ClientLogos from "@/components/common/client-logos";
import StickyTabs from "@/components/sections/domain/sticky-navbar";
import Faq from "@/components/common/faq";
import ConsultingForm from "@/components/forms/consulting-form";
import StickyFooter from "@/components/common/sticky-footer";
import BrochureGate from "@/components/common/brochure-gate";
import { consultingBrochure } from "@/lib/content/shape/consulting-brochure";

import CoachingHero from "@/components/sections/coaching/coaching-hero";
import CoachingPaths from "@/components/sections/coaching/coaching-paths";
import CoachingCtaBand from "@/components/sections/coaching/coaching-cta-band";
import CoachingBenefits from "@/components/sections/coaching/coaching-benefits";
import MeridianShowcase from "@/components/sections/coaching/meridian-showcase";
import CoachingProcess from "@/components/sections/coaching/coaching-process";
import CoachingConfidential from "@/components/sections/coaching/coaching-confidential";
import CoachingSchedules from "@/components/sections/coaching/coaching-schedules";
import CoachingReadiness from "@/components/sections/coaching/coaching-readiness";
import CoachingWhy from "@/components/sections/coaching/coaching-why";

export const revalidate = 300;

const PATH = "/coaching-solutions";

export async function generateMetadata() {
  const page = await getCoachingHub();
  if (!page) return {};
  const { seo } = page;

  // The CMS title carries the brand suffix the root layout's title template
  // adds — stripped so it does not render twice.
  return buildMetadata({
    title: seo?.meta_title?.replace(/\s*\|\s*Edstellar\s*$/i, "").trim(),
    description: seo?.Meta_description,
    path: PATH,
    image: seo?.og_image_url,
  });
}

/**
 * Coaching Solutions hub — every section comes from the CMS page
 * `site-pages/coaching-solutions`; see `lib/content/coaching.js` for which
 * CMS component feeds which section.
 * The family frame (proof bar, logos, section nav, FAQ, lead form, sticky
 * footer) reuses the consulting components; the coaching sections live in
 * `components/sections/coaching/`.
 *
 * Design: `coaching-hub 24.html`.
 */
export default async function CoachingSolutionsPage() {
  const page = await getCoachingHub();
  if (!page) notFound();

  const breadcrumbs = page.breadcrumbs?.items;

  return (
    <BrochureGate {...consultingBrochure("coaching-solutions")}>
      {/* <SchemaOrg
        service={{
          name: "Corporate Coaching",
          description: page.seo?.Meta_description,
          path: PATH,
          serviceType: "Corporate coaching",
        }}
        breadcrumbs={breadcrumbs}
        faqs={page.faqs?.items}
      /> */}

      <CoachingHero cms={page.consulting_Hero} breadcrumbs={breadcrumbs} />
      <ProofStats data={page.generalProof} />
      <ClientLogos />
      <StickyTabs data={page.stickyNavbar} />

      <CoachingPaths data={page.paths} />
      <CoachingCtaBand data={page.paths_cta} label="Find the right coaching path" />
      <CoachingBenefits data={page.benefits} />
      <MeridianShowcase data={page.meridian} />
      <CoachingProcess data={page.process} />
      <CoachingCtaBand data={page.meridian_cta} />
      <CoachingConfidential data={page.confidential} />
      <CoachingSchedules data={page.schedules} />
      <CoachingReadiness data={page.readiness} />
      <CoachingWhy data={page.why} />
      <Faq
        id="faq"
        faqs={page.faqs}
        innerClassName="max-w-[920px] mx-auto"
        headingClassName="mx-auto text-center"
        showCta={false}
      />
      <ConsultingForm id="apply" background="navy" data={page.lead_form} />
      <StickyFooter data={page.stickyFooter && { ...page.stickyFooter, email: true }} />
    </BrochureGate>
  );
}
