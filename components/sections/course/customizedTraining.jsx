import { Check } from "lucide-react";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import { CtaButton } from "@/components/shared/CtaButton";
import Reveal from "@/components/shared/reveal";

export default function CustomizedTraining({ data }) {
  if (!data) return null;

  return (
    <Section
      aria-label="Training delivery capability"
      className="border-t border-ink/10 bg-paper-warm py-14 lg:py-14 max-[900px]:py-11"
    >
      <Box className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-13">
        <Reveal>
          <Box>
            <Text
              as="p"
              className="mb-3.5 font-mono text-[10px] tracking-[0.17em] text-olive uppercase"
            >
              {data.eyebrow}
            </Text>

            <Text
              as="h2"
              className="mb-3.5 font-display text-[clamp(26px,2.6vw,34px)] leading-[1.18] font-bold tracking-[-0.03em] text-ink"
            >
              {data.title}
            </Text>

            <Text
              as="p"
              className="mb-6 max-w-[44ch] text-[15px] leading-[1.65] text-ink/60"
            >
              {data.description}
            </Text>

            {data.cta ? (
              <CtaButton color="navy" arrow render={<a href={data.cta.href} />}>
                {data.cta.label}
              </CtaButton>
            ) : null}
          </Box>
        </Reveal>

        <Reveal delay={1}>
          <Box as="ul" className="grid grid-cols-1 gap-3.25">
            {data.benefits?.map((benefit) => (
              <Box as="li" key={benefit} className="flex items-start gap-3">
                <Box className="mt-0.5 grid size-5.5 flex-none place-items-center rounded-full bg-lime/10 text-olive">
                  <Check size={12} strokeWidth={3} />
                </Box>

                <Text
                  as="span"
                  className="text-[15px] leading-normal text-ink"
                >
                  {benefit}
                </Text>
              </Box>
            ))}
          </Box>
        </Reveal>
      </Box>
    </Section>
  );
}
