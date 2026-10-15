import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import { CtaButton } from "@/components/common/cta-button";
import SectionHead, { SECTION_WIDTH, SECTION_PADDING } from "@/components/common/section-head";
import { cn } from "@/lib/utils";

/** A value still in its design placeholder form, e.g. "[$X–$Y]". */
const isPlaceholder = (value) => /^\[.*\]$/.test(value);

/**
 * "Corporate training pricing in your region" — a table of virtual day rates
 * and the onsite uplift per region, on navy-deep.
 *
 * The design ships the rates as placeholders ("[$X–$Y]"); a value still in
 * that bracketed form renders with the dashed lime marker so it cannot be
 * mistaken for a real price. Replace them in the content file.
 *
 * Design: corporate-training-pricing-v2 `#regional-pricing`, `.reg`, `.ph`.
 */
export default function RegionalPricing({ data }) {
  const rows = data?.rows ?? [];
  if (!rows.length) return null;

  return (
    <Section id="regional-pricing" className={cn("bg-navy-deep text-paper", SECTION_PADDING)} innerClassName={SECTION_WIDTH}>
      <SectionHead heading={data.heading} dark />

      <Reveal className="mx-auto max-w-225 overflow-hidden rounded-[22px] border border-paper/12">
        <Box as="table" className="w-full border-collapse">
          <Box as="thead">
            <Box as="tr">
              {data.columns.map((column) => (
                <Box
                  as="th"
                  key={column}
                  scope="col"
                  className="bg-navy-soft px-3.5 py-3.5 text-left font-mono text-[10.5px] leading-[1.5] font-medium tracking-[0.16em] text-lime uppercase sm:px-6 sm:py-4.5"
                >
                  {column}
                </Box>
              ))}
            </Box>
          </Box>
          <Box as="tbody">
            {rows.map((row) => (
              <Box as="tr" key={row.region} className="transition-colors duration-200 hover:bg-paper/3">
                <Box
                  as="th"
                  scope="row"
                  className="border-t border-paper/12 px-3.5 py-3.5 text-left font-display text-[14px] font-semibold tracking-[-0.01em] text-paper sm:px-6 sm:py-4.5 sm:text-[15.5px]"
                >
                  {row.region}
                </Box>
                {[row.virtual, row.onsite].map((value, index) => (
                  <Box
                    as="td"
                    key={index}
                    className="border-t border-paper/12 px-3.5 py-3.5 text-[14px] text-paper/72 sm:px-6 sm:py-4.5 sm:text-[15.5px]"
                  >
                    {isPlaceholder(value) ? (
                      <Text
                        as="span"
                        className="rounded bg-lime/16 px-1 text-[length:inherit] font-semibold whitespace-nowrap text-lime outline-[1.5px] outline-offset-1 outline-lime outline-dashed"
                      >
                        {value}
                      </Text>
                    ) : (
                      value
                    )}
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        </Box>
      </Reveal>

      {data.note ? (
        <Text as="p" className="mx-auto mt-4.5 max-w-225 text-center text-[14px] leading-[1.6] text-paper/50">
          {data.note}
        </Text>
      ) : null}

      {data.cta?.href ? (
        <Box className="mt-9 flex justify-center">
          <CtaButton color="lime" arrow render={<a href={data.cta.href} />}>
            {data.cta.label}
          </CtaButton>
        </Box>
      ) : null}
    </Section>
  );
}
