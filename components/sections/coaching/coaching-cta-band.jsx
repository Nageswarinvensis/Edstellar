import Link from "next/link";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import CtaButton from "@/components/common/cta-button";
import { cn } from "@/lib/utils";

/**
 * Compact navy CTA band — heading and a line on the left, one or two buttons
 * on the right. As its own strip (`inline` false) it is a 1000px card in a
 * thin section; `inline` renders just the full-width card, for use inside
 * another section.
 *
 * Design: coaching-hub `.cta-sec`, `.cta-band.navy`, `.why-cta`.
 */
export default function CoachingCtaBand({ data, inline = false, label }) {
  if (!data?.heading) return null;

  const band = (
    <Reveal>
      <Box
        className={cn(
          "flex flex-wrap items-center justify-between gap-x-7.5 gap-y-5 rounded-[20px] bg-navy px-8.5 py-7 text-paper shadow-lift max-[600px]:px-5.5 max-[600px]:py-6",
          inline ? "mt-12" : "mx-auto max-w-250",
        )}
      >
        <Box className="min-w-0 flex-[1_1_400px]">
          <Text as="p" className="mb-1.5 font-display text-[clamp(19px,2vw,23px)] leading-[1.15] font-bold tracking-[-0.02em] text-paper">
            {data.heading}
          </Text>
          {data.description ? (
            <Text as="p" className="max-w-[62ch] text-[14.5px] leading-[1.55] text-paper/72">
              {data.description}
            </Text>
          ) : null}
        </Box>

        {data.buttons?.length ? (
          <Box className="flex flex-wrap items-center gap-3 max-[600px]:w-full">
            {data.buttons.map((button) =>
              button.variant === "primary" ? (
                <CtaButton
                  key={button.label}
                  color="lime"
                  arrow
                  render={<Link href={button.href} />}
                  className="flex-none px-7 py-4 focus-visible:outline-lime max-[600px]:w-full"
                >
                  {button.label}
                </CtaButton>
              ) : (
                <CtaButton arrow
                  key={button.label}
                  variant="secondary"
                  render={<Link href={button.href} />}
                  className="flex-none border-[1.5px] border-paper/45 px-7 py-4 text-paper hover:-translate-y-0.5 hover:border-paper hover:bg-transparent max-[600px]:w-full"
                >
                  {button.label}
                </CtaButton>
              ),
            )}
          </Box>
        ) : null}
      </Box>
    </Reveal>
  );

  if (inline) return band;

  return (
    <Box as="section" aria-label={label ?? data.heading} className="px-4 py-3 sm:px-10 sm:py-4.5">
      {band}
    </Box>
  );
}
