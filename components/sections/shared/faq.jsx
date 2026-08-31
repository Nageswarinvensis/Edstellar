"use client";

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import SecCta from "@/components/common/sec-cta";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
} from "@/components/ui/accordion";
import RichHeading from "@/components/common/rich-heading";

function FaqAnswer({ answer }) {
  function handleClick(e) {
    const anchor = e.target.closest("a[href^='#']");
    if (!anchor) return;
    const id = anchor.getAttribute("href").slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  }

  if (typeof answer === "string" && answer.includes("<")) {
    const html = answer.replace(/\\"/g, '"');
    return (
      <Text
        as="p"
        className="text-[15px] leading-[1.7] text-ink/60 [&_a]:font-semibold [&_a]:text-olive [&_a]:underline [&_a]:underline-offset-2"
        onClick={handleClick}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <Text as="p" className="text-[15px] leading-[1.7] text-ink/60">
      {answer}
    </Text>
  );
}

const SECTION_CTA = {
  title: "Question not answered here?",
  description:
    "Put it in the request. A training specialist answers it directly, within one business day.",
  cta: { label: "Talk to our Expert", href: "#apply" },
};

/**
 * `AccordionTrigger` in components/ui/accordion.jsx bakes in chevron icons
 * with no way to swap them, and that file is shadcn-owned (never edit it
 * directly — TASTE.md §13). The FAQ design wants a plus that flips to a
 * minus, so this composes the base-ui trigger primitive directly instead.
 */
function FaqTrigger({ children }) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        title={
          typeof children === "string"
            ? `Click Here to View ${children}`
            : undefined
        }
        className="group/faq-trigger flex flex-1 items-center justify-between gap-6 py-6 text-left font-display text-lg font-medium tracking-[-0.01em] text-ink outline-none cursor-pointer"
      >
        <span className="font-display font-medium not-italic">{children}</span>

        <span
          aria-hidden="true"
          className="relative flex size-5 flex-none items-center justify-center"
        >
          <span className="absolute h-0.5 w-3 rounded-full bg-ink" />
          <span className="absolute h-3 w-0.5 rounded-full bg-ink transition-transform duration-300 group-aria-expanded/faq-trigger:scale-y-0" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export default function Faq({ faqs, courseName }) {
  if (!faqs || Array.isArray(faqs) || !faqs.items?.length) return null;

  return (
    <Section
      id="faqs"
      className="scroll-mt-[calc(44px_+_var(--mobile-toc-h,0px))] lg:scroll-mt-[calc(4px_+_var(--mobile-toc-h,0px))] border-t border-ink/10"
    >
      <Box>
        <Reveal delay={1}>
          <RichHeading
            as="h2"
            parts={[
              { text: `Corporate ${courseName ?? ""} Training ` },
              { text: "FAQs", is_italic: true },
            ]}
            className="max-w-[28ch] tracking-[-0.03em]"
            emphasisClassName="font-normal italic"
          />
        </Reveal>

        <Reveal delay={1}>
          <Accordion multiple className="mt-4.5 w-full">
            {faqs.items.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`faq-${index}`}
                className="border-ink/10"
              >
                <FaqTrigger>{faq.question}</FaqTrigger>

                <AccordionContent>
                  <FaqAnswer answer={faq.answer} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>

        <SecCta {...SECTION_CTA} />
      </Box>
    </Section>
  );
}
