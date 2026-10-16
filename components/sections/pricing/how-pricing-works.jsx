import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import SectionHead, { SECTION_WIDTH, SECTION_PADDING } from "@/components/common/section-head";
import { cn } from "@/lib/utils";

const pad = (n) => String(n).padStart(2, "0");

/**
 * "How Edstellar pricing works" — three numbered steps on navy, then the
 * worked example (licenses = trainees × days). A step's copy is `parts`:
 * runs of text, the `strong` ones set bright against the muted body.
 *
 * Design: corporate-training-pricing-v2 `#how-pricing-works`, `.hp-steps`,
 * `.hp`, `.hp-eg`.
 */
export default function HowPricingWorks({ data }) {
  const steps = data?.steps ?? [];
  if (!steps.length) return null;
  const { example } = data;

  return (
    <Section
      id="how-pricing-works"
      className={cn("bg-navy text-paper", SECTION_PADDING)}
      innerClassName={SECTION_WIDTH}
    >
      <SectionHead heading={data.heading} description={data.description} dark />

      <Box as="ol" className="grid list-none gap-5 min-[901px]:grid-cols-3">
        {steps.map((step, index) => (
          <Reveal
            as="li"
            key={step.title}
            delay={Math.min(index + 1, 4)}
            className="rounded-[18px] border border-paper/12 bg-navy-soft px-7 py-7.5 transition-[transform,border-color] duration-250 hover:-translate-y-1 hover:border-lime/40"
          >
            <Text
              as="span"
              aria-hidden="true"
              className="mb-5 inline-flex size-11 items-center justify-center rounded-full border-[1.5px] border-lime font-mono text-[13px] leading-none text-lime"
            >
              {pad(index + 1)}
            </Text>
            <Text as="h3" className="mb-2 text-[19px] leading-[1.3] font-semibold text-paper">
              {step.title}
            </Text>
            <Text as="p" className="text-[15px] leading-[1.7] text-paper/72">
              {step.parts.map((part, partIndex) =>
                part.strong ? (
                  <b key={partIndex} className="font-semibold text-paper">
                    {part.text}
                  </b>
                ) : (
                  part.text
                ),
              )}
            </Text>
          </Reveal>
        ))}
      </Box>

      {example ? (
        <Reveal className="mt-5.5 flex flex-wrap items-center gap-x-5 gap-y-3 rounded-2xl border border-lime/30 bg-lime/8 px-5.5 py-4.5">
          <Text as="span" className="font-mono text-[10px] leading-none tracking-[0.2em] text-lime uppercase">
            {example.label}
          </Text>
          <Text as="span" className="font-display text-[17px] leading-[1.4] font-semibold tracking-[-0.015em] text-paper">
            {example.text}
            <b className="text-lime">{example.result}</b>
          </Text>
        </Reveal>
      ) : null}
    </Section>
  );
}
