import Link from "next/link";
import { X, Check } from "lucide-react";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import CtaButton from "@/components/common/cta-button";
import { cn } from "@/lib/utils";

/** One before/after column. */
function TransformColumn({ label, items, after }) {
  const Icon = after ? Check : X;
  return (
    <Box className={cn("rounded-2xl px-7.5 py-7", after ? "bg-navy" : "bg-paper-cream")}>
      <Text as="p" className="sr-only">{label}</Text>
      {items.map((item, index) => (
        <Box
          key={item}
          className={cn(
            "flex items-start gap-3 py-2.75 text-[14.5px] leading-[1.45]",
            index > 0 && (after ? "border-t border-paper/14" : "border-t border-ink/12"),
            after ? "text-paper" : "text-ink",
          )}
        >
          <Box
            className={cn(
              "mt-px grid size-5.5 flex-none place-items-center rounded-full",
              after ? "bg-lime text-navy" : "bg-ink/8 text-ink/60",
            )}
          >
            <Icon size={13} strokeWidth={2.4} aria-hidden="true" />
          </Box>
          <span>{item}</span>
        </Box>
      ))}
    </Box>
  );
}

/**
 * Before/after transformation: where organizations start vs. where the
 * six-step engagement takes them, closed by a centered CTA.
 *
 * Design: `#transform`, `.tf`, `.tf-before`, `.tf-after`, `.cta-center`.
 */
export default function Transformation({ data }) {
  if (!data?.before?.length || !data?.after?.length) return null;

  const { section_id, heading, lede, before_label, before, after_label, after, cta } = data;

  return (
    <Section id={section_id} className="bg-paper-warm">
      <Box className="mb-12 max-w-[760px]">
        <Reveal>
          <RichHeading heading={heading} emphasisClassName="font-normal" />
        </Reveal>
        {lede ? (
          <Reveal delay={1}>
            <Text as="p" className="mt-4 max-w-[64ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink/60">
              {lede}
            </Text>
          </Reveal>
        ) : null}
      </Box>

      <Reveal>
        <Box className="grid grid-cols-[1fr_auto_1fr] items-center gap-5 max-[900px]:grid-cols-1">
          <TransformColumn label={before_label} items={before} after={false} />
          <Text
            as="span"
            aria-hidden="true"
            className="text-[26px] font-bold text-ink/22 max-[900px]:mx-auto max-[900px]:rotate-90"
          >
            →
          </Text>
          <TransformColumn label={after_label} items={after} after />
        </Box>
      </Reveal>

      {cta?.heading ? (
        <Reveal>
          <Box className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-ink/12 bg-white px-7 py-9 text-center">
            <Box>
              <Text as="p" className="font-display text-[24px] font-bold tracking-[-0.01em] text-ink">
                {cta.heading}
              </Text>
              {cta.description ? (
                <Text as="p" className="mt-1 text-[15px] leading-[1.5] text-ink/60">
                  {cta.description}
                </Text>
              ) : null}
            </Box>
            <Box className="flex flex-wrap justify-center gap-3">
              {cta.primary?.href ? (
                <CtaButton arrow render={<Link href={cta.primary.href} />}>
                  {cta.primary.label}
                </CtaButton>
              ) : null}
              {cta.secondary?.href ? (
                <CtaButton variant="ghost" arrow render={<Link href={cta.secondary.href} />}>
                  {cta.secondary.label}
                </CtaButton>
              ) : null}
            </Box>
          </Box>
        </Reveal>
      ) : null}
    </Section>
  );
}
