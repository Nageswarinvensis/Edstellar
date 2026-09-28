import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import LdPillTabs from "./ld-pill-tabs";

const MONO_LABEL = "font-mono text-[10px] leading-[1.7] tracking-[0.12em] uppercase";

/** One framework: what it is, its steps, how Edstellar uses it, and an origin / best-for card. */
function FrameworkPanel({ item }) {
  return (
    <Box className="grid grid-cols-1 items-start gap-5.5 min-[761px]:grid-cols-[1fr_250px] min-[761px]:gap-9">
      <Box>
        <Text as="p" className="mb-5 max-w-[64ch] text-[16.5px] leading-[1.6] text-ink">
          {item.description}
        </Text>

        <Text as="p" className={`${MONO_LABEL} mb-2.75 text-ink/60`}>
          {item.steps_label}
        </Text>
        <Box className="flex flex-wrap gap-2">
          {item.steps?.map((step) => (
            <Text
              key={step.label}
              as="span"
              className={
                step.marker
                  ? "inline-flex items-center gap-2 rounded-full border border-ink/12 bg-paper-warm py-1.25 pr-3.25 pl-1.5 text-[12.5px] leading-[1.7] text-navy"
                  : "inline-flex items-center rounded-full border border-ink/12 bg-paper-warm px-3.25 py-1.25 text-[12.5px] leading-[1.7] text-navy"
              }
            >
              {step.marker ? (
                <Box
                  as="span"
                  className="grid h-4.75 min-w-4.75 place-items-center rounded-full bg-lime px-0.75 font-mono text-[10px] font-semibold text-navy"
                >
                  {step.marker}
                </Box>
              ) : null}
              {step.label}
            </Text>
          ))}
        </Box>

        {item.usage ? (
          <Box className="mt-5 border-t border-ink/12 pt-4">
            <Text as="span" className={`${MONO_LABEL} mb-1.25 block text-navy`}>
              {item.usage.label}
            </Text>
            <Text as="p" className="text-[14.5px] leading-[1.55] text-ink/60">
              {item.usage.text}
            </Text>
          </Box>
        ) : null}
      </Box>

      {item.meta?.length ? (
        <Box as="aside" className="rounded-[12px] border border-ink/12 bg-paper-warm p-5.5">
          {item.meta.map((entry) => (
            <Box key={entry.label} className="mb-4.5 last:mb-0">
              <Text as="p" className={`${MONO_LABEL} mb-1 text-ink/60`}>
                {entry.label}
              </Text>
              <Text
                as="p"
                className="font-display text-[14.5px] leading-[1.35] font-semibold text-navy"
              >
                {entry.value}
              </Text>
            </Box>
          ))}
        </Box>
      ) : null}
    </Box>
  );
}

/**
 * "Grounded in the frameworks that make learning work" — one pill tab per
 * instructional-design framework (ADDIE, SAM, Bloom's…). A Server
 * Component: every panel renders here and is handed to `LdPillTabs`,
 * the client leaf that only owns which one is showing.
 *
 * Design: `learning-content-development (16).html` → `#frameworks`, `.fwt`,
 * `.fwt-grid`, `.fw-steps`, `.fwt-use`, `.fwt-meta`.
 */
export default function LdFrameworks({ data }) {
  if (!data?.items?.length) return null;

  const { section_id, heading, description, items } = data;

  return (
    <Section id={section_id} className="scroll-mt-20 border-t border-ink/12 bg-paper">
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
          label="Frameworks"
          idPrefix="fw"
          listClassName="mt-2 flex-nowrap overflow-x-auto pb-1.5 [scrollbar-width:thin]"
          tabClassName="px-5"
          panelClassName="px-8 py-7.5"
          items={items.map(({ id, name }) => ({ id, name }))}
          panels={items.map((item) => (
            <FrameworkPanel key={item.id} item={item} />
          ))}
        />
      </Reveal>
    </Section>
  );
}
