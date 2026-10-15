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
 * Absolute positions for 6 nodes arranged clockwise around the wheel,
 * starting at 12 o'clock. Each value is a percentage of the container size.
 * The container uses `aspect-square` so percentages are equal in both axes.
 */
const WHEEL_POS = [
  { top: "0%", left: "50%" },     // 12 o'clock
  { top: "25%", left: "93.3%" },  // 2 o'clock
  { top: "75%", left: "93.3%" },  // 4 o'clock
  { top: "100%", left: "50%" },   // 6 o'clock
  { top: "75%", left: "6.7%" },   // 8 o'clock
  { top: "25%", left: "6.7%" },   // 10 o'clock
];

/**
 * The interactive coaching-tracks wheel + detail panel.
 *
 * Left: six numbered nodes around a circle — clicking one activates its track.
 * Right: the active track's title, tagline, work-on list, and choose-for pill.
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
        <Box className="relative mx-auto aspect-square max-w-[440px] w-full">
          {/* Inner ring */}
          <Box
            as="span"
            aria-hidden="true"
            className="absolute inset-[12%] rounded-full border-2 border-ink/10"
          />

          {/* Center label */}
          <Box
            as="span"
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none"
          >
            <Text as="small" className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/60 leading-[1.6] whitespace-pre-line">
              {centerLines.join("\n")}
            </Text>
          </Box>

          {/* Track nodes */}
          {items.map((item, index) => {
            const pos = WHEEL_POS[index];
            const isActive = index === active;

            return (
              <button
                key={item.number}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Track ${item.number}: ${item.title}`}
                aria-pressed={isActive}
                style={{ top: pos.top, left: pos.left }}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 cursor-pointer focus:outline-none"
              >
                {/* Dot */}
                <Box
                  as="span"
                  className={cn(
                    "grid size-12 place-items-center rounded-full border-2 text-[13px] font-mono font-bold transition-all duration-250",
                    isActive
                      ? "border-navy bg-navy text-lime shadow-[0_0_0_6px_rgba(200,241,53,.35)]"
                      : "border-ink/22 bg-white text-ink/60 hover:border-navy hover:text-navy",
                  )}
                >
                  {item.number}
                </Box>
                {/* Title label below dot */}
                <Text
                  as="small"
                  className="max-w-[70px] text-center text-[10px] font-display leading-[1.3] max-[600px]:hidden"
                >
                  {item.title}
                </Text>
              </button>
            );
          })}
        </Box>

        {/* --- Active track panel --- */}
        {track ? (
          <Box className="rounded-[14px] border border-ink/12 bg-paper p-8 max-[600px]:p-6 min-h-[360px]">
            {/* Kicker */}
            <Text as="p" className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/60 mb-2">
              Track {track.number} of {String(items.length).padStart(2, "0")}
            </Text>

            {/* Title */}
            <Text as="h3" className="font-display text-[28px] leading-[1.15] font-bold tracking-[-0.02em] text-ink mb-2">
              {track.title}
            </Text>

            {/* Tagline */}
            {track.tagline ? (
              <Text as="p" className="text-[16px] leading-[1.6] text-ink/60 italic font-serif mb-5">
                {track.tagline}
              </Text>
            ) : null}

            {/* Work-on list */}
            {track.work_on?.length ? (
              <>
                <Text as="p" className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink/60 mb-3">
                  What to work on
                </Text>
                <Box as="ul" className="m-0 list-none p-0 flex flex-col gap-2">
                  {track.work_on.map((point) => (
                    <Box as="li" key={point} className="flex items-start gap-2.5 text-[15px] text-ink">
                      <Check size={18} strokeWidth={1.8} className="mt-0.5 flex-none text-navy" aria-hidden="true" />
                      {point}
                    </Box>
                  ))}
                </Box>
              </>
            ) : null}

            {/* Choose-it-for pill */}
            {track.choose_for ? (
              <Box className="mt-5 inline-flex items-center gap-2 rounded-full bg-lime-soft px-4 py-2 font-display text-[14px] font-semibold text-ink">
                <Text as="span" className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink/60">
                  Choose it for
                </Text>
                {track.choose_for}
              </Box>
            ) : null}
          </Box>
        ) : null}
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
