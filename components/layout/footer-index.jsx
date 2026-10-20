"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils";
import { FOOTER_MORE, FOOTER_SERVICES, FOOTER_STAGES } from "@/lib/constants";

const pad = (n) => String(n).padStart(2, "0");

function Chevron() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-4.5 flex-none transition-transform duration-200 group-open/fg:rotate-180 sm:hidden">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ArrowSmall() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="ml-1.5 inline-block size-3.5 align-[-2px] transition-transform duration-200 group-hover/all:translate-x-[3px]">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/** One footer link: brighter for a hub page, lime with a dot when the active
 * 5A stage includes it, and greyed out when a stage is active but does not. */
function FooterLink({ link, stage }) {
  const hit = Boolean(stage && link.stages?.includes(stage));
  return (
    <Link
      href={link.href}
      title={`Click Here to View ${link.label}`}
      className={cn(
        "group/all text-[14px] leading-[1.5] transition-colors duration-200 hover:text-paper",
        link.all ? "inline" : "inline-flex min-h-6 items-center py-0.5",
        link.main ? "font-medium text-paper" : "text-paper/[0.78]",
        stage && (hit ? "text-lime hover:text-lime" : "text-paper/55"),
      )}
    >
      {hit ? <span aria-hidden="true" className="mr-2 inline-block size-1.5 flex-none rounded-full bg-lime align-middle" /> : null}
      {link.label}
      {link.all ? <ArrowSmall /> : null}
    </Link>
  );
}

/** A link group: a native <details> so it collapses on phones without
 * scripts; open (and not a toggle) from `sm` up. Every link stays in the HTML. */
function Group({ group, stage, open, onToggle }) {
  return (
    <Box
      as="details"
      open={open}
      onToggle={(event) => onToggle(group.heading, event.currentTarget.open)}
      className="group/fg max-sm:border-t max-sm:border-paper/12"
    >
      <Box
        as="summary"
        className="mb-2.5 flex list-none items-center justify-between font-serif text-[20px] leading-[1.2] font-semibold text-paper/70 marker:hidden max-sm:mb-0 max-sm:cursor-pointer max-sm:py-3.5 max-sm:text-[22px] max-sm:text-paper sm:pointer-events-none [&::-webkit-details-marker]:hidden"
      >
        {group.heading}
        <Chevron />
      </Box>
      <Box as="ul" className="m-0 list-none p-0 max-sm:pb-4">
        {group.links.map((link, index) =>
          link.sub ? (
            <Box as="li" key={link.sub} className="mt-4 first:mt-1.5">
              <Text as="span" className="mb-1 block font-mono text-[11px] leading-[1.4] tracking-[0.16em] text-paper/60 uppercase">
                {link.sub}
              </Text>
              <Box as="ul" className="m-0 list-none p-0 [&>li+li]:mt-1">
                {link.links.map((item) => (
                  <li key={item.href}>
                    <FooterLink link={item} stage={stage} />
                  </li>
                ))}
              </Box>
            </Box>
          ) : (
            <Box as="li" key={link.href + link.label} className={link.all ? (group.links[index - 1]?.all ? "mt-2" : "mt-3") : "mt-1 first:mt-0"}>
              <FooterLink link={link} stage={stage} />
            </Box>
          ),
        )}
      </Box>
    </Box>
  );
}

/**
 * The footer's 5A index and link directory: brand (passed in, server-rendered)
 * beside the "Find services by Edstellar 5A stage" rail, then the five service
 * groups, then Company, Resources, Work with Edstellar and the contact block.
 * Selecting a stage highlights the services tagged with it — never hides any
 * — and on phones opens the groups that hold a match. A client leaf only for
 * that stage state; all links are in the server HTML.
 *
 * Design: footer-option-c-v3-launch 51 `.ft-top`, `.rail`, `.stages`, `.svc`,
 * `.lower`.
 */
