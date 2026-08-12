"use client";

import { useState } from "react";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils";

/**
 * Delivery modes' interactive body: a tab strip that swaps the panel below
 * it. Kept as the smallest client leaf — the section heading/lede stay
 * server-rendered.
 *
 * Design: `#modeTabs`, `.tab`, `#modePanels`, `.tab-panel`, `.mode-art`. The
 * design's photography is not reproduced (no real asset exists yet) — a
 * tonal placeholder carries the mode's badge instead, matching the
 * convention in `components/shared/hero-media.jsx`.
 */
export default function DeliveryModeTabs({ tabs }) {
  const [activeId, setActiveId] = useState(tabs?.[0]?.id);

  if (!tabs?.length) return null;

  const active = tabs.find((tab) => tab.id === activeId) || tabs[0];

  return (
    <Box>
      <Box
        role="tablist"
        className="mb-8 flex flex-wrap border-b border-ink/12"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === active.id;

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveId(tab.id)}
              className="relative mr-5.5 cursor-pointer border-none bg-transparent px-1.5 py-3.5 text-left transition-colors duration-200"
            >
              <Text
                as="span"
                className="mb-1.25 block font-mono text-[10px] tracking-[0.14em] text-ink/60 uppercase"
              >
                {tab.sublabel}
              </Text>
              <Text
                as="span"
                className={cn(
                  "font-display text-base font-semibold tracking-[-0.01em]",
                  isActive ? "text-ink" : "text-ink/60",
                )}
              >
                {tab.label}
              </Text>
              <span
                aria-hidden="true"
                className={cn(
                  "absolute -bottom-px left-0 h-0.5 bg-lime transition-all duration-300",
                  isActive ? "w-full" : "w-0",
                )}
              />
            </button>
          );
        })}
      </Box>

      <Box
        role="tabpanel"
        className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-10"
      >
        <Box>
          <Text
            as="h3"
            className="mb-3 font-display text-2xl font-semibold tracking-[-0.02em] text-ink"
          >
            {active.title}
          </Text>
          <Text as="p" className="mb-4.5 text-[15px] leading-[1.6] text-ink/60">
            {active.description}
          </Text>
          <Box as="ul" className="flex flex-col divide-y divide-ink/12">
            {active.points?.map((point) => (
              <Box
                as="li"
                key={point}
                className="flex gap-3 py-2.25 text-[14.5px] leading-[1.5] text-ink/60"
              >
                <Text
                  as="span"
                  aria-hidden="true"
                  className="font-bold text-ink/60"
                >
                  →
                </Text>
                {point}
              </Box>
            ))}
          </Box>
        </Box>

        <Box
          aria-hidden="true"
          className="relative flex h-70 items-center justify-center overflow-hidden rounded-[20px] bg-[linear-gradient(135deg,var(--color-navy)_0%,var(--color-navy-soft)_55%,var(--color-paper-cream)_100%)]"
        >
          <Text
            as="span"
            className="font-display text-5xl font-bold tracking-[-0.03em] text-paper/25"
          >
            {active.badge}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
