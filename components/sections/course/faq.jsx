import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import RichHeading from "@/components/shared/rich-heading";
import SectionMark from "@/components/shared/section-mark";
import Reveal from "@/components/shared/reveal";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function Faq({ faqs }) {
  if (!faqs?.items?.length) return null;

  return (
    <Section id="faq" className="border-t border-ink/10">
      <Box className="mx-auto max-w-[720px]">
        <Reveal>
          <SectionMark
            roman={faqs.mark?.roman}
            keyword={faqs.mark?.keyword}
            label={faqs.mark?.label}
            className="mb-6"
          />
        </Reveal>

        <Reveal delay={1}>
          <RichHeading
            as="h2"
            parts={faqs.title.parts}
            emphasisClassName="font-serif italic font-normal"
            className="max-w-[20ch] tracking-[-0.03em]"
          />
        </Reveal>

        <Reveal delay={1}>
          <Accordion multiple className="mt-[18px] w-full">
            {faqs.items.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`faq-${index}`}
                className="border-ink/10"
              >
                <AccordionTrigger className="py-6 font-display text-lg font-medium tracking-[-0.01em] text-ink hover:no-underline">
                  {faq.question}
                </AccordionTrigger>

                <AccordionContent>
                  <Text as="p" className="text-[15px] leading-[1.7] text-ink/60">
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
