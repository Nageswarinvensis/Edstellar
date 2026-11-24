import Link from "next/link";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import RichHeading from "@/components/common/rich-heading";

export default function WwsCompare({ data }) {
  if (!data?.rows?.length) return null;

  return (
    <Section
      id="compare"
      aria-labelledby="compare-h"
      className="scroll-mt-20 bg-white py-16 lg:py-20"
    >
      {/* Split heading */}
      <Box className="mb-10 grid gap-6 max-[900px]:grid-cols-1 min-[901px]:grid-cols-[1.1fr_1fr] min-[901px]:items-end">
        <RichHeading
          as="h2"
          id="compare-h"
          heading={data.heading}
          className="m-0 text-[clamp(32px,4vw,42px)] font-bold leading-[1.08] tracking-[-0.03em] text-ink"
        />
        <Text as="p" className="m-0 border-l-2 border-ink/15 pl-6 text-[clamp(15px,1.1vw,17px)] leading-[1.7] text-ink-muted">
          {data.lede}
        </Text>
      </Box>

      {/* Comparison table */}
      <Box className="overflow-x-auto">
        <Box
          as="table"
          className="w-full min-w-[700px] border-collapse text-left"
          aria-label="How Edstellar adapts to each organization type"
        >
          <caption className="sr-only">
            How Edstellar adapts to each organization type: typical size, usual first step and usual delivery
          </caption>
          <Box as="thead">
            <Box as="tr">
              <Box as="th" scope="col" className="bg-paper-warm px-4 py-3 font-mono text-[10px] font-medium uppercase tracking-[0.07em] text-ink-muted w-[22%]">
                Organization
              </Box>
              <Box as="th" scope="col" className="bg-paper-warm px-4 py-3 font-mono text-[10px] font-medium uppercase tracking-[0.07em] text-ink-muted w-[13%]">
                Typical size
              </Box>
              <Box as="th" scope="col" className="bg-paper-warm px-4 py-3 font-mono text-[10px] font-medium uppercase tracking-[0.07em] text-ink-muted">
                Usual first step
              </Box>
              <Box as="th" scope="col" className="bg-ink px-4 py-3 font-mono text-[10px] font-medium uppercase tracking-[0.07em] text-lime w-[22%]">
                Usual delivery
              </Box>
            </Box>
          </Box>
          <Box as="tbody">
            {data.rows.map((row) => (
              <Box as="tr" key={row.org} className="border-t border-ink/10 transition-colors hover:bg-paper-warm/60">
                <Box as="td" className="px-4 py-4 text-[14px] font-semibold leading-[1.4] text-ink">
                  {row.org}
                </Box>
                <Box as="td" className="px-4 py-4 text-[14px] leading-[1.4] text-olive">
                  {row.size}
                </Box>
                <Box as="td" className="px-4 py-4 text-[14px] leading-[1.5] text-ink">
                  {row.firstStep}
                </Box>
                <Box as="td" className="px-4 py-4 text-[14px] font-semibold leading-[1.4] text-ink">
                  {row.delivery}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Footnote */}
      {data.footnote && (
        <Text as="p" className="mt-4 text-[12.5px] italic leading-[1.5] text-ink-muted">
          {data.footnote}
        </Text>
      )}

      {/* CTA link */}
      {data.cta && (
        <Box className="mt-5">
          <Link
            href={data.cta.href}
            title={data.cta.title}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[14px] font-semibold text-ink underline decoration-olive underline-offset-2 transition-colors hover:text-olive"
          >
            {data.cta.label} →
          </Link>
        </Box>
      )}
    </Section>
  );
}
