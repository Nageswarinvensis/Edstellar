import Image from "next/image";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import SectionHead, { SECTION_PADDING, SECTION_WIDTH } from "@/components/common/section-head";
import { cn } from "@/lib/utils";

/**
 * "Reviews from our stellar trainers" — two-up quote cards, each under a
 * large olive opening quote mark, signed with the trainer's photo and name.
 *
 * Design: Join as a Trainer `#reviews`, `.rev-grid`, `.rev`.
 */
export default function TrainerReviews({ data }) {
  const items = data?.items ?? [];
  if (!items.length) return null;

  return (
    <Section
      id="reviews"
      className={cn("border-y border-ink/12 bg-paper-warm", SECTION_PADDING)}
      innerClassName={SECTION_WIDTH}
    >
      <SectionHead heading={data.heading} description={data.description} />

      <Box className="grid gap-5 min-[861px]:grid-cols-2">
        {items.map((item, index) => (
          <Reveal
            as="figure"
            key={item.name}
            delay={(index % 2) + 1}
            className="flex flex-col gap-6 rounded-[18px] border border-ink/12 bg-white px-7.5 py-8 transition-[transform,box-shadow,border-color] duration-250 hover:-translate-y-1 hover:border-ink/22 hover:shadow-[0_22px_46px_-28px_rgba(10,22,40,0.4)]"
          >
            <Box
              as="blockquote"
              className="relative flex-1 pt-8.5 text-[15.5px] leading-[1.8] text-ink/60 before:absolute before:-top-3.5 before:-left-0.5 before:font-serif before:text-[72px] before:leading-none before:text-olive before:italic before:content-['\201C']"
            >
              {item.quote}
            </Box>
            <Box as="figcaption" className="flex items-center gap-3.5 border-t border-ink/12 pt-5">
              <Image
                src={item.image}
                alt={item.name}
                width={52}
                height={52}
                className="size-13 rounded-full border-2 border-lime object-cover grayscale"
              />
              <Box>
                <Text as="span" className="block font-display text-[16px] leading-[1.3] font-semibold tracking-[-0.015em] text-ink">
                  {item.name}
                </Text>
                <Text as="span" className="font-mono text-[10px] leading-[1.5] tracking-[0.16em] text-ink/45 uppercase">
                  {item.role}
                </Text>
              </Box>
            </Box>
          </Reveal>
        ))}
      </Box>
    </Section>
  );
}
