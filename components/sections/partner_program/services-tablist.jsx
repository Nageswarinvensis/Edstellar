"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Building2, GraduationCap, Monitor, ShieldCheck, UserRound } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils";

const ICONS = {
  "graduation-cap": GraduationCap,
  user: UserRound,
  "shield-check": ShieldCheck,
  monitor: Monitor,
  building: Building2,
};

// Each tab sits in its own row of the left column; the panel spans them all
// in the right column. Literal classes so Tailwind can see them.
const ROWS = ["row-start-1", "row-start-2", "row-start-3", "row-start-4", "row-start-5", "row-start-6"];
// Below 900px each panel follows its own tab. The tabs and panels are siblings
// in two groups (the tablist must contain only tabs), so the stacking order is
// set explicitly: tab n, then panel n.
const TAB_ORDER = ["max-[900px]:order-1", "max-[900px]:order-3", "max-[900px]:order-5", "max-[900px]:order-7", "max-[900px]:order-9", "max-[900px]:order-11"];
const PANEL_ORDER = ["max-[900px]:order-2", "max-[900px]:order-4", "max-[900px]:order-6", "max-[900px]:order-8", "max-[900px]:order-10", "max-[900px]:order-12"];

/**
 * The vertical tablist behind ServicesTabs (WAI-ARIA tabs: click, arrow keys,
 * Home/End). Every panel is in the server HTML; the inactive ones are only
 * `hidden`. Below 900px it stacks like an accordion — each panel directly
 * under its tab.
 *
 * Design: partner-program.html `[data-cmp="services-tabs"]` `.sx`, `.sx-it`,
 * `.sx-ic`, `.sx-p`, `.sx-img`, `.sx-h`, `.sx-d`.
 */
export default function ServicesTablist({ items, label }) {
  const [active, setActive] = useState(0);
  const tabs = useRef([]);

  function onKeyDown(event, index) {
    const count = items.length;
    const next = {
      ArrowDown: (index + 1) % count,
      ArrowRight: (index + 1) % count,
      ArrowUp: (index - 1 + count) % count,
      ArrowLeft: (index - 1 + count) % count,
      Home: 0,
      End: count - 1,
    }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <Box className="grid grid-cols-2 items-start gap-x-10 gap-y-1 max-[900px]:grid-cols-1">
      {/* `contents`: the tablist groups the tabs for assistive tech without
          adding a box, so each tab is still placed in the grid. */}
      <Box role="tablist" aria-label={label} aria-orientation="vertical" className="contents">
      {items.map((item, index) => {
        const Icon = ICONS[item.icon] ?? GraduationCap;
        const on = index === active;

        return (
          <Box
            as="button"
            type="button"
            key={`tab-${item.title}`}
            ref={(node) => {
              tabs.current[index] = node;
            }}
            role="tab"
            id={`partner-model-tab-${index}`}
            aria-selected={on}
            aria-controls={`partner-model-panel-${index}`}
            tabIndex={on ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={cn(
              "col-start-1 flex w-full cursor-pointer items-start gap-4 rounded-[14px] border px-4.5 py-4 text-left transition-[background-color,box-shadow] duration-200 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy max-[900px]:row-start-auto",
              ROWS[index],
              TAB_ORDER[index],
              on ? "border-ink/12 bg-white shadow-lift" : "border-transparent hover:bg-white",
            )}
          >
            <Box
              as="span"
              className={cn(
                "grid size-10.5 flex-none place-items-center rounded-[11px] text-navy transition-colors duration-200",
                on ? "bg-lime" : "bg-paper-warm",
              )}
            >
              <Icon size={21} strokeWidth={1.7} aria-hidden="true" />
            </Box>
            <Text as="span" className="self-center font-display text-[16px] leading-[1.3] font-bold text-ink">
              {item.title}
            </Text>
          </Box>
        );
      })}
      </Box>

      {items.map((item, index) => {
        const on = index === active;
        return (
          <Box
            key={`panel-${item.title}`}
            role="tabpanel"
            id={`partner-model-panel-${index}`}
            aria-labelledby={`partner-model-tab-${index}`}
            hidden={!on}
            className={cn(PANEL_ORDER[index], "sticky top-24 col-start-2 row-span-6 row-start-1 rounded-2xl border border-ink/12 bg-white p-8 max-[900px]:static max-[900px]:col-start-1 max-[900px]:row-span-1 max-[900px]:row-start-auto max-[900px]:mt-1 max-[900px]:mb-3 max-[900px]:p-5.5")}
          >
            {item.image?.src ? (
              <Image
                src={item.image.src}
                alt={item.image.alt || item.title || "Edstellar partner program"}
                width={item.image.width}
                height={item.image.height}
                sizes="(max-width: 900px) 100vw, 560px"
                className="mb-4.5 max-h-75 w-full rounded-xl object-cover"
              />
            ) : null}
            <Text
              as="h3"
              className="mb-2.5 font-display text-[22px] leading-[1.2] font-medium tracking-[-0.01em] text-ink max-[900px]:hidden"
            >
              {item.title}
            </Text>
            {item.paragraphs?.map((paragraph, paragraphIndex) => (
              <Text key={paragraph} as="p" className={cn("text-[15px] leading-[1.6]", paragraphIndex > 0 && "mt-3")}>
                {paragraph}
              </Text>
            ))}
          </Box>
        );
      })}
    </Box>
  );
}
