"use client";

import { Children, useRef, useState } from "react";

import Box from "@/components/ui/Box";
import { cn } from "@/lib/utils";

/**
 * A centred pill switch over sibling panels — the form's Businesses /
 * Individuals switch and the FAQ's two question groups. `tabs` is
 * `{ id, label }[]`; `children` are the panels in the same order. Every
 * panel is rendered (server content stays in the HTML); the inactive ones
 * are only `hidden`. `dark` is the navy-section treatment.
 *
 * Design: partner-program.html `.ptabs-wrap`, `.ptabs`, `.ptab`,
 * `[data-ppanel]`.
 */
export default function PillTabs({ tabs, idPrefix, label, dark = false, children }) {
  const [active, setActive] = useState(0);
  const buttons = useRef([]);
  const panels = Children.toArray(children);

  function onKeyDown(event, index) {
    const next = {
      ArrowRight: (index + 1) % tabs.length,
      ArrowLeft: (index - 1 + tabs.length) % tabs.length,
      Home: 0,
      End: tabs.length - 1,
    }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setActive(next);
    buttons.current[next]?.focus();
  }

  return (
    <>
      <Box className="flex justify-center">
        <Box
          role="tablist"
          aria-label={label}
          className={cn(
            "mb-7.5 inline-flex flex-wrap justify-center gap-1.5 rounded-full border p-1.25",
            dark ? "border-paper/14 bg-paper/6" : "border-ink/12 bg-white",
          )}
        >
          {tabs.map((tab, index) => {
            const on = index === active;
            return (
              <Box
                as="button"
                type="button"
                key={tab.id}
                ref={(node) => {
                  buttons.current[index] = node;
                }}
                role="tab"
                id={`${idPrefix}-tab-${tab.id}`}
                aria-selected={on}
                aria-controls={`${idPrefix}-panel-${tab.id}`}
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(index)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={cn(
                  "cursor-pointer rounded-full px-5 py-2.5 font-body text-[14px] leading-normal font-semibold transition-colors duration-200 outline-none focus-visible:outline-2 focus-visible:outline-offset-2",
                  dark ? "focus-visible:outline-lime" : "focus-visible:outline-navy",
                  on
                    ? dark
                      ? "bg-lime text-navy"
                      : "bg-navy text-lime"
                    : dark
                      ? "text-paper/70 hover:text-paper"
                      : "text-ink-muted hover:text-ink",
                )}
              >
                {tab.label}
              </Box>
            );
          })}
        </Box>
      </Box>

      {panels.map((panel, index) => (
        <Box
          key={tabs[index]?.id ?? index}
          role="tabpanel"
          id={`${idPrefix}-panel-${tabs[index]?.id}`}
          aria-labelledby={`${idPrefix}-tab-${tabs[index]?.id}`}
          hidden={index !== active}
        >
          {panel}
        </Box>
      ))}
    </>
  );
}
