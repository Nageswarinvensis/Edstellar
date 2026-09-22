import Link from "next/link";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import RichHeading from "@/components/common/rich-heading";

export default function CtaTrainer({ trainer, data }) {
  // Support passing either data directly OR data.ctaTrainerData wrapper
  const ctaData = data?.ctaTrainerData || data || {};

  // Extract trainer first name if trainer object exists
  const trainerFirstName = trainer?.name ? trainer.name.split(" ")[0] : null;

  const sectionId = ctaData.sectionId || "contact";
  const heading = ctaData.heading || {};

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

  // Construct heading text
  const prefixText = trainerFirstName
    ? `${heading.prefix || "Want"} ${trainerFirstName} for your`
    : heading.prefix || "";

  const highlightText =
    heading.highlightText || (trainerFirstName ? "next program" : "");
  const suffixText = heading.suffix ?? (trainerFirstName ? "?" : "");

  return (
    <Section id={sectionId} className="bg-ink py-16 lg:py-20">
      <Box className="mx-auto max-w-4xl flex flex-col items-center text-center px-4">
        {/* Heading */}
        <Text
          as="h2"
          className="text-[30px] font-bold tracking-tight text-white lg:text-[36px]"
        >
          {prefixText}{" "}
          {highlightText && (
            <Text
              as="span"
              className="font-Cormorant Garamond italic text-[18px] font-normal text-lime lg:text-[24px]"
            >
              {highlightText}
            </Text>
          )}
          {suffixText}
        </Text>

        {/* Subtitle */}
        {subtitle && (
          <Text
            as="p"
            className="mx-auto mt-4 max-w-2xl text-[18px] leading-relaxed text-paper/80"
          >
            {subtitle}
          </Text>
        )}

        {/* CTA Button */}
        {button && (
          <Box className="mt-8 flex justify-center">
            <Link
              href={button.href || "#contact"}
              className="inline-flex items-center gap-2 rounded-full bg-lime px-7 py-3.5 text-sm font-semibold text-ink transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-12px_rgba(217,249,157,0.3)]"
            >
              <span>{button.text || "Talk to Edstellar Consultant"}</span>
              {(button.showArrow ?? true) && (
                <span className="text-base leading-none">→</span>
              )}
            </Link>
          </Box>
        )}
      </Box>
    </Section>
  );
}