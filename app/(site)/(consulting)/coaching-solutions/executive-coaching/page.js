import { buildMetadata } from "@/lib/seo/metadata";
import { getExecutiveCoaching } from "@/lib/content/coaching";

import ClientLogos from "@/components/common/client-logos";
import Faq from "@/components/common/faq";
import LeadForm from "@/components/forms/lead-form";
import StickyFooter from "@/components/common/sticky-footer";
import ProofStats from "@/components/sections/consulting/proof-stats";
import StickyTabs from "@/components/sections/domain/sticky-navbar";
import MeridianShowcase from "@/components/sections/coaching/meridian-showcase";
import CoachingCtaBand from "@/components/sections/coaching/coaching-cta-band";
import CoachingBenefits from "@/components/sections/coaching/coaching-benefits";
import CoachingProcess from "@/components/sections/coaching/coaching-process";
import CoachingConfidentialCompare from "@/components/sections/coaching/coaching-confidential-compare";
import CoachingWhy from "@/components/sections/coaching/coaching-why";
import CoachingSubHero from "@/components/sections/coaching/coaching-sub-hero";
import CoachingWhoFor from "@/components/sections/coaching/coaching-who-for";
import CoachingTracks from "@/components/sections/coaching/coaching-tracks";
import CoachingRelated from "@/components/sections/coaching/coaching-related";

export const revalidate = 3600;

const PATH = "/coaching-solutions/executive-coaching";

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

export async function generateMetadata() {
  const page = await getExecutiveCoaching();
  return buildMetadata({
    title: page.seo?.meta_title?.replace(/\s*\|\s*Edstellar\s*$/i, "").trim(),
    description: page.seo?.Meta_description,
    path: PATH,
    image: page.seo?.og_image_url,
  });
}

export default async function ExecutiveCoachingPage() {
  const page = await getExecutiveCoaching();

  return (
    <>
      <CoachingSubHero data={page.hero} />
      <ProofStats data={PROOF_STATS} />
      <ClientLogos />
      <StickyTabs data={page.stickyNavbar} />

      <CoachingWhoFor data={page.who} />
      <CoachingTracks data={page.tracks} />
      <CoachingBenefits data={page.benefits} />
      <MeridianShowcase data={page.meridian} />
      <CoachingProcess data={page.process} />
      <CoachingCtaBand data={page.process_cta} label="See Meridian with your own executives" />
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
