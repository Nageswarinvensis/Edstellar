import Image from "next/image";
import { ChevronDown } from "lucide-react";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import SectionHead from "@/components/common/section-head";

const pad = (n) => String(n).padStart(2, "0");

/**
 * The sector's success stories — one native `<details>` row per client
 * engagement (they open and close with no JavaScript, and every story is in
 * the HTML). A row shows the client country's flag, a "01 / 04" counter and
 * the title; open, it lays out the objective, methodology, participants and
 * outcome in a 2-up grid with a lime top rule, then the client's quote. The
 * first row starts open.
 *
 * `data`: `section_id`, `heading` (emphasis in `<span>`), `items` `{ title,
 * flag, details: { label, text }[], quote: { text, name, role, organization }
 * }[]`.
 *
 * Design: government-employees-training-courses / training-for-universities
 * `[data-cmp="frameworks-accordion"]` `.fwk-sec .mcards`, `.acc`, `.acc-head`,
 * `.acc-flag`, `.acc-meta`, `.story-grid`, `.muse`, `.story-q`.
 */
export default function SuccessStories({ data }) {
  if (!data?.items?.length) return null;

  const { section_id, heading, items } = data;

  return (
    <Section id={section_id} className="scroll-mt-20 bg-paper-warm">
      <SectionHead heading={heading} align="start" />

      <Reveal className="mx-auto mt-2.5 flex max-w-[970px] flex-col gap-3">
        {items.map((item, index) => (
          <Box
            as="details"
            key={item.title}
            open={index === 0}
            className="group overflow-hidden rounded-[14px] border border-l-3 border-ink/12 border-l-lime bg-white shadow-rest transition-shadow duration-200 open:shadow-lift"
          >
            <Box
              as="summary"
              title={`Click Here to View ${item.title}`}
              className="flex cursor-pointer list-none items-center gap-4 px-5.5 py-4.25 hover:bg-paper-warm focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-navy max-sm:gap-3.25 max-sm:px-4 max-sm:py-3.75 [&::-webkit-details-marker]:hidden"
            >
              {item.flag ? (
                <Box
                  aria-hidden="true"
                  className="h-9 w-14.5 flex-none overflow-hidden rounded-[11px] border border-ink/12"
                >
                  <Image
                    src={item.flag}
                    alt=""
                    width={152}
                    height={92}
                    sizes="58px"
                    className="block size-full object-cover"
                  />
                </Box>
              ) : null}

              <Box className="flex min-w-0 flex-1 flex-col gap-0.5">
                <Text
                  as="span"
                  className="font-mono text-[10px] leading-[1.7] tracking-[0.14em] text-ink/45 uppercase"
                >
                  {pad(index + 1)} / {pad(items.length)}
                </Text>
                <Text
                  as="h3"
                  className="text-[16px] leading-[1.22] font-medium tracking-normal"
                >
                  {item.title}
                </Text>
              </Box>

              <ChevronDown
                size={20}
                strokeWidth={2}
                aria-hidden="true"
                className="flex-none text-ink/60 transition-transform duration-250 group-open:rotate-180 group-open:text-navy motion-reduce:transition-none"
              />
            </Box>

            <Box className="pt-0.5 pr-6 pb-5.5 pl-19.5 max-sm:px-4 max-sm:pb-5">
              {item.details?.length ? (
                <Box as="dl" className="grid gap-6 md:grid-cols-2 max-md:gap-3.5">
                  {item.details.map((detail) => (
                    <Box key={detail.label} className="border-t-2 border-lime pt-2.75">
                      <Box
                        as="dt"
                        className="mb-0.75 font-display text-[12.5px] leading-[1.25] font-semibold text-ink"
                      >
                        {detail.label}:
                      </Box>
                      <Box as="dd" className="m-0 text-[12px] leading-[1.65] text-ink/60">
                        {detail.text}
                      </Box>
                    </Box>
                  ))}
                </Box>
              ) : null}

              {item.quote?.text ? (
                <Box
                  as="figure"
                  className="m-0 mt-5 rounded-r-xl border-l-3 border-lime bg-white px-5.5 py-5"
                >
                  <Box as="blockquote" className="m-0">
                    <Text
                      as="p"
                      className="mb-3 font-serif text-[21px] leading-[1.4] text-navy italic"
                    >
                      {item.quote.text}
                    </Text>
                  </Box>
                  <Box
                    as="figcaption"
                    className="flex flex-col font-mono text-[11px] leading-[1.6] tracking-[0.08em] text-ink/60"
                  >
                    <Text as="span" className="font-mono text-[11px] leading-[1.6] font-medium text-navy">
                      {item.quote.name}
                    </Text>
                    {item.quote.role ? (
                      <Text as="span" className="font-mono text-[11px] leading-[1.6] text-inherit">
                        {item.quote.role}
                      </Text>
                    ) : null}
                    {item.quote.organization ? (
                      <Text as="span" className="font-mono text-[11px] leading-[1.6] text-inherit">
                        {item.quote.organization}
                      </Text>
                    ) : null}
                  </Box>
                </Box>
              ) : null}
            </Box>
          </Box>
        ))}
      </Reveal>
    </Section>
  );
}
