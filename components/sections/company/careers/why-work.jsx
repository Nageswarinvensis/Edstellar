import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import IconTile from "@/components/sections/company/icon";

/** "Why Work with Us?" — four icon cards in a two-column grid.
 * Design: careers `[data-cmp="why-assessments"]`, `.cr-grid`, `.why-card`. */
export default function WhyWork({ data }) {
  if (!data?.items?.length) return null;

  return (
    <Section id="why" aria-labelledby="why-h" className="border-t border-ink/12 bg-paper-warm">
      <Reveal className="mb-11 max-w-[62ch]">
        <RichHeading
          as="h2"
          id="why-h"
          heading={data.heading}
          className="mb-4 text-[clamp(32px,4vw,40px)] leading-[1.08] font-bold"
          emphasisClassName="text-[1.08em] tracking-[-0.01em] text-ink"
        />
        {data.description ? (
          <Text as="p" className="max-w-[60ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink-muted">
            {data.description}
          </Text>
        ) : null}
      </Reveal>

      <Box className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {data.items.map((item, index) => (
          <Reveal key={item.title} delay={(index % 2) + 1}>
            <Box className="flex h-full flex-col rounded-[14px] border border-ink/12 bg-white p-7 transition-[transform,box-shadow] duration-250 hover:-translate-y-1.25 hover:shadow-[0_22px_46px_-28px_rgba(10,22,40,0.5)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
              <IconTile name={item.icon} className="mb-4 size-10.5 rounded-[11px] bg-lime-soft text-navy" />
              <Text as="h3" className="mb-2 text-base leading-[1.3] font-bold tracking-[-0.01em]">
                {item.title}
              </Text>
              <Text as="p" className="text-sm leading-[1.6] text-ink-muted">
                {item.description}
              </Text>
            </Box>
          </Reveal>
        ))}
      </Box>
    </Section>
  );
}
