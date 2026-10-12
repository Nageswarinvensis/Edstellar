import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";

/**
 * The six-step behavioral assessment process, as a numbered rail with a week
 * badge, description, tag chips and a "You get" deliverable per step.
 *
 * Design: `#process`, `.er-rail`, `.er-step`, `.er-card`, `.er-get`.
 */
export default function Process({ data }) {
  if (!data?.steps?.length) return null;

  const { section_id, heading, description, steps } = data;
  const getLabel = data.get_label ?? "You get";

  return (
    <Section id={section_id} className="bg-paper-warm">
      <Box className="mb-12 max-w-[760px]">
        <Reveal>
          <RichHeading heading={heading} emphasisClassName="font-normal" />
        </Reveal>
        {description ? (
          <Reveal delay={1}>
            <Text
              as="p"
              className="mt-4 max-w-[64ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink/60"
            >
              {description}
            </Text>
          </Reveal>
        ) : null}
      </Box>

      <Box
        as="ol"
        className="relative grid list-none grid-cols-6 gap-4 p-0 max-[1100px]:grid-cols-3 max-[1100px]:gap-y-6 max-[600px]:grid-cols-1"
      >
        {/* Connecting line behind the dots (desktop only). */}
        <Box
          aria-hidden="true"
          className="absolute top-[15px] right-4 left-4 h-0.5 bg-ink/22 max-[1100px]:hidden"
        />

        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          return (
            <Reveal
              as="li"
              key={step.title}
              delay={Math.min((index % 3) + 1, 4)}
              className="relative flex flex-col"
            >
              <Box
                as="span"
                aria-hidden="true"
                className={`relative z-[1] mb-4 grid size-8 place-items-center rounded-full font-display text-[13px] font-bold ${
                  isLast ? "bg-lime text-navy" : "bg-navy text-lime"
                }`}
              >
                {index + 1}
              </Box>

              <Box className="flex flex-1 flex-col gap-2.5 rounded-2xl border border-ink/12 bg-white p-5">
                <Text
                  as="span"
                  className="self-start rounded-md bg-paper-cream px-2.25 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink"
                >
                  {step.week}
                </Text>

                <Text
                  as="h3"
                  className="font-display text-[19px] font-bold leading-[1.2] tracking-[-0.015em] text-ink"
                >
                  <Text as="span" className="sr-only">{`Step ${index + 1}: `}</Text>
                  {step.title}
                </Text>

                <Text as="p" className="text-[13.5px] leading-[1.55] text-ink/60">
                  {step.description}
                </Text>

                {step.chips?.length ? (
                  <Box className="flex flex-wrap gap-1.5">
                    {step.chips.map((chip) => (
                      <Text
                        as="span"
                        key={chip}
                        className="rounded-full border border-ink/22 bg-paper px-2.25 py-0.5 text-[11px] font-medium leading-[1.4] text-ink"
                      >
                        {chip}
                      </Text>
                    ))}
                  </Box>
                ) : null}

                {step.get ? (
                  <Box className="mt-auto rounded-[10px] bg-lime-soft px-3 py-2.5 text-[13.5px] font-bold leading-[1.35] text-ink">
                    <Text
                      as="span"
                      className="mb-0.75 block font-mono text-[9px] font-medium uppercase tracking-[0.12em]"
                    >
                      {getLabel}
                    </Text>
                    {step.get}
                  </Box>
                ) : null}
              </Box>
            </Reveal>
          );
        })}
      </Box>
    </Section>
  );
}
