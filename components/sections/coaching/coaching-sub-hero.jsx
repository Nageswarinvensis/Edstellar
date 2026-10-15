import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import CtaButton from "@/components/common/cta-button";
import Breadcrumbs from "@/components/common/breadcrumbs";
import { coachingIcon } from "@/components/sections/coaching/icons";
import { cn } from "@/lib/utils";

/**
 * Internal helper — the right-column card listing coaching paths so the user
 * can jump between sub-pages without leaving the hero viewport.
 */
function LadderCard({ ladder }) {
  if (!ladder?.items?.length) return null;

  const { heading, subtitle, items } = ladder;

  return (
    <Box className="rounded-[14px] border border-ink/12 bg-white p-7 shadow-rest">
      {heading ? (
        <Text as="h2" className="font-display text-[16px] font-semibold text-ink mb-1">
          {heading}
        </Text>
      ) : null}
      {subtitle ? (
        <Text as="p" className="text-[13px] text-ink/60 mb-5">
          {subtitle}
        </Text>
      ) : null}

      <Box as="ul" className="m-0 list-none p-0 flex flex-col gap-2.5">
        {items.map((item) => {
          const Icon = coachingIcon(item.icon);

          if (item.current) {
            return (
              <Box
                as="li"
                key={item.title}
                className="grid grid-cols-[40px_1fr_auto] items-center gap-3.5 rounded-[10px] border bg-paper-warm border-navy px-3.5 py-3 text-ink"
              >
                {/* Icon tile */}
                <Box
                  as="span"
                  className="size-10 rounded-[10px] bg-paper-warm grid place-items-center text-navy"
                >
                  {Icon ? <Icon size={18} strokeWidth={1.7} aria-hidden="true" /> : null}
                </Box>
                {/* Labels */}
                <Box>
                  <Text as="b" className="font-display text-[15px] font-semibold leading-[1.3] block">
                    {item.title}
                  </Text>
                  {item.audience ? (
                    <Text as="small" className="text-[13px] text-ink/60 leading-[1.4]">
                      {item.audience}
                    </Text>
                  ) : null}
                </Box>
                {/* No arrow for current page */}
              </Box>
            );
          }

          return (
            <Box as="li" key={item.title}>
              <Box
                as={Link}
                href={item.href}
                className="grid grid-cols-[40px_1fr_auto] items-center gap-3.5 rounded-[10px] border border-ink/12 px-3.5 py-3 text-ink no-underline transition-[transform,box-shadow] duration-200 hover:translate-x-1 hover:shadow-rest"
              >
                {/* Icon tile */}
                <Box
                  as="span"
                  className="size-10 rounded-[10px] bg-paper-warm grid place-items-center text-navy"
                >
                  {Icon ? <Icon size={18} strokeWidth={1.7} aria-hidden="true" /> : null}
                </Box>
                {/* Labels */}
                <Box>
                  <Text as="b" className="font-display text-[15px] font-semibold leading-[1.3] block">
                    {item.title}
                  </Text>
                  {item.audience ? (
                    <Text as="small" className="text-[13px] text-ink/60 leading-[1.4]">
                      {item.audience}
                    </Text>
                  ) : null}
                </Box>
                {/* Arrow */}
                <ArrowRight size={18} className="text-ink/40" aria-hidden="true" />
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

/**
 * Sub-page hero for coaching child pages (executive, emerging-leader, etc.).
 * Left col: heading, description, two CTAs, meta icon row, breadcrumbs.
 * Right col: LadderCard — lists all coaching paths so visitors can navigate.
 */
export default function CoachingSubHero({ data }) {
  if (!data?.heading) return null;

  const { heading, description, primary_cta, secondary_cta, meta, ladder } = data;

  return (
    <Box as="header" id="top" className="bg-paper px-5 pt-8 pb-6 lg:px-10 lg:pt-16 lg:pb-8">
      <Box className="mx-auto grid max-w-7xl grid-cols-[1.1fr_0.9fr] items-center gap-14 max-[1200px]:grid-cols-1 max-[1200px]:gap-10">
        {/* Left column */}
        <Box>
          <Reveal delay={0}>
            <RichHeading
              as="h1"
              heading={heading}
              className="text-[clamp(38px,4.4vw,48px)] leading-[1.05]"
              emphasisClassName="font-normal"
            />
          </Reveal>

          {description ? (
            <Reveal delay={1}>
              <Text as="p" className="mt-6 max-w-[68ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink/60">
                {description}
              </Text>
            </Reveal>
          ) : null}

          <Reveal delay={2}>
            <Box className="mt-8 flex flex-wrap gap-4">
              {primary_cta?.href ? (
                <CtaButton arrow render={<Link href={primary_cta.href} />} className="px-7 py-4">
                  {primary_cta.label}
                </CtaButton>
              ) : null}
              {secondary_cta?.href ? (
                <CtaButton
                  variant="secondary"
                  render={<Link href={secondary_cta.href} />}
                  className="border-[1.5px] border-navy px-7 py-4 text-navy hover:-translate-y-0.5 hover:bg-transparent hover:shadow-lift"
                >
                  {secondary_cta.label}
                </CtaButton>
              ) : null}
            </Box>
          </Reveal>

          {meta?.length ? (
            <Reveal delay={3}>
              <Box className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-ink/60">
                {meta.map((item) => {
                  const Icon = coachingIcon(item.icon);
                  return (
                    <Text
                      as="span"
                      key={item.label}
                      className="inline-flex items-center gap-2 text-[14px] text-ink/60"
                    >
                      {Icon ? (
                        <Icon size={18} strokeWidth={1.7} className="text-navy" aria-hidden="true" />
                      ) : null}
                      {item.label}
                    </Text>
                  );
                })}
              </Box>
            </Reveal>
          ) : null}

          <Breadcrumbs />
        </Box>

        {/* Right column */}
        <Reveal delay={2}>
          <LadderCard ladder={ladder} />
        </Reveal>
      </Box>
    </Box>
  );
}
