import Link from "next/link";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";

function StepDescription({ parts = [] }) {
  return parts.map((part, index) =>
    part.href ? (
      <Link
        key={index}
        href={part.href}
        className="text-ink underline underline-offset-2 hover:text-navy"
      >
        {part.text}
      </Link>
    ) : (
      <span key={index}>{part.text}</span>
    ),
  );
}

/**
 * The 5A methodology — five numbered steps on a connecting rail. A single
 * row above 900px, with the rail running behind the dots; below that, a
 * vertical list with the dot beside each step and no rail.
 *
 * Design: `#method`, `.ra`, `.ra-line`, `.ra-step`, `.ra-dot`, `.ra-time`,
 * `.ra-out`.
 */
export default function LdMethod({ data }) {
  if (!data?.steps?.length) return null;

  const { section_id, heading, description, steps } = data;

  return (
    <Section id={section_id} className="border-t border-ink/12 bg-paper">
      <Box className="mb-11 max-w-[62ch]">
        <Reveal>
          <RichHeading
            heading={heading}
            className="mb-4"
            emphasisClassName="font-normal"
          />
        </Reveal>
        {description ? (
          <Reveal delay={1}>
            <Text
              as="p"
              className="max-w-[60ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink/60"
            >
              {description}
            </Text>
          </Reveal>
        ) : null}
      </Box>

      <Box
        as="ol"
        className="relative grid grid-cols-5 items-stretch gap-6 pt-2 max-[900px]:grid-cols-1 max-[900px]:gap-1.5"
      >
        <Box
          aria-hidden="true"
          className="absolute top-6.5 right-6 left-6 h-0.5 bg-ink/22 max-[900px]:hidden"
        />

        {steps.map((step, index) => (
          <Reveal
            as="li"
            key={step.title}
            delay={Math.min(index + 1, 4)}
            className="relative flex flex-col max-[900px]:flex-row max-[900px]:items-start max-[900px]:gap-4 max-[900px]:py-3"
          >
            <Text
              as="span"
              aria-hidden="true"
              className="relative z-1 mb-5 grid size-9.5 flex-none place-items-center rounded-full border-4 border-paper bg-navy font-display text-[15px] leading-none font-bold text-lime max-[900px]:mb-0"
            >
              {index + 1}
            </Text>

            <Box className="flex flex-1 flex-col">
              <Text
                as="h3"
                className="mb-2 text-[18px] leading-[1.3] tracking-[-0.01em]"
              >
                {step.title}
              </Text>

              {step.duration ? (
                <Text
                  as="span"
                  className="mb-2.5 self-start rounded-full bg-paper-warm px-2.5 py-0.75 font-mono text-[10px] leading-[1.4] tracking-[0.06em] text-ink/60 uppercase"
                >
                  {step.duration}
                </Text>
              ) : null}

              <Text as="p" className="text-[13.5px] leading-[1.55] text-ink/60">
                <StepDescription parts={step.description} />
              </Text>

              {step.output ? (
                <Text
                  as="p"
                  className="mt-auto border-t border-ink/12 pt-5 text-[14px] leading-[1.4] font-bold text-ink max-[900px]:mt-3"
                >
                  <Text
                    as="span"
                    className="mb-1.5 block font-mono text-[9.5px] leading-[1.4] font-medium tracking-[0.12em] text-navy uppercase"
                  >
                    Output
                  </Text>
                  {step.output}
                </Text>
              ) : null}
            </Box>
          </Reveal>
        ))}
      </Box>
    </Section>
  );
}
