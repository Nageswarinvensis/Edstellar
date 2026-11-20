import { Fragment } from "react";
import Link from "next/link";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import V2Section from "@/components/sections/course/v2/section";
import { cn } from "@/lib/utils";

function Clock({ size = 11 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6h4" />
    </svg>
  );
}

/**
 * v2 · 12 Learning path (the design's `#path`) — where this program sits
 * between what comes before and after it (this course highlighted, arrows
 * between on desktop), more related courses, and "Also from Edstellar".
 */
export default function V2Path({ data }) {
  if (!data?.steps?.length) return null;
  const { heading, text, steps, related_heading, related = [], related_link_label, also_label, also = [] } = data;

  return (
    <V2Section id="path" tone="warm" className="border-b border-ink/12">
      <Reveal>
        <Text as="h2" className="mb-4 max-w-[20ch] text-[clamp(28px,3.2vw,38px)] leading-[1.12]">{heading}</Text>
        <Text className="mb-10 max-w-[72ch] text-[15px] leading-[1.65]">{text}</Text>
      </Reveal>

      <Reveal as="ol" className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-[1fr_48px_1fr_48px_1fr_48px_1fr] lg:items-stretch lg:gap-0">
        {steps.map((step, i) => (
          <Fragment key={step.href}>
            {i > 0 && (
              <li aria-hidden="true" className="hidden items-center justify-center lg:flex">
                <span className="flex size-5 items-center justify-center rounded-full border border-ink/12 bg-white text-[10px] text-ink-muted">→</span>
              </li>
            )}
            <li
              className={cn(
                "relative flex min-w-0 flex-col overflow-hidden rounded-2xl border",
                step.current ? "border-navy-soft bg-navy-soft text-white shadow-[0_14px_30px_rgba(10,22,40,0.14)]" : "border-ink/12 bg-white",
              )}
            >
              <span aria-hidden="true" className={cn("relative mx-3 mt-3 h-[110px] overflow-hidden rounded-[9px]", step.current ? "bg-navy-soft" : "bg-paper-warm")} />
              <Box className="flex min-h-[205px] flex-1 flex-col px-3.5 pt-3 pb-4">
                <p className={cn("mb-2 font-mono text-[8px] uppercase tracking-[0.15em]", step.current ? "text-paper/60" : "text-ink-muted")}>{step.kicker}</p>
                <h3 className={cn("max-w-[220px] font-display text-[15px] leading-[1.15] font-medium tracking-[-0.025em]", step.current ? "text-white" : "text-ink")}>
                  {step.current ? step.name : <Link href={step.href} className="underline-offset-[3px] hover:underline">{step.name}</Link>}
                </h3>
                <p className={cn("mt-2 text-[11px] leading-[1.5]", step.current ? "text-paper/65" : "text-ink-muted")}>{step.text}</p>
                <Box className="mt-auto pt-5">
                  <p className={cn("mb-2 flex items-center gap-[5px] font-mono text-[8px] font-semibold uppercase tracking-[0.1em]", step.current ? "text-white/80" : "text-ink")}>
                    <span aria-hidden="true" className="size-1 flex-none rounded-full bg-olive" />
                    {step.modes?.join(" · ")}
                  </p>
                  <p className={cn("flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em]", step.current ? "text-white/60" : "text-ink-muted")}>
                    <Clock />
                    {step.hours}
                  </p>
                </Box>
              </Box>
            </li>
          </Fragment>
        ))}
      </Reveal>

      {related.length > 0 && (
        <Box className="mt-12 sm:mt-14 lg:mt-16">
          <Text as="h3" className="mb-5 text-[20px] leading-[1.2] tracking-[-0.02em] sm:mb-7 sm:text-[22px]">{related_heading}</Text>
          <ul className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <li key={r.href}>
                <Link
                  href={r.href}
                  className="group flex h-full flex-col rounded-[14px] border border-ink/12 bg-white p-5 transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-ink/22 hover:shadow-[0_20px_42px_-26px_rgba(10,22,40,0.5)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-olive sm:p-6 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  <span className="font-display text-[16px] leading-[1.35] font-medium tracking-[-0.015em] text-ink">{r.name}</span>
                  <span className="mt-auto pt-4">
                    <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[11px] leading-[1.4] uppercase tracking-[0.14em] text-ink-muted">
                      <span className="inline-flex items-center gap-1.5"><Clock />{r.hours}</span>
                      <span aria-hidden="true" className="size-1 rounded-full bg-ink/30" />
                      <span>{r.mode}</span>
                    </span>
                    <span className="mt-4 block border-t border-ink/12 pt-3.5">
                      <span className="inline-flex items-center gap-1.5 font-body text-[14px] leading-[1.4] font-semibold text-ink transition-colors group-hover:text-olive">
                        {related_link_label}
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      </span>
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Box>
      )}

      {also.length > 0 && (
        <Box className="mt-12 border-t border-ink/15 pt-8 lg:mt-16">
          <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">{also_label}</p>
          <ul className="grid grid-cols-1 overflow-hidden rounded-[14px] border border-ink/15 bg-white md:grid-cols-2 lg:grid-cols-3">
            {also.map((a, i) => (
              <li
                key={a.href}
                className={cn(
                  "border-ink/15 not-last:border-b md:[&:nth-child(odd)]:border-r md:[&:nth-last-child(-n+2)]:border-b-0 lg:border-0 lg:not-[:nth-child(3n)]:border-r lg:[&:nth-child(-n+3)]:border-b",
                  i === also.length - 1 && "border-b-0",
                )}
              >
                <Link href={a.href} className="group relative block h-full px-5 py-4 transition-colors hover:bg-sand focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-olive">
                  <span aria-hidden="true" className="absolute top-4 right-5 font-body text-[12px] text-ink-muted transition-transform group-hover:translate-x-1">→</span>
                  <b className="block pr-7 font-display text-[14px] leading-[1.25] font-medium tracking-[-0.01em] text-ink">{a.title}</b>
                  <span className="mt-2 block max-w-[330px] text-[11px] leading-[1.25] text-ink-muted">{a.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Box>
      )}
    </V2Section>
  );
}
