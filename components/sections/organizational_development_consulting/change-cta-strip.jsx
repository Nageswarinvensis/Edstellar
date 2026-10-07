import Link from "next/link";

import Box from "@/components/ui/Box";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import CtaButton from "@/components/common/cta-button";

/**
 * Mid-page lime conviction strip: a rounded lime band with the question on the
 * left and a single navy pill button on the right (stacked below 600px). This
 * is the light lime treatment from the change-management design, distinct from
 * the dark navy `CtaBand` the other consulting pages use.
 *
 * Change-management-specific, so it lives in this page's own section folder
 * (TASTE.md §6.1).
 *
 * Design: `change-management-consulting (18).html` → `.cta-strip-wrap`,
 * `.cta-strip`, `.cta-strip-h`.
 */
export default function ChangeCtaStrip({ data }) {
  if (!data?.heading) return null;

  const { heading, primary_cta } = data;

  return (
    <Section aria-label="Book a consultation">
      <Reveal>
        <Box className="flex flex-wrap items-center justify-between gap-7.5 rounded-[14px] bg-lime px-10 py-6.5 shadow-lift max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-4.5 max-[600px]:p-6">
          <RichHeading
            heading={heading}
            className="max-w-[640px] text-[clamp(20px,2.2vw,23px)] leading-[1.2] font-semibold text-navy"
            emphasisClassName="font-normal text-navy"
          />

          {primary_cta?.href ? (
            <CtaButton arrow render={<Link href={primary_cta.href} />}>
              {primary_cta.label}
            </CtaButton>
          ) : null}
        </Box>
      </Reveal>
    </Section>
  );
}
