import Section from "@/components/ui/Section";
import PricingPlans from "@/components/sections/pricing/pricing-plans";
import PricingNotes from "@/components/sections/pricing/pricing-notes";
import SectionHead, { SECTION_WIDTH, SECTION_PADDING } from "@/components/common/section-head";
import { cn } from "@/lib/utils";

/**
 * The pricing packages section (`#table`, the hero CTA's target): heading,
 * the tabbed plan cards, then the footnotes and exclusions.
 *
 * Design: corporate-training-pricing-v2 `#table`.
 */
export default function PricingTable({ data, quoteId }) {
  if (!data?.items?.length) return null;

  return (
    <Section id="table" className={cn("scroll-mt-20 bg-paper", SECTION_PADDING)} innerClassName={SECTION_WIDTH}>
      <SectionHead heading={data.heading} />
      <PricingPlans data={data} quoteId={quoteId} />
      <PricingNotes notes={data.notes} exclusions={data.exclusions} />
    </Section>
  );
}
