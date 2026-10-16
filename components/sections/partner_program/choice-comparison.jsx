import Image from "next/image";
import { Check } from "lucide-react";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import SectionHead from "@/components/common/section-head";
import { CtaButton } from "@/components/common/cta-button";

/**
 * The two partnership models side by side — Affiliate and Reseller — each a
 * card with its image, tag, tagline, who-it's-for / how-it-works lines, a
 * ticked benefit list and a button down to the form. One column below 760px.
 *
 * Design: partner-program.html `[data-cmp="choice-comparison"]` `.vs-grid`,
 * `.vs-card.pos`, `.vs-img`, `.vs-tag`, `.vs-h`, `.vs-p`, `.vs-lbl`,
 * `.vs-list`, `.vs-btn`.
 */
export default function ChoiceComparison({ data }) {
  if (!data?.cards?.length) return null;

  return (
    <Section id={data.section_id} className="border-t border-ink/12 bg-paper-warm">
      <SectionHead heading={data.heading} />

      <Box className="grid grid-cols-2 items-stretch gap-5 max-[760px]:grid-cols-1">
        {data.cards.map((card, index) => (
          <Reveal key={card.tag} delay={index + 1} className="h-full">
            <Box className="flex h-full flex-col overflow-hidden rounded-[14px] border border-navy bg-white shadow-rest">
              {card.image?.src ? (
                <Image
                  src={card.image.src}
                  alt={card.image.alt ?? ""}
                  width={card.image.width}
                  height={card.image.height}
                  sizes="(max-width: 760px) 100vw, 600px"
                  className="aspect-video w-full object-cover"
                />
              ) : null}

              <Box className="flex flex-1 flex-col p-7 max-[600px]:p-5.5">
                <Text
                  as="span"
                  className="mb-3.5 self-start rounded-full bg-lime px-2.75 py-1 font-mono text-[11px] leading-[1.4] tracking-[0.04em] text-navy uppercase"
                >
                  {card.tag}
                </Text>
                <Text
                  as="h3"
                  className="mb-4 font-display text-[19px] leading-[1.3] font-bold tracking-[-0.01em] text-ink"
                >
                  {card.title}
                </Text>

                {card.details?.map((detail) => (
                  <Text key={detail.label} as="p" className="mb-2 text-[14.5px] leading-[1.65]">
                    <Box as="span" className="font-semibold text-ink">
                      {detail.label}
                    </Box>{" "}
                    {detail.text}
                  </Text>
                ))}

                {card.list_label ? (
                  <Text as="p" className="mt-2.5 mb-1.5 text-[14.5px] leading-[1.65] font-semibold text-ink">
                    {card.list_label}
                  </Text>
                ) : null}

                <Box as="ul" className="mb-5.5 flex list-none flex-col gap-3.25 p-0">
                  {card.benefits?.map((benefit) => (
                    <Box as="li" key={benefit} className="flex gap-2.75 text-[15px] leading-normal text-ink">
                      <Check size={20} strokeWidth={2} aria-hidden="true" className="mt-px flex-none text-navy" />
                      {benefit}
                    </Box>
                  ))}
                </Box>

                {card.cta?.href ? (
                  <CtaButton
                    variant="ghost"
                    arrow
                    render={<a href={card.cta.href} />}
                    className="mt-auto self-start"
                  >
                    {card.cta.label}
                  </CtaButton>
                ) : null}
              </Box>
            </Box>
          </Reveal>
        ))}
      </Box>
    </Section>
  );
}
