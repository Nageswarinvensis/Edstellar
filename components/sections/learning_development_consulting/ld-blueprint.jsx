import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import LdBlueprintAccordion from "./ld-blueprint-accordion";

/**
 * The learning strategy blueprint — five stacked layers, each expanding to
 * what it covers and what it depends on. Heading and lede stay
 * server-rendered; only the accordion is a client leaf.
 *
 * Design: `#blueprint`, `.head`, `.bp-acc`.
 */
export default function LdBlueprint({ data }) {
  if (!data?.layers?.length) return null;

  const { section_id, heading, description, layers } = data;

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

      <Reveal delay={2}>
        <LdBlueprintAccordion layers={layers} />
      </Reveal>
    </Section>
  );
}
