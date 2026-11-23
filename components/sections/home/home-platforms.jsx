import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import HomeWrap from "@/components/sections/home/home-wrap";
import HomeSectionHead from "@/components/sections/home/home-section-head";

/**
 * "Capability development platforms, built by Edstellar." — Edstellar's own
 * platforms as cards: name with its category chip, one line on what it does,
 * and a link to its page. Four across on desktop, two on tablets, one on
 * phones.
 *
 * Design: `edstellar-homepage-capability-development.html` → `#platforms`
 * (`.split-head`, `.plat`, `.card`, `.nm`, `.chip`).
 */
export default function HomePlatforms({ data }) {
  if (!data?.items?.length) return null;
  const { heading, lede, items } = data;

  return (
    <HomeWrap id="platforms" aria-labelledby="platforms-heading" className="scroll-mt-16 border-t border-ink/12 bg-paper py-20 max-lg:py-16">
      <HomeSectionHead id="platforms-heading" heading={heading} lede={lede} />

      <Box as="ul" className="m-0 grid list-none grid-cols-1 gap-4 p-0 min-[600px]:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <Reveal
            key={item.name}
            as="li"
            delay={i % 4}
            className="flex min-h-[200px] flex-col rounded-[14px] border border-ink/12 bg-white p-5"
          >
            <Box className="flex flex-wrap items-start justify-between gap-x-2.5 gap-y-2">
              <Text as="h3" className="m-0 text-[21px] leading-[1.2] font-medium tracking-[-0.02em] text-ink">
                {item.name}
              </Text>
              {item.category && (
                <Text
                  as="span"
                  className="mt-0.5 inline-flex max-w-full items-center rounded-md bg-paper-warm px-[9px] py-1.5 font-mono text-[10px] leading-none font-medium tracking-[0.07em] whitespace-nowrap text-ink uppercase"
                >
                  {item.category}
                </Text>
              )}
            </Box>
            <Text as="p" className="mt-3 mb-0 flex-1 text-[13.5px] leading-[1.55] text-ink-muted">
              {item.text}
            </Text>
            {/* A platform not yet live shows its status instead of a link. */}
            {!item.href && item.status && (
              <Text as="span" className="mt-4 self-start font-mono text-[10px] leading-[1.4] font-medium uppercase tracking-[0.07em] text-ink-muted">
                {item.status}
              </Text>
            )}
            {item.href && item.cta && (
              <Link
                href={item.href}
                title={`Click here to view the ${item.name} platform`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 self-start font-mono text-[10px] font-medium uppercase tracking-[0.07em] text-ink no-underline transition-colors hover:text-olive"
              >
                {item.cta}
                <ArrowRight size={12} strokeWidth={2} aria-hidden="true" />
              </Link>
            )}
          </Reveal>
        ))}
      </Box>
    </HomeWrap>
  );
}
