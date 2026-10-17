"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import CtaButton from "@/components/common/cta-button";
import { cn } from "@/lib/utils";

/**
 * Positions for 6 nodes arranged clockwise around the wheel (matching HTML design).
 * Values are percentages used in inline `style`. Nodes are translated -50% on both
 * axes so they centre exactly on the position point.
 */
const WHEEL_POS = [
  { top: "12%",  left: "50%"   }, // 12 o'clock
  { top: "31%",  left: "82.9%" }, // 2 o'clock
  { top: "69%",  left: "82.9%" }, // 4 o'clock
  { top: "88%",  left: "50%"   }, // 6 o'clock
  { top: "69%",  left: "17.1%" }, // 8 o'clock
  { top: "31%",  left: "17.1%" }, // 10 o'clock
];

/**
 * The interactive coaching-tracks wheel + detail panel.
 *
 * Left: six numbered rectangular node cards around a circle — clicking one
 *   activates its track.
 * Right: the active track's title, tagline, work-on list, and choose-for row.
 * Below both: an optional navy CTA band.
 *
 * "use client" is required for the node-selection useState.
 */
export default function CoachingTracks({ data }) {
  const [active, setActive] = useState(0);

  if (!data?.items?.length) return null;

  const { section_id, heading, description, center_label, items, cta } = data;
  const track = items[active];

  // center_label may contain a literal "\n" escape sequence from JSON
  const centerLines = (center_label ?? "").split(/\\n|\n/);

  return (
    <Section id={section_id} className="bg-white">
      {/* Section heading */}
      <Box className="mb-12 max-w-205 max-[600px]:mb-8">
        <Reveal>
          <RichHeading heading={heading} emphasisClassName="font-normal" />
        </Reveal>
        {description ? (
          <Reveal delay={1}>
            <Text as="p" className="mt-4 max-w-[68ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink/60">
              {description}
            </Text>
          </Reveal>
        ) : null}
      </Box>

      {/* Wheel + panel grid */}
      <Box className="grid grid-cols-[1fr_1fr] items-center gap-8 max-[1000px]:grid-cols-1">

        {/* --- Wheel --- */}
        <Box
          role="tablist"
          aria-label="Coaching focus areas"
          className="relative mx-auto aspect-square w-full max-w-[540px]"
        >
          {/* SVG background: dashed outer ring, navy center circle, lime dashed ring */}
          <svg
            viewBox="0 0 100 100"
            aria-hidden="true"
            focusable="false"
            className="absolute inset-0 w-full h-full"
          >
            {/* Outer dashed ring connecting nodes */}
            <circle
              cx="50" cy="50" r="38"
              fill="none"
              stroke="rgba(10,22,40,.2)"
              strokeWidth=".4"
              strokeDasharray="1 1.6"
            />
            {/* Navy center circle */}
            <circle cx="50" cy="50" r="15" fill="#0A1628" />
            {/* Lime dashed ring around center */}
            <circle
              cx="50" cy="50" r="17.5"
              fill="none"
              stroke="#C8F135"
              strokeWidth=".3"
              strokeDasharray="1 1"
            />
          </svg>

          {/* Center label — lime coloured */}
          <Box
            as="span"
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none"
          >
            <Text as="small" className="font-mono text-[10px] uppercase tracking-[0.14em] text-lime leading-[1.5] whitespace-pre-line">
              {centerLines.join("\n")}
            </Text>
          </Box>

          {/* Track node cards */}
          {items.map((item, index) => {
            const pos = WHEEL_POS[index];
            const isActive = index === active;

            return (
              <button
                key={item.number}
                type="button"
                role="tab"
                id={`wh-t${index}`}
                aria-controls={`wh-p${index}`}
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActive(index)}
                style={{ top: pos.top, left: pos.left }}
                className={cn(
                  "absolute -translate-x-1/2 -translate-y-1/2 w-[156px] rounded-[14px] border px-3 py-3.5 text-left font-display font-semibold text-[14px] leading-[1.25] transition-all duration-250 cursor-pointer focus:outline-none focus-visible:outline-2 focus-visible:outline-navy focus-visible:outline-offset-[4px]",
                  "max-[600px]:w-[104px] max-[600px]:text-[11.5px] max-[600px]:px-1.5 max-[600px]:py-2.5",
                  isActive
                    ? "bg-navy text-paper border-navy shadow-[0_0_0_6px_rgba(200,241,53,.35)]"
                    : "bg-white border-ink/22 text-ink hover:border-navy hover:shadow-lift",
                )}
              >
                <Text
                  as="span"
                  className={cn(
                    "mb-1 block font-mono font-normal text-[11px] leading-[1]",
                    isActive ? "text-lime" : "text-ink/50",
                  )}
                >
                  {item.number}
                </Text>
                {item.title}
              </button>
            );
          })}
        </Box>

        {/* --- Active track panel --- */}
        <Box>
          {items.map((item, index) => (
            <Box
              key={index}
              id={`wh-p${index}`}
              role="tabpanel"
              aria-labelledby={`wh-t${index}`}
              hidden={index !== active}
              className="rounded-[20px] bg-paper-warm p-11 max-[600px]:p-7"
            >
              {/* Kicker */}
              <Text as="span" className="block font-mono text-[11px] uppercase tracking-[0.12em] text-ink/60 mb-0">
                Focus area {item.number} of {String(items.length).padStart(2, "0")}
              </Text>

              {/* Title */}
              <Text as="h3" className="mt-2.5 font-display text-[30px] leading-[1.15] font-medium tracking-[-0.02em] text-ink max-[600px]:text-[24px]">
                {item.title}
              </Text>

              {/* Tagline — serif italic, large */}
              {item.tagline ? (
                <Text as="p" className="mt-1.5 font-serif italic text-[24px] leading-[1.3] text-ink/70 mb-5 max-[600px]:text-[21px]">
                  {item.tagline}
                </Text>
              ) : null}

              {/* Work-on list */}
              {item.work_on?.length ? (
                <>
                  <Text as="p" className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink/60 mb-2.5">
                    What the team works on
                  </Text>
                  <Box as="ul" className="m-0 list-none p-0 flex flex-col gap-[9px]">
                    {item.work_on.map((point) => (
                      <Box as="li" key={point} className="flex items-center gap-2.5 text-[15px] text-ink">
                        <Check size={18} strokeWidth={1.8} className="flex-none text-navy" aria-hidden="true" />
                        {point}
                      </Box>
                    ))}
                  </Box>
                </>
              ) : null}

              {/* Choose it for — border-top divider + plain text */}
              {item.choose_for ? (
                <Box className="mt-5 pt-4 border-t border-ink/12">
                  <Text as="p" className="text-[15px] text-ink">
                    <Text as="span" className="mb-1 block font-mono text-[11px] uppercase tracking-[0.12em] text-ink/60">
                      Choose it for
                    </Text>
                    {item.choose_for}
                  </Text>
                </Box>
              ) : null}
            </Box>
          ))}
        </Box>
      </Box>

      {/* CTA band */}
      {cta ? (
        <Box className="mt-10 mx-auto max-w-250 rounded-[20px] bg-navy px-8.5 py-7 text-paper flex flex-wrap items-center justify-between gap-5">
          <Box>
            <Text as="p" className="font-display text-[clamp(19px,2vw,23px)] font-bold text-paper">
              {cta.heading}
            </Text>
            {cta.description ? (
              <Text as="p" className="text-[14.5px] text-paper/72 max-w-[62ch] mt-1.5">
                {cta.description}
              </Text>
            ) : null}
          </Box>
          {cta.button?.href ? (
            <CtaButton color="lime" arrow render={<Link href={cta.button.href} />}>
              {cta.button.label}
            </CtaButton>
          ) : null}
        </Box>
      ) : null}
    </Section>
  );
}
