import { getTalentAssessmentHub } from "@/lib/content/talent-assessment";
import { buildMetadata } from "@/lib/seo/metadata";
import SchemaOrg from "@/components/seo/schema-org";

import ConsultingHero from "@/components/sections/consulting/consulting-hero";
import ProofStats from "@/components/sections/consulting/proof-stats";
import ClientLogos from "@/components/common/client-logos";
import StickyTabs from "@/components/sections/domain/sticky-navbar";
import WhyUs from "@/components/sections/consulting/why-us";
import Faq from "@/components/common/faq";
import ConsultingForm from "@/components/forms/consulting-form";
import StickyFooter from "@/components/common/sticky-footer";
import Methodology from "@/components/sections/learning_development_consulting/methodology";
import Transform from "@/components/sections/learning_development_consulting/transform";

import Positioning from "@/components/sections/talent_assessment_services/positioning";
import MaturityModel from "@/components/sections/talent_assessment_services/maturity-model";
import ReadinessCta from "@/components/sections/talent_assessment_services/readiness-cta";
import AssessmentExplorer from "@/components/sections/talent_assessment_services/assessment-explorer";
import Suite from "@/components/sections/talent_assessment_services/suite";
import Centers from "@/components/sections/talent_assessment_services/centers";
import RelatedLinks from "@/components/sections/talent_assessment_services/related-links";

export const revalidate = 300;

const PATH = "/talent-assessment-services";

// Minimal metadata default. The hub's `seo` comes from the CMS; this only keeps
// the page's title/description/canonical valid (non-negotiable #5) when the CMS
// hub page is unavailable. It is not section content.
const META_FALLBACK = {
  title: "Talent Assessment Services & Psychometric Testing",
  description:
    "Edstellar talent assessment services cover psychometric tests, pre-employment, skills and leadership assessments, 360 feedback and assessment centers.",
  image:
    "https://media.edstellar.com/website/Corporate_Talent_Assessment_C2_A0Services_for_Workforce_Readiness.webp",
};

// Each CMS-connected section is given a `section_id` so its anchor matches the
// CMS `stickyNavbar` tab ids (the nav is now CMS-driven). The CMS section
// configs carry no `section_id` of their own.
const SECTION_IDS = {
  positioning: "why-assess",
  maturity_model: "maturity",
  readiness_cta: "readiness",
  engagement: "engagements",
  transformation: "transform",
  why: "why-edstellar",
  related: "related",
};

const withId = (config, id) => (config ? { ...config, section_id: id } : null);

export async function generateMetadata() {
  const cms = await getTalentAssessmentHub();
  const seo = cms?.seo;
  return buildMetadata({
    title: seo?.meta_title?.replace(/\s*\|\s*Edstellar\s*$/i, "").trim() || META_FALLBACK.title,
    description: seo?.Meta_description || META_FALLBACK.description,
    path: PATH,
    image: seo?.og_image_url || META_FALLBACK.image,
  });
}

/**
 * Talent Assessment Services consulting pillar/hub. The hub is hand-built and
 * statically rendered (TASTE.md §2.2). Every section the CMS site page owns is
 * read from the CMS and no longer kept in local content — hero, proof,
 * breadcrumbs, sticky nav, positioning (`why_ld`), maturity model, readiness CTA
 * (`why_cta_banner`), methodology, why (`ld_why_edstellar`), related
 * (`relatedServices`), explorer, suite, centers (the CMS sends this slug as
 * `" centers"`; `getSitePage` trims it), transformation (rendered by the shared
 * L&D `Transform`, which reads the CMS's `before_card`/`after_card`/`soft_cta`),
 * FAQs, lead form and sticky footer — the whole hub. The CMS configs for
 * explorer, suite and centers carry their own `section_id`. SSG — the CMS is
 * fetched once at build.
 */
export default async function TalentAssessmentServicesPage() {
  const cms = await getTalentAssessmentHub();
  const breadcrumbs = cms?.breadcrumbs?.items ?? [];

  return (
    <>
      <SchemaOrg
        breadcrumbs={breadcrumbs}
        faqs={cms?.faqs?.items}
      />

      <ConsultingHero data={cms?.consulting_Hero} breadcrumbItems={breadcrumbs} />
      <ProofStats data={cms?.generalProof} />
      <ClientLogos />
      <StickyTabs data={cms?.stickyNavbar} />

      <Positioning data={withId(cms?.why_ld, SECTION_IDS.positioning)} />
      <MaturityModel data={withId(cms?.maturity_model, SECTION_IDS.maturity_model)} />
      <ReadinessCta data={withId(cms?.why_cta_banner, SECTION_IDS.readiness_cta)} />
      <AssessmentExplorer data={cms?.explorer} />
      <Suite data={cms?.suite} />
      <Centers data={cms?.centers} />
      <Methodology
        data={
          cms?.methodology && {
            ...cms.methodology,
            section_id: SECTION_IDS.engagement,
            showSoftCta: false,
          }
        }
      />
      <Transform data={withId(cms?.transformation, SECTION_IDS.transformation)} />
      <WhyUs id={SECTION_IDS.why} data={cms?.ld_why_edstellar} />
      <RelatedLinks data={withId(cms?.relatedServices, SECTION_IDS.related)} />
      <Faq
        id="faq"
        faqs={cms?.faqs}
        innerClassName="max-w-[920px] mx-auto"
        headingClassName="mx-auto text-center"
        showCta={false}
      />

      <ConsultingForm id="apply" background="navy" data={cms?.leadForm} />
      <StickyFooter data={cms?.stickyFooter} />
    </>
  );
}
