import { Fragment } from "react";
import Link from "next/link";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import CtaButton from "@/components/common/cta-button";
import { cn } from "@/lib/utils";

// Only the dot styling is fixed; the labels (legend + per-cell screen-reader
// text) come from the content via `instruments.fit_legend`.
const FIT_CLASS = {
  2: "bg-navy",
  1: "border-2 border-navy bg-white",
  0: "bg-ink/12",
};

const DEFAULT_LEGEND = {
  2: "Strong fit",
  1: "Supporting evidence",
  0: "Not used for this",
};

/** One fit cell — a dot plus a screen-reader label. */
function FitDot({ value, labels }) {
  return (
    <>
      <span
        aria-hidden="true"
        className={cn("inline-block size-3.5 rounded-full align-middle", FIT_CLASS[value] ?? FIT_CLASS[0])}
      />
      <span className="sr-only">{labels[value] ?? labels[0]}</span>
    </>
  );
}

/** Decorative employee-lifecycle strip showing where behavioral assessment applies. */
function LifecycleStrip({ lifecycle }) {
  if (!lifecycle?.stages?.length) return null;

  return (
    <Box className="mb-8 rounded-2xl border border-ink/12 bg-white px-7 py-6.5">
      <Box className="mb-5.5 flex flex-wrap items-center justify-between gap-x-5 gap-y-3">
        <Text as="h3" className="font-display text-[18px] leading-[1.3] text-ink">
          {lifecycle.title}
        </Text>
        {lifecycle.audiences?.length ? (
          <Box as="ul" className="flex flex-wrap gap-1.5" aria-label="Who it is for">
            {lifecycle.audiences.map((audience) => (
              <Box
                as="li"
                key={audience}
                className="rounded-full bg-lime-soft px-3 py-1.25 font-body text-[12.5px] font-semibold text-navy"
              >
                {audience}
              </Box>
            ))}
          </Box>
        ) : null}
      </Box>

      <Box
        as="ol"
        className="relative grid list-none grid-cols-9 gap-0 p-0 max-[900px]:grid-cols-3 max-[900px]:gap-x-2 max-[900px]:gap-y-4 max-[600px]:grid-cols-2"
        aria-label="Employee lifecycle stages"
      >
        <Box
          aria-hidden="true"
          className="absolute top-[7px] right-[5%] left-[5%] h-0.5 bg-ink/22 max-[900px]:hidden"
        />
        {lifecycle.stages.map((stage) => (
          <Box
            as="li"
            key={stage.label}
            className={cn(
              "relative flex flex-col items-center gap-2.5 px-1 text-center text-[12.5px] leading-[1.3] max-[600px]:flex-row max-[600px]:items-start max-[600px]:gap-2 max-[600px]:text-left",
              stage.active ? "font-bold text-ink" : "text-ink/60",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "relative z-[1] size-4 flex-none rounded-full border-2 bg-white max-[600px]:mt-0.5",
                stage.active ? "border-navy bg-lime" : "border-ink/22",
              )}
            />
            <span>
              {stage.label}
              {stage.active ? <span className="sr-only"> (applies)</span> : null}
            </span>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

/**
 * Behavioral assessment tools and how well each fits onboarding, individual
 * development, manager development, teams and sales — a grouped comparison
 * table over a lifecycle strip, with a specialist-match CTA.
 *
 * Design: `#instruments`, `.lcy`, `.fit`, `.cta-row`.
 */
export default function Instruments({ data }) {
  if (!data?.groups?.length) return null;

  const { section_id, heading, description, lifecycle, columns, groups, cta } =
    data;

  const colSpan = columns.length + 2;

  // Legend / screen-reader text from the content, with sensible defaults.
  const legend = data.fit_legend ?? {};
  const fitLabels = {
    2: legend.strong ?? DEFAULT_LEGEND[2],
    1: legend.supporting ?? DEFAULT_LEGEND[1],
    0: legend.none ?? DEFAULT_LEGEND[0],
  };
  const tableLabel = data.table_label ?? "Assessment tool fit";
  const tableCaption = data.table_caption ?? tableLabel;

  return (
    <Section id={section_id} className="bg-paper-warm">
      <Box className="mb-12 max-w-[760px]">
        <Reveal>
          <RichHeading heading={heading} emphasisClassName="font-normal" />
        </Reveal>
        {description ? (
          <Reveal delay={1}>
            <Text
              as="p"
              className="mt-4 max-w-[64ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink/60"
            >
              {description}
            </Text>
          </Reveal>
        ) : null}
      </Box>

      <Reveal>
        <LifecycleStrip lifecycle={lifecycle} />
      </Reveal>

      <Reveal delay={1}>
        <Box
          role="region"
          aria-label={tableLabel}
          tabIndex={0}
          className="no-scrollbar overflow-x-auto rounded-2xl border border-ink/12 bg-white"
        >
          <table className="w-full min-w-230 border-collapse">
            <caption className="sr-only">{tableCaption}</caption>
            <thead>
              <tr>
                <th
                  scope="col"
                  className="border-b border-ink/12 bg-paper-warm px-4 py-3.5 text-left font-mono text-[10.5px] font-medium uppercase leading-[1.4] tracking-[0.1em] text-ink/60"
                >
                  Tool
                </th>
                {columns.map((col) => (
                  <th
                    key={col}
                    scope="col"
                    className="border-b border-ink/12 bg-paper-warm px-4 py-3.5 text-center font-mono text-[10.5px] font-medium uppercase leading-[1.4] tracking-[0.1em] text-ink/60"
                  >
                    {col}
                  </th>
                ))}
                <th
                  scope="col"
                  className="border-b border-ink/12 bg-paper-warm px-4 py-3.5 text-left font-mono text-[10.5px] font-medium uppercase leading-[1.4] tracking-[0.1em] text-ink/60"
                >
                  Best used
                </th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group) => (
                <Fragment key={group.label}>
                  <tr>
                    <th
                      colSpan={colSpan}
                      scope="colgroup"
                      className="border-b border-ink/12 bg-paper-cream px-4 py-2.5 text-left font-display text-[13px] font-bold text-navy"
                    >
                      {group.label}
                    </th>
                  </tr>
                  {group.tools.map((tool) => (
                    <tr key={tool.name} className="align-middle hover:bg-paper">
                      <th
                        scope="row"
                        className="min-w-60 border-b border-ink/12 px-4 py-3.5 text-left font-normal"
                      >
                        <Text
                          as="span"
                          className="block font-display text-[15px] font-bold leading-[1.3] tracking-[-0.01em] text-ink"
                        >
                          {tool.name}
                        </Text>
                        <Text as="span" className="mt-0.75 block text-[13px] leading-[1.45] text-ink/60">
                          {tool.note}
                        </Text>
                      </th>
                      {tool.fit.map((value, index) => (
                        <td
                          key={columns[index]}
                          className="border-b border-ink/12 px-4 py-3.5 text-center"
                        >
                          <FitDot value={value} labels={fitLabels} />
                        </td>
                      ))}
                      <td className="min-w-60 border-b border-ink/12 px-4 py-3.5 text-left text-[14px] leading-[1.5] text-ink/80">
                        {tool.best_used}
                      </td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </Box>
      </Reveal>

      {/* Legend */}
      <Box className="mt-4 flex flex-wrap gap-x-5.5 gap-y-2 text-[13.5px] text-ink/60" aria-hidden="true">
        {[2, 1, 0].map((value) => (
          <span key={value} className="inline-flex items-center gap-2">
            <FitDot value={value} labels={fitLabels} />
            {fitLabels[value]}
          </span>
        ))}
      </Box>

      {cta?.heading ? (
        <Reveal>
          <Box className="mt-10 flex items-center justify-between gap-6 rounded-2xl border border-ink/12 bg-white px-7 py-6 shadow-[inset_4px_0_0_var(--color-lime)] max-[900px]:flex-col max-[900px]:items-start">
            <Box>
              <Text
                as="p"
                className="font-display text-[19px] font-bold tracking-[-0.01em] text-ink"
              >
                {cta.heading}
              </Text>
              {cta.description ? (
                <Text as="p" className="mt-1 text-[15px] leading-[1.5] text-ink/60">
                  {cta.description}
                </Text>
              ) : null}
            </Box>
            {cta.href ? (
              <CtaButton arrow className="flex-none" render={<Link href={cta.href} />}>
                {cta.btn_label}
              </CtaButton>
            ) : null}
          </Box>
        </Reveal>
      ) : null}
    </Section>
  );
}
