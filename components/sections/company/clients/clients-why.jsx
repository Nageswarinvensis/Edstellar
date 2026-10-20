import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import RichHeading from "@/components/common/rich-heading";
import Reveal from "@/components/common/reveal";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-4">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/** Why organizations choose Edstellar — a bordered six-cell stat grid plus the
 * "ways clients work with Edstellar" link row. */
export default function ClientsWhy({ data }) {
  if (!data?.stats?.length) return null;

  return (
    <Section id="why" aria-labelledby="why-h" className="scroll-mt-16 bg-paper">
      <Reveal>
        <Box className="max-w-[640px]">
          <RichHeading
            as="h2"
            id="why-h"
            heading={data.heading}
            className="m-0 text-[clamp(32px,4vw,40px)] font-medium leading-[1.08] tracking-[-0.03em] text-ink"
          />
          <Text as="p" className="mt-4 text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink-muted">
            {data.lede}
          </Text>
        </Box>
      </Reveal>

      <Reveal delay={1}>
        <Box as="ul" className="mt-10 grid list-none grid-cols-3 border-l border-t border-ink/12 p-0 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {data.stats.map((stat) => (
            <Box as="li" key={stat.label} className="border-b border-r border-ink/12 bg-white p-8">
              <Text as="span" className="block font-display text-[40px] font-bold leading-none tracking-[-0.035em] text-ink">
                {stat.value}
              </Text>
              <Text as="h3" className="mb-2 mt-4 font-body text-base font-semibold leading-[1.35] text-ink">
                {stat.label}
              </Text>
              <Text as="p" className="m-0 text-sm leading-[1.6] text-ink-muted">{stat.desc}</Text>
            </Box>
          ))}
        </Box>
      </Reveal>

      {data.ways?.items?.length ? (
        <Reveal delay={2}>
          <Box className="mt-12 grid items-start gap-6 lg:grid-cols-[240px_1fr]">
            <Text as="h3" className="m-0 font-display text-xl font-semibold tracking-[-0.01em] text-ink">
              {data.ways.heading}
            </Text>
            <Box as="ul" className="flex list-none flex-wrap gap-2 p-0">
              {data.ways.items.map((item) => (
                <Box as="li" key={item.href}>
                  <a
                    href={item.href}
                    className="inline-flex items-center gap-2 rounded-full border border-ink/22 bg-white px-4 py-2.5 text-sm font-medium text-ink transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-navy"
                  >
                    {item.label}
                    <ArrowIcon />
                  </a>
                </Box>
              ))}
            </Box>
          </Box>
        </Reveal>
      ) : null}
    </Section>
  );
}
