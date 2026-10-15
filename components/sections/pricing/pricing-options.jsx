import { ArrowRight } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import SectionHead, { SECTION_WIDTH, SECTION_PADDING } from "@/components/common/section-head";

/**
 * "Which option fits your team" — four linked cards, from a one-off session
 * to the Custom package, each pointing at the quote form.
 *
 * Design: corporate-training-pricing-v2 `#which-option`, `.fit`.
 */
export default function PricingOptions({ data }) {
  const items = data?.items ?? [];
  if (!items.length) return null;

  return (
    <Section id="which-option" className={SECTION_PADDING} innerClassName={SECTION_WIDTH}>
      <SectionHead heading={data.heading} />

      <Box className="grid gap-4.5 min-[561px]:grid-cols-2 min-[1001px]:grid-cols-4">
        {items.map((item, index) => (
          <Reveal key={item.title} delay={Math.min(index + 1, 4)} className="flex">
            <a
              href={data.cta_href}
              title={`Click Here to Enquire About ${item.title}`}
              className="group relative flex w-full flex-col overflow-hidden rounded-[18px] border border-ink/12 bg-white px-6 py-7 transition-[transform,box-shadow,border-color] duration-250 after:absolute after:inset-x-0 after:bottom-0 after:h-0.75 after:origin-left after:scale-x-0 after:bg-lime after:transition-transform after:duration-300 after:content-[''] hover:-translate-y-1.5 hover:border-ink/22 hover:shadow-[0_24px_50px_-30px_rgba(10,22,40,0.4)] hover:after:scale-x-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
            >
              <Text as="span" className="mb-3 block font-mono text-[10px] leading-[1.5] tracking-[0.16em] text-olive uppercase">
                {item.who}
              </Text>
              <Text as="h3" className="mb-2.5 text-[21px] leading-[1.2] tracking-[-0.025em]">
                {item.title}
              </Text>
              <Text as="p" className="flex-1 text-[15px] leading-[1.7]">
                {item.text}
              </Text>
              <Text
                as="span"
                className="mt-4.5 inline-flex items-center gap-2 font-mono text-[11px] leading-none tracking-[0.14em] text-navy uppercase"
              >
                {data.cta_label}
                <ArrowRight
                  size={13}
                  strokeWidth={2}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Text>
            </a>
          </Reveal>
        ))}
      </Box>
    </Section>
  );
}
