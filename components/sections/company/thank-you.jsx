import Link from "next/link";
import { Mail, Phone } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import { CtaButton } from "@/components/common/cta-button";

/** The way back and the "Reach Us" contacts — the same on every thank-you
 * page, and not sent by the CMS. */
const BACK_LINK = { label: "Back to homepage", href: "/" };
const REACH_LABEL = "Reach Us:";
const REACH_LINKS = [
  { label: "Email", value: "contact@edstellar.com", href: "mailto:contact@edstellar.com" },
  { label: "US", value: "+1 682 297 4830", href: "tel:+16822974830" },
  { label: "UK", value: "+44 151 453 4009", href: "tel:+441514534009" },
  { label: "India", value: "+91 636 483 3830", href: "tel:+916364833830" },
];

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
          {/* Success badge: a navy disc with a lime tick that draws itself
              in, inside a soft lime halo; one ring ripples out on arrival.
              Decorative. */}
          <Box aria-hidden="true" className="relative mb-9 grid size-28 place-items-center">
            <span className="absolute inset-0 rounded-full bg-lime/18" />
            <span className="absolute inset-0 rounded-full border-2 border-lime/70 opacity-0 motion-safe:animate-ring-ripple" />
            <span className="relative grid size-20 place-items-center rounded-full bg-navy shadow-[0_20px_40px_-18px_rgba(10,22,40,0.7),inset_0_0_0_4px_rgba(200,241,53,0.18)] motion-safe:animate-badge-pop">
              <svg viewBox="0 0 48 48" className="size-13" fill="none">
                <path
                  d="M11.5 25 20.5 34 37.5 15"
                  pathLength="1"
                  className="stroke-lime [stroke-dasharray:1] motion-safe:animate-check-draw"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Box>
        </Reveal>

        {/* CMS `subtext` is the full sentence, so it carries the <h1>; the
            short `heading` ("Thank you") is only its fallback. */}
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

        <Reveal delay={2}>
          <CtaButton arrow render={<Link href={BACK_LINK.href} />} className="px-7 py-4">
            {BACK_LINK.label}
          </CtaButton>
        </Reveal>

        <Reveal delay={3} className="mt-16 w-full">
          <Text as="p" className="mb-5 font-mono text-[11px] tracking-[0.14em] text-ink/60 uppercase">
            {REACH_LABEL}
          </Text>
          <Box className="grid grid-cols-1 gap-3 md:grid-cols-4">
            {REACH_LINKS.map((link) => {
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
      </Box>
    </Box>
  );
}
