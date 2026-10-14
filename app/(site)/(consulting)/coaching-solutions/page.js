import { getCoachingHub } from "@/lib/content/coaching";
import { buildMetadata } from "@/lib/seo/metadata";
import SchemaOrg from "@/components/seo/schema-org";

import ProofStats from "@/components/sections/consulting/proof-stats";
import ClientLogos from "@/components/common/client-logos";
import StickyTabs from "@/components/sections/domain/sticky-navbar";
import Faq from "@/components/common/faq";
import LeadForm from "@/components/forms/lead-form";
import StickyFooter from "@/components/common/sticky-footer";

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

// Static page: its content is local JSON, so it is fully prerendered (SSG).
export const dynamic = "force-static";

export function generateMetadata() {
  const { seo } = getCoachingHub();

  // The JSON title carries the brand suffix the root layout's title template
  // adds — stripped so it does not render twice.
  return buildMetadata({
    title: seo.title.replace(/\s*\|\s*Edstellar\s*$/i, "").trim(),
    description: seo.description,
    path: seo.path,
  });
}

/**
 * Coaching Solutions hub — a static page built from local JSON
 * (`content/coaching/coaching-hub.json`, via `lib/content/coaching.js`).
 * The family frame (proof bar, logos, section nav, FAQ, lead form, sticky
 * footer) reuses the consulting components; the coaching sections live in
 * `components/sections/coaching/`.
 *
 * Design: `coaching-hub 24.html`.
 */
export default function CoachingSolutionsPage() {
  const page = getCoachingHub();

  return (
    <>
      <SchemaOrg
        service={{
          name: "Corporate Coaching",
          description: page.seo.description,
          path: page.seo.path,
          serviceType: "Corporate coaching",
        }}
        breadcrumbs={page.hero.breadcrumbs}
        faqs={page.faqs.items}
      />

      <CoachingHero data={page.hero} />
      <ProofStats data={page.proof} />
      <ClientLogos />
      <StickyTabs data={page.sticky_nav} />

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
      <LeadForm id="contact" background="navy" data={page.lead_form} />
      <StickyFooter data={page.sticky_footer} />
    </>
  );
}
