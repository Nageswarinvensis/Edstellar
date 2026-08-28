import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";

/**
 * Course "why now" block — the case for urgency, in three parts: a
 * lede with four headline stats, three evidence cards (degradation, market,
 * regulation), and a platform-adoption strip.
 *
 * Design: `section#why-now.block.warm`, `.wn-top`, `.wn-grid`, `.wn-tools`.
 */
export default function WhyNow({ whyNow }) {
  if (!whyNow) return null;

  return (
    <Section id="why-now" className="border-t border-ink/10 bg-paper-warm">
      <Box className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <Box>
          <Reveal delay={1}>
            <Text
              as="h2"
              className="max-w-[20ch] tracking-[-0.03em]"
              dangerouslySetInnerHTML={{ __html: whyNow.heading || "" }}
            />
          </Reveal>

          <Reveal delay={2}>
            <Text
              as="p"
              className="mt-4.5 max-w-[54ch] text-[16.5px] leading-[1.75] text-ink/60"
            >
              {whyNow.description}
            </Text>
          </Reveal>
        </Box>

        <Reveal delay={2}>
          <Box className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {whyNow.stats?.map((stat) => (
              <Box
                key={stat.description}
                className="rounded-[18px] bg-navy px-6 py-7 text-center transition-transform duration-300 hover:-translate-y-1"
              >
                <Text
                  as="p"
                  className="font-display text-[38px] leading-none font-bold tracking-[-0.035em] text-lime max-sm:text-[33px]"
                >
                  {stat.value}
                </Text>

                <Text
                  as="p"
                  className="mt-2.5 text-[13px] leading-[1.45] text-paper/80"
                >
                  {stat.description}
                </Text>
              </Box>
            ))}
          </Box>
        </Reveal>
      </Box>

      <Box className="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-3 max-lg:mt-11">
        {whyNow.cards?.map((card, index) => (
          <Reveal key={card.title} delay={Math.min(index + 1, 4)}>
            <Box className="relative flex h-full flex-col rounded-2xl border border-ink/10 bg-white p-6.5 pt-7.5 transition-transform duration-300 before:absolute before:inset-x-0 before:top-0 before:h-1 before:rounded-t-2xl before:bg-linear-to-r before:from-navy before:to-lime before:content-[''] hover:-translate-y-1">
              <Text
                as="p"
                className="font-mono text-[10px] tracking-[0.16em] text-ink/60 uppercase"
              >
                {card.eyebrow}
              </Text>

              <Text
                as="p"
                className="mt-3.5 font-display text-[32px] leading-none font-bold tracking-[-0.035em] text-ink"
              >
                {card.title}
              </Text>

              <Text as="p" className="mt-3.5 text-sm leading-[1.7] text-ink/60">
                {card.description}
              </Text>

              <Box className="mt-auto flex flex-wrap gap-1.75 pt-5">
                {card.tags?.map((tag) => (
                  <Text
                    key={tag}
                    as="span"
                    className="rounded-[7px] bg-paper-warm px-2.75 py-1.5 text-xs font-medium text-ink"
                  >
                    {tag}
                  </Text>
                ))}
              </Box>
            </Box>
          </Reveal>
        ))}
      </Box>

      {whyNow.platforms ? (
        <Reveal delay={3}>
          <Box className="mt-11.5 border-t border-ink/10 pt-8">
            <Text
              as="p"
              className="mb-3.75 font-mono text-[10px] tracking-[0.16em] text-ink/60 uppercase"
            >
              {whyNow.platforms.eyebrow}
            </Text>

            <Box className="flex flex-wrap gap-2">
              {whyNow.platforms.items?.map((item) => (
                <Box
                  key={item.name}
                  className="inline-flex items-baseline gap-2 rounded-[9px] border border-ink/10 bg-white px-3.75 py-2.25 text-[13px] transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/20"
                >
                  <Text
                    as="span"
                    className="font-display font-bold tracking-[-0.01em] text-ink"
                  >
                    {item.name}
                  </Text>

                  <Text as="span" className="text-ink/60">
                    {item.product}
                  </Text>
                </Box>
              ))}
            </Box>
          </Box>
        </Reveal>
      ) : null}
    </Section>
  );
}
