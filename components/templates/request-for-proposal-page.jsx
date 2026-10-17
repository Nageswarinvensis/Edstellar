import SectionNav from "@/components/common/section-nav";
import {
  RfpBand,
  RfpFaqs,
  RfpGovernment,
  RfpHero,
  RfpIncludes,
  RfpProcurement,
  RfpScope,
  RfpSubmit,
  RfpTimelineSection,
  RfpWhy,
} from "@/components/sections/rfp/rfp-sections";

/** `/request-for-proposal` — top to bottom as in the design. */
export default function RequestForProposalPage({ page }) {
  return (
    <>
      <RfpHero data={page.hero} strip={page.strip} breadcrumbs={page.breadcrumbs} />
      <SectionNav data={page.section_nav} />
      <RfpScope data={page.scope} />
      <RfpTimelineSection data={page.timeline} />
      <RfpBand data={page.band} />
      <RfpIncludes data={page.includes} />
      <RfpProcurement data={page.procurement} />
      <RfpGovernment data={page.government} />
      <RfpWhy data={page.why} />
      <RfpSubmit data={page.submit} />
      <RfpFaqs data={page.faqs} />
    </>
  );
}
