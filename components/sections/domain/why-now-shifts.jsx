"use client";

import { useState } from "react";
import { Bot, GitCompare, TrendingUp, Layers, Plug } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils";

const SHIFT_ICONS = {
  agents: Bot,
  gap: GitCompare,
  cost: TrendingUp,
  small: Layers,
  proto: Plug,
};

function renderParts(parts, strongClassName) {
  return parts.map((part, index) =>
    part.strong ? (
      <strong key={index} className={strongClassName}>
        {part.text}
      </strong>
    ) : (
      part.text
    ),
  );
}

/**
 * "Shifts" tab-and-detail widget inside the why-now accordion's first panel:
 * a vertical list of five market shifts, each swapping the detail card on
 * the right. Kept as the smallest client leaf — the accordion, heading and
 * lede around it stay server-rendered.
 *
 * `program.status` never links to a fabricated course URL: both "proposed"
 * and "gap" point at the page's own enquiry anchor, matching what the
 * catalog can actually back up today.
 */
export default function WhyNowShifts({ shifts, note }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!shifts?.length) return null;

  const active = shifts[activeIndex];

  return (
    <Box>
      <Box className="grid grid-cols-1 items-start gap-5.5 lg:grid-cols-[0.82fr_1.18fr]">
        <Box
          role="tablist"
          aria-label="Shifts in enterprise AI"
          className="flex flex-col gap-2.5"
        >
          {shifts.map((shift, index) => {
            const isActive = index === activeIndex;
            const ShiftIcon = SHIFT_ICONS[shift.icon] ?? Bot;

            return (
              <button
                key={shift.title}
                type="button"
                role="tab"
                title={`Click Here to View ${shift.title}`}
                aria-selected={isActive}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "flex w-full items-center gap-3.5 rounded-xl border bg-white p-3.5 text-left transition-colors duration-200",
                  isActive
                    ? "border-navy shadow-[0_0_0_1px_var(--color-navy)]"
                    : "border-ink/10 hover:border-ink/25",
                )}
              >
                <span
                  className={cn(
                    "grid size-9.5 flex-none place-items-center rounded-[10px] transition-colors duration-200",
                    isActive ? "bg-lime" : "bg-paper-warm",
                  )}
                >
                  <ShiftIcon
                    size={18}
                    strokeWidth={1.7}
                    className="text-ink"
                    aria-hidden="true"
                  />
                </span>

                <span className="min-w-0">
                  <Text
                    as="span"
                    className="block font-display text-[14.5px] font-semibold leading-[1.3] tracking-[-0.015em] text-ink"
                  >
                    {shift.title}
                  </Text>
                  <Text
                    as="span"
                    className="mt-0.75 block font-mono text-[10px] tracking-[0.11em] text-ink/50 uppercase"
                  >
                    {shift.figure} · {shift.tag}
                  </Text>
                </span>
              </button>
            );
          })}
        </Box>

        <Box
          role="tabpanel"
          className="min-h-75 rounded-2xl border border-ink/10 bg-white p-7.5"
        >
          <Text
            as="p"
            className="font-display text-[clamp(34px,4vw,46px)] leading-none font-bold tracking-[-0.04em] text-ink"
          >
            {active.figure}
          </Text>

          <Text
            as="p"
            className="mt-2 mb-5 max-w-[52ch] text-[13.5px] leading-[1.6] text-ink/60"
          >
            {active.figure_caption}
          </Text>

          <Text
            as="p"
            className="mb-4 max-w-[66ch] font-serif text-[clamp(19px,2.1vw,25px)] leading-[1.3] text-ink italic"
          >
            {renderParts(
              active.quote.parts,
              "font-display font-bold text-ink not-italic",
            )}
          </Text>

          <Text
            as="span"
            className="mb-5 block font-mono text-[10px] tracking-[0.11em] text-ink/40 uppercase"
          >
            Source: {active.source}
          </Text>

          <Text
            as="p"
            className="mb-5 max-w-[66ch] text-sm leading-[1.75] text-ink/60"
          >
            {renderParts(active.description.parts, "font-semibold text-ink")}
          </Text>

          <Box className="flex flex-wrap items-baseline gap-x-2.75 gap-y-2 border-t border-ink/10 pt-4.5">
            <Text
              as="span"
              className="flex-none font-mono text-[10px] tracking-[0.12em] text-ink/50 uppercase"
            >
              Demands
            </Text>
            <Text as="span" className="text-[13.5px] text-ink/60">
              {active.demands}
            </Text>
            <a
              href="#apply"
              className="text-[13.5px] text-ink underline decoration-ink/30 underline-offset-3 hover:decoration-ink"
            >
              {active.program.label}
            </a>
            <Text
              as="span"
              className="font-mono text-[10px] tracking-widest text-ink/45 uppercase"
            >
              {active.program.status === "gap" ? "no program yet" : "proposed"}
            </Text>
          </Box>
        </Box>
      </Box>

      {note ? (
        <Text
          as="p"
          className="mt-4.5 max-w-[84ch] text-[12.5px] leading-[1.65] text-ink/45"
        >
          {note}
        </Text>
      ) : null}
    </Box>
  );
}
