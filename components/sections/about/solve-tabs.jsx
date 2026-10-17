"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils";

/**
 * "Who Edstellar works with" — a row of segment tabs (company stage) above
 * the selected segment's problem → solution panel. Every panel is in the
 * HTML (inactive ones `hidden`), so crawlers see all five.
 * Design: about-us `#solve`, `.ws-t`, `.ws-p`.
 */
export default function SolveTabs({ data }) {
  const [active, setActive] = useState(0);
  const tabs = useRef([]);
  const last = data.segments.length - 1;

  function onKeyDown(event) {
    const next = { ArrowRight: active === last ? 0 : active + 1, ArrowLeft: active === 0 ? last : active - 1, Home: 0, End: last }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <>
      <Box role="tablist" aria-label="Organization stage" onKeyDown={onKeyDown} className="no-scrollbar -mx-5 mb-6 flex gap-3 overflow-x-auto px-5 lg:mx-0 lg:grid lg:grid-cols-5 lg:px-0">
        {data.segments.map((segment, index) => (
          <button
            key={segment.title}
            ref={(el) => (tabs.current[index] = el)}
            type="button"
            role="tab"
            id={`ws-t${index}`}
            aria-controls={`ws-p${index}`}
            aria-selected={active === index}
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            className={cn(
              "min-w-52 flex-none cursor-pointer rounded-[14px] border px-4 py-3.5 text-left transition-colors lg:min-w-0",
              active === index ? "border-navy bg-navy text-paper" : "border-ink/12 bg-white text-ink hover:border-ink/30",
            )}
          >
            <Text as="span" className={cn("block font-mono text-[10px] tracking-[0.14em] uppercase", active === index ? "text-paper/60" : "text-ink/50")}>
              {segment.stage}
            </Text>
            <Text as="span" className={cn("mt-1 block font-display text-[15px] font-semibold", active === index ? "text-paper" : "text-ink")}>
              {segment.title}
            </Text>
            <Text as="span" className={cn("mt-0.5 block font-mono text-[11.5px]", active === index ? "text-lime" : "text-ring-1")}>
              {segment.size}
            </Text>
          </button>
        ))}
      </Box>

      {data.segments.map((segment, index) => (
        <Box
          key={segment.title}
          role="tabpanel"
          id={`ws-p${index}`}
          aria-labelledby={`ws-t${index}`}
          tabIndex={0}
          hidden={active !== index}
          className="grid grid-cols-1 items-center gap-5 lg:grid-cols-[1fr_auto_1.25fr] lg:gap-8"
        >
          <Box className="rounded-[18px] bg-navy px-8 py-8">
            <Text as="p" className="mb-3 font-mono text-[11px] tracking-[0.14em] text-lime uppercase">
              {data.problem_label}
            </Text>
            <Text as="p" className="font-serif text-[clamp(22px,2.3vw,30px)] leading-[1.25] text-paper italic">
              {segment.problem}
            </Text>
          </Box>
          <ArrowRight aria-hidden="true" size={26} className="mx-auto rotate-90 text-ink/50 lg:rotate-0" />
          <Box className="rounded-[18px] border border-ink/12 bg-white px-7 py-6">
            <Text as="p" className="mb-2.5 font-mono text-[11px] tracking-[0.14em] text-ink/55 uppercase">
              {data.solution_label}
            </Text>
            <Text as="p" className="text-[16.5px] leading-[1.6] text-ink">
              {segment.solution}
            </Text>
            <Box as="ul" className="m-0 mt-4 flex list-none flex-wrap gap-2 p-0">
              {segment.tags.map((tag) => (
                <li key={tag} className="rounded-full border border-ink/12 bg-paper-warm px-3.5 py-1.5 text-[13.5px] text-ink">
                  {tag}
                </li>
              ))}
            </Box>
            {segment.links?.length ? (
              <Box className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                {segment.links.map((link) => (
                  <Link key={link.href} href={link.href} className="inline-flex items-center gap-1.5 font-display text-[14px] font-semibold text-ink hover:text-olive">
                    {link.label}
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                ))}
              </Box>
            ) : null}
          </Box>
        </Box>
      ))}
    </>
  );
}
