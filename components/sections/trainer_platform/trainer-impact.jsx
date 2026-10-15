import Image from "next/image";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import SectionHead, { SECTION_PADDING, SECTION_WIDTH } from "@/components/common/section-head";

const pad = (n) => String(n).padStart(2, "0");

/**
 * "Expand the impact" — a framed illustration beside a numbered, ruled list
 * of the community benefits.
 *
 * Design: Join as a Trainer `#impact`, `.impact`, `.imp-list`, `.imp`.
 */
export default function TrainerImpact({ data }) {
  const items = data?.items ?? [];
  if (!items.length) return null;

  return (
    <Section id="impact" className={SECTION_PADDING} innerClassName={SECTION_WIDTH}>
      <SectionHead heading={data.heading} description={data.description} align="start" />

      <Box className="grid items-center gap-10 min-[901px]:grid-cols-[0.9fr_1.1fr] min-[901px]:gap-16">
        {data.image ? (
          <Reveal className="overflow-hidden rounded-[22px] border border-ink/12 bg-white p-6">
            <Image
              src={data.image.src}
              alt={data.image.alt}
              width={640}
              height={560}
              sizes="(min-width: 901px) 480px, 100vw"
              className="h-auto w-full rounded-[14px] contrast-[1.05] grayscale"
            />
          </Reveal>
        ) : null}

        <Reveal delay={1} className="border-t border-ink/12">
          {items.map((item, index) => (
            <Box key={item.title} className="grid grid-cols-[44px_1fr] gap-4.5 border-b border-ink/12 py-6.5">
              <Text as="span" aria-hidden="true" className="pt-1.5 font-mono text-[11px] leading-none tracking-[0.1em] text-olive">
                {pad(index + 1)}
              </Text>
              <Box>
                <Text as="h3" className="mb-2 text-[19px] leading-[1.3] font-semibold">
                  {item.title}
                </Text>
                <Text as="p" className="text-[15px] leading-[1.75]">
                  {item.text}
                </Text>
              </Box>
            </Box>
          ))}
        </Reveal>
      </Box>
    </Section>
  );
}
