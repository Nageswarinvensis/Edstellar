import Link from "next/link";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import RichHeading from "@/components/common/rich-heading";
import Reveal from "@/components/common/reveal";

/** Clients by sector — a dark, two-column ranked list. Each row's "View these
 * clients" button carries `data-go-sector`, which the explorer's document
 * listener picks up to filter and scroll (see clients-explorer.jsx). */
export default function ClientsSectors({ data }) {
  if (!data?.rows?.length) return null;

  return (
    <Section id="sectors" aria-labelledby="sectors-h" className="scroll-mt-16 bg-navy text-paper">
      <Reveal>
        <Box className="max-w-[640px]">
          <RichHeading
            as="h2"
            id="sectors-h"
            heading={data.heading}
            className="m-0 text-[clamp(32px,4vw,40px)] font-medium leading-[1.08] tracking-[-0.03em] text-paper [&_span]:text-lime"
          />
          <Text as="p" className="mt-4 text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-paper/60">
            {data.lede}
          </Text>
        </Box>
      </Reveal>

      <Reveal delay={1}>
        <Box as="ul" className="mt-8 grid list-none grid-cols-2 gap-x-14 p-0 max-md:grid-cols-1">
          {data.rows.map((row) => (
            <Box
              as="li"
              key={row.key}
              className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 border-t border-paper/12 py-5"
            >
              <Text as="h3" className="m-0 font-body text-base font-semibold text-paper">
                {row.label}
              </Text>
              <Text as="span" className="justify-self-end font-display text-[22px] font-bold tracking-[-0.02em] text-lime">
                {row.count}
                <Text as="span" className="ml-1.5 font-body text-xs font-normal text-paper/60">clients</Text>
              </Text>

              <Box className="col-span-full h-2 overflow-hidden rounded-full bg-paper/12">
                <Box className="h-full rounded-full bg-lime" style={{ width: `${row.percent}%` }} />
              </Box>

              <Text as="p" className="col-span-full m-0 text-sm leading-[1.5] text-paper/60">
                {row.names}
              </Text>

              <Box className="col-span-full flex flex-wrap items-center gap-x-5 gap-y-1">
                <button
                  type="button"
                  data-go-sector={row.key}
                  className="min-h-6 py-1 text-[13px] font-semibold text-paper underline underline-offset-[3px] hover:text-lime focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
                >
                  View these clients
                </button>
                {row.industry && (
                  <Link
                    href={row.industry.href}
                    className="min-h-6 py-1 text-[13px] font-semibold text-paper/80 underline underline-offset-[3px] hover:text-lime"
                  >
                    {row.industry.label}
                  </Link>
                )}
              </Box>
            </Box>
          ))}
        </Box>
      </Reveal>
    </Section>
  );
}
