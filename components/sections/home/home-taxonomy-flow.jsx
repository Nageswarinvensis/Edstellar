"use client";

import { useEffect, useState } from "react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import RichHeading from "@/components/common/rich-heading";
import { cn } from "@/lib/utils";

const PATHS = 4;
const INTERVAL_MS = 2800;
// Set on each label itself: <Text> brings its own size, which would win over
// a parent's.
const LABEL = "font-mono text-[9.5px] leading-normal tracking-[0.22em] uppercase";

function Arrow() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
      <path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

/**
 * The five-layer flow, cycling one example path (one item per layer) every
 * 2.8s. Hover or focus pauses it, clicking an item jumps to its path, and
 * reduced motion keeps it still on the starting path. Each item's path is
 * `step.paths[i]` (defaults to its index), so a layer can order its items
 * differently from the path order. The last layer is the navy one.
 * Design: edstellar-homepage `.taxo-flow`, `.taxo-step`, `.taxo-arrow`.
 */
export default function HomeTaxonomyFlow({ steps, start = 1 }) {
  const [path, setPath] = useState(start);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const id = setInterval(() => setPath((p) => (p + 1) % PATHS), INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <Box
      role="list"
      aria-label="Five-layer capability schema, cycling through example paths"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="mt-4 grid grid-cols-5 border-[1.5px] border-ink/12 bg-paper max-[980px]:grid-cols-1"
    >
      {steps.map((step, s) => {
        const last = s === steps.length - 1;
        return (
          <Box
            key={step.layer}
            role="listitem"
            className={cn(
              "relative px-6 pt-7.5 pb-8.5 transition-colors duration-300 max-[980px]:border-b max-[980px]:last:border-b-0",
              last ? "bg-navy text-paper" : "border-r border-ink/22 hover:bg-paper-warm max-[980px]:border-r-0 max-[980px]:border-ink/22",
            )}
          >
            <Box className="mb-3.5 flex justify-between gap-2">
              <Text as="span" className={cn(LABEL, last ? "text-paper/70" : "text-ink-muted")}>{step.layer}</Text>
              <Text as="b" className={cn(LABEL, "font-normal", last ? "text-paper/60" : "text-ink-muted")}>{step.kind}</Text>
            </Box>
            <RichHeading
              as="h3"
              heading={step.title}
              emphasisClassName="text-[1.18em] leading-[inherit]"
              className={cn("mb-3.5 font-serif text-2xl leading-[1.16] font-normal", last ? "text-lime" : "text-ink")}
            />
            <Box as="ul" className="mt-2.5 flex list-none flex-col gap-1.5 p-0">
              {step.items.map((item, i) => {
                const itemPath = step.paths?.[i] ?? i;
                const on = itemPath === path;
                return (
                  <li
                    key={item}
                    onClick={() => setPath(itemPath)}
                    className={cn(
                      "cursor-pointer px-2 py-1.5 font-mono text-[12px] tracking-[0.02em] transition-[background-color,color,border-color] duration-350",
                      last
                        ? on
                          ? "border-l border-lime bg-lime font-semibold text-navy"
                          : "border-l border-paper/22 bg-paper/6 text-paper/70"
                        : on
                          ? "border-l-3 border-lime bg-navy font-medium text-paper"
                          : "border-l border-ink/22 bg-paper-warm text-ink-muted",
                    )}
                  >
                    {item}
                  </li>
                );
              })}
            </Box>
            {!last && (
              <Box
                aria-hidden="true"
                className={cn(
                  "absolute top-1/2 -right-1.75 z-2 flex size-3.5 -translate-y-1/2 items-center justify-center max-[980px]:hidden",
                  s === steps.length - 2 ? "bg-navy text-lime" : "bg-paper-warm text-ink/50",
                )}
              >
                <Arrow />
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
}
