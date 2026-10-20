import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import FaqDetails from "@/components/common/faq-details";
import LeadershipRetreatForm from "@/components/forms/leadership-retreat-form";
import RetreatHero from "@/components/sections/leadership_retreats/retreat-hero";
import SectionNav from "@/components/common/section-nav";
import AudienceTabs from "@/components/sections/leadership_retreats/audience-tabs";
import DesignFlow from "@/components/sections/leadership_retreats/design-flow";
import Experience from "@/components/sections/leadership_retreats/experience";
import RetreatFormats from "@/components/sections/leadership_retreats/retreat-formats";
import Outcomes from "@/components/sections/leadership_retreats/outcomes";
import JoinSteps from "@/components/sections/leadership_retreats/join-steps";
import ImperiumAbout from "@/components/sections/leadership_retreats/imperium-about";

/**
 * `/leadership-retreats` — Imperium's retreat page, top to bottom as in the
 * design. Every section reads its own slice of the page content.
 */
export default function LeadershipRetreatsPage({ page }) {
  return (
    <>
      <RetreatHero data={page.hero} breadcrumbs={page.breadcrumbs} />
      <SectionNav data={page.section_nav} ctaClassName="text-gold" />
      <AudienceTabs data={page.audience} />
      <DesignFlow data={page.design_flow} />
      <Experience data={page.experience} />
      <RetreatFormats data={page.formats} />
      <Outcomes data={page.outcomes} />
      <JoinSteps data={page.join} />
      <ImperiumAbout data={page.about} />

      <Section id="faq" aria-labelledby="faq-h" className="scroll-mt-32 bg-paper" innerClassName="max-w-220">
        <Reveal className="mb-10 text-center">
          <RichHeading as="h2" id="faq-h" heading={page.faqs.heading} />
        </Reveal>
        <FaqDetails items={page.faqs.items} />
      </Section>

      {/* The live retreats form (/ceo-retreats) thanks at /thank-you/request-invite. */}
      <LeadershipRetreatForm data={page.form} thankYou="request-invite" />
    </>
  );
}
