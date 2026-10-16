import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import SectionHead from "@/components/common/section-head";
import { CtaButton } from "@/components/common/cta-button";

/**
 * How to become a partner: three numbered steps on a rail (the line behind
 * the dots shows above 1100px; the last dot is lime), then a centred button
 * down to the form. One column below 760px.
 *
 * Design: partner-program.html `[data-cmp="process-rail"]` `.er-rail.three`,
 * `.er-step`, `.er-dot`, `.er-card`, `.rail-cta`.
 */
export default function ProcessRail({ data }) {
  if (!data?.steps?.length) return null;

  const last = data.steps.length - 1;

  return (
    <Section id={data.section_id} className="border-t border-ink/12 bg-paper-warm">
      <SectionHead heading={data.heading} description={data.description} />

      <Box as="ol" className="relative grid list-none grid-cols-3 gap-4 p-0 max-[1100px]:gap-y-6 max-[760px]:grid-cols-1">
        <Box aria-hidden="true" className="absolute top-3.75 right-4 left-4 h-0.5 bg-ink/22 max-[1100px]:hidden" />

        {data.steps.map((step, index) => (
          <Reveal as="li" key={step.title} delay={index + 1} className="relative flex flex-col">
            <Box
              as="span"
              aria-hidden="true"
              className={
                index === last
                  ? "relative z-1 mb-4 grid size-8 place-items-center rounded-full bg-lime font-display text-[13px] font-bold text-navy"
                  : "relative z-1 mb-4 grid size-8 place-items-center rounded-full bg-navy font-display text-[13px] font-bold text-lime"
              }
            >
              {index + 1}
            </Box>
            <Box className="flex flex-1 flex-col gap-2.5 rounded-[14px] border border-ink/12 bg-white p-5">
              <Text as="h3" className="font-display text-[19px] leading-[1.2] font-bold tracking-[-0.015em] text-ink">
                <Text as="span" className="sr-only">{`Step ${index + 1}: `}</Text>
                {step.title}
              </Text>
              <Text as="p" className="text-[13.5px] leading-[1.55]">
                {step.description}
              </Text>
            </Box>
          </Reveal>
        ))}
      </Box>

      {data.cta?.href ? (
        <Reveal className="mt-9 flex justify-center">
          <CtaButton arrow render={<a href={data.cta.href} />}>
            {data.cta.label}
          </CtaButton>
        </Reveal>
      ) : null}
    </Section>
  );
}
