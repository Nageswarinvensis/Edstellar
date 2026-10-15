import Link from "next/link";
import { Check, Mail, Phone } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import { CtaButton } from "@/components/common/cta-button";

/**
 * Thank-you confirmation: a navy check badge, heading, one line of copy, a
 * way back to the site, and the "Reach Us" email and phone links. Rendered
 * inside the site shell (header and footer).
 *
 * Design: edstellar.com/thank-you/category, in the brand palette.
 */
export default function ThankYou({ data }) {
  if (!data?.heading && !data?.subtext) return null;

  return (
    <Box as="section" className="flex flex-col items-center px-5 py-16 lg:py-24">
      <Box className="flex w-full max-w-[760px] flex-col items-center text-center">
        <Reveal>
          {/* Success badge: a solid lime disc with a navy check, two soft
              lime rings, and a few accent dots around it. Decorative. */}
          <Box aria-hidden="true" className="relative mb-9 grid size-32 place-items-center">
            <span className="absolute inset-0 rounded-full bg-lime/15" />
            <span className="absolute inset-3 rounded-full bg-lime/30" />
            <span className="relative grid size-20 place-items-center rounded-full bg-lime text-navy shadow-[0_18px_40px_-16px_rgba(111,140,15,0.7)]">
              <Check size={42} strokeWidth={3} />
            </span>
            <span className="absolute top-1 right-3 size-2 rounded-full bg-olive" />
            <span className="absolute bottom-4 left-0 size-1.5 rounded-full bg-lime" />
            <span className="absolute top-9 -left-2 size-1 rounded-full bg-olive/60" />
            <span className="absolute -right-1 bottom-8 size-2.5 rounded-full border-2 border-lime" />
          </Box>
        </Reveal>

        {/* CMS `heading` ("Thank you") is the kicker; `subtext` is the
            full sentence, so it carries the <h1>. */}
        {data.heading && data.subtext ? (
          <Reveal delay={1}>
            <Text as="p" className="mb-3 font-mono text-[11px] tracking-[0.14em] text-olive uppercase">
              {data.heading}
            </Text>
          </Reveal>
        ) : null}

        <Reveal delay={1}>
          <RichHeading
            as="h1"
            heading={data.subtext || data.heading}
            className="mb-4"
            emphasisClassName="font-normal text-olive"
          />
        </Reveal>

        {data.para ? (
          <Reveal delay={2}>
            <Text as="p" className="mb-9 text-[clamp(16px,1.4vw,18px)] leading-[1.7]">
              {data.para}
            </Text>
          </Reveal>
        ) : null}

        {data.cta?.href ? (
          <Reveal delay={2}>
            <CtaButton arrow render={<Link href={data.cta.href} />} className="px-7 py-4">
              {data.cta.label}
            </CtaButton>
          </Reveal>
        ) : null}

        {data.links?.length ? (
          <Reveal delay={3} className="mt-16 w-full">
            <Text as="p" className="mb-5 font-mono text-[11px] tracking-[0.14em] text-ink/60 uppercase">
              {data.reach_label}
            </Text>
            <Box className="grid grid-cols-1 gap-3 md:grid-cols-4">
              {data.links.map((link) => {
                const isEmail = link.href.startsWith("mailto:");
                const Icon = isEmail ? Mail : Phone;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    title={`Click Here to ${isEmail ? "Email" : "Call"} Edstellar ${isEmail ? "" : link.label}`.trim()}
                    className={`group flex items-center gap-3.5 rounded-[14px] border border-ink/12 bg-white px-3 py-4 text-ink transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-ink/22 hover:shadow-[0_12px_28px_-18px_rgba(10,22,40,0.35)] text-left md:flex-col md:gap-2 md:text-center`}
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-lime/20 text-olive transition-colors group-hover:bg-lime group-hover:text-navy">
                      <Icon size={16} strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <span className="flex flex-col gap-0.5 md:items-center md:gap-2">
                      <Text as="span" className="font-mono text-[10px] tracking-[0.14em] text-ink/50 uppercase">
                        {link.label}
                      </Text>
                      <Text as="span" className="text-[13.5px] font-medium text-ink">
                        {link.value}
                      </Text>
                    </span>
                  </a>
                );
              })}
            </Box>
          </Reveal>
        ) : null}
      </Box>
    </Box>
  );
}
