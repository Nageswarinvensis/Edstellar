import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import { cn } from "@/lib/utils";

export default function TnaSteps({ data }) {
  if (!data) return null;

  const { sectionId, heading, subtitle, items } = data;

  return (
    <Section id={sectionId} className="bg-paper-warm">
      <Box className="mb-10 max-w-[62ch]">
        <Reveal>
          <RichHeading heading={heading} />
        </Reveal>

        {subtitle && (
          <Reveal delay={1}>
            <Text as="p" className="mt-4 text-[16px] leading-relaxed text-ink/70">
              {subtitle}
            </Text>
          </Reveal>
        )}
      </Box>

      <Box className="flex flex-col gap-6">
        {items?.map((step, index) => (
          <Reveal key={step.title} delay={Math.min(index, 4)}>
            <Box
              className={cn(
                "rounded-2xl border px-6 py-6 lg:px-8 lg:py-7",
                step.emphasis
                  ? "border-navy/20 bg-navy text-white"
                  : "border-ink/10 bg-white",
              )}
            >
              <Text
                as="span"
                className={cn(
                  "font-mono text-[11px] uppercase tracking-[0.15em]",
                  step.emphasis ? "text-lime" : "text-ink-muted",
                )}
              >
                Stage 0{index + 1}
              </Text>

              <Text
                as="h3"
                className={cn(
                  "mt-2 text-[19px] font-bold",
                  step.emphasis ? "text-white" : "text-ink",
                )}
              >
                {step.title}
              </Text>

              <Text
                as="p"
                className={cn(
                  "mt-2.5 max-w-[70ch] text-[15px] leading-relaxed",
                  step.emphasis ? "text-white/75" : "text-ink/70",
                )}
              >
                {step.description}
              </Text>
            </Box>
          </Reveal>
        ))}
      </Box>
    </Section>
  );
}
