import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import RichHeading from "@/components/common/rich-heading";

/** Dots: d2=16px lime, d1=12px lime/65, d0=8px paper/22 */
function CapabilityDot({ value }) {
  const sizes  = { 2: "size-4",  1: "size-3",  0: "size-2" };
  const colors = { 2: "bg-lime", 1: "bg-lime/65", 0: "bg-paper/[0.22]" };
  const labels = { 2: "Critical", 1: "Important", 0: "Situational" };
  return (
    <Box
      as="span"
      role="img"
      aria-label={labels[value] ?? ""}
      className={`inline-block rounded-full align-middle ${sizes[value] ?? sizes[0]} ${colors[value] ?? colors[0]}`}
    />
  );
}

export default function WwsIndustries({ data }) {
  if (!data) return null;

  return (
    <Section
      id="industries"
      aria-labelledby="ind-h"
      className="scroll-mt-20 bg-ink text-paper"
    >
      {/* cgrid: 4fr 8fr — left panel + table */}
      <Box className="grid items-start gap-12 max-[1200px]:grid-cols-1 max-[1200px]:gap-8 min-[1201px]:grid-cols-[4fr_8fr]">

        {/* Left panel */}
        <Box>
          <RichHeading
            as="h2"
            id="ind-h"
            heading={data.heading}
            className="m-0 text-[clamp(32px,4vw,40px)] font-bold leading-[1.08] tracking-[-0.03em] text-paper"
            emphasisClassName="text-lime"
          />
          <Text as="p" className="mt-5 text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-paper/72">
            {data.lede}
          </Text>

          {/* Steps */}
          <Box as="ol" className="mt-8 grid list-none gap-2 p-0 max-[1200px]:grid-cols-2 max-[600px]:grid-cols-1">
            {data.steps.map((s) => (
              <Box
                as="li"
                key={s.n}
                className="flex items-center gap-3 rounded-[10px] border border-paper/[0.12] px-4 py-3 text-[15px]"
              >
                <Text as="span" className="font-mono text-[12px] font-medium text-lime">{s.n}</Text>
                <Text as="b" className="font-semibold text-paper">{s.label}</Text>
              </Box>
            ))}
          </Box>

          {/* Legend */}
          <Box className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[14px] text-paper/72" aria-hidden="true">
            {[
              { v: 2, label: "Critical capability" },
              { v: 1, label: "Important" },
              { v: 0, label: "Situational" },
            ].map(({ v, label }) => (
              <Box key={v} className="inline-flex items-center gap-2">
                <CapabilityDot value={v} />
                {label}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Right: scrollable table */}
        <Box
          tabIndex={0}
          role="region"
          aria-labelledby="ind-cap"
          className="overflow-x-auto rounded-[14px] border border-paper/[0.12] bg-navy-soft focus-visible:outline-2 focus-visible:outline-lime focus-visible:outline-offset-[3px]"
        >
          <Box
            as="table"
            className="w-full min-w-[720px] border-collapse"
          >
            <Text as="caption" id="ind-cap" className="sr-only">
              Capability priorities across 17 industries
            </Text>
            <thead>
              <tr>
                <Box
                  as="th"
                  scope="col"
                  className="sticky left-0 bg-navy-soft px-5 py-4 text-left text-[13px] font-semibold text-paper/72"
                >
                  Industry
                </Box>
                {data.cols.map((col) => (
                  <Box
                    as="th"
                    key={col}
                    scope="col"
                    className="px-2 py-4 text-center text-[13px] font-semibold leading-snug text-paper/72"
                  >
                    {col}
                  </Box>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.rows.map((row) => (
                <tr
                  key={row.label}
                  className="border-t border-paper/[0.07] transition-colors hover:bg-paper/[0.04]"
                >
                  <Box
                    as="th"
                    scope="row"
                    className="sticky left-0 bg-navy-soft p-0 text-left text-[14px] font-semibold transition-colors [[data-hover=true]_&]:bg-[#1a2a45]"
                  >
                    <a
                      href={row.href}
                      className="flex min-h-[44px] items-center gap-2.5 px-5 py-2 text-paper no-underline hover:underline hover:underline-offset-[4px]"
                    >
                      {row.label}
                    </a>
                  </Box>
                  {row.dots.map((dot, j) => (
                    <Box as="td" key={j} className="px-2 py-1 text-center">
                      <CapabilityDot value={dot} />
                    </Box>
                  ))}
                </tr>
              ))}
            </tbody>
          </Box>
        </Box>
      </Box>
    </Section>
  );
}
