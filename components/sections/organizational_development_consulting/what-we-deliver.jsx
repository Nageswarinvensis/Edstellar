import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import DeliverScroller from "@/components/sections/organizational_development_consulting/deliver-scroller";
import { cn } from "@/lib/utils";

/**
 * "What our change management consulting delivers" — the connected program as
 * scrollytelling. From 900px a decorative layer stack stays pinned on the left
 * (each layer flips to navy and reveals its deliverable as its step comes into
 * view) while the six steps scroll past on the right; below 900px the stack is
 * dropped and each step carries its own "You get" chip. The scroll sync is the
 * shared `StageScroller` client leaf (it marks the active step and layer with
 * `data-on`); everything else is a Server Component, so every step's copy is in
 * the initial HTML.
 *
 * Change-management-specific, so it lives in this page's own section folder
 * (TASTE.md §6.1).
 *
 * Design: `change-management-consulting (18).html` → `#what-we-do`, `.sc`,
 * `.sc-viz`, `.sc-stack`, `.sc-layer`, `.sc-steps`, `.sc-step`, `.sc-blocks`,
 * `.sc-chip`.
 */

const MONO = "font-mono uppercase";

function StepBlock({ label, items }) {
  if (!items?.length) return null;

  return (
    <Box>
      <Text
        as="span"
        className={`${MONO} mb-3 block border-b-2 border-lime pb-2.25 text-[10.5px] leading-none font-semibold tracking-[0.12em] text-navy`}
      >
        {label}
      </Text>
      <Box as="ul" className="flex flex-col">
        {items.map((item) => (
          <Box
            as="li"
            key={item}
            className="relative mb-2.25 pl-4 text-[12.5px] leading-[1.5] text-ink/60 last:mb-0"
          >
            <Box
              aria-hidden="true"
              className="absolute top-1.75 left-0 size-[5px] rounded-[1px] bg-lime"
            />
            {item}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default function WhatWeDeliver({ data }) {
  if (!data?.steps?.length) return null;

  const { section_id, heading, description, steps } = data;

  return (
    <Section id={section_id ?? "what-we-do"} className="scroll-mt-20 bg-paper-warm">
      <Box className="mb-8 max-w-[62ch]">
        <Reveal>
          <RichHeading heading={heading} emphasisClassName="font-normal" />
        </Reveal>
        {description ? (
          <Reveal delay={1}>
            <Text
              as="p"
              className="mt-4 max-w-[60ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink/60"
            >
              {description}
            </Text>
          </Reveal>
        ) : null}
      </Box>

      <DeliverScroller
        className="
          mx-auto mt-3 max-w-[1080px]
          min-[900px]:grid min-[900px]:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] min-[900px]:items-start min-[900px]:gap-x-12
        "
      >
        {/* Decorative layer stack — pinned on desktop, dropped below 900px. */}
        <Box
          aria-hidden="true"
          className="hidden min-[900px]:block min-[900px]:sticky min-[900px]:top-22 min-[900px]:self-start"
        >
          <Box className="flex flex-col gap-2.25">
            {steps.map((step, index) => (
              <Box
                key={step.title}
                data-stage-fig
                data-i={index}
                {...(index === 0 ? { "data-on": "" } : {})}
                className={cn(
                  "flex flex-col rounded-[12px] border border-ink/12 bg-white px-4.25 py-3.25 transition-all duration-300",
                  // Already passed → navy
                  "data-done:border-navy data-done:bg-navy",
                  "data-done:[&_[data-sc-n]]:text-paper/55 data-done:[&_[data-sc-t]]:text-paper",
                  // Current → lime, reveals the deliverable
                  "data-on:border-lime data-on:bg-lime",
                  "data-on:[&_[data-sc-n]]:text-navy/55 data-on:[&_[data-sc-t]]:text-navy data-on:[&_[data-sc-get]]:flex",
                )}
              >
                <Box className="flex items-center gap-3">
                  <Text
                    data-sc-n
                    as="span"
                    className="font-mono text-[11px] tracking-[0.1em] text-ink/45"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </Text>
                  <Text
                    data-sc-t
                    as="span"
                    className="font-display text-[13.5px] leading-[1.2] font-semibold text-ink"
                  >
                    {step.title}
                  </Text>
                </Box>

                {step.get ? (
                  <Box
                    data-sc-get
                    className="mt-2.75 hidden flex-col border-t border-navy/20 pt-2.5"
                  >
                    <Text
                      as="span"
                      className={`${MONO} mb-0.75 text-[9px] tracking-[0.12em] text-navy/60`}
                    >
                      You get
                    </Text>
                    <Text
                      as="span"
                      className="font-serif text-[15px] leading-[1.25] font-medium text-navy italic"
                    >
                      {step.get}
                    </Text>
                  </Box>
                ) : null}
              </Box>
            ))}
          </Box>
        </Box>

        {/* The six steps. */}
        <Box as="ol" className="min-[900px]:col-start-2">
          {steps.map((step, index) => (
            <Box
              as="li"
              key={step.title}
              data-stage-step
              data-i={index}
              {...(index === 0 ? { "data-on": "" } : {})}
              className="border-t border-ink/12 py-5.5 min-[900px]:flex min-[900px]:min-h-[50vh] min-[900px]:flex-col min-[900px]:justify-center min-[900px]:py-[4vh]"
            >
              <Text
                as="span"
                className={`${MONO} mb-2 block text-[11px] leading-[1.7] tracking-[0.14em] text-ink/45`}
              >
                {`Step ${String(index + 1).padStart(2, "0")}`}
              </Text>
              <Text
                as="h3"
                className="mb-4.5 font-display text-[22px] leading-[1.2] font-semibold text-ink max-[640px]:text-[19px]"
              >
                {step.title}
              </Text>

              {step.how ? (
                <Text as="p" className="mb-5 max-w-[560px] text-[13.5px] leading-[1.55] text-ink">
                  <Text
                    as="span"
                    className={`${MONO} mr-2.25 inline-block rounded-full bg-lime px-2.25 py-0.75 align-middle text-[9.5px] font-semibold tracking-[0.12em] text-navy`}
                  >
                    How
                  </Text>
                  {step.how}
                </Text>
              ) : null}

              <Box className="grid grid-cols-2 gap-7.5 max-[640px]:grid-cols-1 max-[640px]:gap-5">
                <StepBlock label="What we do" items={step.do} />
                <StepBlock label="What we build" items={step.build} />
              </Box>

              {/* Deliverable: shown on the active stack layer at ≥900px, so the
                  chip only appears below that, where the stack is dropped. */}
              {step.get ? (
                <Text
                  as="span"
                  className={`${MONO} mt-4 inline-block self-start rounded-full bg-lime-soft px-3.25 py-1.25 text-[11px] tracking-[0.02em] text-navy min-[900px]:hidden`}
                >
                  {`You get: ${step.get}`}
                </Text>
              ) : null}
            </Box>
          ))}
        </Box>
      </DeliverScroller>
    </Section>
  );
}
