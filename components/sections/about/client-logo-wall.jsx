"use client";

import { useState } from "react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils";

/**
 * "Choose an industry" — industry tiles with client counts filter a logo
 * wall; "All industries" shows the first `initial` logos with a "View all"
 * button. Every logo is in the HTML (filtered-out ones `hidden`), so all the
 * client names stay crawlable. Design: about-us `#clients`, `.lw-tile`,
 * `.lw-grid`.
 */
export default function ClientLogoWall({ data }) {
  const [industry, setIndustry] = useState("all");
  const [expanded, setExpanded] = useState(false);
  const total = data.logos.length;
  const countOf = (key) => data.logos.filter((logo) => logo.industry === key).length;

  const matches = (logo) => industry === "all" || logo.industry === industry;
  const visible = data.logos.filter(matches);
  const limit = industry === "all" && !expanded ? data.initial : Infinity;

  function choose(key) {
    setIndustry(key);
    setExpanded(false);
  }

  return (
    <>
      <Box className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Text as="p" className="font-mono text-[11px] tracking-[0.16em] text-ink-muted uppercase">
          {data.choose_label}
        </Text>
        <button
          type="button"
          aria-pressed={industry === "all"}
          onClick={() => choose("all")}
          className={cn(
            "cursor-pointer rounded-full border px-4.5 py-2 font-display text-[14px] font-semibold transition-colors",
            industry === "all" ? "border-navy bg-navy text-lime" : "border-ink/15 text-ink hover:border-navy",
          )}
        >
          {data.all_label} ({total})
        </button>
      </Box>

      <Box className="mb-6 grid grid-cols-2 gap-2.5 md:grid-cols-3 lg:grid-cols-5">
        {data.industries.map((item) => (
          <button
            key={item.key}
            type="button"
            aria-pressed={industry === item.key}
            onClick={() => choose(item.key)}
            className={cn(
              "flex cursor-pointer items-center justify-between gap-3 rounded-[14px] border px-4 py-3.5 text-left font-display text-[14.5px] leading-snug font-semibold transition-colors",
              industry === item.key ? "border-navy bg-navy text-paper" : "border-ink/12 bg-paper text-ink hover:border-ink/30",
            )}
          >
            {item.label}
            <Text as="span" className={cn("font-mono text-[11px]", industry === item.key ? "text-lime" : "text-ink-muted")}>
              {countOf(item.key)}
            </Text>
          </button>
        ))}
      </Box>

      <Box as="ul" aria-label="Edstellar clients" className="m-0 grid list-none grid-cols-2 border-t border-l border-ink/12 p-0 sm:grid-cols-4 lg:grid-cols-8">
        {data.logos.map((logo) => {
          const position = visible.indexOf(logo);
          const shown = position !== -1 && position < limit;
          return (
            <li key={logo.src} hidden={!shown} className="grid h-21 place-items-center border-r border-b border-ink/12 bg-white p-4">
              <img src={logo.src} alt={logo.name} width={160} height={44} loading="lazy" decoding="async" className="max-h-11 w-auto max-w-full object-contain" />
            </li>
          );
        })}
      </Box>

      <Box className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <Text as="p" aria-live="polite" className="font-mono text-[12.5px] text-ink-muted">
          Showing {Math.min(visible.length, limit)} of {visible.length} clients
        </Text>
        {industry === "all" && visible.length > data.initial ? (
          <button
            type="button"
            aria-expanded={expanded}
            onClick={() => setExpanded((value) => !value)}
            className="cursor-pointer rounded-full border border-ink/22 px-6 py-3 font-display text-[14px] font-semibold text-ink transition-colors hover:border-navy"
          >
            {expanded ? "Show fewer clients" : `View all ${total} clients`}
          </button>
        ) : null}
      </Box>
    </>
  );
}
