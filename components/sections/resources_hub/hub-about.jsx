import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import SectionHead, { SECTION_PADDING, SECTION_WIDTH } from "@/components/common/section-head";
import StrongText from "@/components/sections/resources_hub/strong-text";
import { cn } from "@/lib/utils";

/**
 * "Why this hub" — the heading pinned on the left; on the right the story
 * (the first paragraph set large in the serif italic) and a three-fact strip.
 *
 * Design: Learning_Development_Resources `#about`, `.about`, `.facts`.
 */
export default function HubAbout({ data }) {
  const paragraphs = data?.paragraphs ?? [];
  if (!paragraphs.length) return null;

  return (
    <Section id="about" className={SECTION_PADDING} innerClassName={SECTION_WIDTH}>
      <Box className="grid items-start gap-7 min-[901px]:grid-cols-[0.9fr_1.1fr] min-[901px]:gap-16">
        <SectionHead heading={data.heading} align="start" className="mb-0 sm:mb-0 min-[901px]:sticky min-[901px]:top-24" />

        <Reveal delay={1}>
          {paragraphs.map((paragraph, index) => (
            <Text
              as="p"
              key={index}
              className={cn(
                index === 0
                  ? "font-serif text-[clamp(21px,2vw,26px)] leading-[1.38] text-ink italic"
                  : "mt-4.5 text-[16.5px] leading-[1.8] text-ink/60",
              )}
            >
              <StrongText text={paragraph} />
            </Text>
          ))}

          {data.facts?.length ? (
            <Box className="mt-9 grid gap-px overflow-hidden rounded-[18px] border border-ink/12 bg-ink/12 min-[521px]:grid-cols-3">
              {data.facts.map((fact) => (
                <Box key={fact.label} className="bg-white px-5 pt-5 pb-4.5">
                  <Text as="span" className="block font-display text-[26px] leading-[1.2] font-bold tracking-[-0.03em] text-olive">
                    {fact.value}
                  </Text>
                  <Text as="span" className="text-[13.5px] leading-[1.5] text-ink/60">
                    {fact.label}
                  </Text>
                </Box>
              ))}
            </Box>
          ) : null}
        </Reveal>
      </Box>
    </Section>
  );
}
