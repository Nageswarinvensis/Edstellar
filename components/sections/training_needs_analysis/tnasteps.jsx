import { Fragment } from "react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import TnaStageScroller from "./tna-stage-scroller";
import TnaStageScreen from "./tna-stage-screens";
import { cn } from "@/lib/utils";

/*
 * Scrollytelling stages. From 900px the screens share one sticky, full-height
 * cell in the left column while the steps scroll past on the right; the
 * scroller marks the active pair with `data-on`, which fades that screen in
 * and brightens its step. Below 900px (and with reduced motion) every stage
 * simply stacks as step, then screen, all fully visible.
 */

const STEP_CLASS = `
  mb-5 min-[900px]:mb-0
  min-[900px]:col-start-2 min-[900px]:flex min-[900px]:min-h-screen min-[900px]:flex-col min-[900px]:justify-center
  min-[900px]:opacity-24 min-[900px]:transition-opacity min-[900px]:duration-400 min-[900px]:ease-[ease]
  min-[900px]:data-on:opacity-100
  motion-reduce:col-start-1! motion-reduce:min-h-0! motion-reduce:py-5! motion-reduce:opacity-100!
`;

const FIG_CLASS = `
  mb-[30px]
  min-[900px]:pointer-events-none min-[900px]:sticky min-[900px]:top-0 min-[900px]:col-start-1 min-[900px]:[grid-row:1/-1]
  min-[900px]:m-0 min-[900px]:flex min-[900px]:h-screen min-[900px]:items-center min-[900px]:justify-center
  min-[900px]:translate-y-3 min-[900px]:opacity-0
  min-[900px]:transition-[opacity,translate] min-[900px]:duration-400 min-[900px]:ease-[ease]
  min-[900px]:data-on:pointer-events-auto min-[900px]:data-on:translate-y-0 min-[900px]:data-on:opacity-100
  min-[900px]:not-data-on:**:[animation-play-state:paused]!
  motion-reduce:static! motion-reduce:col-start-1! motion-reduce:[grid-row:auto]! motion-reduce:mb-[30px]!
  motion-reduce:h-auto! motion-reduce:translate-none! motion-reduce:opacity-100! motion-reduce:**:animate-none!
`;

export default function TnaSteps({ data }) {
  if (!data) return null;

  const { sectionId, heading, subtitle, items } = data;

  return (
    <Section id={sectionId} className="bg-paper-warm">
      <Box className="mb-10 max-w-[62ch]">
        <Reveal>
          <RichHeading heading={heading} />
        </Reveal>

        {subtitle && (
          <Reveal delay={1}>
            <Text as="p" className="mt-4 max-w-[60ch] text-[16px] leading-relaxed text-ink/70">
              {subtitle}
            </Text>
          </Reveal>
        )}
      </Box>

      <TnaStageScroller
        className="
          mt-[26px]
          min-[900px]:grid min-[900px]:grid-cols-2 min-[900px]:items-start min-[900px]:gap-x-[60px]
          motion-reduce:grid-cols-1!
        "
      >
        {items?.map((step, index) => {
          const active = index === 0 ? { "data-on": "" } : {};

          return (
            <Fragment key={step.title}>
              <Box data-stage-step data-i={index} {...active} className={cn(STEP_CLASS)}>
                <Text
                  as="span"
                  className="mb-[7px] block font-mono text-[12px] leading-[1.7] tracking-[0.14em] text-ink/60"
                >
                  {String(index + 1).padStart(2, "0")}
                </Text>

                <Text
                  as="h3"
                  className="mb-2.5 text-[clamp(20px,2.2vw,24px)] leading-[1.2]"
                >
                  {step.title}
                </Text>

                {step.paragraphs?.map((paragraph) => (
                  <Text
                    key={paragraph}
                    as="p"
                    className="max-w-[500px] text-[17px] leading-[1.6] text-ink/60 hyphens-manual [p+&]:mt-[15px]"
                  >
                    {paragraph}
                  </Text>
                ))}
              </Box>

              <Box
                data-stage-fig
                data-i={index}
                {...active}
                aria-hidden="true"
                className={cn(FIG_CLASS)}
              >
                <TnaStageScreen screen={step.screen} />
              </Box>
            </Fragment>
          );
        })}
      </TnaStageScroller>
    </Section>
  );
}
