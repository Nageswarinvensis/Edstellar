import Box from "@/components/ui/Box";
import Section from "@/components/ui/Section";
import FaqDetails from "@/components/common/faq-details";
import SectionHead, { SECTION_PADDING, SECTION_WIDTH } from "@/components/common/section-head";

/**
 * FAQs — the heading (and the "write to us" note) pinned on the left, the
 * numbered `FaqDetails` list on the right.
 *
 * Design: Learning_Development_Resources `#faqs`, `.faq-wrap`.
 */
export default function HubFaq({ data }) {
  if (!data?.items?.length) return null;

  return (
    <Section id="faqs" className={SECTION_PADDING} innerClassName={SECTION_WIDTH}>
      <Box className="grid items-start gap-3 min-[961px]:grid-cols-[0.8fr_1.2fr] min-[961px]:gap-16">
        <SectionHead
          heading={data.heading}
          description={data.description}
          align="start"
          className="min-[961px]:sticky min-[961px]:top-24"
        />
        <FaqDetails items={data.items} />
      </Box>
    </Section>
  );
}
