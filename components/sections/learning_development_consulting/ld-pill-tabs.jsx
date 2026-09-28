"use client";

import { useRef, useState } from "react";

import Box from "@/components/ui/Box";
import { cn } from "@/lib/utils";

/**
 * A row of pill tabs above one white panel — the frameworks strip
 * (`.fwt-*`, content development) and the platforms strip (`.pt-*`, learning
 * technology). The smallest client leaf: every panel is rendered on the
 * server and arrives as `panels`, so all of them are in the HTML crawlers
 * see; inactive ones are only `hidden`.
 *
 * The two designs differ only in spacing and in whether the row scrolls
 * sideways or wraps, which callers pass as `listClassName`, `tabClassName`
 * and `panelClassName`. `idPrefix` keeps tab/panel ids unique per section.
 *
 * Keyboard: roving tabindex; ArrowLeft/ArrowRight move and select, Home/End
 * jump to the ends.
 */
export default function LdPillTabs({
  items,
  panels,
  label,
  idPrefix,
  listClassName,
  tabClassName,
  panelClassName,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef([]);

  if (!items?.length) return null;

  function onKeyDown(event, index) {
    const last = items.length - 1;
    const next = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    }[event.key];

    if (next === undefined) return;
    event.preventDefault();
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <>
      <Box
        role="tablist"
        aria-label={label}
        className={cn("flex gap-2.5", listClassName)}
      >
        {items.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={item.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              id={`${idPrefix}t-${item.id}`}
              type="button"
              role="tab"
              title={`Click Here to View ${item.name}`}
              aria-selected={isActive}
              aria-controls={`${idPrefix}p-${item.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={cn(
                "flex-none cursor-pointer rounded-full border py-2.5 font-display text-[15px] leading-normal font-semibold whitespace-nowrap transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy",
                isActive
                  ? "border-navy bg-navy text-white"
                  : "border-ink/12 bg-white text-navy hover:border-ink/22",
                tabClassName,
              )}
            >
              {item.name}
            </button>
          );
        })}
      </Box>

      <Box className="mt-5.5">
        {items.map((item, index) => (
          <Box
            key={item.id}
            id={`${idPrefix}p-${item.id}`}
            role="tabpanel"
            aria-labelledby={`${idPrefix}t-${item.id}`}
            tabIndex={0}
            hidden={index !== activeIndex}
            className={cn(
              "rounded-[16px] border border-ink/12 bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy max-sm:px-5 max-sm:py-6 [&[hidden]]:hidden",
              panelClassName,
            )}
          >
            {panels?.[index]}
          </Box>
        ))}
      </Box>
    </>
  );
}
