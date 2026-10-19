import SectionNav from "@/components/common/section-nav";
import RetreatForm from "@/components/forms/retreat-form";
import {
  CxCta,
  CxDelivery,
  CxFaqs,
  CxHero,
  CxJourney,
  CxRelated,
  CxTeam,
  CxWhy,
} from "@/components/sections/client_experience/cx-sections";

/** `/exceptional-customer-experience` — top to bottom as in the design,
 * ending with the shared navy lead form (heading and reassurances beside it). */
export default function ClientExperiencePage({ page }) {
  return (
    <>
      <CxHero data={page.hero} facts={page.facts} breadcrumbs={page.breadcrumbs} />
      <SectionNav data={page.section_nav} />
      <CxJourney data={page.journey} />
      <CxTeam data={page.team} />
      <CxCta data={page.cta} />
      <CxDelivery data={page.delivery} />
      <CxWhy data={page.why} />
      <CxRelated data={page.related} />
      <CxFaqs data={page.faqs} />
      <RetreatForm data={page.form} accent="lime" split thankYou="exceptional-customer-experience" />
    </>
  );
}
