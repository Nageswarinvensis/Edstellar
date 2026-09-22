import Link from "next/link";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import Section from "@/components/ui/Section";

export default function TnaEngine({ data }) {
  // Support both wrapped (data.tnaEngineData) and direct data props
  const content = data?.tnaEngineData || data || {};

  const sectionId = content.sectionId || "engine";
  const heading = content.heading || {};
  const subtitle = content.subtitle;
  const button = content.button;

  const prefixText = heading.prefix || "The automated";
  const highlightText = heading.highlightText || "TNA/TNI Engine.";
  const suffixText = heading.suffix || "";

  return (
    <Section id={sectionId} className="bg-white border-b border-t-[#0a16281f]">
      <Box className="mx-auto max-w-3xl flex flex-col items-center text-center px-4">
        {/* Heading */}
        <Reveal>
        <Text
          as="h2"
          className="text-[30px] font-bold tracking-tight text-ink lg:text-[36px]"
        >
          {prefixText}{" "}
          {highlightText && (
            <Text
              as="span"
              className="font-Cormorant Garamond italic text-[18px] font-normal text-ink/90 lg:text-[24px]"
            >
              {highlightText}
            </Text>
          )}
          {suffixText}
        </Text>
        </Reveal>

        {/* Subtitle / Description */}
        <Reveal delay={1}>
        {subtitle && (
          <Text
            as="p"
            className="mt-6 text-[18px] leading-relaxed text-ink/70"
          >
            {subtitle}
          </Text>
        )}
        </Reveal>

        {/* CTA Button */}
        <Reveal delay={2}>
        {button && (
          <Box className="mt-8 flex justify-center">
            <Link
              href={button.href || "#"}
              title={button.title || button.text || "See how it works"}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[13px] font-medium text-lime transition-all duration-200 hover:-translate-y-0.5 hover:opacity-95 hover:shadow-md"
            >
              <span>{button.text || "See how it works"}</span>
              {(button.showArrow ?? true) && (
                <span className="text-sm leading-none">→</span>
              )}
            </Link>
          </Box>
        )}
        </Reveal>
      </Box>
    </Section>
  );
}