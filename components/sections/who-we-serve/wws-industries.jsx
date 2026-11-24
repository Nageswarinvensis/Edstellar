import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import RichHeading from "@/components/common/rich-heading";

export default function WwsIndustries({ data }) {
  if (!data) return null;

  return (
    <Section
      id="industries"
      aria-labelledby="ind-h"
      className="scroll-mt-20 bg-white py-16 lg:py-20"
    >
      {/* Split heading */}
      <Box className="mb-14 grid gap-10 max-[900px]:grid-cols-1 min-[901px]:grid-cols-[1.1fr_1fr] min-[901px]:items-start">
        <RichHeading
          as="h2"
          id="ind-h"
          heading={data.heading}
          className="m-0 text-[clamp(32px,4vw,42px)] font-bold leading-[1.08] tracking-[-0.03em] text-ink"
        />
        <Text as="p" className="m-0 border-l-2 border-ink/15 pl-6 text-[clamp(15px,1.1vw,17px)] leading-[1.75] text-ink-muted">
          {data.lede}
        </Text>
      </Box>

      {/* 4-step cards */}
      <Box
        as="ol"
        className="list-none p-0 rounded-2xl border border-ink/10 overflow-hidden grid grid-cols-1 min-[900px]:grid-cols-4 divide-y divide-ink/10 min-[900px]:divide-y-0 min-[900px]:divide-x"
      >
        {data.steps.map((s) => (
          <Box as="li" key={s.n} className="px-6 py-7">
            <Text as="span" className="mb-4 block font-mono text-[10px] font-medium text-ink-muted">
              {s.n}
            </Text>
            <Text as="h3" className="mb-2 text-[18px] font-bold leading-[1.3] tracking-[-0.01em] text-ink">
              {s.label}
            </Text>
            <Text as="p" className="m-0 text-[13.5px] leading-[1.55] text-ink-muted">
              {s.desc}
            </Text>
          </Box>
        ))}
      </Box>

      {/* Industry pill cloud */}
      <Box as="ul" className="mt-12 flex list-none flex-wrap gap-2.5 p-0">
        {data.industries.map((ind) => (
          <Box as="li" key={ind.label}>
            {ind.href ? (
              <a
                href={ind.href}
                title={ind.title}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-ink/15 bg-paper px-4 py-2 text-[14px] font-medium text-ink no-underline transition-colors hover:border-ink/30 hover:bg-paper-warm"
              >
                {ind.label}
              </a>
            ) : (
              <Text as="span" className="inline-flex items-center rounded-full border border-ink/10 bg-paper px-4 py-2 text-[14px] font-medium text-ink-muted">
                {ind.label}
              </Text>
            )}
          </Box>
        ))}
      </Box>
    </Section>
  );
}
