"use client";

import { useEffect, useRef, useState } from "react";
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { Clock, FlaskConical, List, Zap } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
} from "@/components/ui/accordion";

const BAND_CLASSES = {
  learn: "bg-green-50 text-green-700",
  practice: "bg-blue-50 text-blue-600",
  apply: "bg-violet-50 text-violet-600",
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

function ModuleStat({ icon: Icon, iconClassName, children }) {
  return (
    <Text
      as="span"
      className="inline-flex items-center gap-1.5 font-mono text-[11.5px] whitespace-nowrap text-ink/70"
    >
      <Icon size={14} className={cn("flex-none", iconClassName)} aria-hidden="true" />
      {children}
    </Text>
  );
}

function ModuleMeta({ module }) {
  const hasLab = module.lab?.kind && module.lab.kind !== "intro";

  return (
    <Box className="flex items-center gap-2.5">
      <ModuleStat icon={List} iconClassName="text-blue-600">
        {module.topics} topics
      </ModuleStat>
      <Box className="h-4.25 w-px flex-none bg-ink/12" aria-hidden="true" />
      <ModuleStat icon={Clock} iconClassName="text-amber-600">
        ~{formatHours(module.hours)}
      </ModuleStat>
      {hasLab ? (
        <>
          <Box className="h-4.25 w-px flex-none bg-ink/12" aria-hidden="true" />
          <ModuleStat icon={FlaskConical} iconClassName="text-violet-600">
            {module.lab.kind === "capstone" ? "Capstone" : "1 lab"}
          </ModuleStat>
        </>
      ) : null}
    </Box>
  );
}

function ModuleExpandIcon({ className }) {
  return (
    <Box
      aria-hidden="true"
      className={cn(
        "relative flex size-7.5 flex-none items-center justify-center rounded-full border border-ink/22 transition-[transform,background-color,border-color,color] duration-300 group-aria-expanded/mod-trigger:rotate-[135deg] group-aria-expanded/mod-trigger:border-navy group-aria-expanded/mod-trigger:bg-navy group-aria-expanded/mod-trigger:text-lime",
        className,
      )}
    >
      <span className="absolute h-px w-3.5 bg-current" />
      <span className="absolute h-3.5 w-px bg-current" />
    </Box>
  );
}

/**
 * One line at `sm+` — number, title, meta stats, expand toggle — matching
 * the design's compact `.eds-mod-row`. Below `sm` the meta stats drop to
 * their own line under the title rather than force the row to wrap, since
 * the design's own mobile breakpoint (1023px) does the same.
 */
function ModuleTrigger({ module }) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        title={`Click Here to View ${module.title}`}
        className="group/mod-trigger flex flex-1 flex-col gap-2 px-4 py-3.5 text-left outline-none cursor-pointer sm:flex-row sm:items-center sm:gap-3.5 sm:px-5"
      >
        <Box className="flex items-start gap-3 sm:contents">
          <Text
            as="span"
            className="flex-none pt-0.5 font-mono text-[11.5px] tracking-[0.06em] text-ink/40 sm:pt-0"
          >
            {module.number}
          </Text>

          <Text
            as="p"
            className="min-w-0 flex-1 font-display text-[15px] font-bold tracking-[-0.015em] text-ink sm:truncate"
          >
            {module.title}
          </Text>

          <ModuleExpandIcon className="sm:order-last" />
        </Box>

        <Box className="pl-[34px] sm:pl-0">
          <ModuleMeta module={module} />
        </Box>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function ModuleLab({ lab, className }) {
  if (!lab) return null;

  return (
    <Box
      className={cn(
        "flex gap-3.5 rounded-xl border p-4.25",
        LAB_KIND_CLASSES[lab.kind],
        className,
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
  // page-level TOC chip bar's behavior above it. Triggered directly from the
  // click handler (not a `useEffect` watching `activeFilter`) so it only ever
  // runs in response to a real click: an effect fires on mount too, and since
  // this bar sits below the fold on load, `scrollIntoView` would drag the
  // whole page down to it instead of just centering the chip within its own
  // strip.
  function selectFilter(id) {
    setActiveFilter(id);
    filtersRef.current
      ?.querySelector(`[data-filter="${id}"]`)
      ?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
  }

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
              onClick={() => selectFilter(filter.id)}
              className={cn(
                "flex flex-none cursor-pointer items-center gap-1.75 rounded-full border px-3.25 py-1.75 font-mono text-[10.5px] tracking-[0.08em] whitespace-nowrap uppercase transition-colors duration-200",
                activeFilter === filter.id
                  ? "border-navy bg-navy text-lime"
                  : "border-ink/22 text-ink/60 hover:border-navy hover:text-ink",
              )}
            >
              {filter.label}
              {filter.id === "all" ? (
                <Text
                  as="span"
                  className={cn(
                    "grid size-4.5 place-items-center rounded-full font-mono text-[9px] normal-case",
                    activeFilter === "all"
                      ? "bg-white/20 text-lime"
                      : "bg-ink/8 text-ink/60",
                  )}
                >
                  {modules.length}
                </Text>
              ) : null}
            </button>
          ))}
        </Box>
      ) : null}

      <Accordion
        multiple
        hiddenUntilFound
        className="w-full overflow-hidden rounded-2xl border border-ink/12 bg-white"
      >
        {modules.map((module) => {
          const visible =
            activeFilter === "all" || module.tags?.includes(activeFilter);

          return (
            <AccordionItem
              key={module.number}
              id={`mod-${module.number}`}
              value={module.number}
              className={cn(
                "scroll-mt-[calc(68px_+_var(--mobile-toc-h,0px)_+_var(--module-filter-h,0px)_+_16px)] border-b border-ink/10 last:border-b-0",
                !visible && "hidden",
              )}
            >
              <ModuleTrigger module={module} />

              <AccordionContent className="pt-3 pr-6 pb-5.5 pl-11 sm:pl-14.5">
                {module.learning_phase ? (
                  <Text
                    as="span"
                    className={cn(
                      "mb-3.5 inline-block rounded-[5px] px-2.25 py-1 font-mono text-[9.5px] font-semibold tracking-[0.1em] uppercase",
                      BAND_CLASSES[module.learning_phase.toLowerCase()],
                    )}
                  >
                    {module.learning_phase}
                  </Text>
                ) : null}

                <Box className="grid grid-cols-1 gap-x-10 gap-y-4.5 sm:grid-cols-2">
                  {module.groups?.map((group, groupIndex) => (
                    <Box key={group.title}>
                      <Text
                        as="h5"
                        className="mb-1.5 font-display text-sm font-semibold text-ink"
                      >
                        <span className="mr-1 font-semibold text-ink/50">
                          {String.fromCharCode(97 + groupIndex)})
                        </span>
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

                  <ModuleLab lab={module.lab} className="sm:col-span-2" />
                </Box>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </Box>
  );
}
