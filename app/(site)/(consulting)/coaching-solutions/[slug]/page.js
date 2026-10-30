import { notFound } from "next/navigation";

import { getCoachingSubPage } from "@/lib/content/coaching";
import { buildMetadata } from "@/lib/seo/metadata";
// import SchemaOrg from "@/components/seo/schema-org";
import JsonLd from "@/components/seo/json-ld";
import { schemaNodes } from "@/lib/seo/prune";

import ClientLogos from "@/components/common/client-logos";
import Faq from "@/components/common/faq";
import ConsultingForm from "@/components/forms/consulting-form";
import StickyFooter from "@/components/common/sticky-footer";
import BrochureGate from "@/components/common/brochure-gate";
import { consultingBrochure } from "@/lib/content/shape/consulting-brochure";
import ProofStats from "@/components/sections/consulting/proof-stats";
import StickyTabs from "@/components/sections/domain/sticky-navbar";
import MeridianShowcase from "@/components/sections/coaching/meridian-showcase";
import CoachingMeridianSoon from "@/components/sections/coaching/coaching-meridian-soon";
import CoachingCtaBand from "@/components/sections/coaching/coaching-cta-band";
import CoachingBenefits from "@/components/sections/coaching/coaching-benefits";
import CoachingCta from "@/components/sections/coaching/coaching-cta";
import CoachingProcess from "@/components/sections/coaching/coaching-process";
import CoachingConfidentialCompare from "@/components/sections/coaching/coaching-confidential-compare";
import CoachingWhy from "@/components/sections/coaching/coaching-why";
import CoachingHero from "@/components/sections/coaching/coaching-hero";
import CoachingWhoFor from "@/components/sections/coaching/coaching-who-for";
import CoachingTracks from "@/components/sections/coaching/coaching-tracks";
import CoachingRelated from "@/components/sections/coaching/coaching-related";
import CoachingMoreRelated from "@/components/sections/coaching/coaching-more-related";

const PILLAR = "coaching-solutions";

const PROOF_STATS = {
  stats: [
    { value: "200+", label: "Clients" },
    { value: "20+", label: "Industries" },
    { value: "300+", label: "Consultants" },
    { value: "ISO 9001 & 27001", label: "Certified" },
  ],
  ctaTitle: "Ready to build leaders who deliver?",
  primaryBtnText: "Book a coaching consultation",
  primaryBtnHref: "#contact",
  secondaryBtnText: "Download the coaching brochure (PDF)",
  secondaryBtnHref: "#contact",
};

export const revalidate = 300;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = await getCoachingSubPage(slug);
  if (!page) return {};
  return buildMetadata({
    title: page.seo?.meta_title?.replace(/\s*\|\s*Edstellar\s*$/i, "").trim(),
    description: page.seo?.Meta_description,
    path: `/${PILLAR}/${slug}`,
    image: page.seo?.og_image_url,
  });
}

export default async function CoachingSubPage({ params }) {
  const { slug } = await params;
  const page = await getCoachingSubPage(slug);
  if (!page) notFound();

  const BASE = "https://www.edstellar.com";
  const pageUrl = `${BASE}/coaching-solutions/${slug}`;
  const nodes = schemaNodes(page.coachingSchema);

  // Check if current page is team-coaching
  const isTeamCoachingPage = slug === "team-coaching";

  // Extract raw components array if page returns a list or object containing blocks
  const rawComponents = Array.isArray(page)
    ? page
    : page?.components || page?.sections || page?.data || [];

  // Find component block by DevCMS slug ("related_sub_services")
  const matchedComponent = rawComponents.find(
    (c) =>
      c?.component_slug === "related_sub_services" ||
      c?.component_slug === "related-sub-services"
  );

  // Resolve the payload (extracting .config automatically if present)
  const relatedSubServicesData =
    page?.related_sub_services ||
    page?.["related-sub-services"] ||
    page?.relatedSubServices ||
    matchedComponent?.config ||
    matchedComponent;

  return (
    <BrochureGate {...consultingBrochure(slug)}>
      {/* WebPage */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${pageUrl}#webpage`,
          url: pageUrl,
          name: page.seo?.meta_title
            ?.replace(/\s*\|\s*Edstellar\s*$/i, "")
            .trim(),
          ...(page.seo?.Meta_description && {
            description: page.seo?.Meta_description,
          }),
          inLanguage: "en-US",
        }}
      />

      {/* CMS schema nodes (Service, HowTo, etc.) — each emitted separately */}
      {nodes.map((node, i) => (
        <JsonLd key={i} data={{ "@context": "https://schema.org", ...node }} />
      ))}
      <CoachingHero cms={page.consulting_Hero} />
      <ProofStats data={PROOF_STATS} />
      <ClientLogos />
      <StickyTabs data={page.stickyNavbar} />

      <CoachingWhoFor data={page.who} />
      <CoachingTracks data={page.tracks} />
      <CoachingBenefits data={page.benefits} />

      {page.meridian_soon ? (
        <CoachingMeridianSoon data={page.meridian_soon} />
      ) : (
        <MeridianShowcase data={page.meridian} />
      )}

      {/* Renders ONLY on team-coaching slug */}
      {isTeamCoachingPage && <CoachingCta />}

      <CoachingProcess data={page.process} />
      <CoachingCtaBand data={page.process_cta} />
      <CoachingConfidentialCompare data={page.confidential} />
      <CoachingWhy data={page.why} />
      <CoachingRelated data={page.related} />

      {/* Passing DevCMS payload */}
      <CoachingMoreRelated data={page.related_sub_services} />

      <Faq
        id="faq"
        faqs={page.faqs}
        innerClassName="max-w-[920px] mx-auto"
        headingClassName="mx-auto text-center"
        showCta={false}
      />
      <ConsultingForm id="contact" background="navy" data={page.lead_form} />
      <StickyFooter
        data={page.stickyFooter && { ...page.stickyFooter, email: true }}
      />
    </BrochureGate>
  );
}