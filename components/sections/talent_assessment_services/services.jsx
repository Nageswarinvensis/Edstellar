"use client";

import { useState } from "react";
import {
  Target,
  MessageSquare,
  Users,
  UserRoundCheck,
  TrendingUp,
  Scale,
  Layers,
  Globe,
  BookOpen,
  ListChecks,
} from "lucide-react";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import { cn } from "@/lib/utils";

const ICONS = {
  target: Target,
  message: MessageSquare,
  users: Users,
  "user-check": UserRoundCheck,
  "trending-up": TrendingUp,
  scale: Scale,
  layers: Layers,
  globe: Globe,
  book: BookOpen,
  list: ListChecks,
};

// Decorative fill widths for the "bars" visual, cycled across rows.
const BAR_WIDTHS = ["70%", "78%", "62%", "72%"];

/** The flow diagram inside the active service panel. */
function Flow({ flow = [], style, caption, highlightIndex }) {
  if (!flow.length) return null;
  const isTags = style === "tags";
  const isBars = style === "bars";
  const last = flow.length - 1;
  // Default emphasis: first chip for tag rows, last for arrow flows. A data
  // `flow_highlight` overrides it so any node can carry the lime accent.
  const accent =
    typeof highlightIndex === "number" ? highlightIndex : isTags ? 0 : last;

  return (
    <Box className="mt-5.5 rounded-xl bg-paper-warm p-5.5">
      {isBars ? (
        <Box aria-hidden="true" className="grid gap-3">
          {flow.map((label, index) => (
            <Box
              key={label}
              className="grid grid-cols-[110px_1fr] items-center gap-3 text-[13px] font-semibold text-ink max-[600px]:grid-cols-[90px_1fr]"
            >
              <span>{label}</span>
              <span className="relative h-2.5 overflow-hidden rounded-sm border border-ink/12 bg-white">
                <span
                  className="block h-full rounded-sm bg-navy"
                  style={{ width: BAR_WIDTHS[index % BAR_WIDTHS.length] }}
                />
              </span>
            </Box>
          ))}
        </Box>
      ) : (
        <Box className="flex flex-wrap items-center gap-2">
          {flow.map((node, index) => {
            const highlight = index === accent;
            return (
              <Box as="span" key={node} className="contents">
                <Text
                  as="span"
                  className={cn(
                    "rounded-full px-3.5 py-2 text-[13px] font-semibold leading-[1.3]",
                    highlight
                      ? "bg-lime text-navy"
                      : "border border-ink/12 bg-white text-ink",
                  )}
                >
                  {node}
                </Text>
                {!isTags && index !== last ? (
                  <span aria-hidden="true" className="text-[14px] text-ink-muted">→</span>
                ) : null}
              </Box>
            );
          })}
        </Box>
      )}
      {caption ? (
        <Text as="p" className="mt-3.5 text-[12.5px] text-ink-muted">
          {caption}
        </Text>
      ) : null}
    </Box>
  );
}

/**
 * End-to-end behavioral assessment services as a vertical tablist with a sticky
 * visual panel: pick a service on the left, see its flow and deliverable on the
 * right.
 *
 * Design: `#services`, `.sx`, `.sx-it`, `.sx-p`, `.vz`, `.sx-get`.
 */
export default function Services({ data }) {
  const items = data?.items ?? [];
  const [active, setActive] = useState(0);

  if (!items.length) return null;

  const { section_id, heading, description } = data;
  const getLabel = data.get_label ?? "You get:";

  return (
    <Section id={section_id} className="bg-paper">
      <Box className="mb-12 max-w-[760px]">
        <Reveal>
          <RichHeading heading={heading} emphasisClassName="font-normal" />
        </Reveal>
        {description ? (
          <Reveal delay={1}>
            <Text
              as="p"
              className="mt-4 max-w-[64ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink-muted"
            >
              {description}
            </Text>
          </Reveal>
        ) : null}
      </Box>

      <Box className="grid grid-cols-2 items-start gap-x-10 gap-y-1 max-[900px]:grid-cols-1">
        {/* Tabs */}
        <Box role="tablist" aria-label="Edstellar behavioral assessment services" aria-orientation="vertical">
          {items.map((item, index) => {
            const Icon = ICONS[item.icon] || Target;
            const isActive = index === active;

            return (
              <Box
                as="button"
                type="button"
                key={item.title}
                role="tab"
                id={`svc-tab-${index}`}
                aria-selected={isActive}
                aria-controls={`svc-panel-${index}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActive(index)}
                className={cn(
                  "flex w-full cursor-pointer items-start gap-4 rounded-2xl border px-4.5 py-4 text-left transition-[background-color,box-shadow] duration-200 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy",
                  isActive
                    ? "border-ink/12 bg-white shadow-lift"
                    : "border-transparent bg-transparent hover:bg-white",
                )}
              >
                <Box
                  as="span"
                  className={cn(
                    "grid size-10.5 flex-none place-items-center rounded-[11px] transition-colors",
                    isActive ? "bg-lime text-navy" : "bg-paper-warm text-navy",
                  )}
                >
                  <Icon size={21} strokeWidth={1.7} aria-hidden="true" />
                </Box>
                <Box className="min-w-0">
                  <Text as="span" className="block font-display text-[16px] font-bold leading-[1.3] text-ink">
                    {item.title}
                  </Text>
                  <Text as="span" className="mt-0.75 block text-[14px] leading-[1.5] text-ink-muted">
                    {item.summary}
                  </Text>
                </Box>
              </Box>
            );
          })}
        </Box>

        {/* One sticky panel per service, all in the server HTML (inactive
            ones `hidden`), so every service's flow and deliverable is in the
            page source. */}
        {items.map((current, index) => {
          const CurrentIcon = ICONS[current.icon] || Target;
          return (
            <Box
              key={current.title}
              role="tabpanel"
              id={`svc-panel-${index}`}
              aria-labelledby={`svc-tab-${index}`}
              hidden={index !== active}
              className="sticky top-24 rounded-2xl border border-ink/12 bg-white p-8 max-[900px]:static max-[900px]:mt-1 max-[900px]:p-5.5"
            >
              <Box className="mb-4 grid size-11 place-items-center rounded-[11px] bg-lime text-navy max-[900px]:hidden">
                <CurrentIcon size={22} strokeWidth={1.7} aria-hidden="true" />
              </Box>
              <Text
                as="h3"
                className="font-display text-[22px] font-medium leading-[1.2] tracking-[-0.01em] text-ink max-[900px]:hidden"
              >
                {current.title}
              </Text>
              <Text as="p" className="mt-2.5 text-[15px] leading-[1.6] text-ink-muted max-[900px]:hidden">
                {current.summary}
              </Text>

              <Flow
                flow={current.flow}
                style={current.flow_style}
                caption={current.caption}
                highlightIndex={current.flow_highlight}
              />

              {current.get ? (
                <Text
                  as="p"
                  className="mt-5 inline-block rounded-full bg-lime-soft px-4 py-2 text-[14px] text-ink"
                >
                  <Box as="b" className="mr-1 font-bold">{getLabel}</Box>
                  {current.get}
                </Text>
              ) : null}
            </Box>
          );
        })}
      </Box>
    </Section>
  );
}
