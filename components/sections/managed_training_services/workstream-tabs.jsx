"use client";

import { useRef, useState } from "react";
import { Calendar, Layers, MessageCircle, Presentation, RefreshCw, Sparkles } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils";

const ICONS = {
  calendar: Calendar,
  presentation: Presentation,
  layers: Layers,
  message: MessageCircle,
  refresh: RefreshCw,
};

/**
 * The interactive part of the workstreams console: a vertical tab list (a
 * scrolling row below 900px) and the selected workstream's panel. Every panel
 * is rendered, inactive ones `hidden`, so all copy is in the server HTML.
 * Arrow keys / Home / End move between tabs (WAI-ARIA tabs pattern).
 */
export default function WorkstreamTabs({ items, tabsLabel, getLabel }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);

  const focusTab = (index) => {
    const next = (index + items.length) % items.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event) => {
    const moves = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    if (event.key in moves) {
      event.preventDefault();
      focusTab(active + moves[event.key]);
    } else if (event.key === "Home") {
      event.preventDefault();
      focusTab(0);
    } else if (event.key === "End") {
      event.preventDefault();
      focusTab(items.length - 1);
    }
  };

  return (
    <Box className="grid grid-cols-[300px_1fr] items-start gap-7 max-[900px]:grid-cols-1 max-[900px]:gap-4">
      <Box
        role="tablist"
        aria-label={tabsLabel}
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="no-scrollbar sticky top-21 flex flex-col gap-1.5 max-[900px]:static max-[900px]:flex-row max-[900px]:gap-2 max-[900px]:overflow-x-auto max-[900px]:pb-1.5"
      >
        {items.map((item, index) => {
          const Icon = ICONS[item.icon] ?? Sparkles;
          const selected = index === active;
          return (
            <button
              key={item.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`cnt-${item.id}`}
              aria-controls={`cnp-${item.id}`}
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              className={cn(
                "flex w-full cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-3.25 text-left font-body transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy max-[900px]:w-auto max-[900px]:flex-none max-[900px]:whitespace-nowrap max-[900px]:px-3.5 max-[900px]:py-2.5",
                selected
                  ? "border-navy bg-navy text-paper"
                  : "border-transparent bg-transparent text-ink hover:border-ink/12 hover:bg-white max-[900px]:border-ink/12 max-[900px]:bg-white",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "flex size-8.5 flex-none items-center justify-center rounded-[9px] text-navy max-[900px]:size-6.5",
                  selected ? "bg-lime" : "bg-lime-soft",
                )}
              >
                <Icon size={18} strokeWidth={1.7} className="max-[900px]:size-3.75" />
              </span>
              <span>
                <b className="block font-display text-[14.5px] leading-[1.25] font-bold tracking-[-0.01em]">
                  {item.title}
                </b>
                {item.subtitle ? (
                  <span
                    className={cn(
                      "mt-0.5 block text-[12px] leading-[1.4] max-[900px]:hidden",
                      selected ? "text-paper/65" : "text-ink/60",
                    )}
                  >
                    {item.subtitle}
                  </span>
                ) : null}
              </span>
            </button>
          );
        })}
      </Box>

      <Box>
        {items.map((item, index) => (
          <Box
            key={item.id}
            role="tabpanel"
            id={`cnp-${item.id}`}
            aria-labelledby={`cnt-${item.id}`}
            tabIndex={0}
            hidden={index !== active}
            className="overflow-hidden rounded-[14px] border border-ink/12 bg-white shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
          >
            <Box className="grid grid-cols-[1fr_auto] items-start gap-5 border-b border-ink/12 px-8 pt-7 pb-6 max-[600px]:grid-cols-1 max-[600px]:px-5 max-[600px]:pt-5.5 max-[600px]:pb-5">
              <Box>
                <Text as="h3" className="mb-2 text-[clamp(20px,2vw,24px)] leading-[1.2]">
                  {item.title}
                </Text>
                <Text as="p" className="max-w-[60ch] text-[15px] leading-[1.6] text-ink/60">
                  {item.description}
                </Text>
              </Box>
              {item.tag ? (
                <Text
                  as="span"
                  className="justify-self-start rounded-full bg-lime-soft px-3 py-1.5 font-mono text-[10.5px] leading-[1.3] tracking-[0.08em] whitespace-nowrap text-navy uppercase"
                >
                  {item.tag}
                </Text>
              ) : null}
            </Box>

            <Box className="grid grid-cols-2 max-[600px]:grid-cols-1">
              {item.points?.map((point, pointIndex) => (
                <Box
                  key={point.title}
                  className="border-b border-ink/12 px-8 py-5 odd:border-r max-[600px]:px-5 max-[600px]:py-4.5 max-[600px]:odd:border-r-0"
                >
                  <Text
                    as="h4"
                    className="mb-1.5 flex items-baseline gap-2.25 text-[15px] leading-[1.35] font-bold tracking-[-0.01em]"
                  >
                    <i className="font-mono text-[10.5px] font-normal text-ink/60 not-italic">
                      {String(pointIndex + 1).padStart(2, "0")}
                    </i>
                    {point.title}
                  </Text>
                  <Text as="p" className="text-[13.5px] leading-[1.55] text-ink/60">
                    {point.description}
                  </Text>
                </Box>
              ))}
            </Box>

            {item.deliverables?.length ? (
              <Box className="flex flex-wrap items-center gap-2 bg-paper px-8 pt-4.5 pb-5.5 max-[600px]:px-5 max-[600px]:pt-4 max-[600px]:pb-5">
                <Text
                  as="span"
                  className="mr-1.5 font-mono text-[10px] leading-[1.6] tracking-[0.1em] text-ink/60 uppercase"
                >
                  {getLabel}
                </Text>
                {item.deliverables.map((deliverable) => (
                  <Text
                    as="span"
                    key={deliverable}
                    className="rounded-full border border-ink/12 bg-white px-3 py-1.25 text-[12.5px] leading-[1.3] font-semibold text-ink"
                  >
                    {deliverable}
                  </Text>
                ))}
              </Box>
            ) : null}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
