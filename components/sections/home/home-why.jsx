import Image from "next/image";
import Link from "next/link";

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
    <HomeWrap id="why" aria-labelledby="why-heading" className="scroll-mt-16 bg-paper py-20 max-lg:py-16">
      <HomeSectionHead id="why-heading" heading={data.heading} lede={data.lede} />

      <Box role="list" className="grid grid-cols-3 border-y-[1.5px] border-ink/12 max-md:grid-cols-1">
        {data.items.map((item, i) => (
          <Reveal key={item.num} delay={i} role="listitem" className="flex flex-col gap-4 border-r border-ink/22 px-9 pb-14 pt-12 last:border-r-0 max-md:border-b max-md:border-r-0 max-md:last:border-b-0">
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
                <Link href={t.href} className="group flex flex-col gap-1 no-underline">
                  <Box className="mb-2 aspect-square w-full overflow-hidden rounded-lg bg-paper-warm">
                    <Image src={t.photo} alt={`${t.name}, ${t.role} trainer`} width={240} height={240} className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                  </Box>
                  <Text as="b" className="font-display text-base font-medium text-ink">{t.name}</Text>
                  <Text as="span" className="text-[13px] leading-snug text-ink/65">{t.role}</Text>
                  <Box className="mt-1 flex flex-col gap-1 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-muted">
                    <span className="inline-flex items-center gap-1.5"><PinIcon />{t.location}</span>
                    <span className="inline-flex items-center gap-1.5"><CalIcon />Trainer since {t.since}</span>
                  </Box>
                </Link>
              </Box>
            ))}
          </Box>
        </Reveal>
      ) : null}
    </HomeWrap>
  );
}
