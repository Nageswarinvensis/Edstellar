import {
  ChartLine,
  Cpu,
  Globe,
  Link2,
  List,
  SlidersVertical,
  Sparkles,
} from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import { TrustStrip } from "@/components/sections/training_needs_analysis/tnawhyedstellar";
import { cn } from "@/lib/utils";

const ICONS = {
  link: Link2,
  chip: Cpu,
  chart: ChartLine,
  globe: Globe,
  list: List,
  sliders: SlidersVertical,
};

const CHIP =
  "rounded-full px-3 py-1.75 font-mono text-[10px] leading-none tracking-[0.03em] uppercase";
const CAPTION =
  "mt-3 text-center font-mono text-[10px] leading-normal tracking-[0.04em] text-ink/60 uppercase";

/**
 * Each card's small illustration, picked by `visual.type`. Decorative — the
 * card's own heading and text carry the point — so it is hidden from
 * assistive tech. The last step/tier is the highlighted one.
 */
function WhyVisual({ visual }) {
  if (!visual) return null;
  const { type, items = [], caption } = visual;
  const isLast = (index) => index === items.length - 1;

  let body = null;

  if (type === "flow") {
    body = (
      <Box className="flex flex-wrap items-center justify-center gap-1.5">
        {items.map((item, index) => (
          <Box as="span" key={item} className="contents">
            <Text
              as="span"
              className={cn(
                CHIP,
                isLast(index)
                  ? "bg-lime text-navy"
                  : "border border-ink/12 bg-paper-warm text-ink",
              )}
            >
              {item}
            </Text>
            {isLast(index) ? null : <span className="text-ink/22">→</span>}
          </Box>
        ))}
      </Box>
    );
  } else if (type === "signal") {
    body = (
      <Box className="rounded-[10px] border border-ink/12 bg-paper-warm p-3.5">
        <Box className="mb-3 flex items-center justify-between">
          <Text
            as="span"
            className="font-mono text-[9px] leading-none tracking-[0.06em] text-ink/60 uppercase"
          >
            {visual.title}
          </Text>
          <Text
            as="span"
            className="inline-flex items-center gap-1.5 font-mono text-[9px] leading-none tracking-[0.06em] text-ink/60 uppercase before:size-1.75 before:rounded-full before:bg-lime"
          >
            {visual.status}
          </Text>
        </Box>
        {items.map((row, index) => (
          <Box
            key={row.label}
            className="mb-2 flex items-center gap-2.5 last:mb-0"
          >
            <Text
              as="span"
              className="w-16 flex-none text-[11px] leading-none text-ink"
            >
              {row.label}
            </Text>
            <span className="block h-2 flex-1 overflow-hidden rounded-sm bg-white">
              <span
                className={cn(
                  "block h-full rounded-sm",
                  isLast(index) ? "bg-lime" : "bg-navy",
                )}
                // Width is the row's value from content — data, not styling.
                style={{ width: `${row.value}%` }}
              />
            </span>
          </Box>
        ))}
      </Box>
    );
  } else if (type === "bars") {
    body = (
      <Box className="flex h-20 items-end gap-2">
        {items.map((value, index) => (
          <span
            key={index}
            className={cn(
              "block flex-1 rounded-t-[5px]",
              isLast(index) ? "bg-lime" : "bg-navy",
            )}
            // Height is the bar's value from content — data, not styling.
            style={{ height: `${value}%` }}
          />
        ))}
      </Box>
    );
  } else if (type === "regions") {
    body = (
      <Box className="flex flex-wrap justify-center gap-1.5">
        {items.map((item) => (
          <Text
            key={item}
            as="span"
            className={cn(CHIP, "bg-lime-soft text-navy")}
          >
            {item}
          </Text>
        ))}
      </Box>
    );
  } else if (type === "steps") {
    body = (
      <Box className="flex items-center justify-center gap-1">
        {items.map((item, index) => (
          <Box as="span" key={index} className="contents">
            <Text
              as="span"
              className={cn(
                "flex size-8.5 flex-none items-center justify-center rounded-full font-display text-[13px] leading-none font-bold",
                isLast(index) ? "bg-lime text-navy" : "bg-navy text-paper",
              )}
            >
              {item}
            </Text>
            {isLast(index) ? null : (
              <span className="h-0.5 max-w-5.5 flex-1 bg-ink/22" />
            )}
          </Box>
        ))}
      </Box>
    );
  } else if (type === "tiers") {
    body = (
      <Box className="flex flex-wrap justify-center gap-1.5">
        {items.map((item, index) => (
          <Text
            key={item}
            as="span"
            className={cn(
              CHIP,
              isLast(index)
                ? "bg-lime text-navy"
                : "border border-ink/12 bg-paper-warm text-ink",
            )}
          >
            {item}
          </Text>
        ))}
      </Box>
    );
  }

  if (!body) return null;

  return (
    <Box aria-hidden="true" className="mb-5.5">
      {body}
      {caption ? (
        <Text as="p" className={CAPTION}>
          {caption}
        </Text>
      ) : null}
    </Box>
  );
}

/**
 * "Why choose Edstellar for learning strategy" — six proof cards in a
 * 3 / 2 / 1-column grid, each with an icon, a claim, a small illustration
 * and a "The difference" line pinned to the bottom, then the shared
 * industries-and-regions trust strip.
 *
 * Design: `learning-strategy-design (48).html` → `#why`, `.wg-grid`, `.wg`,
 * `.tir`.
 */
export default function LdWhy({ data }) {
  if (!data?.items?.length) return null;

  const { section_id, heading, description, difference_label, items, trust } =
    data;

  return (
    <Section id={section_id} className="border-t border-ink/12 bg-paper">
      <Box className="mb-11 max-w-[62ch]">
        <Reveal>
          <RichHeading
            heading={heading}
            className="mb-4"
            emphasisClassName="font-normal"
          />
        </Reveal>
        {description ? (
          <Reveal delay={1}>
            <Text
              as="p"
              className="max-w-[60ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink/60"
            >
              {description}
            </Text>
          </Reveal>
        ) : null}
      </Box>

      <Box className="grid grid-cols-3 gap-5 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
        {items.map((item, index) => {
          const Icon = ICONS[item.icon] || Sparkles;

          return (
            <Reveal key={item.title} delay={Math.min((index % 3) + 1, 4)}>
              <Box className="flex h-full flex-col rounded-[14px] border border-ink/12 bg-white p-7">
                <Box className="mb-4.5 flex size-11.5 items-center justify-center rounded-xl bg-lime-soft text-navy">
                  <Icon size={24} strokeWidth={1.7} aria-hidden="true" />
                </Box>

                <Text
                  as="h3"
                  className="mb-2 font-display text-[18px] leading-[1.3] font-bold tracking-[-0.01em] text-ink"
                >
                  {item.title}
                </Text>
                <Text
                  as="p"
                  className="mb-5 text-[14px] leading-[1.6] text-ink/60"
                >
                  {item.description}
                </Text>

                <WhyVisual visual={item.visual} />

                {item.difference ? (
                  <Box className="mt-auto border-t border-ink/12 pt-4">
                    <Text
                      as="p"
                      className="mb-1.5 font-mono text-[10px] leading-normal tracking-[0.12em] text-ink/60 uppercase"
                    >
                      {difference_label}
                    </Text>
                    <Text
                      as="p"
                      className="text-[14.5px] leading-normal font-semibold text-ink"
                    >
                      {item.difference}
                    </Text>
                  </Box>
                ) : null}
              </Box>
            </Reveal>
          );
        })}
      </Box>

      {trust ? <TrustStrip trust={trust} /> : null}
    </Section>
  );
}
