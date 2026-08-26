"use client";

import { useEffect, useRef, useState } from "react";
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { Zap } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
} from "@/components/ui/accordion";

const BAND_CLASSES = {
  learn: "bg-lime-soft text-ink",
  practice: "bg-lime/22 text-ink",
  apply: "bg-navy/10 text-navy",
};

const LAB_KIND_LABEL = {
  intro: "Guided walkthrough",
  lab: "Hands-on lab",
  capstone: "Capstone",
};

const LAB_KIND_CLASSES = {
  intro: "bg-paper-warm border-ink/12",
  lab: "bg-lime/9 border-lime/40",
  capstone: "bg-navy/5 border-ink/20",
};

function formatHours(hours) {
  const wholeHours = Math.floor(hours);
  const minutes = Math.round((hours - wholeHours) * 60);
  return minutes
    ? `${wholeHours}:${String(minutes).padStart(2, "0")} h`
    : `${wholeHours} h`;
}

function ModuleTrigger({ module }) {
  const band = module.learning_phase?.toLowerCase();

  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        title={`Click Here to View ${module.title}`}
        className="group/mod-trigger flex flex-1 items-center gap-4.5 px-5 py-5 text-left outline-none cursor-pointer"
      >
        <Text
          as="span"
          className="flex-none font-mono text-xs tracking-[0.1em] text-ink/60"
        >
          {module.number}
        </Text>

        <Box className="min-w-0 flex-1">
          <Text
            as="p"
            className="font-display text-[17px] font-semibold tracking-[-0.02em] text-ink"
          >
            {module.title}
          </Text>
          <Text
            as="p"
            className="mt-0.75 text-[12.5px] leading-[1.5] text-ink/60"
          >
            {module.subtitle}
          </Text>

          <Box className="mt-2.25 flex flex-wrap items-center gap-2.25">
            {band ? (
              <Text
                as="span"
                className={cn(
                  "rounded-[5px] px-2.25 py-0.75 font-mono text-[10px] font-semibold tracking-[0.1em] uppercase",
                  BAND_CLASSES[band],
                )}
              >
                {module.learning_phase}
              </Text>
            ) : null}
            <Text as="span" className="font-mono text-[10px] text-ink/45">
              {module.topics} topics
            </Text>
            <Text as="span" className="font-mono text-[10px] text-ink/45">
              ~{formatHours(module.hours)}
            </Text>
            {module.lab?.kind && module.lab.kind !== "intro" ? (
              <Text as="span" className="font-mono text-[10px] text-ink/45">
                {module.lab.kind === "capstone" ? "Capstone" : "1 lab"}
              </Text>
            ) : null}
          </Box>
        </Box>

        <Box
          aria-hidden="true"
          className="relative flex size-7.5 flex-none items-center justify-center rounded-full border border-ink/22 transition-[transform,background-color,border-color,color] duration-300 group-aria-expanded/mod-trigger:rotate-[135deg] group-aria-expanded/mod-trigger:border-navy group-aria-expanded/mod-trigger:bg-navy group-aria-expanded/mod-trigger:text-lime"
        >
          <span className="absolute h-px w-3.5 bg-current" />
          <span className="absolute h-3.5 w-px bg-current" />
        </Box>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function ModuleLab({ lab }) {
  if (!lab) return null;

  return (
    <Box
      className={cn(
        "mt-4.5 flex gap-3.5 rounded-xl border p-4.25",
        LAB_KIND_CLASSES[lab.kind],
      )}
    >
      <Zap
        size={16}
        className="mt-0.5 flex-none text-lime"
        aria-hidden="true"
      />
      <Box>
        <Text
          as="p"
          className="mb-1 font-mono text-[10px] tracking-[0.1em] text-ink/50 uppercase"
        >
          {LAB_KIND_LABEL[lab.kind]}
        </Text>
        <Text as="p" className="font-display text-sm font-semibold text-ink">
          {lab.title}
        </Text>
        <Text as="p" className="mt-1 text-[13.5px] leading-[1.55] text-ink/60">
          {lab.description}
        </Text>
      </Box>
    </Box>
  );
}

/**
 * Curriculum's interactive body: a focus-area filter and the module
 * accordion. Kept as the smallest client leaf — the section heading, lede,
 * and method diagram around it stay server-rendered.
 *
 * Design: `.focus-bar`, `#modList`, `.mod`, `.mod-head`, `.mod-body`.
 */
export default function CurriculumModules({ filters, modules }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const filtersRef = useRef(null);

  // Center the active filter chip in its scroll container — matches the
  // page-level TOC chip bar's behavior above it.
  useEffect(() => {
    if (!filtersRef.current) return;
    filtersRef.current
      .querySelector(`[data-filter="${activeFilter}"]`)
      ?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
  }, [activeFilter]);

  // Publishes this bar's own height as a CSS var, same pattern as PageToc's
  // `--mobile-toc-h` — module anchors (`#mod-N`) need to clear the header,
  // the mobile TOC chip bar, AND this filter bar, since all three can be
  // stacked and sticky at once.
  useEffect(() => {
    const bar = filtersRef.current;
    if (!bar || typeof ResizeObserver === "undefined") return;

    const setHeight = () => {
      document.documentElement.style.setProperty(
        "--module-filter-h",
        `${bar.offsetHeight}px`,
      );
    };

    const observer = new ResizeObserver(setHeight);
    observer.observe(bar);
    setHeight();

    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--module-filter-h");
    };
  }, [filters]);

  if (!modules?.length) return null;

  return (
    <Box>
      {filters?.length ? (
        <Box
          ref={filtersRef}
          className="no-scrollbar sticky top-[calc(68px_+_var(--mobile-toc-h,0px))] z-10 -mx-1 mb-7 flex flex-nowrap gap-2.5 overflow-x-auto bg-paper px-1 py-3 md:flex-wrap md:overflow-visible"
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              title={`Click Here to View ${filter.label}`}
              data-filter={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={cn(
                "flex-none cursor-pointer rounded-full border px-3.25 py-1.75 font-mono text-[10.5px] tracking-[0.08em] whitespace-nowrap uppercase transition-colors duration-200",
                activeFilter === filter.id
                  ? "border-navy bg-navy text-lime"
                  : "border-ink/22 text-ink/60 hover:border-navy hover:text-ink",
              )}
            >
              {filter.label}
            </button>
          ))}
        </Box>
      ) : null}

      <Accordion multiple className="w-full gap-3">
        {modules.map((module) => {
          const visible =
            activeFilter === "all" || module.tags?.includes(activeFilter);

          return (
            <AccordionItem
              key={module.number}
              id={`mod-${module.number}`}
              value={module.number}
              className={cn(
                "scroll-mt-[calc(68px_+_var(--mobile-toc-h,0px)_+_var(--module-filter-h,0px)_+_16px)] overflow-hidden rounded-2xl border border-ink/12 bg-white",
                !visible && "hidden",
              )}
            >
              <ModuleTrigger module={module} />

              <AccordionContent className="pt-1 pr-6 pb-5.5 pl-14.5">
                {module.groups?.map((group) => (
                  <Box key={group.title} className="mt-3.5 first:mt-0">
                    <Text
                      as="h5"
                      className="mb-1.5 font-display text-sm font-semibold text-ink"
                    >
                      {group.title}
                    </Text>
                    <Box as="ul" className="flex flex-col">
                      {group.items.map((item) => (
                        <Box
                          as="li"
                          key={item}
                          className="flex gap-2.5 py-1 text-[13.5px] leading-[1.5] text-ink/60"
                        >
                          <Box
                            as="span"
                            aria-hidden="true"
                            className="mt-2 size-1.5 flex-none rounded-full bg-lime"
                          />
                          {item}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                ))}

                <ModuleLab lab={module.lab} />
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </Box>
  );
}
