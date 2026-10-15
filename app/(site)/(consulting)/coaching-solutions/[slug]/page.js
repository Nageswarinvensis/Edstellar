import { notFound } from "next/navigation";

import { getCoachingSubPage, getCoachingSubPageSlugs } from "@/lib/content/coaching";
import { buildMetadata } from "@/lib/seo/metadata";

import ClientLogos from "@/components/common/client-logos";
import Faq from "@/components/common/faq";
import LeadForm from "@/components/forms/lead-form";
import StickyFooter from "@/components/common/sticky-footer";
import ProofStats from "@/components/sections/consulting/proof-stats";
import StickyTabs from "@/components/sections/domain/sticky-navbar";
import MeridianShowcase from "@/components/sections/coaching/meridian-showcase";
import CoachingMeridianSoon from "@/components/sections/coaching/coaching-meridian-soon";
import CoachingCtaBand from "@/components/sections/coaching/coaching-cta-band";
import CoachingBenefits from "@/components/sections/coaching/coaching-benefits";
import CoachingProcess from "@/components/sections/coaching/coaching-process";
import CoachingConfidentialCompare from "@/components/sections/coaching/coaching-confidential-compare";
import CoachingWhy from "@/components/sections/coaching/coaching-why";
import CoachingHero from "@/components/sections/coaching/coaching-hero";
import CoachingWhoFor from "@/components/sections/coaching/coaching-who-for";
import CoachingTracks from "@/components/sections/coaching/coaching-tracks";
import CoachingRelated from "@/components/sections/coaching/coaching-related";

const PILLAR = "coaching-solutions";

const PROOF_STATS = {
  stats: [
    { value: "300+", label: "Clients" },
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

// SSG: all slugs prerendered at build; anything else → 404.
export const dynamicParams = false;
export const revalidate = 3600;

export async function generateStaticParams() {
  return getCoachingSubPageSlugs().map((slug) => ({ slug }));
}

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

  return (
    <>
      <CoachingHero cms={page.consulting_Hero} />
      <ProofStats data={PROOF_STATS} />
      <ClientLogos />
      <StickyTabs data={page.stickyNavbar} />

      <CoachingWhoFor data={page.who} />
      <CoachingTracks data={page.tracks} />
      <CoachingBenefits data={page.benefits} />

      {page.meridian_soon
        ? <CoachingMeridianSoon data={page.meridian_soon} />
        : <MeridianShowcase data={page.meridian} />}

      <CoachingProcess data={page.process} />
      <CoachingCtaBand data={page.process_cta} />
      <CoachingConfidentialCompare data={page.confidential} />
      <CoachingWhy data={page.why} />
      <CoachingRelated data={page.related} />
      <Faq
        id="faq"
        faqs={page.faqs}
        innerClassName="max-w-[920px] mx-auto"
        headingClassName="mx-auto text-center"
        showCta={false}
      />
      <LeadForm id="contact" background="navy" data={page.lead_form} />
      <StickyFooter data={page.stickyFooter && { ...page.stickyFooter, email: true }} />
    </>
  );
}
