import Image from "next/image";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import SectionHead, { SECTION_PADDING, SECTION_WIDTH } from "@/components/common/section-head";

/**
 * "Unlock a world of benefits" — four image cards (tag, title, copy) with
 * the lime underline that draws in on hover.
 *
 * Design: Join as a Trainer `#benefits`, `.ben-grid`, `.ben`.
 */
export default function TrainerBenefits({ data }) {
  const items = data?.items ?? [];
  if (!items.length) return null;

  return (
    <Section id="benefits" className={SECTION_PADDING} innerClassName={SECTION_WIDTH}>
      <SectionHead heading={data.heading} description={data.description} align="start" />

      <Box className="grid gap-5 min-[561px]:grid-cols-2 min-[1021px]:grid-cols-4">
        {items.map((item, index) => (
          <Reveal
            as="article"
            key={item.title}
            delay={Math.min(index + 1, 4)}
            className="group relative overflow-hidden rounded-[18px] border border-ink/12 bg-white transition-[transform,box-shadow,border-color] duration-250 after:absolute after:inset-x-0 after:bottom-0 after:h-0.75 after:origin-left after:scale-x-0 after:bg-lime after:transition-transform after:duration-300 after:content-[''] hover:-translate-y-1.5 hover:border-ink/22 hover:shadow-[0_24px_50px_-30px_rgba(10,22,40,0.4)] hover:after:scale-x-100"
          >
            <Box className="aspect-[16/10] overflow-hidden bg-paper-warm">
              <Image
                src={item.image}
                alt={item.title}
                width={640}
                height={400}
                sizes="(min-width: 1021px) 280px, (min-width: 561px) 50vw, 100vw"
                className="size-full object-cover contrast-[1.05] grayscale transition-transform duration-500 group-hover:scale-104"
              />
            </Box>
            <Box className="px-6 pt-6 pb-7">
              <Text as="p" className="mb-2.5 font-mono text-[10px] leading-[1.5] tracking-[0.16em] text-olive uppercase">
                {item.tag}
              </Text>
              <Text as="h3" className="mb-2.5 text-[18px] leading-[1.3] font-semibold">
                {item.title}
              </Text>
              <Text as="p" className="text-[15px] leading-[1.7]">
                {item.text}
              </Text>
            </Box>
          </Reveal>
        ))}
      </Box>
    </Section>
  );
}
