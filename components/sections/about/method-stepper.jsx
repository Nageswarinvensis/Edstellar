"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils";

/** Where each step pill sits on the cycle: top, right, bottom-right,
 * bottom-left, left — clockwise, as in the design. Below `sm` the side pills
 * stay inside the box instead of overhanging it, so they don't run off
 * a phone screen. */
const POSITIONS = [
  "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
  "top-[35%] right-0 sm:translate-x-1/4",
  "bottom-[8%] right-0 sm:right-[8%] sm:translate-x-1/4",
  "bottom-[8%] left-0 sm:left-[8%] sm:-translate-x-1/4",
  "top-[35%] left-0 sm:-translate-x-1/4",
];

const pad = (n) => String(n).padStart(2, "0");

/**
 * The 5A methodology — five steps around a cycle on the left (the centre
 * shows the selected one), the selected step's detail on the right with
 * previous / next arrows. Every step's detail is in the HTML; inactive ones
 * are `hidden`. Design: about-us `#method`, `.stage-btn`, `.panel`.
 */
export default function MethodStepper({ data }) {
  const [active, setActive] = useState(0);
  const total = data.steps.length;
  const step = data.steps[active];
  const go = (delta) => setActive((index) => (index + delta + total) % total);

  return (
    <Box className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[440px_1fr] lg:gap-14">
      <Box className="relative mx-auto aspect-square w-full max-w-110 p-12">
        <Box aria-hidden="true" className="absolute inset-[13%] rounded-full border-2 border-ink/15" />
        <Box aria-hidden="true" className="absolute inset-[22%] rounded-full border border-dashed border-ink/12" />
        <Box className="absolute inset-[31%] grid place-items-center rounded-full bg-navy text-center">
          <Box aria-live="polite">
            <Text as="span" className="block font-mono text-[11px] tracking-[0.16em] text-paper/60 uppercase">
              Step
            </Text>
            <Text as="span" className="block font-display text-[clamp(20px,2.2vw,26px)] font-semibold text-lime">
              {step.name}
            </Text>
            <Text as="span" className="block text-[13px] text-paper/70">
              {active + 1} of {total}
            </Text>
          </Box>
        </Box>
        <Box role="tablist" aria-label="5A methodology steps">
          {data.steps.map((item, index) => (
            <button
              key={item.name}
              type="button"
              role="tab"
              id={`tab-${item.name.toLowerCase()}`}
              aria-controls={`panel-${item.name.toLowerCase()}`}
              aria-selected={active === index}
              onClick={() => setActive(index)}
              className={cn(
                "absolute flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2.5 font-display text-[14px] font-semibold whitespace-nowrap transition-colors",
                POSITIONS[index],
                active === index ? "border-navy bg-navy text-paper" : "border-ink/15 bg-white text-ink hover:border-navy",
              )}
            >
              <Text as="span" className={cn("font-mono text-[11px]", active === index ? "text-lime" : "text-ink-muted")}>
                {pad(index + 1)}
              </Text>
              {item.name}
            </button>
          ))}
        </Box>
      </Box>

      <Box className="rounded-[18px] border border-ink/12 bg-white p-8">
        {data.steps.map((item, index) => (
          <Box key={item.name} role="tabpanel" id={`panel-${item.name.toLowerCase()}`} aria-labelledby={`tab-${item.name.toLowerCase()}`} hidden={active !== index}>
            <Text as="h3" className="mb-3">
              {index + 1}. {item.name}
            </Text>
            <Text as="p" className="mb-7 text-[17px] leading-[1.7]">
              {item.description}
            </Text>
            <Box className="grid grid-cols-1 gap-6 border-b border-ink/12 pb-7 sm:grid-cols-2">
              <Box>
                <Text as="p" className="mb-3 font-mono text-[11px] tracking-[0.14em] text-ink-muted uppercase">
                  {data.services_label}
                </Text>
                <Box as="ul" className="m-0 grid list-none gap-2.5 p-0">
                  {item.services.map((service) => (
                    <li key={service.href}>
                      <Link href={service.href} className="text-[15.5px] text-ink underline underline-offset-3 hover:text-olive">
                        {service.label}
                      </Link>
                    </li>
                  ))}
                </Box>
              </Box>
              <Box>
                <Text as="p" className="mb-3 font-mono text-[11px] tracking-[0.14em] text-ink-muted uppercase">
                  {data.tools_label}
                </Text>
                <Box as="ul" className="m-0 flex list-none flex-wrap gap-2 p-0">
                  {item.tools.map((tool) => (
                    <li key={tool} className="rounded-full border border-ink/12 bg-paper-warm px-3.5 py-1.5 text-[13.5px] text-ink">
                      {tool}
                    </li>
                  ))}
                </Box>
              </Box>
            </Box>
            <Text as="p" className="mt-5 flex items-center gap-3 text-[15px] text-ink">
              <Check size={17} aria-hidden="true" className="flex-none" />
              <b className="font-semibold">{data.output_label}</b> {item.output}
            </Text>
          </Box>
        ))}

        <Box className="mt-7 flex items-center justify-between">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous step"
            className="grid size-11 cursor-pointer place-items-center rounded-full border border-ink/15 text-ink hover:border-navy"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <Text as="span" className="font-mono text-[12px] text-ink-muted">
            Step {active + 1} of {total}
          </Text>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next step"
            className="grid size-11 cursor-pointer place-items-center rounded-full border border-ink/15 text-ink hover:border-navy"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </Box>
      </Box>
    </Box>
  );
}
