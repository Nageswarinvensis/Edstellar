import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import Section from "@/components/ui/Section";
import CtaButton from "@/components/common/cta-button";

export default function TnaEngine({ data }) {
  // Support both wrapped (data.tnaEngineData) and direct data props
  const content = data?.tnaEngineData || data || {};

  const sectionId = content.sectionId || "engine";
  const heading =
    content.heading || "The automated <span>TNA/TNI Engine.</span>";
  const subtitle = content.subtitle;
  const button = content.button;

  return (
    <Section id={sectionId} className="bg-white border-b border-t-[#0a16281f]">
      <Box className="mx-auto max-w-3xl flex flex-col items-center text-center px-4">
        {/* Heading */}
        <Reveal>
          <RichHeading heading={heading} />
        </Reveal>

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

        <Reveal delay={2}>
          {button && (
            <Box className="mt-8 flex justify-center">
              <CtaButton
                render={<a href={button.href || "#"} />}
                arrow={button.showArrow ?? true}
              >
                {button.text || "See how it works"}
              </CtaButton>
            </Box>
          )}
        </Reveal>
      </Box>
    </Section>
  );
}
