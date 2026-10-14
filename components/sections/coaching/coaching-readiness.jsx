"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import CtaButton from "@/components/common/cta-button";

/**
 * "Signs your leaders are ready" — heading, lede and a CTA on the left; a
 * tickable checklist on the right with a live count and a message that changes
 * with how many statements apply (`messages.none / few / most / all`).
 *
 * Design: coaching-hub `#ready`, `.ready`, `.rd-item`, `.rd-out`.
 */
export default function CoachingReadiness({ data }) {
  const statements = data?.statements ?? [];
  const [checked, setChecked] = useState(() => statements.map(() => false));

  if (!statements.length) return null;

  const { section_id, heading, description, cta, legend, messages = {} } = data;
  const count = checked.filter(Boolean).length;
  const total = statements.length;
  const message =
    count === 0 ? messages.none : count <= 2 ? messages.few : count < total ? messages.most : messages.all;

  return (
    <Section id={section_id} className="bg-navy text-paper">
      <Box className="grid grid-cols-[0.9fr_1.1fr] items-center gap-14 max-[900px]:grid-cols-1 max-[900px]:gap-8">
        <Reveal>
          <RichHeading heading={heading} className="text-paper" emphasisClassName="font-normal text-lime" />
          {description ? (
            <Text as="p" className="mt-4 max-w-[68ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-paper/60">
              {description}
            </Text>
          ) : null}
          {cta?.href ? (
            <CtaButton color="lime" arrow render={<Link href={cta.href} />} className="mt-8 px-7 py-4 focus-visible:outline-lime">
              {cta.label}
            </CtaButton>
          ) : null}
        </Reveal>

        <Reveal delay={1} className="min-w-0">
          <Box as="fieldset" className="m-0 grid gap-3 border-0 p-0">
            <legend className="sr-only">{legend}</legend>
            {statements.map((statement, index) => (
              <label
                key={statement}
                className="relative flex cursor-pointer items-start gap-4 rounded-xl border border-paper/10 bg-navy-soft px-5 py-4.5 text-[16px] leading-normal transition-colors duration-200 hover:border-lime/40"
              >
                <input
                  type="checkbox"
                  checked={checked[index]}
                  onChange={(event) =>
                    setChecked((prev) => prev.map((value, i) => (i === index ? event.target.checked : value)))
                  }
                  className="peer absolute size-px opacity-0"
                />
                <span
                  aria-hidden="true"
                  className="grid size-6.5 flex-none place-items-center rounded-[7px] border-[1.5px] border-paper/40 text-navy peer-checked:border-lime peer-checked:bg-lime peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-lime [&_svg]:opacity-0 peer-checked:[&_svg]:opacity-100"
                >
                  <Check size={16} strokeWidth={2.4} />
                </span>
                <span>{statement}</span>
              </label>
            ))}
          </Box>
          <Text as="p" aria-live="polite" className="mt-4.5 text-[15px] text-paper/80">
            <b className="mr-1.5 font-display text-lime">
              {count} of {total}
            </b>
            {message}
          </Text>
        </Reveal>
      </Box>
    </Section>
  );
}
