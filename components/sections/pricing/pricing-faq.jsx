import Box from "@/components/ui/Box";
import Section from "@/components/ui/Section";
import FaqDetails from "@/components/common/faq-details";
import PricingQuoteForm from "@/components/forms/pricing-quote-form";
import SectionHead, { SECTION_WIDTH, SECTION_PADDING } from "@/components/common/section-head";

/**
 * FAQs (`FaqDetails`) beside the sticky "Request a Training Quote" card.
 *
 * Design: corporate-training-pricing-v2 `#faqs`, `.faq-wrap`, `.faq`,
 * `.quote`.
 */
export default function PricingFaq({ faqs, quote }) {
  const items = faqs?.items ?? [];
  if (!items.length && !quote) return null;

  return (
    <Section id="faqs" className={SECTION_PADDING} innerClassName={SECTION_WIDTH}>
      <Box className="grid items-start gap-11 min-[961px]:grid-cols-[1.25fr_0.75fr] min-[961px]:gap-14">
        <Box>
          <SectionHead heading={faqs.heading} align="start" />

          <FaqDetails items={items} />
        </Box>

        {quote ? <PricingQuoteForm data={quote} /> : null}
      </Box>
    </Section>
  );
}
