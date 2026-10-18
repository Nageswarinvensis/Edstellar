import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import RichHeading from "@/components/common/rich-heading";
import Reveal from "@/components/common/reveal";

/** Clients FAQ — native <details> accordion, so it needs no client JS and the
 * answers ship in the HTML. */
export default function ClientsFaq({ data }) {
  if (!data?.items?.length) return null;

  return (
    <Section id="faq" aria-labelledby="faq-h" className="scroll-mt-16 bg-paper">
      <Reveal>
        <Box className="mb-10 text-center">
          <RichHeading
            as="h2"
            id="faq-h"
            heading={data.heading}
            className="m-0 text-[clamp(32px,4vw,40px)] font-medium leading-[1.08] tracking-[-0.03em] text-ink"
          />
        </Box>
      </Reveal>

      <Reveal delay={1}>
        <Box className="mx-auto max-w-[880px] border-t border-ink/12">
          {data.items.map((item, i) => (
            <Box key={item.q} as="details" className="group border-b border-ink/12" open={i === 0 ? true : undefined}>
              <Box
                as="summary"
                className="flex cursor-pointer select-none list-none items-center justify-between gap-6 py-6 text-lg font-semibold leading-[1.4] tracking-[-0.01em] text-ink [&::-webkit-details-marker]:hidden focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-navy max-sm:py-5 max-sm:text-base"
              >
                {item.q}
                <Box as="span" aria-hidden="true" className="relative size-8 shrink-0 rounded-full border border-ink/22 text-ink transition-[background,border-color,color] duration-200 group-open:border-ink group-open:bg-ink group-open:text-lime">
                  <Box as="span" className="absolute left-1/2 top-1/2 h-[1.7px] w-3 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-current" />
                  <Box as="span" className="absolute left-1/2 top-1/2 h-[1.7px] w-3 -translate-x-1/2 -translate-y-1/2 rotate-90 rounded-sm bg-current transition-transform duration-200 group-open:rotate-0" />
                </Box>
              </Box>
              <Box className="pb-6 pr-14 text-base leading-[1.7] text-ink/60 max-sm:pr-0">
                <Text as="p" className="m-0">{item.a}</Text>
              </Box>
            </Box>
          ))}
        </Box>
      </Reveal>
    </Section>
  );
}
