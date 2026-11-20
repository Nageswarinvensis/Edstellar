import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import HomeWrap from "@/components/sections/home/home-wrap";
import HomeSectionHead from "@/components/sections/home/home-section-head";

/**
 * "Enterprise capability programs for your biggest priorities." — six common
 * places to start, each a card: the goal, one line on the program, and the
 * Edstellar solutions it combines as pills. Three across on desktop, two on
 * tablets, one on phones.
 *
 * Design: `edstellar-homepage-capability-development.html` → `#priorities`
 * (`.split-head`, `.prio`, `.card`, `.mix`, `.pills`).
 */
export default function HomePriorities({ data }) {
  if (!data?.items?.length) return null;
  const { heading, lede, mix_label, items } = data;

  return (
    <HomeWrap id="priorities" aria-labelledby="priorities-heading" className="scroll-mt-16 bg-paper-warm py-20 max-lg:py-16">
      <HomeSectionHead id="priorities-heading" heading={heading} lede={lede} />

      <Box as="ul" className="m-0 grid list-none grid-cols-1 gap-[18px] p-0 min-[600px]:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <Reveal
            key={item.title}
            as="li"
            delay={i % 3}
            className="flex flex-col rounded-[14px] border border-ink/12 bg-white p-[22px]"
          >
            <Text as="h3" className="m-0 text-[19px] leading-[1.25] font-medium tracking-[-0.02em] text-ink">
              {item.title}
            </Text>
            <Text as="p" className="mt-2.5 mb-4 flex-1 text-[14px] leading-[1.55] text-ink-muted">
              {item.text}
            </Text>
            {item.mix?.length > 0 && (
              <Box className="border-t border-ink/8 pt-3">
                {mix_label && (
                  <Text as="span" className="mb-2 block font-mono text-[9px] leading-[1.4] font-medium uppercase tracking-[0.07em] text-ink-muted">
                    {mix_label}
                  </Text>
                )}
                <Box as="ul" className="m-0 flex list-none flex-wrap gap-1.5 p-0">
                  {item.mix.map((solution) => (
                    <Box as="li" key={solution} className="rounded-full bg-paper-warm px-2.5 py-1 text-[11.5px] leading-[1.4] text-ink">
                      {solution}
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </Reveal>
        ))}
      </Box>
    </HomeWrap>
  );
}
