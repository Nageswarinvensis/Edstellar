"use client";

import { useState } from "react";
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { ChevronDown } from "lucide-react";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import SecCta from "@/components/common/sec-cta";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

/** Questions shown before the "Load more" toggle — matches the course
 * design's own cutoff (5 of 15 for its FAQ list). Only applies when the
 * section is `collapsible`; every other page lists all its questions. */
const INITIAL_VISIBLE_COUNT = 5;

function FaqAnswer({ answer }) {
  function handleClick(e) {
    const anchor = e.target.closest("a[href^='#']");
    if (!anchor) return;
    const id = anchor.getAttribute("href").slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    target.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
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
  cta: { label: "Talk to a Training Advisor", href: "#apply" },
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

export default function Faq({
  faqs,
  innerClassName,
  headingClassName,
  collapsible = false,
  showCta = true,
  className,
  id = "faqs",
}) {
  // All items still render (hidden via a class, not left out of the DOM),
  // so the full FAQ list stays crawlable and searchable even collapsed.
  const [expanded, setExpanded] = useState(false);

  if (!faqs || Array.isArray(faqs) || !faqs.items?.length) return null;

  const hiddenCount = collapsible
    ? Math.max(faqs.items.length - INITIAL_VISIBLE_COUNT, 0)
    : 0;
  const collapsed = hiddenCount > 0 && !expanded;

  return (
    <Section
      id={id}
      className={cn(
        "scroll-mt-[calc(44px_+_var(--mobile-toc-h,0px))] lg:scroll-mt-[calc(4px_+_var(--mobile-toc-h,0px))] border-t border-ink/10",
        className,
      )}
      innerClassName={innerClassName}
    >
      <Box>
        <Reveal delay={1}>
          <RichHeading
            heading={faqs.heading}
            className={cn("max-w-[28ch]", headingClassName)}
          />
        </Reveal>

        <Reveal delay={1}>
          <Accordion multiple hiddenUntilFound className="mt-4.5 w-full">
            {faqs.items.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`faq-${index}`}
                className={cn(
                  "border-ink/10",
                  collapsed && index >= INITIAL_VISIBLE_COUNT && "hidden",
                )}
              >
                <FaqTrigger>{faq.question}</FaqTrigger>

                <AccordionContent>
                  <FaqAnswer answer={faq.answer} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>

        {collapsed ? (
          <Reveal delay={2}>
            <Box className="mt-6 flex justify-center">
              <button
                type="button"
                title="Click Here to View Load more questions"
                onClick={() => setExpanded(true)}
                className="inline-flex cursor-pointer items-center gap-2.25 rounded-full border border-ink/14 bg-white px-5.5 py-2.75 font-body text-[13.5px] font-semibold text-ink transition-[border-color,box-shadow] duration-200 hover:border-ink hover:shadow-[0_10px_24px_-16px_rgba(10,22,40,0.6)]"
              >
                Load more questions
                <Text as="span" className="font-mono text-[11px] text-ink/60">
                  {hiddenCount} more
                </Text>
                <ChevronDown size={15} strokeWidth={2} aria-hidden="true" />
              </button>
            </Box>
          </Reveal>
        ) : null}

        {showCta ? <SecCta {...SECTION_CTA} /> : null}
      </Box>
    </Section>
  );
}
