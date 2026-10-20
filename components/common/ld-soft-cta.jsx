"use client";

import Link from "next/link";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import CtaButton from "@/components/common/cta-button";
import { newTabProps } from "@/lib/links";

/** The soft CTA's buttons. The CMS sends the second button inside `cta` as
 * `secondary_btn_label` + `seconday_href` (its spelling — `secondary_href` is
 * read too, should it be corrected). A second button with a label but no link
 * yet falls back to the primary's link, so it is never a dead button. */
function buttonsOf({ cta }) {
  if (!cta?.href) return [];

  const secondaryHref = cta.seconday_href || cta.secondary_href || cta.href;
  return [
    cta,
    { label: cta.secondary_btn_label, href: secondaryHref },
  ].filter((button) => button.label);
}

/**
 * Soft mid-page CTA.
 *
 * - **One button** → a white card with a lime left edge: a short heading and
 *   line on the left, the button on the right (stacked below 600px).
 * - **Two buttons** → the centered row from the talent-assessment design
 *   (`.cta-row.cta-center`): heading and line centered above a primary and a
 *   bordered secondary button.
 */
export default function LdSoftCta({ data }) {
  if (!data?.heading) return null;

  const { heading, description } = data;
  const buttons = buttonsOf(data);

  if (buttons.length > 1) {
    const [primary, secondary] = buttons;
    return (
      <Reveal className="w-full">
        <Box className="flex w-full flex-col items-center gap-6 rounded-[14px] border border-ink/12 bg-white px-7 py-9 text-center max-[600px]:p-5">
          <Box>
            <Text
              as="h3"
              className="mb-1 text-[24px] font-medium leading-[1.2] tracking-[-0.01em] text-ink max-[600px]:text-[20px] max-[600px]:leading-[1.2]"
            >
              {heading}
            </Text>
            {description ? (
              <Text as="p" className="m-0 text-[15px] leading-[1.5] text-ink-muted">
                {description}
              </Text>
            ) : null}
          </Box>

          <Box className="flex flex-none flex-wrap justify-center gap-3 max-[600px]:w-full">
            <CtaButton arrow
              render={<Link href={primary.href} />}
              className="flex-none px-7 py-4 leading-[1.4] max-[600px]:w-full"
            >
              {primary.label}
            </CtaButton>
            <CtaButton arrow
              variant="secondary"
              render={<Link href={secondary.href} {...newTabProps(secondary.href)} />}
              className="flex-none border-[1.5px] border-navy px-7 py-4 leading-[1.4] text-navy hover:-translate-y-0.5 hover:border-navy hover:bg-transparent hover:shadow-lift max-[600px]:w-full"
            >
              {secondary.label}
            </CtaButton>
          </Box>
        </Box>
      </Reveal>
    );
  }

  const cta = buttons[0];

  return (
    <Reveal className="w-full">
      <Box className="w-full flex flex-wrap items-center justify-between gap-6 rounded-[14px] border border-l-4 border-ink/12 border-l-lime bg-white px-6 sm:px-7.5 py-6 sm:py-6.5 shadow-rest">
        <Box className="flex-1 max-[600px]:w-full">
          <Text
            as="h3"
            className="mb-1 text-[clamp(20px,2.2vw,24px)] font-medium leading-[1.2] tracking-[-0.02em] text-ink"
          >
            {heading}
          </Text>
          {description ? (
            <Text as="p" className="text-[16px] sm:text-[16px] leading-[1.6] text-ink-muted">
              {description}
            </Text>
          ) : null}
        </Box>

        {cta ? (
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
