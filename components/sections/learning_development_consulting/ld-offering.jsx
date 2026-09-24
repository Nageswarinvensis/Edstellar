import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import Diagram from "./ld-offering-diagrams";
import LdOfferingTabs from "./ld-offering-tabs";

/** One panel's content: its heading, lede, and infographic. */
function OfferingPanel({ item }) {
  return (
    <>
      <Box>
        <Text
          as="h3"
          className="mb-2 text-[19px] leading-[1.3] font-bold tracking-[-0.01em] text-ink"
        >
          {item.title}
        </Text>
        <Text as="p" className="max-w-[52ch] text-[14px] leading-[1.6] text-ink/60">
          {item.description}
        </Text>
      </Box>
      <Diagram diagram={item.diagram} />
    </>
  );
}

/**
 * "What's included" — the six connected pieces of a learning strategy. A
 * Server Component: heading, lede, and every panel (copy + diagram) render
 * here and are handed to `LdOfferingTabs`, the client leaf that only owns
 * which panel is showing.
 *
 * Design: `section#offering`, `.head`, `.of-x`.
 */
export default function LdOffering({ data }) {
  if (!data?.items?.length) return null;

  const { section_id, heading, description, items } = data;

  return (
    <Section id={section_id} className="scroll-mt-20 bg-paper">
      <Box className="mb-10 max-w-[62ch]">
        <Reveal>
          <RichHeading heading={heading} />
        </Reveal>

        {description ? (
          <Reveal delay={1}>
            <Text as="p" className="mt-4 max-w-[60ch] text-[16px] leading-relaxed text-ink/70">
              {description}
            </Text>
          </Reveal>
        ) : null}
      </Box>

      <Reveal delay={2}>
        <LdOfferingTabs
          items={items.map(({ id, icon, title, summary }) => ({
            id,
            icon,
            title,
            summary,
          }))}
          panels={items.map((item) => (
            <OfferingPanel key={item.id} item={item} />
          ))}
        />
      </Reveal>
    </Section>
  );
}
