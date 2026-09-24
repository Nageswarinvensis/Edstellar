"use client";

import { useRef, useState } from "react";
import {
  ChartLine,
  LayoutGrid,
  Route,
  ShieldCheck,
  SlidersHorizontal,
  Target,
} from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils";

const ICONS = {
  target: Target,
  "operating-model": SlidersHorizontal,
  framework: LayoutGrid,
  pathway: Route,
  measurement: ChartLine,
  governance: ShieldCheck,
};

/**
 * "What's included" interactive body: a vertical tab list beside a sticky
 * panel. Kept as the smallest client leaf — the panels (copy + diagrams)
 * are rendered on the server and arrive as `panels`, so every panel's text
 * is in the HTML crawlers see; inactive ones are only `hidden`.
 *
 * Keyboard: roving tabindex; ArrowUp/ArrowDown (and Left/Right, as the
 * design does) move and select, Home/End jump to the ends.
 *
 * Design: `.of-x`, `.of-tabs`, `.of-tab`, `.of-panels`, `.of-panel`.
 */
export default function LdOfferingTabs({ items, panels }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef([]);

  if (!items?.length) return null;

  function select(index) {
    setActiveIndex(index);
    tabRefs.current[index]?.focus();
  }

  function onKeyDown(event, index) {
    const last = items.length - 1;
    const next = {
      ArrowDown: index === last ? 0 : index + 1,
      ArrowRight: index === last ? 0 : index + 1,
      ArrowUp: index === 0 ? last : index - 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    }[event.key];

    if (next === undefined) return;
    event.preventDefault();
    select(next);
  }

  return (
    <Box className="grid grid-cols-1 items-start gap-5.5 min-[901px]:grid-cols-2 min-[901px]:gap-10">
      <Box
        role="tablist"
        aria-label="What's included"
        aria-orientation="vertical"
        className="flex flex-col"
      >
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          const Icon = ICONS[item.icon] ?? Target;

          return (
            <button
              key={item.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              id={`oft-${item.id}`}
              type="button"
              role="tab"
              title={`Click Here to View ${item.title}`}
              aria-selected={isActive}
              aria-controls={`ofp-${item.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={cn(
                "flex w-full cursor-pointer items-start gap-4 rounded-[10px] border-t border-ink/12 bg-transparent px-3 py-5 text-left transition-[background-color,box-shadow] duration-200 first:border-t-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy",
                isActive && "border-transparent bg-white shadow-lift",
              )}
            >
              <Box
                as="span"
                className={cn(
                  "flex size-10 flex-none items-center justify-center rounded-[10px] text-navy transition-colors duration-200",
                  isActive ? "bg-lime" : "bg-paper-warm",
                )}
              >
                <Icon size={21} strokeWidth={1.7} aria-hidden="true" />
              </Box>
              <Box as="span" className="flex min-w-0 flex-col">
                <Text
                  as="span"
                  className="mb-0.75 font-display text-[16px] leading-[1.3] font-bold tracking-[-0.01em] text-ink"
                >
                  {item.title}
                </Text>
                <Text as="span" className="text-[13px] leading-[1.5] text-ink/60">
                  {item.summary}
                </Text>
              </Box>
            </button>
          );
        })}
      </Box>

      <Box className="min-[901px]:sticky min-[901px]:top-[calc(90px_+_var(--mobile-toc-h,0px))]">
        {items.map((item, index) => (
          <Box
            key={item.id}
            id={`ofp-${item.id}`}
            role="tabpanel"
            aria-labelledby={`oft-${item.id}`}
            tabIndex={0}
            hidden={index !== activeIndex}
            className="flex min-h-105 flex-col gap-6 rounded-[14px] border border-ink/12 bg-white px-8 py-7.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy max-sm:px-5 max-sm:py-6 [&[hidden]]:hidden"
          >
            {panels?.[index]}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
