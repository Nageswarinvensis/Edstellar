import PartnerHero from "@/components/sections/partner_program/partner-hero";
import ChoiceComparison from "@/components/sections/partner_program/choice-comparison";
import ProcessRail from "@/components/sections/partner_program/process-rail";
import ServicesTabs from "@/components/sections/partner_program/services-tabs";
import ChallengeCards from "@/components/sections/partner_program/challenge-cards";
import Concept from "@/components/sections/talent_assessment_services/concept";
import PartnerContact from "@/components/sections/partner_program/partner-contact";
import PartnerFaq from "@/components/sections/partner_program/partner-faq";

/**
 * Partner Program (`/partner-program`). Takes the page from
 * `getPartnerProgramPage()` and lays out its sections in the design's order.
 * The benefits section reuses the talent-assessment `Concept` (same `.ib`
 * design), with the page's Venn diagram as its `svg_image`.
 *
 * Design: `partner-program.html`.
 */
export default function PartnerProgramPage({ page }) {
  return (
    <>
      <PartnerHero data={page.hero} breadcrumbs={page.breadcrumbs} />
      <ChoiceComparison data={page.choice_comparison} />
      <ProcessRail data={page.process_rail} />
      <ServicesTabs data={page.services_tabs} />
      <ChallengeCards data={page.challenge_cards} />
      <Concept data={page.concept} />
      <PartnerContact data={page.contact_form} />
      <PartnerFaq data={page.faq} />
    </>
  );
}
