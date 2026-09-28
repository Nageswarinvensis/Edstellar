"use client";

import Link from "next/link";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import CtaButton from "@/components/common/cta-button";

/**
 * Soft mid-page CTA — a white card with a lime left edge: a short heading
 * and line on the left, one button on the right (stacked below 600px).
 */
export default function LdSoftCta({ data }) {
  if (!data?.heading) return null;

  const { heading, description, cta } = data;

  return (
    <Reveal className="w-full">
      <Box className="w-full flex flex-wrap items-center justify-between gap-6 rounded-[14px] border border-l-4 border-ink/12 border-l-lime bg-white px-6 sm:px-7.5 py-6 sm:py-6.5 shadow-rest">
        <Box className="flex-1 max-[600px]:w-full">
          <Text
            as="h3"
            className="mb-1 text-[clamp(20px,2.2vw,24px)] font-bold leading-[1.2] tracking-[-0.02em] text-ink"
          >
            {heading}
          </Text>
          {description ? (
            <Text as="p" className="text-[16px] sm:text-[16px] leading-[1.6] text-ink/60">
              {description}
            </Text>
          ) : null}
        </Box>

        {cta?.href ? (
          <CtaButton
            arrow
            render={<Link href={cta.href} />}
            className="flex-none max-[600px]:w-full"
          >
            {cta.label}
          </CtaButton>
        ) : null}
      </Box>
    </Reveal>
  );
}