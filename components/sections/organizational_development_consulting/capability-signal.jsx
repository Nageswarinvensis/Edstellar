"use client";

import { useEffect, useRef, useState } from "react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";

/**
 * The "Capability signal" carousel inside the platform band (the only
 * interactive leaf, so this is the `"use client"` boundary — the section
 * around it stays a Server Component). Tabs and dots switch the active
 * dimension; it also auto-advances every `AUTOPLAY_MS`, pausing on hover or
 * keyboard focus and honouring `prefers-reduced-motion`.
 *
 * `tabs`: the CMS `ld_Platform.tabs` —
 * `[{ id, label, metrics: [{ title, value, subtitle }] }]`, where `value` is a
 * 0–100 percentage for the bar width. The first metric of each tab is drawn in
 * full lime, the rest in lime-soft (design `.cip`).
 */

const AUTOPLAY_MS = 3800;

const clampPct = (value) => Math.max(0, Math.min(100, Number(value) || 0));

export default function CapabilitySignal({
  tabs,
  signalLabel = "Capability signal",
  liveLabel = "Live",
}) {
  const [active, setActive] = useState(0);
  const pausedRef = useRef(false);
  const count = tabs?.length ?? 0;

  // Auto-advance, unless paused (hover/focus) or the viewer prefers no motion.
  useEffect(() => {
    if (count <= 1) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      if (!pausedRef.current) setActive((i) => (i + 1) % count);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(id);
  }, [count]);

  if (!count) return null;

  const pause = () => {
    pausedRef.current = true;
  };
  const resume = () => {
    pausedRef.current = false;
  };

  return (
    <Box
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocusCapture={pause}
      onBlurCapture={resume}
      className="rounded-[16px] border border-white/[0.14] bg-white/[0.06] p-[18px] pb-4"
    >
      {/* Top: label + live indicator */}
      <Box className="mb-3.5 flex items-center justify-between">
        <Text
          as="span"
          className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-paper/60"
        >
          {signalLabel}
        </Text>

        <Text
          as="span"
          className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-paper/60"
        >
          <Box
            as="span"
            aria-hidden="true"
            className="size-[7px] animate-pulse rounded-full bg-lime"
          />
          {liveLabel}
        </Text>
      </Box>

      {/* Tabs */}
      <Box
        role="tablist"
        aria-label="Capability dimensions"
        className="mb-4 flex flex-wrap gap-[5px]"
      >
        {tabs.map((tab, i) => (
          <button
            key={tab.id ?? tab.label ?? i}
            type="button"
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={[
              "cursor-pointer rounded-full border px-[11px] py-1.5 font-mono text-[9.5px] uppercase leading-none tracking-[0.06em] transition-colors duration-200",
              i === active
                ? "border-lime bg-lime font-bold text-navy"
                : "border-white/15 bg-transparent text-paper/60 hover:border-white/35 hover:text-paper",
            ].join(" ")}
          >
            {tab.label}
          </button>
        ))}
      </Box>

      {/* Stage: tabs cross-fade in place */}
      <Box className="relative min-h-[150px]">
        {tabs.map((tab, i) => (
          <Box
            key={tab.id ?? tab.label ?? i}
            role="tabpanel"
            aria-hidden={i !== active}
            className={[
              "absolute inset-x-0 top-0 transition-opacity duration-300",
              i === active ? "opacity-100" : "pointer-events-none opacity-0",
            ].join(" ")}
          >
            {tab.metrics?.map((metric, mi) => (
              <Box key={metric.title ?? mi} className="mb-[15px] last:mb-0">
                <Box className="mb-[7px] flex items-baseline justify-between gap-3">
                  <Text as="b" className="text-[13px] font-semibold text-paper">
                    {metric.title}
                  </Text>
                  <Text
                    as="span"
                    className="text-right font-mono text-[9px] uppercase tracking-[0.04em] text-paper/50"
                  >
                    {metric.subtitle}
                  </Text>
                </Box>

                <Box className="h-2 overflow-hidden rounded-[5px] bg-white/[0.13]">
                  <Box
                    className={[
                      "h-full rounded-[5px]",
                      mi === 0 ? "bg-lime" : "bg-lime-soft",
                    ].join(" ")}
                    style={{ width: `${clampPct(metric.value)}%` }}
                  />
                </Box>
              </Box>
            ))}
          </Box>
        ))}
      </Box>

      {/* Dots */}
      <Box className="mt-4 flex items-center gap-2">
        {tabs.map((tab, i) => (
          <button
            key={tab.id ?? tab.label ?? i}
            type="button"
            aria-label={`Show ${tab.label}`}
            aria-current={i === active}
            onClick={() => setActive(i)}
            className={[
              "h-[7px] cursor-pointer rounded-full border-0 p-0 transition-all duration-200",
              i === active ? "w-5 rounded-[4px] bg-lime" : "w-[7px] bg-white/20",
            ].join(" ")}
          />
        ))}
      </Box>
    </Box>
  );
}
