"use client";

import { useEffect, useRef, useState } from "react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import SectionHead, { SECTION_PADDING, SECTION_WIDTH } from "@/components/common/section-head";
import { cn } from "@/lib/utils";

const pad = (n) => String(n).padStart(2, "0");

/** Half a step dot (56px) — the rail runs dot centre to dot centre. */
const DOT_HALF = 28;

/**
 * "How it works" — the heading pinned on the left, a vertical timeline of
 * steps on the right. A lime line fills down the rail to a point 60% down
 * the viewport, and each step lights up as the line reaches its dot; the
 * pinned counter shows how many are lit.
 *
 * Until the first measurement (and with JS off) every step reads at full
 * strength, so nothing is hidden from crawlers or no-JS readers. Under
 * reduced motion the line is drawn full and every step is lit.
 *
 * Design: Join as a Trainer `#how-it-works`, `.how-wrap`, `.steps`, `.step`.
 */
export default function TrainerSteps({ data }) {
  const steps = data?.steps ?? [];
  const boxRef = useRef(null);
  const fillRef = useRef(null);
  const dotRefs = useRef([]);
  const [lit, setLit] = useState(null);

  useEffect(() => {
    const box = boxRef.current;
    const fill = fillRef.current;
    if (!box || !fill || !steps.length) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    function paint() {
      frame = 0;
      const top = box.getBoundingClientRect().top + DOT_HALF;
      const dots = dotRefs.current.filter(Boolean);
      const span = dots[dots.length - 1].getBoundingClientRect().top + DOT_HALF - top;
      const at = reduced ? Infinity : window.innerHeight * 0.6 - top;

      fill.style.height = `${Math.max(0, Math.min(at, span))}px`;
      setLit(dots.filter((dot) => dot.getBoundingClientRect().top + DOT_HALF - top <= at).length);
    }

    function request() {
      if (!frame) frame = requestAnimationFrame(paint);
    }

    paint();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, [steps.length]);

  if (!steps.length) return null;

  const measured = lit !== null;

  return (
    <Section id="how-it-works" className={cn("bg-navy-deep text-paper", SECTION_PADDING)} innerClassName={SECTION_WIDTH}>
      <Box className="grid items-start gap-10 min-[901px]:grid-cols-[0.85fr_1.15fr] min-[901px]:gap-18">
        <Box className="min-[901px]:sticky min-[901px]:top-30">
          <SectionHead
           
            heading={data.heading}
            description={data.description}
            align="start"
            dark
            className="mb-0 sm:mb-0"
          />
          <Text
            as="p"
            aria-hidden="true"
            className="mt-8 hidden font-mono text-[12px] leading-none tracking-[0.16em] text-paper/50 uppercase min-[901px]:block"
          >
            <b className="mr-1.5 align-[-6px] font-display text-[44px] font-bold tracking-[-0.04em] text-lime">
              {pad(Math.max(lit ?? 1, 1))}
            </b>
            / {pad(steps.length)} {data.count_label}
          </Text>
        </Box>

        <Box as="ol" ref={boxRef} className="relative list-none">
          <Box as="span" aria-hidden="true" className="absolute top-7 bottom-7 left-[27px] w-0.5 rounded-sm bg-paper/12" />
          <Box
            as="span"
            ref={fillRef}
            aria-hidden="true"
            className="absolute top-7 left-[27px] h-0 w-0.5 rounded-sm bg-[linear-gradient(180deg,var(--color-lime-soft),var(--color-lime))] shadow-[0_0_14px_rgba(200,241,53,0.55)]"
          />

          {steps.map((step, index) => {
            const on = measured && index < lit;
            return (
              <Box
                as="li"
                key={step.title}
                className="relative grid grid-cols-[56px_1fr] gap-5 pb-11 last:pb-0 min-[901px]:gap-7 min-[901px]:pb-16"
              >
                <Box
                  ref={(node) => (dotRefs.current[index] = node)}
                  aria-hidden="true"
                  className={cn(
                    "relative z-1 flex size-14 items-center justify-center rounded-full border-[1.5px] font-mono text-[14px] transition-[background-color,color,border-color,box-shadow,transform] duration-400",
                    on
                      ? "scale-104 border-lime bg-lime text-navy shadow-[0_0_0_8px_rgba(200,241,53,0.12)]"
                      : "border-paper/12 bg-navy-deep text-paper/50",
                  )}
                >
                  {pad(index + 1)}
                </Box>
                <Box
                  className={cn(
                    "pt-3 transition-[opacity,transform] duration-500",
                    measured && !on && "translate-x-2.5 opacity-38",
                  )}
                >
                  <Text as="h3" className="mb-2.5 text-[18px] leading-[1.3] font-semibold text-paper min-[901px]:text-[21px]">
                    {step.title}
                  </Text>
                  <Text as="p" className="max-w-[52ch] text-[15px] leading-[1.75] text-paper/72">
                    {step.text}
                  </Text>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Section>
  );
}
