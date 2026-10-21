"use client";

import { Fragment, useRef, useState } from "react";
import Link from "next/link";
import { Gift, MessageSquare, User } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils";

const pad = (n) => String(n).padStart(2, "0");

/** Where each step sits around the cycle: top, right, bottom, left. */
const POSITIONS = [
  "top-0 left-1/2 -translate-x-1/2",
  "top-1/2 right-0 -translate-y-1/2",
  "bottom-0 left-1/2 -translate-x-1/2",
  "top-1/2 left-0 -translate-y-1/2",
];

/** "[label](href)" in a paragraph → a link. */
function Inline({ text }) {
  return text.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, index) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    return match ? (
      <Link key={index} href={match[2]} className="font-semibold text-ink underline underline-offset-3 hover:text-olive">
        {match[1]}
      </Link>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    );
  });
}

/** One "You share / Your CSM / You receive" box. */
function Column({ icon: Icon, label, items, dark }) {
  return (
    <Box className={cn("rounded-[14px] px-6 py-5", dark ? "bg-navy text-paper" : "border border-ink/12 bg-white")}>
      <Text as="p" className={cn("mb-3 flex items-center gap-2.5 font-mono text-[11px] tracking-[0.14em] uppercase", dark ? "text-paper/70" : "text-ink-muted")}>
        <Icon size={15} aria-hidden="true" className={dark ? "text-lime" : "text-ink"} />
        {label}
      </Text>
      <Box as="ul" className="m-0 flex list-none flex-col gap-2 p-0">
        {items.map((item) => (
          <li
            key={item}
            className={cn(
              "relative pl-4 text-[15.5px] leading-[1.5] before:absolute before:top-2.5 before:left-0 before:size-1.5 before:rounded-full before:content-['']",
              dark ? "text-paper before:bg-lime" : "text-ink before:bg-ink",
            )}
          >
            {item}
          </li>
        ))}
      </Box>
    </Box>
  );
}

/**
 * The four-step engagement — Define, Adapt, Deliver, Assess — as tabs set
 * around a cycle with the client success manager at the centre, beside the
 * selected step: its description, then what you share, what your client
 * success manager does, and what you receive. Every step's panel is in the
 * HTML (inactive ones `hidden`). Design: exceptional-customer-experience
 * `#journey`, `.step`, `.panel`.
 */
export default function JourneyTabs({ data }) {
  const [active, setActive] = useState(0);
  const tabs = useRef([]);
  const last = data.steps.length - 1;

  function onKeyDown(event) {
    const next = { ArrowRight: active === last ? 0 : active + 1, ArrowDown: active === last ? 0 : active + 1, ArrowLeft: active === 0 ? last : active - 1, ArrowUp: active === 0 ? last : active - 1 }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <Box className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[440px_1fr] lg:gap-14">
      <Box className="relative mx-auto aspect-square w-full max-w-110">
        <Box aria-hidden="true" className="absolute inset-[11%] rounded-full border-[6px] border-ink/15" />
        <Box className="absolute inset-[31%] grid place-items-center rounded-full bg-navy p-4 text-center">
          <Box>
            <Text as="span" className="block font-mono text-[10px] tracking-[0.16em] text-lime uppercase">
              {data.center.kicker}
            </Text>
            <Text as="span" className="mt-1.5 block font-display text-[clamp(15px,1.5vw,18px)] leading-tight font-semibold text-paper">
              {data.center.title}
            </Text>
          </Box>
        </Box>
        <Box role="tablist" aria-label="Engagement steps" onKeyDown={onKeyDown}>
          {data.steps.map((step, index) => (
            <button
              key={step.name}
              ref={(el) => (tabs.current[index] = el)}
              type="button"
              role="tab"
              id={`step-t${index}`}
              aria-controls={`step-p${index}`}
              aria-selected={active === index}
              tabIndex={active === index ? 0 : -1}
              onClick={() => setActive(index)}
              className={cn(
                "absolute w-28 cursor-pointer rounded-[14px] border px-3 py-3 text-center transition-colors sm:w-32",
                POSITIONS[index],
                active === index ? "border-navy bg-navy text-paper" : "border-ink/15 bg-white text-ink hover:border-navy",
              )}
            >
              <Text as="span" className={cn("block font-mono text-[11px]", active === index ? "text-lime" : "text-ink-muted")}>
                {pad(index + 1)}
              </Text>
              <Text as="span" className={cn("block font-display text-[18px] font-semibold", active === index ? "text-paper" : "text-ink")}>
                {step.name}
              </Text>
            </button>
          ))}
        </Box>
      </Box>

      {data.steps.map((step, index) => (
        <Box key={step.name} role="tabpanel" id={`step-p${index}`} aria-labelledby={`step-t${index}`} tabIndex={0} hidden={active !== index}>
          <Text as="h3" className="mb-3">
            {step.title}
          </Text>
          <Text as="p" className="mb-6 text-[16px] leading-[1.7]">
            <Inline text={step.text} />
          </Text>
          <Box className="flex flex-col gap-4">
            <Column icon={MessageSquare} label={data.labels.share} items={step.share} />
            <Column icon={User} label={data.labels.csm} items={step.csm} dark />
            <Column icon={Gift} label={data.labels.receive} items={step.receive} />
          </Box>
        </Box>
      ))}
    </Box>
  );
}
