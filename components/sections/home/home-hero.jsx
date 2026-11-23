import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import HomeWrap from "@/components/sections/home/home-wrap";
import RichHeading from "@/components/common/rich-heading";
import CtaButton from "@/components/common/cta-button";
import Reveal from "@/components/common/reveal";
import InlineHtml from "@/components/common/inline-html";
import { cn } from "@/lib/utils";

/** Home hero — headline, lede and CTAs on the left; the "One partner ·
 * three layers" tier stack card on the right.
 *
 * Design: `edstellar-homepage-ld-solutions.html` → `.hh`, `.stack`, `.tier`.
 */
export default function HomeHero({ data }) {
  if (!data) return null;
  const { panel } = data;

  return (
    <HomeWrap aria-labelledby="hero-headline" className="bg-paper pt-20 pb-0 max-lg:pt-16 lg:pb-0">
      <Box className="grid items-center gap-10 lg:grid-cols-[1fr_500px]">
        <Box>
          {/* Eyebrow */}
          {data.eyebrow && (
            <Text
              as="p"
              className="m-0 font-mono text-[11px] leading-none font-medium uppercase tracking-[0.1em] text-ink-muted"
            >
              {data.eyebrow}
            </Text>
          )}

          <RichHeading
            as="h1"
            id="hero-headline"
            heading={data.heading}
            emphasisClassName="block mt-2.5 text-[1.06em] font-normal leading-[1.04] tracking-[-0.01em]"
            className="mx-0 mb-0 mt-3 text-[clamp(48px,5.6vw,65px)] font-medium leading-[1.04] tracking-[-0.025em] text-ink text-balance"
          />

          {/* Body paragraphs */}
          {(Array.isArray(data.sub) ? data.sub : [data.sub]).filter(Boolean).map((paragraph, i) => (
            <Text
              key={i}
              as="p"
              className={cn(
                "max-w-[560px] text-[17px] leading-[1.6] text-ink-muted [&_strong]:font-bold [&_strong]:text-ink",
                i === 0 ? "mt-[26px]" : "mt-3"
              )}
            >
              <InlineHtml text={paragraph} />
            </Text>
          ))}

          {/* CTAs */}
          <Box className="mt-8 flex flex-wrap gap-3">
            {data.actions?.map((action) => (
              <CtaButton
                key={action.label}
                variant={action.variant === "primary" ? "primary" : "ghost"}
                color="navy"
                arrow={Boolean(action.arrow)}
                render={<a href={action.href} title={action.title} />}
              >
                {action.label}
              </CtaButton>
            ))}
          </Box>

          {/* Trust line */}
          {data.trust_line?.length > 0 && (
            <Box as="ul" aria-label="Edstellar at a glance" className="mt-[26px] flex list-none flex-wrap gap-x-[18px] gap-y-2 p-0">
              {data.trust_line.map((item) => (
                <Box
                  key={item}
                  as="li"
                  className="flex items-center gap-[7px] font-mono text-[10.5px] leading-none font-medium tracking-[0.07em] text-ink uppercase before:size-[5px] before:flex-none before:rounded-full before:bg-lime before:content-['']"
                >
                  {item}
                </Box>
              ))}
            </Box>
          )}
        </Box>

        {/* Right rail — tier stack card */}
        {panel && (
          <Reveal className="max-lg:mx-auto max-lg:w-full max-lg:max-w-[520px]">
            <Box as="aside" aria-label="How Edstellar's L&D layers fit together" className="rounded-[14px] border border-ink/12 bg-white px-5 pb-5 pt-5">

              {/* Card header */}
              <Box className="flex items-center justify-between gap-3">
                <Text as="span" className="font-mono text-[9.5px] font-medium uppercase tracking-[0.1em] text-ink-muted">
                  {panel.label}
                </Text>
                <Box as="span" className="rounded-[6px] bg-paper-warm px-[9px] py-[6px] font-mono text-[9px] font-medium uppercase leading-none tracking-[0.07em] text-ink">
                  How it fits together
                </Box>
              </Box>

              {/* Subtitle */}
              <Text as="p" className="mt-2.5 mb-0 font-serif text-[17px] font-normal italic leading-[1.3] text-ink">
                {panel.subtitle}
              </Text>

              {/* Tiers */}
              {panel.tiers?.map((tier) => (
                <Box
                  key={tier.num}
                  className="grid grid-cols-[34px_1fr] gap-3 border-t border-ink/8 py-3.5"
                >
                  {/* Number circle */}
                  <Box
                    as="span"
                    className={cn(
                      "flex size-[30px] flex-none items-center justify-center rounded-full border font-mono text-[11px] font-semibold leading-none",
                      tier.active
                        ? "border-navy bg-navy text-lime"
                        : "border-ink/22 text-ink"
                    )}
                  >
                    {tier.num}
                  </Box>

                  <Box>
                    <Text as="b" className="block text-[15px] font-medium leading-[1.3] tracking-[-0.01em] text-ink">
                      {tier.title}
                    </Text>
                    <Text as="p" className="mb-2 mt-[3px] text-[12.5px] leading-[1.45] text-ink-muted">
                      {tier.desc}
                    </Text>
                    {tier.pills?.length > 0 && (
                      <Box as="ul" className="m-0 flex list-none flex-wrap gap-1.5 p-0">
                        {tier.pills.map((pill) => (
                          <Box
                            as="li"
                            key={pill}
                            className="rounded-full bg-paper-warm px-[9px] py-[3px] text-[11px] leading-[1.4] text-ink"
                          >
                            {pill}
                          </Box>
                        ))}
                      </Box>
                    )}
                  </Box>
                </Box>
              ))}

              {/* Footer note */}
              {panel.footer && (
                <Box className="mt-1 flex items-center gap-2.5 rounded-[10px] bg-lime/20 px-3.5 py-[11px] text-[13px] text-ink before:size-[7px] before:flex-none before:rounded-full before:bg-lime before:content-['']">
                  {panel.footer}
                </Box>
              )}
            </Box>
          </Reveal>
        )}
      </Box>
    </HomeWrap>
  );
}
