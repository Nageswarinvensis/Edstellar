"use client";

import { useState } from "react";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils";

function SkillCard({ item }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <Box
      as="button"
      type="button"
      onClick={() => setFlipped((f) => !f)}
      aria-pressed={flipped}
      className="h-52 cursor-pointer text-left [perspective:1200px]"
    >
      <Box
        className={cn(
          "relative size-full transition-transform duration-500 [transform-style:preserve-3d]",
          flipped && "[transform:rotateY(180deg)]",
        )}
      >
        <Box className="absolute inset-0 flex flex-col rounded-[18px] border border-ink/12 bg-white p-6 [backface-hidden]">
          <Text
            as="p"
            className="font-mono text-[11px] tracking-[0.18em] text-ink/45"
          >
            {item.number}
          </Text>
          <Text
            as="h3"
            className="mt-3 font-display text-[18px] leading-[1.5] font-semibold tracking-[-0.02em] text-ink"
          >
            {item.title}
          </Text>
          <Text
            as="span"
            className="mt-auto font-mono text-[10px] tracking-[0.14em] text-ink/60 uppercase"
          >
            Tap to reveal ↻
          </Text>
        </Box>

        <Box className="absolute inset-0 flex flex-col rounded-[18px] border border-navy bg-navy p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <Text
            as="p"
            className="font-mono text-[11px] tracking-[0.18em] text-lime"
          >
            {item.number}
          </Text>
          <Text as="p" className="mt-3 text-[13px] leading-[1.55] text-white">
            {item.description}
          </Text>
          <Text
            as="span"
            className="mt-auto font-mono text-[10px] tracking-[0.14em] text-paper/55 uppercase"
          >
            Tap to flip back ↺
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

/**
 * Skill grid: seven cards, each flippable to reveal what the skill means in
 * production. Flip state lives per-card so the interaction stays local —
 * this is the section's only client-side piece (Skills' heading/lede stay
 * server-rendered).
 *
 * Design: `.skill-grid`, `.flip`, `.flip-inner`, `.flip-face`.
 */
export default function SkillCards({ items }) {
  if (!items?.length) return null;

  return (
    <Box className="skill-grid grid grid-cols-2 gap-4.5 max-[540px]:grid-cols-1">
      {items.map((item) => (
        <SkillCard key={item.number} item={item} />
      ))}
    </Box>
  );
}
