import Link from "next/link";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import CtaButton from "@/components/common/cta-button";

/**
 * Soft mid-page CTA — a white card with a lime left edge: a short heading
 * and line on the left, one button on the right (stacked below 600px). Sits
 * between sections, so it carries no section padding or top rule of its own.
 *
 * Design: `learning-strategy-design (48).html` → `.cta-soft-wrap`,
 * `.cta-soft`.
 */
export default function LdSoftCta({ data }) {
  if (!data?.heading) return null;

  const { heading, description, cta } = data;

  return (
    <Section aria-label="Talk to us" className="bg-paper py-0 lg:py-0">
      <Reveal>
        <Box className="flex flex-wrap items-center justify-between gap-6 rounded-[14px] border border-l-4 border-ink/12 border-l-lime bg-white px-7.5 py-6.5 shadow-rest max-[600px]:p-5.5">
          <Box className="max-[600px]:w-full">
            <Text
              as="h3"
              className="mb-1 text-[clamp(20px,2.2vw,24px)] leading-[1.2] tracking-[-0.02em]"
            >
              {heading}
            </Text>
            {description ? (
              <Text as="p" className="text-[15px] leading-[1.6] text-ink/60">
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
    </Section>
  );
}
