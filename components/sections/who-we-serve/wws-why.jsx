import Link from "next/link";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import RichHeading from "@/components/common/rich-heading";
import Reveal from "@/components/common/reveal";

export default function WwsWhy({ data }) {
  if (!data) return null;

  return (
    <Section
      id="why"
      aria-labelledby="why-h"
      className="scroll-mt-20 bg-paper-warm"
    >
      {/* Heading */}
      <Reveal>
        <Box className="mb-12 max-w-[760px]">
          <RichHeading
            as="h2"
            id="why-h"
            heading={data.heading}
            className="m-0 text-[clamp(32px,4vw,40px)] font-bold leading-[1.08] tracking-[-0.03em] text-ink"
          />
          <Text as="p" className="mt-5 text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink-muted">
            {data.lede}
          </Text>
        </Box>
      </Reveal>

      {/* 5A Flow — dark card */}
      <Reveal delay={1}>
        <Box className="rounded-[14px] bg-ink p-8 text-paper max-[600px]:p-[22px]">
          <Text
            as="h3"
            className="mb-6 flex items-center gap-3 m-0 font-display text-[20px] font-bold tracking-[-0.02em] text-paper"
          >
            <Box className="flex size-11 items-center justify-center rounded-[12px] bg-lime/10 text-lime">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
                <circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z"/>
              </svg>
            </Box>
            {data.flow.heading}
          </Text>

          {/* Steps — 5 columns with connector line */}
          <Box
            as="ol"
            aria-label="Edstellar 5A methodology"
            className="relative m-0 grid list-none gap-4 p-0 grid-cols-5 max-[900px]:grid-cols-1 max-[900px]:gap-4"
          >
            {/* Horizontal connector line (desktop) */}
            <Box
              aria-hidden="true"
              className="pointer-events-none absolute left-[18px] right-[18px] top-[18px] h-[2px] bg-gradient-to-r from-lime/22 to-lime max-[900px]:hidden"
            />
            {/* Vertical connector line (mobile) */}
            <Box
              aria-hidden="true"
              className="pointer-events-none absolute bottom-[18px] left-[17px] top-[18px] w-[2px] bg-gradient-to-b from-lime/22 to-lime min-[901px]:hidden"
            />

            {data.flow.steps.map((step) => (
              <Box
                as="li"
                key={step.n}
                className="relative max-[900px]:grid max-[900px]:grid-cols-[36px_1fr] max-[900px]:gap-x-[14px]"
              >
                {/* Dot */}
                <Box className="relative mb-3 flex size-9 items-center justify-center rounded-full border border-lime bg-ink font-mono text-[12px] font-medium text-lime max-[900px]:row-span-2 max-[900px]:mb-0">
                  {step.n}
                </Box>
                <Text as="b" className="block text-[16px] font-semibold text-paper">
                  {step.label}
                </Text>
                <Text as="span" className="mt-0.5 block text-[14px] leading-[1.5] text-paper/72">
                  {step.desc}
                </Text>
              </Box>
            ))}
          </Box>
        </Box>
      </Reveal>

      {/* Tiles — 4 columns */}
      <Reveal delay={2}>
        <Box className="mt-4 grid gap-4 grid-cols-4 max-[1200px]:grid-cols-2 max-[600px]:grid-cols-1">
          {data.tiles.map((tile) => (
            <Box
              key={tile.heading}
              className="flex flex-col rounded-[14px] bg-white p-7 shadow-[0_1px_2px_rgba(10,22,40,.07),0_4px_16px_rgba(10,22,40,.07)] transition-[transform,box-shadow] duration-200 hover:-translate-y-[3px] hover:shadow-[0_8px_32px_rgba(10,22,40,.12)]"
            >
              <Box className="mb-4 flex size-11 items-center justify-center rounded-[12px] bg-paper-warm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="size-5 text-ink" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 9h18M8 21h8"/>
                </svg>
              </Box>
              <Text as="b" className="block font-display text-[44px] font-bold leading-none tracking-[-0.03em] text-ink">
                {tile.big}
              </Text>
              <Text as="span" className="mb-4 mt-1.5 block border-b border-ink/[0.12] pb-4 text-[14px] text-ink-muted">
                {tile.unit}
              </Text>
              <Text as="h3" className="m-0 mb-1.5 font-display text-[18px] font-bold leading-[1.3] tracking-[-0.01em] text-ink">
                {tile.heading}
              </Text>
              <Text as="p" className="m-0 text-[14px] leading-[1.6] text-ink-muted">
                {tile.desc}
              </Text>
            </Box>
          ))}
        </Box>
      </Reveal>

      {/* More link */}
      <Reveal delay={3}>
        <Box className="mt-8">
          <Link
            href={data.moreHref}
            className="inline-flex items-center gap-1 text-[14px] font-semibold text-ink underline underline-offset-[4px]"
          >
            Read Edstellar success stories
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="size-[18px] ml-[6px] transition-transform duration-200 hover:translate-x-[3px]" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </Box>
      </Reveal>
    </Section>
  );
}
