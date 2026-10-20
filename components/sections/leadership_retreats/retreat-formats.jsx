"use client";

import { useState } from "react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import { CtaButton } from "@/components/common/cta-button";
import { cn } from "@/lib/utils";

/**
 * "Private retreats for your leadership team" — a switch that brings the
 * private or open retreat card to the front of a two-card deck. Both cards
 * are always in the HTML; the one behind is offset and inert.
 * Design: leadership-retreats `.p5-grid`, `.p5-sw`, `.p5-deck`, `.p5-card`.
 */
export default function RetreatFormats({ data }) {
  const [front, setFront] = useState(data.items[0].key);

  return (
    <Section id="private" aria-labelledby="pv-h" className="scroll-mt-32 bg-paper-warm">
      <Box className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <RichHeading as="h2" id="pv-h" heading={data.heading} className="mb-4" />
          <Text as="p" className="mb-8 max-w-[56ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7]">
            {data.description}
          </Text>
          <Box role="group" aria-label={data.switch_label} className="inline-flex rounded-full border border-ink/12 bg-white p-1">
            {data.items.map((item) => (
              <button
                key={item.key}
                type="button"
                aria-pressed={front === item.key}
                aria-controls={`format-${item.key}`}
                onClick={() => setFront(item.key)}
                className={cn(
                  "cursor-pointer rounded-full px-4.5 py-3 text-[15px] font-medium transition-colors",
                  front === item.key ? "bg-navy text-paper" : "text-ink-muted hover:text-ink",
                )}
              >
                {item.tab}
              </button>
            ))}
          </Box>
        </Reveal>

        <Reveal delay={1} className="grid pt-6 pr-6">
          {data.items.map((item) => {
            const isFront = front === item.key;
            const dark = item.key === "private";
            return (
              <Box
                as="article"
                key={item.key}
                id={`format-${item.key}`}
                inert={!isFront}
                className={cn(
                  "col-start-1 row-start-1 rounded-[18px] p-8 transition-[transform,opacity] duration-400 motion-reduce:transition-none",
                  dark ? "bg-navy text-paper" : "border border-ink/12 bg-white text-ink",
                  isFront
                    ? "z-10 shadow-[0_24px_60px_-24px_rgba(10,22,40,0.45)]"
                    : "z-0 translate-x-6 -translate-y-6 opacity-60",
                )}
              >
                <Text as="p" className="mb-2 text-[14px] font-medium text-gold">
                  {item.kicker}
                </Text>
                <Text as="h3" className={cn("mb-4", dark ? "text-paper" : "text-ink")}>
                  {item.title}
                </Text>
                <Box as="dl" className="m-0 mb-8">
                  {item.rows.map((row) => (
                    <Box key={row.label} className={cn("border-t py-3.5", dark ? "border-paper/15" : "border-ink/12")}>
                      <dt className={cn("text-[12px] font-medium", dark ? "text-paper/60" : "text-ink-muted")}>{row.label}</dt>
                      <dd className="m-0 mt-1 font-display text-[15px] font-semibold">{row.value}</dd>
                    </Box>
                  ))}
                </Box>
                <CtaButton
                  arrow
                  render={<a href={item.cta.href} />}
                  className={dark ? "bg-gold text-navy" : "text-gold"}
                >
                  {item.cta.label}
                </CtaButton>
              </Box>
            );
          })}
        </Reveal>
      </Box>
    </Section>
  );
}
