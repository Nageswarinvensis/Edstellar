import Image from "next/image";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import V2Section from "@/components/sections/course/v2/section";
import V2Heading from "@/components/sections/course/v2/heading";
import V2ScrollLink from "@/components/sections/course/v2/scroll-link";
import { V2_BUTTON, V2ButtonArrow } from "@/components/sections/course/v2/buttons";
import { cn } from "@/lib/utils";

/**
 * v2 · 9b Instructor (the design's `#instructor`) — warm paper with a dot
 * grid, a centered head with the divider, two illustrated cards, and the
 * compact "match an instructor" CTA.
 */
export default function V2Instructor({ data }) {
  if (!data?.cards?.length) return null;
  const { heading, cards, cta } = data;

  return (
    <V2Section
      id="instructor"
      tone="warm"
      className="relative isolate overflow-hidden bg-[radial-gradient(circle,rgba(10,22,40,0.12)_1px,transparent_1.2px)] bg-[length:18px_18px]"
    >
      <Reveal className="mx-auto mb-[34px] max-w-[820px] text-center">
        <V2Heading parts={heading} />
        <span aria-hidden="true" className="mt-4 flex items-center justify-center gap-1.5">
          <i className="block h-0.5 w-16 rounded-sm bg-ink" />
          <b className="block size-3.5 rounded-full border-2 border-ink bg-olive" />
          <i className="block h-0.5 w-[26px] rounded-sm bg-lime-soft" />
        </span>
      </Reveal>

      <Box className="mx-auto grid max-w-[860px] grid-cols-1 gap-[22px] min-[760px]:grid-cols-2">
        {cards.map((card, i) => (
          <Reveal
            key={card.heading}
            delay={Math.min(i + 1, 4)}
            className="flex flex-col rounded-[14px] border border-ink/12 bg-white px-6 pt-[22px] pb-[26px] shadow-[0_18px_40px_rgba(10,22,40,0.12)] transition-[transform,box-shadow] duration-200 hover:-translate-y-[3px] hover:shadow-[0_24px_48px_rgba(10,22,40,0.12)]"
          >
            {card.image && (
              <Box className="mb-2.5 flex h-[220px] items-center justify-center">
                <Image src={card.image} alt={card.image_alt || ""} title={card.image_alt || undefined} loading="lazy" width={card.image_width || 588} height={card.image_height || 400} className="block h-full w-auto max-w-full object-contain" />
              </Box>
            )}
            <Text as="h3" className="mt-1 mb-2.5 text-[21px] leading-[1.25]">{card.heading}</Text>
            <Text className="text-[14.5px] leading-[1.55] text-ink">{card.text}</Text>
          </Reveal>
        ))}
      </Box>

      {cta?.label && (
        <Reveal className="mx-auto mt-[34px] max-w-[560px] rounded-xl border-[1.5px] border-lime-soft bg-paper-warm px-[22px] pt-5 pb-[18px] text-center">
          <Text as="h3" className="mb-3 text-[16px] leading-[1.3]">{cta.heading}</Text>
          <V2ScrollLink
            href={cta.href || "#quote"}
            topic={cta.heading}
            title={cta.title || `Click here to ${cta.label}`}
            // Global pill (shape, padding, type, arrow, hover lift); the
            // design's olive fill and white text for this one button.
            className={cn(V2_BUTTON.primary, "relative bg-olive text-white")}
          >
            {cta.label}
            <V2ButtonArrow />
          </V2ScrollLink>
          {cta.text && <Text className="mx-auto mt-3 max-w-[460px] text-[13.5px]">{cta.text}</Text>}
        </Reveal>
      )}
    </V2Section>
  );
}
