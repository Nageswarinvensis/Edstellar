import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import LdPillTabs from "./ld-pill-tabs";

/** One tab's panel: what we look for, as chips, then the vendors we work with. */
function PlatformPanel({ item }) {
  return (
    <>
      <Text as="p" className="mb-4.5 max-w-[70ch] text-[16px] leading-[1.5] text-ink">
        {item.intro}
      </Text>

      <Box className="flex flex-wrap gap-2">
        {item.capabilities?.map((capability) => (
          <Text
            key={capability}
            as="span"
            className="rounded-full border border-ink/12 bg-paper-warm px-3.75 py-1.75 text-[13.5px] leading-[1.7] text-navy"
          >
            {capability}
          </Text>
        ))}
      </Box>

      {item.works_with ? (
        <Text
          as="p"
          className="mt-5 border-t border-ink/12 pt-4 text-[14px] leading-[1.55] text-ink/60"
        >
          <Text
            as="span"
            className="mb-1.25 block font-mono text-[10px] leading-[1.55] tracking-[0.12em] text-navy uppercase"
          >
            {item.works_with.label}
          </Text>{" "}
          {item.works_with.text}
        </Text>
      ) : null}
    </>
  );
}

/**
 * "The platforms, tools and integrations we work across" — LMS & LXP,
 * authoring tools and integrations, one pill tab each. A Server Component:
 * every panel renders here and is handed to `LdPillTabs`, the client leaf
 * that only owns which one is showing.
 *
 * Design: `learning-technology-consulting (9).html` → `#platforms`, `.pt`,
 * `.pt-tab`, `.pt-panel`, `.pt-chip`, `.pt-works`.
 */
export default function LdPlatforms({ data }) {
  if (!data?.items?.length) return null;

  const { section_id, heading, description, items } = data;

  return (
    <Section id={section_id} className="scroll-mt-20 border-t border-ink/12 bg-paper-warm">
      <Box className="mb-11 max-w-[62ch]">
        <Reveal>
          <RichHeading
            heading={heading}
            className="text-[clamp(32px,4vw,40px)] leading-[1.08] hyphens-none"
            emphasisClassName="font-normal"
          />
        </Reveal>

        {description ? (
          <Reveal delay={1}>
            <Text
              as="p"
              className="mt-4 max-w-[60ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink/60 hyphens-none"
            >
              {description}
            </Text>
          </Reveal>
        ) : null}
      </Box>

      <Reveal delay={2}>
        <LdPillTabs
          label="Platforms and tools"
          idPrefix="pt"
          listClassName="mt-1.5 flex-wrap"
          tabClassName="px-5.5"
          panelClassName="px-7.5 py-7"
          items={items.map(({ id, name }) => ({ id, name }))}
          panels={items.map((item) => (
            <PlatformPanel key={item.id} item={item} />
          ))}
        />
      </Reveal>
    </Section>
  );
}
