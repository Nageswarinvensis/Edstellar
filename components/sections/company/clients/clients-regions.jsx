import Image from "next/image";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import RichHeading from "@/components/common/rich-heading";
import Reveal from "@/components/common/reveal";

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-[22px]">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9s1-6.5 3.5-9z" />
    </svg>
  );
}

/** Clients by headquarters region — four presence cards, each with a globe
 * badge and a two-column grid of sample client logos. */
export default function ClientsRegions({ data }) {
  if (!data?.cards?.length) return null;

  return (
    <Section id="regions" aria-labelledby="regions-h" className="scroll-mt-16 bg-paper">
      <Reveal>
        <Box className="max-w-[640px]">
          <RichHeading
            as="h2"
            id="regions-h"
            heading={data.heading}
            className="m-0 text-[clamp(32px,4vw,40px)] font-medium leading-[1.08] tracking-[-0.03em] text-ink"
          />
          <Text as="p" className="mt-4 text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink/60">
            {data.lede}
          </Text>
        </Box>
      </Reveal>

      <Reveal delay={1}>
        <Box as="ul" className="mt-10 grid list-none grid-cols-4 gap-4 p-0 max-xl:grid-cols-2 max-sm:grid-cols-1">
          {data.cards.map((card) => (
            <Box
              as="li"
              key={card.key}
              className="flex flex-col gap-5 rounded-[14px] border border-ink/12 bg-white p-6 shadow-rest max-sm:p-5"
            >
              <Box className="flex items-center gap-3">
                <Text as="span" className="flex size-10 shrink-0 items-center justify-center rounded-full bg-navy text-lime">
                  <GlobeIcon />
                </Text>
                <Text as="h3" className="m-0 font-display text-lg font-semibold leading-[1.3] tracking-[-0.01em] text-ink">
                  {card.label}
                </Text>
              </Box>

              <Box as="ul" aria-label={card.logos_label} className="grid list-none grid-cols-2 gap-2 p-0">
                {card.logos.map((client) => (
                  <Box as="li" key={client.name}>
                    <Box className="flex h-16 items-center justify-center rounded-[10px] border border-ink/12 bg-white px-3 py-2.5">
                      <Image
                        src={client.logo}
                        alt={client.name}
                        width={160}
                        height={64}
                        className="h-9 w-full object-contain"
                      />
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Reveal>

      {data.basis && (
        <Text as="p" className="mt-6 text-[13px] text-ink/60">{data.basis}</Text>
      )}
    </Section>
  );
}
