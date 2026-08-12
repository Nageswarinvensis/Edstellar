import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import RichHeading from "@/components/shared/rich-heading";
import Reveal from "@/components/shared/reveal";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
} from "@/components/ui/accordion";

/**
 * `AccordionTrigger` in components/ui/accordion.jsx bakes in chevron icons
 * with no way to swap them, and that file is shadcn-owned (never edit it
 * directly — TASTE.md §13). The FAQ design wants a plus that flips to a
 * minus, so this composes the base-ui trigger primitive directly instead.
 */
function FaqTrigger({ children }) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger className="group/faq-trigger flex flex-1 items-center justify-between gap-6 py-6 text-left font-display text-lg font-medium tracking-[-0.01em] text-ink outline-none cursor-pointer">
        <span>{children}</span>

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

export default function Faq({ faqs }) {
  if (!faqs?.items?.length) return null;

  return (
    <Section id="faq" className="border-t border-ink/10">
      <Box className="mx-auto max-w-180">
        <Reveal delay={1}>
          <RichHeading
            as="h2"
            parts={faqs.title.parts}
            emphasisClassName="font-serif italic font-normal"
            className="max-w-[20ch] tracking-[-0.03em]"
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
                  <Text
                    as="p"
                    className="text-[15px] leading-[1.7] text-ink/60"
                  >
                    {faq.answer}
                  </Text>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Box>
    </Section>
  );
}
