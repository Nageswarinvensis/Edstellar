"use client";

import { useRef, useState } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils";

const DAYS = Array.from({ length: 15 }, (_, index) => index + 1);

/** Column spans for each stage on the 15-day grid, by its first and last day. */
const SPAN = { 1: "col-span-1", 2: "col-span-2", 3: "col-span-3", 4: "col-span-4", 5: "col-span-5" };

/**
 * The 15-working-day timeline — "day 0" on the left, "day 15" on the right,
 * the six stages as tabs spanning their days on a 15-column grid with a day
 * ruler under them, and the selected stage's detail below (what Edstellar
 * does, your part) with previous / next. Every stage's panel is in the HTML;
 * inactive ones are `hidden`. On small screens the stages stack as a list.
 * Design: request-for-proposal `#timeline`.
 */
export default function RfpTimeline({ data }) {
  const [active, setActive] = useState(1);
  const tabs = useRef([]);
  const total = data.stages.length;
  const go = (next) => {
    setActive((next + total) % total);
  };

  function onKeyDown(event) {
    const delta = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    if (!delta) return;
    event.preventDefault();
    const next = (active + delta + total) % total;
    setActive(next);
    tabs.current[next]?.focus();
  }

  const stage = data.stages[active];

  return (
    <Box>
      <Box className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[130px_1fr_150px] lg:gap-4">
        <Box className="hidden text-center lg:block">
          <Text as="span" className="mx-auto grid size-14 place-items-center rounded-full border-2 border-paper/40 font-display text-[18px] font-semibold text-paper">
            0
          </Text>
          <Text as="span" className="mt-3 block font-display text-[15px] font-semibold text-paper">
            {data.start.title}
          </Text>
          <Text as="span" className="block text-[12.5px] text-paper/60">
            {data.start.text}
          </Text>
        </Box>

        <Box>
          <Box role="tablist" aria-label="RFP response stages" onKeyDown={onKeyDown} className="flex flex-col gap-2 lg:grid lg:grid-cols-15 lg:gap-1.5">
            {data.stages.map((item, index) => (
              <button
                key={item.name}
                ref={(el) => (tabs.current[index] = el)}
                type="button"
                role="tab"
                id={`rfp-t${index}`}
                aria-controls={`rfp-p${index}`}
                aria-selected={active === index}
                tabIndex={active === index ? 0 : -1}
                onClick={() => setActive(index)}
                className={cn(
                  "cursor-pointer border-t-4 px-1 pt-3 pb-1 text-left transition-colors max-lg:rounded-[10px] max-lg:border max-lg:border-t-4 max-lg:px-4 max-lg:py-3",
                  SPAN[item.to - item.from + 1],
                  active === index ? "border-lime max-lg:bg-navy-soft" : "border-paper/25 hover:border-paper/50 max-lg:border-paper/15",
                )}
              >
                <Text as="span" className={cn("block font-mono text-[10.5px] tracking-[0.12em] uppercase", active === index ? "text-lime" : "text-paper/55")}>
                  {item.days}
                </Text>
                <Text as="span" className={cn("mt-1 block text-[14px] leading-tight", active === index ? "font-semibold text-paper" : "text-paper/75")}>
                  {item.tab}
                </Text>
              </button>
            ))}
          </Box>
          <Box aria-hidden="true" className="mt-4 hidden grid-cols-15 border-t border-paper/20 lg:grid">
            {DAYS.map((day) => {
              const lit = day >= stage.from && day <= stage.to;
              return (
                <Box key={day} className="flex flex-col items-center">
                  <Box className={cn("h-2.5 w-px", lit ? "h-3.5 w-0.5 bg-lime" : "bg-paper/30")} />
                  <Text as="span" className={cn("mt-1 font-mono text-[11px]", lit ? "text-lime" : "text-paper/55")}>
                    {day}
                  </Text>
                </Box>
              );
            })}
          </Box>
        </Box>

        <Box className="hidden text-center lg:block">
          <Text as="span" className="mx-auto grid size-14 place-items-center rounded-full bg-lime font-display text-[18px] font-semibold text-navy">
            15
          </Text>
          <Text as="span" className="mt-3 block font-display text-[15px] font-semibold text-paper">
            {data.end.title}
          </Text>
          <Text as="span" className="block text-[12.5px] text-paper/60">
            {data.end.text}
          </Text>
        </Box>
      </Box>

      {data.stages.map((item, index) => (
        <Box
          key={item.name}
          role="tabpanel"
          id={`rfp-p${index}`}
          aria-labelledby={`rfp-t${index}`}
          tabIndex={0}
          hidden={active !== index}
          className="mt-10 grid grid-cols-1 gap-8 rounded-[18px] border border-paper/12 bg-navy-soft p-8 lg:grid-cols-[1.1fr_1fr_1fr]"
        >
          <Box>
            <Text as="p" className="mb-2 font-mono text-[11px] tracking-[0.14em] text-lime uppercase">
              {item.days} · Stage {index + 1} of {total}
            </Text>
            <Text as="h3" className="mb-3 text-paper">
              {item.name}.
            </Text>
            <Text as="p" className="text-[15.5px] leading-[1.7] text-paper/75">
              {item.text}
            </Text>
            <Box className="mt-6 flex gap-2">
              {[
                [-1, "Previous stage", ChevronLeft],
                [1, "Next stage", ChevronRight],
              ].map(([delta, label, Icon]) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  onClick={() => go(index + delta)}
                  className="grid size-11 cursor-pointer place-items-center rounded-full border border-paper/30 text-paper hover:border-lime hover:text-lime"
                >
                  <Icon size={18} aria-hidden="true" />
                </button>
              ))}
            </Box>
          </Box>
          {[
            [data.labels.does, item.does],
            [data.labels.you, item.you],
          ].map(([label, list]) => (
            <Box key={label}>
              <Text as="h4" className="mb-3 border-b border-paper/15 pb-3 text-[15px] text-paper">
                {label}
              </Text>
              <Box as="ul" className="m-0 flex list-none flex-col gap-2.5 p-0">
                {list.map((entry) => (
                  <li key={entry} className="flex gap-2.5 text-[14.5px] text-paper/85">
                    <Check size={15} aria-hidden="true" className="mt-0.5 flex-none text-lime" />
                    {entry}
                  </li>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
}
