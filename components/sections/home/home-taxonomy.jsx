import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import HomeWrap from "@/components/sections/home/home-wrap";
import RichHeading from "@/components/common/rich-heading";
import Reveal from "@/components/common/reveal";
import HomeSectionHead from "@/components/sections/home/home-section-head";

/** The five-layer capability schema — Function → Role → Capability → Skill →
 * Proficiency — rendered as a bordered five-column flow. */
export default function HomeTaxonomy({ data }) {
  if (!data?.steps?.length) return null;

  return (
    <HomeWrap id="taxonomy" aria-labelledby="taxo-heading" className="scroll-mt-16 border-t-[1.5px] border-ink/12 bg-paper-warm py-20 max-lg:py-16">
      <HomeSectionHead id="taxo-heading" heading={data.heading} lede={data.lede} />

      <Reveal>
        <Box role="list" aria-label="Five-layer capability schema" className="grid grid-cols-5 border-[1.5px] border-ink/12 bg-paper max-lg:grid-cols-2 max-sm:grid-cols-1">
          {data.steps.map((step, s) => (
            <Box
              key={step.layer}
              role="listitem"
              className="border-r border-ink/22 px-6 pb-9 pt-8 last:border-r-0 max-lg:border-b max-lg:[&:nth-child(2n)]:border-r-0 max-sm:border-r-0"
            >
              <Box className="flex items-center justify-between gap-2">
                <Text as="span" className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-muted">{step.layer}</Text>
                <Text as="b" className="font-mono text-[9.5px] font-medium uppercase tracking-[0.16em] text-ink/65">{step.kind}</Text>
              </Box>
              <RichHeading as="h3" heading={step.title} className="mb-4 mt-3 font-serif text-xl font-normal leading-[1.15] text-ink" />
              <Box as="ul" className="m-0 grid list-none gap-1.5 p-0">
                {step.items.map((item, i) => (
                  <Box
                    as="li"
                    key={item}
                    className={`rounded-md px-3 py-2 text-[13px] leading-snug transition-colors ${
                      i === step.active ? "bg-navy font-semibold text-paper" : "bg-ink/[0.04] text-ink/70"
                    }`}
                  >
                    {item}
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Reveal>
    </HomeWrap>
  );
}
