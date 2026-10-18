import Image from "next/image";
import Link from "next/link";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import HomeWrap from "@/components/sections/home/home-wrap";
import RichHeading from "@/components/common/rich-heading";
import Reveal from "@/components/common/reveal";
import HomeSectionHead from "@/components/sections/home/home-section-head";

/** The four practices — consulting, platform, coaching, training — each a card
 * with an illustrative thumbnail (static SVG asset) and a link. */
export default function HomePillars({ data }) {
  if (!data?.items?.length) return null;

  return (
    <HomeWrap id="pillars" aria-labelledby="pillars-heading" className="scroll-mt-16 bg-paper pb-[120px] pt-[130px] max-lg:pb-20 max-lg:pt-24">
      <HomeSectionHead id="pillars-heading" heading={data.heading} lede={data.lede} />

      <Box className="grid grid-cols-4 border-l border-t-[1.5px] border-ink/12 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {data.items.map((item, i) => (
          <Reveal key={item.title} delay={i % 4} as="article" id={item.id} className="flex">
            <Link
              href={item.href}
              className="group flex min-h-[480px] flex-1 flex-col border-b-[1.5px] border-r border-ink/12 no-underline"
            >
              <Box className="relative aspect-[4/3] overflow-hidden border-b border-ink/12 bg-paper-warm">
                <Image src={item.img} alt="" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                {item.badge && (
                  <Text as="span" className="absolute right-[18px] top-[18px] rounded-full border border-ink/12 bg-paper/80 px-2.5 py-1.5 font-mono text-[9.5px] uppercase tracking-[0.18em] text-navy">
                    {item.badge}
                  </Text>
                )}
              </Box>
              <Box className="flex flex-1 flex-col px-7 pb-8 pt-7">
                <RichHeading as="h3" heading={item.title} className="mb-3.5 font-serif text-[28px] font-normal leading-[1.1] tracking-[-0.005em] text-ink" />
                <Text as="p" className="m-0 text-sm leading-[1.6] text-ink/65">{item.desc}</Text>
                <Text as="span" className="mt-auto inline-flex items-center gap-2.5 pt-6 font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink transition-colors group-hover:text-olive">
                  {item.cta}
                  <svg width="14" height="8" viewBox="0 0 14 8" fill="none" aria-hidden="true">
                    <path d="M1 4h12m0 0L10 1m3 3L10 7" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </Text>
              </Box>
            </Link>
          </Reveal>
        ))}
      </Box>
    </HomeWrap>
  );
}