export default function FooterIndex({ brand, contact }) {
  const [stage, setStage] = useState(null);
  const [closed, setClosed] = useState(() => new Set());

  // Phones start with every group collapsed; larger screens show them all.
  useEffect(() => {
    if (window.matchMedia("(max-width: 639px)").matches) {
      setClosed(new Set([...FOOTER_SERVICES, ...FOOTER_MORE].map((group) => group.heading)));
    }
  }, []);

  const hitCount = stage
    ? [...FOOTER_SERVICES, ...FOOTER_MORE]
        .flatMap((group) => group.links.flatMap((link) => (link.sub ? link.links : [link])))
        .filter((link) => link.stages?.includes(stage)).length
    : 0;

  function pick(key) {
    const next = stage === key ? null : key;
    setStage(next);
    if (next) {
      // Open any collapsed group that holds a match.
      setClosed((prev) => {
        const kept = new Set(prev);
        for (const group of [...FOOTER_SERVICES, ...FOOTER_MORE]) {
          const links = group.links.flatMap((link) => (link.sub ? link.links : [link]));
          if (links.some((link) => link.stages?.includes(next))) kept.delete(group.heading);
        }
        return kept;
      });
    }
  }

  const onToggle = (heading, isOpen) =>
    setClosed((prev) => {
      const next = new Set(prev);
      if (isOpen) next.delete(heading);
      else next.add(heading);
      return next.size === prev.size && [...next].every((h) => prev.has(h)) ? prev : next;
    });

  const label = FOOTER_STAGES.find((item) => item.key === stage)?.label;

  return (
    <>
      <Box className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] items-start gap-x-16 gap-y-10 pb-10 max-[900px]:grid-cols-1">
        {brand}

        <Box className="rounded-[14px] border border-paper/12 bg-navy-soft px-6 py-5">
          <Box className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
            <Text as="h3" className="m-0 font-serif text-[22px] leading-[1.2] font-semibold text-paper">
              Find services by Edstellar 5A stage
            </Text>
            <Text as="p" className="m-0 text-[14px] text-paper/60">
              Select a stage to highlight the services and tools for it.
            </Text>
          </Box>
          <Box role="group" aria-label="Edstellar 5A stages" className="relative grid grid-cols-5 before:absolute before:inset-x-[10%] before:top-[15px] before:h-px before:bg-paper/22">
            {FOOTER_STAGES.map((item, index) => {
              const on = stage === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  aria-pressed={on}
                  onClick={() => pick(item.key)}
                  className={cn(
                    "group/st relative flex min-h-14 cursor-pointer flex-col items-center gap-2 rounded-[10px] px-1 font-body text-[14px] leading-[1.3] font-medium max-sm:text-[12px]",
                    on ? "text-lime" : "text-paper/[0.78]",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "grid size-[30px] place-items-center rounded-full border-[1.5px] font-mono text-[11px] leading-none transition-transform duration-200 group-hover/st:scale-[1.08] max-sm:size-7",
                      on ? "border-lime bg-lime text-navy" : "border-paper/45 bg-navy-soft text-paper",
                    )}
                  >
                    {pad(index + 1)}
                  </span>
                  {item.label}
                </button>
              );
            })}
          </Box>
          <Text as="p" role="status" className="m-0 mt-3 text-[14px] text-lime-soft empty:hidden">
            {stage ? `${label}: ${hitCount} services and tools highlighted below.` : ""}
          </Text>
        </Box>
      </Box>

      <Box as="nav" aria-label="Footer">
        <Box className="grid grid-cols-5 gap-x-6 gap-y-10 border-t border-paper/12 pt-10 pb-12 max-[1200px]:grid-cols-3 max-sm:grid-cols-1 max-sm:gap-0 max-sm:pt-2 max-sm:pb-6">
          {FOOTER_SERVICES.map((group) => (
            <Group key={group.heading} group={group} stage={stage} open={!closed.has(group.heading)} onToggle={onToggle} />
          ))}
        </Box>

        <Box className="grid grid-cols-[repeat(3,minmax(0,1fr))_minmax(0,1.6fr)] gap-x-8 gap-y-10 border-t border-paper/12 py-10 max-[1200px]:grid-cols-3 max-sm:grid-cols-1 max-sm:gap-0 max-sm:pt-2">
          {FOOTER_MORE.map((group) => (
            <Group key={group.heading} group={group} stage={stage} open={!closed.has(group.heading)} onToggle={onToggle} />
          ))}
          <Box className="max-[1200px]:col-span-full max-sm:pt-6">{contact}</Box>
        </Box>
      </Box>
    </>
  );
}
