"use client";

import { useState } from "react";
import { BarChart3, Bell, RefreshCw, Scale, Search, TrendingUp } from "lucide-react";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils";

const ICONS = {
  "trending-up": TrendingUp,
  "bar-chart": BarChart3,
  bell: Bell,
  "refresh-cw": RefreshCw,
  search: Search,
  scale: Scale,
};

function StageOverview({ parts = [] }) {
  return parts.map((part, index) =>
    part.strong ? (
      <strong key={index} className="font-bold text-lime not-italic">
        {part.text}
      </strong>
    ) : (
      <span key={index}>{part.text}</span>
    )
  );
}

/**
 * The lifecycle section's interactive half: a list of stages on the left,
 * the selected stage's detail on the right. Kept as the smallest client
 * leaf — the section heading/lede around it stay server-rendered.
 *
 * Design: `.life-wrap`, `.life-list`, `.life-btn`, `.life-detail`.
 */
export default function LifecycleStages({ stages }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!stages?.length) return null;

  const active = stages[activeIndex];

  return (
    <Box className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-11.5">
      <Box as="div" className="flex flex-col gap-2">
        {stages.map((stage, index) => {
          const Icon = ICONS[stage.icon];
          const isActive = index === activeIndex;

          return (
            <button
              key={stage.index}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-pressed={isActive}
              className={cn(
                "flex items-center gap-3.5 rounded-[14px] border px-5 py-4.5 text-left transition-colors duration-200",
                isActive
                  ? "border-lime bg-navy-soft"
                  : "border-paper/14 bg-paper/4 hover:border-lime/40"
              )}
            >
              <Box
                className={cn(
                  "flex size-8.5 flex-none items-center justify-center rounded-[9px]",
                  isActive ? "bg-lime text-navy" : "bg-lime/10 text-lime"
                )}
              >
                {Icon ? <Icon size={19} strokeWidth={1.7} aria-hidden="true" /> : null}
              </Box>

              <Text
                as="span"
                className="font-display text-[15.5px] font-semibold tracking-[-0.01em] text-paper"
              >
                {stage.title}
              </Text>
            </button>
          );
        })}
      </Box>

      <Box className="min-h-[280px] rounded-2xl border border-paper/14 bg-navy-soft p-9 max-sm:p-6">
        <Text
          as="p"
          className="mb-3.5 font-serif text-[clamp(21px,2.5vw,28px)] leading-[1.3] text-paper italic"
        >
          <StageOverview parts={active.overview} />
        </Text>

        <Text as="p" className="mb-4.5 text-[15px] leading-[1.7] text-paper/80">
          {active.description}
        </Text>

        <Text
          as="p"
          className="mb-2.5 font-mono text-[10px] tracking-[0.16em] text-lime uppercase"
        >
          {active.title} · {active.modules}
        </Text>

        <Box as="ul" className="flex flex-col">
          {active.covers?.map((item) => (
            <Box as="li" key={item} className="flex gap-2.5 py-1.5 text-sm text-paper/82">
              <Box as="span" aria-hidden="true" className="text-lime">
                →
              </Box>
              {item}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
