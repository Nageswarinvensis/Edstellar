import Link from "next/link";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import RichHeading from "@/components/common/rich-heading";
import Reveal from "@/components/common/reveal";

const CARD_ICONS = {
  "CEO and board":                  <path d="M12 3l9 5H3l9-5ZM3 21h18M4 18h16M6 8v10M10 8v10M14 8v10M18 8v10" />,
  "CHRO and HR leaders":            <><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5c2 .8 3.5 2.8 3.5 5.5"/></>,
  "L&D leaders":                    <><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18M9 21V9"/></>,
  "Function and business leaders":  <path d="M3 3v18h18M7 15l4-4 3 3 5-6" />,
};

export default function WwsRoles({ data }) {
  if (!data) return null;

  return (
    <Section
      id="roles"
      aria-labelledby="roles-h"
      className="scroll-mt-20 bg-paper"
    >
      <Reveal>
        <Box className="sec-head mb-12 max-w-[760px]">
          <RichHeading
            as="h2"
            id="roles-h"
            heading={data.heading}
            className="m-0 text-[clamp(32px,4vw,40px)] font-bold leading-[1.08] tracking-[-0.03em] text-ink"
          />
          <Text as="p" className="mt-5 text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink/60">
            {data.lede}
          </Text>
        </Box>
      </Reveal>

      {/* bmap: vertical centre line + tiers */}
      <Box className="relative grid gap-10 max-[900px]:gap-8">
        {/* Vertical centre line */}
        <Box
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-10 bottom-10 w-[2px] -translate-x-px bg-ink/[0.22] max-[900px]:hidden"
        />

        {data.tiers.map((tier) => {
          const isCentre = tier.cards.length === 1;
          const isTop = tier.tier === "Sets direction";
          return (
            <Reveal key={tier.tier}>
              <Box className="relative grid justify-items-center gap-3">
                {/* Tier pill label */}
                <Box
                  as="p"
                  className="relative z-10 m-0 rounded-full border border-ink/[0.22] bg-paper px-[14px] py-1 text-[13px] font-semibold text-ink/60"
                >
                  {tier.tier}
                </Box>

                {/* Cards */}
                <Box
                  className={`relative z-10 grid w-full gap-6 ${
                    tier.cards.length === 2
                      ? "grid-cols-2 max-w-[1000px] max-[900px]:grid-cols-1"
                      : "max-w-[560px]"
                  }`}
                >
                  {tier.cards.map((card) => {
                    const isDark = isTop;
                    return (
                      <Box
                        key={card.role}
                        className={`flex flex-col rounded-[14px] border p-7 shadow-[0_1px_2px_rgba(10,22,40,.07),0_4px_16px_rgba(10,22,40,.07)] transition-[transform,box-shadow] duration-200 hover:-translate-y-[3px] hover:shadow-[0_8px_32px_rgba(10,22,40,.12)] max-[600px]:p-[22px] ${
                          isDark
                            ? "border-ink bg-ink text-paper"
                            : "border-ink/[0.12] bg-white"
                        }`}
                      >
                        {/* Card header */}
                        <Box as="header" className="flex items-center gap-[14px]">
                          <Box
                            className={`flex size-11 shrink-0 items-center justify-center rounded-[12px] ${
                              isDark ? "bg-lime/10 text-lime" : "bg-paper-warm text-ink"
                            }`}
                          >
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.7"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="size-5"
                              aria-hidden="true"
                            >
                              {CARD_ICONS[card.role]}
                            </svg>
                          </Box>
                          <Box>
                            <Text as="h3" className="m-0 font-display text-[20px] font-bold leading-[1.25] tracking-[-0.02em]">
                              {card.role}
                            </Text>
                            <Text as="p" className={`m-0 text-[14px] ${isDark ? "text-paper/72" : "text-ink/60"}`}>
                              {card.goal}
                            </Text>
                          </Box>
                        </Box>

                        <Text as="p" className={`mb-[18px] mt-[14px] flex-1 text-[15px] leading-[1.6] ${isDark ? "text-paper/72" : "text-ink/60"}`}>
                          {card.desc}
                        </Text>

                        {/* Links */}
                        <Box className={`flex flex-wrap items-center gap-x-4 gap-y-2 border-t pt-4 ${isDark ? "border-paper/[0.12]" : "border-ink/[0.12]"}`}>
                          <Text as="span" className={`w-full text-[13px] font-semibold ${isDark ? "text-paper/60" : "text-ink/60"}`}>
                            Usually starts with
                          </Text>
                          {card.links.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              className={`inline-flex min-h-[32px] items-center gap-1.5 text-[14px] font-semibold underline underline-offset-[4px] ${isDark ? "text-lime" : "text-ink"}`}
                            >
                              {link.label}
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="size-4 transition-transform duration-200 hover:translate-x-[3px]" aria-hidden="true">
                                <path d="M5 12h14M13 6l6 6-6 6" />
                              </svg>
                            </Link>
                          ))}
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Reveal>
          );
        })}
      </Box>
    </Section>
  );
}
