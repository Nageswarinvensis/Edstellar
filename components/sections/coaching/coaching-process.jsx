"use client";

import { useRef, useState } from "react";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import { coachingIcon } from "@/components/sections/coaching/icons";
import { cn } from "@/lib/utils";

// Progress-track fill per active step (6 steps → 0 … 100%). Static classes so
// Tailwind sees them; a data-driven width would need an inline style.
const TRACK_FILL = ["w-0", "w-1/5", "w-2/5", "w-3/5", "w-4/5", "w-full"];

/**
 * How a coaching program runs — a six-step timeline (ARIA tabs) over a navy
 * stage with the step's photo and copy. Every step's panel is rendered
 * (inactive ones `hidden`), so all six are in the HTML.
 *
 * Design: coaching-hub `#process`, `.tl-line`, `.tl-n`, `.tl-dot`, `.tl-stage`,
 * `.tl-p`, `.tl-tx`.
 */
export default function CoachingProcess({ data }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);
  const steps = data?.steps ?? [];

  if (!steps.length) return null;

  const { section_id, heading, description, stats } = data;

  const onKeyDown = (event) => {
    const keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    if (!(event.key in keys)) return;
    event.preventDefault();
    const next = (active + keys[event.key] + steps.length) % steps.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <Section id={section_id}>
      <Box className="mb-12 max-w-205 max-[600px]:mb-8">
        <Reveal>
          <RichHeading heading={heading} emphasisClassName="font-normal" />
        </Reveal>
        {description ? (
          <Reveal delay={1}>
            <Text as="p" className="mt-4 max-w-[68ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink/60">
              {description}
            </Text>
          </Reveal>
        ) : null}
      </Box>

      <Reveal delay={2}>
        <Box
          role="tablist"
          aria-label="Coaching program steps"
          onKeyDown={onKeyDown}
          className="no-scrollbar relative mb-7 grid grid-cols-6 max-[900px]:-mx-4 max-[900px]:mb-6 max-[900px]:flex max-[900px]:snap-x max-[900px]:snap-mandatory max-[900px]:gap-1 max-[900px]:overflow-x-auto max-[900px]:px-4 max-[900px]:pt-1.5 max-[900px]:pb-1"
        >
          <span aria-hidden="true" className="absolute top-7 right-[8.33%] left-[8.33%] h-0.5 bg-ink/22 max-[900px]:hidden">
            <span
              className={cn(
                "block h-full bg-navy transition-[width] duration-400 ease-[cubic-bezier(.2,.7,.2,1)] motion-reduce:transition-none",
                TRACK_FILL[Math.min(active, TRACK_FILL.length - 1)],
              )}
            />
          </span>

          {steps.map((step, index) => {
            const Icon = coachingIcon(step.icon);
            const selected = index === active;
            const done = index < active;
            return (
              <button
                key={step.label}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                type="button"
                role="tab"
                id={`sp-t${index}`}
                aria-controls={`sp-p${index}`}
                aria-selected={selected}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(index)}
                className={cn(
                  "group relative flex min-w-0 cursor-pointer flex-col items-center gap-2.5 rounded-xl px-1.5 outline-none max-[900px]:flex-[0_0_104px] max-[900px]:snap-start",
                  selected ? "text-navy" : "text-ink/60",
                )}
              >
                <span
                  className={cn(
                    "grid size-14 place-items-center rounded-full border-2 transition-[background-color,border-color,box-shadow,transform] duration-250 group-hover:-translate-y-0.5 group-hover:border-navy group-focus-visible:outline-2 group-focus-visible:outline-offset-6 group-focus-visible:outline-navy motion-reduce:transition-none",
                    selected
                      ? "border-navy bg-navy text-lime shadow-[0_0_0_6px_rgba(200,241,53,.35)]"
                      : done
                        ? "border-navy bg-white text-navy"
                        : "border-ink/22 bg-white text-navy",
                  )}
                >
                  {Icon ? <Icon size={20} strokeWidth={1.7} aria-hidden="true" /> : null}
                </span>
                <Text as="span" className="text-center font-display text-[14px] leading-[1.3] font-semibold text-inherit">
                  {step.label}
                </Text>
              </button>
            );
          })}
        </Box>

        <Box className="overflow-hidden rounded-[20px] bg-navy text-paper">
          {steps.map((step, index) => (
            <Box
              key={step.label}
              role="tabpanel"
              id={`sp-p${index}`}
              aria-labelledby={`sp-t${index}`}
              hidden={index !== active}
              className="min-h-100 grid-cols-[1.15fr_1fr] max-[900px]:grid-cols-1 [&:not([hidden])]:grid"
            >
              <Box className="relative min-h-70 overflow-hidden bg-navy-soft max-[900px]:min-h-55">
                {step.image ? (
                  <img
                    src={step.image}
                    alt={step.image_alt || ""}
                    width={1200}
                    height={800}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 size-full object-cover"
                  />
                ) : null}
              </Box>
              <Box className="flex flex-col items-start justify-center p-12 max-[900px]:px-6 max-[900px]:py-7">
                <Text as="span" className="font-mono text-[11px] uppercase tracking-[0.12em] text-lime">
                  {step.kicker}
                </Text>
                <Text as="h3" className="my-3 text-[32px] leading-[1.15] tracking-[-0.02em] text-white max-[900px]:text-[24px] max-[900px]:leading-[1.2]">
                  {step.title}
                </Text>
                <Text as="p" className="m-0 text-[17px] leading-[1.7] text-paper/78">
                  {step.description}
                </Text>
                {step.who ? (
                  <Text as="span" className="mt-4.5 rounded-full bg-lime-soft px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-navy">
                    {step.who}
                  </Text>
                ) : null}
              </Box>
            </Box>
          ))}
        </Box>
      </Reveal>

      {stats?.length ? (
        <Box
          as="ul"
          aria-label="Engagement at a glance"
          className="m-0 mt-7 grid list-none grid-cols-5 gap-3 p-0 max-[1100px]:grid-cols-3 max-[600px]:grid-cols-2"
        >
          {stats.map((stat) => {
            const Icon = coachingIcon(stat.icon);
            return (
              <Box as="li" key={stat.value} className="flex flex-col gap-1 rounded-[14px] border border-ink/12 bg-white p-5">
                {Icon ? <Icon size={20} strokeWidth={1.6} className="mb-2 text-navy" aria-hidden="true" /> : null}
                <Text as="b" className="font-display text-[18px] font-bold leading-[1.2] text-ink">{stat.value}</Text>
                <Text as="span" className="text-[14px] leading-[1.5] text-ink/55">{stat.label}</Text>
              </Box>
            );
          })}
        </Box>
      ) : null}
    </Section>
  );
}
