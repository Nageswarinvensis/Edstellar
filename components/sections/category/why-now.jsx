import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import RichHeading from "@/components/shared/rich-heading";
import Reveal from "@/components/shared/reveal";
import CtaBanner from "@/components/shared/ctabanner";
import { Accordion, AccordionItem, AccordionContent } from "@/components/ui/accordion";
import WhyNowShifts from "@/components/sections/category/why-now-shifts";
import WhyNowPressures from "@/components/sections/category/why-now-pressures";

/**
 * `AccordionTrigger` in components/ui/accordion.jsx bakes in chevron icons
 * with no way to swap them, and that file is shadcn-owned (never edit it
 * directly — TASTE.md §6.2). This design wants a plus that flips to a
 * minus and an emphasis phrase inside the question, so this composes the
 * base-ui trigger primitive directly instead, matching `faq.jsx`.
 */
function WhyNowTrigger({ parts }) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger className="group/why-now-trigger flex w-full flex-1 cursor-pointer items-center gap-4.5 py-6.5 text-left outline-none">
        <Text
          as="span"
          className="flex-1 font-display text-[clamp(20px,2vw,27px)] font-bold leading-[1.2] tracking-[-0.02em] text-ink"
        >
          {parts.map((part, index) =>
            part.em ? (
              <em key={index} className="font-serif font-normal italic">
                {part.text}
              </em>
            ) : (
              part.text
            ),
          )}
        </Text>

        <span aria-hidden="true" className="relative flex size-5.5 flex-none items-center justify-center">
          <span className="absolute h-[1.5px] w-[15px] rounded-full bg-ink" />
          <span className="absolute h-[15px] w-[1.5px] rounded-full bg-ink transition-transform duration-300 group-aria-expanded/why-now-trigger:scale-y-0" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

/**
 * The market case for urgency, merged into one accordion: what changed in
 * the field (five shifts, tab-and-detail), why hiring cannot close the gap
 * (a three-stat band), and what standing still costs (a pressures
 * scroller). Ends in the same "build versus buy" CTA as `course-about.jsx`.
 *
 * Design: `section#why-now.block.warm`, `.acc`, `.shf-wrap`, `.loss-wrap`.
 */
export default function WhyNow({ whyNow, cta }) {
  if (!whyNow?.accordion?.length) return null;

  return (
    <Section id="why-now" className="border-t border-ink/10 bg-paper-warm">
      <Reveal delay={1}>
        <RichHeading
          as="h2"
          parts={whyNow.heading.parts}
          emphasisClassName="font-serif italic font-normal"
          className="max-w-[20ch] tracking-[-0.03em]"
        />
      </Reveal>

      <Reveal delay={2}>
        <Text as="p" className="mt-4 mb-11 max-w-[64ch] text-[16.5px] leading-[1.7] text-ink/60">
          {whyNow.description}
        </Text>
      </Reveal>

      <Reveal delay={2}>
        <Accordion defaultValue={[whyNow.accordion[0].id]} className="border-t border-ink/10">
          {whyNow.accordion.map((item) => (
            <AccordionItem key={item.id} value={item.id} className="border-ink/10">
              <WhyNowTrigger parts={item.question.parts} />

              <AccordionContent className="pb-11">
                <Text as="p" className="mb-7.5 max-w-[62ch] text-[15px] leading-[1.7] text-ink/60">
                  {item.lede}
                </Text>

                {item.shifts ? <WhyNowShifts shifts={item.shifts} note={item.note} /> : null}

                {item.stats ? (
                  <Box className="grid grid-cols-1 overflow-hidden rounded-2xl border border-ink/10 bg-white sm:grid-cols-3">
                    {item.stats.map((stat, index) => (
                      <Box
                        key={stat.value}
                        className={
                          index !== item.stats.length - 1
                            ? "border-b border-ink/10 p-6.5 sm:border-r sm:border-b-0"
                            : "p-6.5"
                        }
                      >
                        <Text
                          as="p"
                          className="font-display text-[clamp(30px,3.4vw,42px)] leading-none font-bold tracking-[-0.04em] text-ink"
                        >
                          {stat.value}
                        </Text>
                        <Text as="p" className="mt-2.5 mb-3.5 text-[13.5px] leading-[1.65] text-ink/60">
                          {stat.description}
                        </Text>
                        <Text as="span" className="font-mono text-[10px] tracking-[0.12em] text-ink/40 uppercase">
                          {stat.source}
                        </Text>
                      </Box>
                    ))}
                  </Box>
                ) : null}

                {item.pressures ? (
                  <WhyNowPressures pressures={item.pressures} note={item.note} />
                ) : null}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>

      {cta ? (
        <Reveal delay={2}>
          <CtaBanner data={cta} />
        </Reveal>
      ) : null}
    </Section>
  );
}
