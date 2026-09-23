import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import CtaButton from "@/components/common/cta-button";
import { cn } from "@/lib/utils";

export default function CtaTrainer({ trainer, data, emphasisClassName }) {
  // Support passing either data directly OR data.ctaTrainerData wrapper
  const ctaData = data?.ctaTrainerData || data || {};

  // Extract trainer first name if trainer object exists
  const trainerFirstName = trainer?.name ? trainer.name.split(" ")[0] : null;

  const sectionId = ctaData.sectionId || "contact";

  // Default subtitle and button for trainer pages if missing in JSON object
  const subtitle =
    ctaData.subtitle ??
    (trainerFirstName
      ? "Talk to an Edstellar consultant and we will confirm availability, delivery mode, and timezone for your team."
      : null);

  const button =
    ctaData.button ??
    (trainerFirstName
      ? {
          text: "Talk to Edstellar Consultant",
          href: "#contact",
          showArrow: true,
        }
      : null);

  // `ctaData.heading` is content-authored (TNA page): a plain string with
  // the emphasis phrase already marked with `<span>`. On a trainer page no
  // `data` is passed at all, so this falls back to a heading built around
  // the trainer's own name instead.
  const heading =
    ctaData.heading ||
    (trainerFirstName
      ? `Want ${trainerFirstName} for your <span>next program</span>?`
      : "");

  return (
    <Section id={sectionId} className="bg-ink py-16 lg:py-20">
      <Box className="mx-auto max-w-4xl flex flex-col items-center text-center px-4">
        <Reveal>
          <RichHeading
            heading={heading}
            className="text-white"
            emphasisClassName={cn("text-lime", emphasisClassName)}
          />
        </Reveal>

        {subtitle && (
          <Reveal delay={1}>
            <Text
              as="p"
              className="mx-auto mt-4 max-w-2xl text-[18px] leading-relaxed text-paper/80"
            >
              {subtitle}
            </Text>
          </Reveal>
        )}

        {/* CTA Button */}
        <Reveal delay={2}>
          {button && (
            <Box className="mt-8 flex justify-center">
              <CtaButton
                render={<a href={button.href || "#contact"} />}
                arrow={button.showArrow ?? true}
                color="lime"
                className="px-7 py-3.5 text-sm"
              >
                {button.text || "Talk to Edstellar Consultant"}
              </CtaButton>
            </Box>
          )}
        </Reveal>
      </Box>
    </Section>
  );
}
