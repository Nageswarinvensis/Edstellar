import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import { SECTION_WIDTH } from "@/components/common/section-head";

/**
 * One pull quote from a hub user, large in the serif italic with olive
 * curly quotes, and its attribution.
 *
 * Design: Learning_Development_Resources `.testi`.
 */
export default function HubTestimonial({ data }) {
  if (!data?.quote) return null;

  return (
    <Section aria-label="What HR teams say" className="bg-paper-cream py-17 sm:py-22" innerClassName={SECTION_WIDTH}>
      <Reveal as="figure" className="text-center">
        <Box
          as="blockquote"
          className="mx-auto max-w-215 font-serif text-[clamp(24px,3vw,36px)] leading-[1.32] font-medium text-ink italic before:font-bold before:text-olive before:content-['\201C'] after:font-bold after:text-olive after:content-['\201D']"
        >
          {data.quote}
        </Box>
        <Text
          as="span"
          className="mt-6 block font-mono text-[11px] leading-[1.5] tracking-[0.2em] text-ink-muted uppercase"
        >
          <b className="font-medium text-ink">{data.name}</b> · {data.role}
        </Text>
      </Reveal>
    </Section>
  );
}
