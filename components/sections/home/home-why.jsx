import Image from "next/image";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import HomeWrap from "@/components/sections/home/home-wrap";
import RichHeading from "@/components/common/rich-heading";
import Reveal from "@/components/common/reveal";
import HomeSectionHead from "@/components/sections/home/home-section-head";

function PinIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="size-3.5 shrink-0 text-ink-muted">
      <path d="M8 15s5-4.6 5-8.5A5 5 0 0 0 3 6.5C3 10.4 8 15 8 15z" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="8" cy="6.5" r="1.8" fill="currentColor" />
    </svg>
  );
}

function CalIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="size-3.5 shrink-0 text-ink-muted">
      <rect x="2" y="3" width="12" height="11" rx="2" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2 7h12M5 1.5v3M11 1.5v3" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

/** Why Edstellar — three commitments, then a row of real expert trainers. */
export default function HomeWhy({ data }) {
  if (!data?.items?.length) return null;
  const { experts } = data;

  return (
    <HomeWrap id="why" aria-labelledby="why-heading" className="scroll-mt-16 border-t border-ink/12 bg-paper py-20 max-lg:py-16">
      <HomeSectionHead id="why-heading" heading={data.heading} lede={data.lede} />

      {/* Four commitments: four across on desktop, 2 x 2 on tablets, stacked on phones. */}
      <Box role="list" className="grid grid-cols-4 border-y-[1.5px] border-ink/12 max-lg:grid-cols-2 max-md:grid-cols-1">
        {data.items.map((item, i) => (
          <Reveal key={item.num} delay={i} role="listitem" className="flex flex-col gap-4 border-r border-ink/22 px-9 pb-14 pt-12 last:border-r-0 max-lg:px-7 max-lg:even:border-r-0 max-lg:[&:nth-child(-n+2)]:border-b max-md:border-b max-md:border-r-0 max-md:px-0 max-md:pt-8 max-md:pb-9 max-md:last:border-b-0">
            <span className="h-1 w-8 bg-lime" aria-hidden="true" />
            <Text as="div" aria-hidden="true" className="font-serif text-2xl italic text-ink-muted">{item.num}</Text>
            <RichHeading as="h3" heading={item.title} className="font-serif text-[26px] font-normal leading-[1.12] text-ink" />
            <Text as="p" className="m-0 text-sm leading-[1.6] text-ink/65">{item.desc}</Text>
          </Reveal>
        ))}
      </Box>

      {experts?.trainers?.length ? (
        <Reveal className="mt-[72px]">
          <Text as="p" className="mb-6 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
            {experts.note}
          </Text>

          <Box as="ul" className="grid list-none grid-cols-5 gap-5 p-0 max-lg:grid-cols-3 max-sm:grid-cols-2">
            {experts.trainers.map((t) => (
              <Box as="li" key={t.slug}>
                <Box className="flex flex-col gap-1">
                  <Box className="mb-2 aspect-square w-full overflow-hidden rounded-lg bg-paper-warm">
                    <Image src={t.photo} alt={`${t.name}, ${t.role} trainer`} width={240} height={240} className="size-full object-cover" />
                  </Box>
                  <Text as="b" className="font-display text-base font-medium text-ink">{t.name}</Text>
                  <Text as="span" className="text-[13px] leading-snug text-ink/65">{t.role}</Text>
                  <Box className="mt-1 flex flex-col gap-1 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-muted">
                    <span className="inline-flex items-center gap-1.5"><PinIcon />{t.location}</span>
                    <span className="inline-flex items-center gap-1.5"><CalIcon />Trainer since {t.since}</span>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Reveal>
      ) : null}

      {/* Delivery languages (the design's `.langs`): a mono label and one chip per language. */}
      {data.languages?.items?.length > 0 && (
        <Reveal>
          <Box className="mt-[18px] flex flex-wrap items-center gap-2">
            {data.languages.label && (
              <Text as="span" id="why-languages" className="mr-1.5 font-mono text-[10.5px] leading-[1.4] uppercase tracking-[0.07em] text-ink-muted">
                {data.languages.label}
              </Text>
            )}
            <Box as="ul" aria-labelledby="why-languages" className="m-0 flex list-none flex-wrap items-center gap-2 p-0">
            {data.languages.items.map((language) => (
              <Box
                as="li"
                key={language}
                className="inline-flex items-center rounded-md bg-paper-warm px-[9px] py-1.5 font-mono text-[10px] leading-none font-medium uppercase tracking-[0.07em] text-ink"
              >
                {language}
              </Box>
            ))}
            </Box>
          </Box>
        </Reveal>
      )}
    </HomeWrap>
  );
}
