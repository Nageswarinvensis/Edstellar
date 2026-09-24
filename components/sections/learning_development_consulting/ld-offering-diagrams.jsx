import { Fragment } from "react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils";

const CHIP_TONES = {
  navy: "bg-navy text-paper",
  soft: "bg-paper-warm text-ink",
  lime: "bg-lime text-navy",
};

// Legend index → cell fill, lightest to darkest (Foundational → Expert).
const LEVEL_FILLS = ["bg-lime-soft", "bg-lime", "bg-navy-soft", "bg-navy"];

const MONO_LABEL =
  "font-mono text-[10px] leading-[1.4] tracking-[0.08em] text-ink/60 uppercase";

/** Small downward triangle between two stacked tiers. */
function DownArrow() {
  return (
    <Box
      aria-hidden="true"
      className="my-0.75 size-0 self-center border-x-[5px] border-t-[7px] border-x-transparent border-t-ink/22"
    />
  );
}

function AlignmentDiagram({ diagram }) {
  return (
    <Box className="flex w-full max-w-115 flex-col gap-2.5">
      {diagram.tiers?.map((tier, index) => (
        <Fragment key={tier.label}>
          {index > 0 ? <DownArrow /> : null}
          <Box className="flex flex-col gap-1.75">
            <Text as="span" className={cn(MONO_LABEL, "text-center")}>
              {tier.label}
            </Text>
            <Box className="flex justify-center gap-1.5">
              {tier.chips?.map((chip) => (
                <Text
                  key={chip}
                  as="span"
                  className={cn(
                    "flex-1 rounded-[9px] px-1.5 py-3.5 text-center text-[13px] leading-[1.3] font-semibold",
                    CHIP_TONES[tier.tone] ?? CHIP_TONES.soft,
                  )}
                >
                  {chip}
                </Text>
              ))}
            </Box>
          </Box>
        </Fragment>
      ))}
    </Box>
  );
}

function OperatingModelDiagram({ diagram }) {
  return (
    <Box className="flex w-full max-w-115 flex-col gap-2.5">
      <Text
        as="span"
        className="rounded-[10px] bg-navy p-4.5 text-center text-[14px] leading-[1.3] font-semibold text-paper"
      >
        {diagram.top}
      </Text>
      <Box className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {diagram.pillars?.map((pillar) => (
          <Text
            key={pillar}
            as="span"
            className="rounded-[9px] border border-ink/12 bg-paper px-1 py-5.5 text-center text-[12.5px] leading-[1.3] font-semibold text-ink"
          >
            {pillar}
          </Text>
        ))}
      </Box>
      <Text
        as="span"
        className="rounded-[10px] bg-paper-warm p-4.5 text-center text-[14px] leading-[1.3] font-semibold text-ink"
      >
        {diagram.bottom}
      </Text>
    </Box>
  );
}

function CompetencyMatrixDiagram({ diagram }) {
  const levels = diagram.levels ?? [];
  const legend = diagram.legend ?? [];
  const grid =
    "grid grid-cols-[minmax(0,90px)_repeat(4,minmax(0,1fr))] items-center gap-2 sm:grid-cols-[130px_repeat(4,60px)] sm:gap-3";

  return (
    <Box className="flex w-full flex-col items-center gap-6">
      <Box
        role="table"
        aria-label="Competency levels by capability"
        className="flex w-full max-w-115 flex-col gap-1.5 sm:w-auto"
      >
        <Box role="row" className={grid}>
          <span aria-hidden="true" />
          {levels.map((level) => (
            <Text
              key={level}
              as="span"
              role="columnheader"
              className="text-center font-mono text-[11px] leading-[1.4] text-ink/60"
            >
              {level}
            </Text>
          ))}
        </Box>
        {diagram.rows?.map((row) => (
          <Box key={row.label} role="row" className={grid}>
            <Text
              as="span"
              role="rowheader"
              className="text-right text-[13px] leading-[1.3] font-semibold text-ink sm:text-[13.5px]"
            >
              {row.label}
            </Text>
            {row.cells?.map((cell, index) => (
              <Box
                key={index}
                role="cell"
                aria-label={`${levels[index]}: ${legend[cell]}`}
                className={cn(
                  "h-11.5 w-full rounded-lg sm:w-15",
                  LEVEL_FILLS[cell],
                )}
              />
            ))}
          </Box>
        ))}
      </Box>

      <Box className="flex flex-wrap justify-center gap-4.5">
        {legend.map((label, index) => (
          <Text
            key={label}
            as="span"
            className="flex items-center gap-1.75 text-[11.5px] leading-[1.4] text-ink/60"
          >
            <Box
              as="span"
              aria-hidden="true"
              className={cn("size-3.75 rounded-sm", LEVEL_FILLS[index])}
            />
            {label}
          </Text>
        ))}
      </Box>
    </Box>
  );
}

function CurriculumTreeDiagram({ diagram }) {
  return (
    <Box className="flex w-full flex-col items-center">
      <Text
        as="span"
        className="rounded-[9px] bg-navy px-6 py-3.5 text-[14px] leading-[1.3] font-semibold text-paper"
      >
        {diagram.root}
      </Text>
      <Box
        aria-hidden="true"
        className="h-5 w-[70%] border-x-2 border-t-2 border-ink/22"
      />
      <Box className="grid w-full max-w-115 grid-cols-3 gap-2.5 sm:gap-4.5">
        {diagram.paths?.map((path) => (
          <Box key={path.label} className="flex flex-col items-center gap-2">
            <Text
              as="span"
              className="w-full rounded-[9px] border border-ink/12 bg-paper px-1.5 py-3 text-center text-[12.5px] leading-[1.3] font-semibold text-ink"
            >
              {path.label}
            </Text>
            <Box className="flex flex-wrap justify-center gap-1.25" aria-hidden="true">
              {Array.from({ length: path.modules ?? 0 }, (_, index) => (
                <Box
                  key={index}
                  className="size-6 rounded-[5px] border border-ink/12 bg-lime-soft"
                />
              ))}
            </Box>
            <Text as="span" className="sr-only">
              {`${path.modules} programs`}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

// Rising trend line, baseline → now. Geometry, not design data.
const TREND_POINTS = "0,78 52,66 104,54 156,34 208,22 260,8";

function KpiDashboardDiagram({ diagram }) {
  const [start, end] = diagram.axis ?? [];

  return (
    <Box className="w-full max-w-115">
      <Box className="mb-3.5 flex gap-2">
        {diagram.kpis?.map((kpi) => (
          <Box
            key={kpi.label}
            className="flex-1 rounded-[9px] bg-paper-warm px-2.5 py-4 text-center"
          >
            <Text
              as="span"
              className="mb-1.25 block font-mono text-[10px] leading-[1.4] tracking-[0.05em] text-ink/60 uppercase"
            >
              {kpi.label}
            </Text>
            <Text
              as="span"
              className="font-display text-[18px] leading-[1.2] font-bold text-navy"
            >
              {kpi.value}
            </Text>
          </Box>
        ))}
      </Box>

      <Box className="relative h-37.5" aria-hidden="true">
        <svg
          viewBox="0 0 260 90"
          preserveAspectRatio="none"
          className="size-full overflow-visible"
        >
          <polyline
            points={TREND_POINTS}
            fill="none"
            strokeWidth="3"
            className="stroke-navy"
            vectorEffect="non-scaling-stroke"
          />
          <circle cx="260" cy="8" r="4" className="fill-lime" />
        </svg>
        <Box className="absolute inset-x-0 bottom-[14%] border-t border-dashed border-ink/22" />
      </Box>

      <Box className="mt-2 flex justify-between">
        <Text as="span" className="font-mono text-[9px] leading-[1.4] text-ink/60 uppercase">
          {start}
        </Text>
        <Text as="span" className="font-mono text-[9px] leading-[1.4] text-ink/60 uppercase">
          {end}
        </Text>
      </Box>
    </Box>
  );
}

function RightArrow() {
  return (
    <Box
      aria-hidden="true"
      className="relative mx-0.75 hidden h-0.5 w-5.5 bg-ink/22 after:absolute after:top-1/2 after:-right-px after:-translate-y-1/2 after:border-y-[3px] after:border-l-[5px] after:border-y-transparent after:border-l-ink/22 sm:block"
    />
  );
}

function GovernanceCycleDiagram({ diagram }) {
  return (
    <Box className="grid w-full grid-cols-2 items-center justify-center gap-2 sm:flex sm:w-auto sm:flex-wrap sm:gap-0">
      {diagram.steps?.map((step, index) => (
        <Fragment key={step.label}>
          {index > 0 ? <RightArrow /> : null}
          <Box className="flex min-w-25 flex-col items-center gap-1 rounded-[10px] border border-ink/12 bg-paper px-3.5 py-4">
            <Text as="span" className="text-[15px] leading-[1.3] font-bold text-ink">
              {step.label}
            </Text>
            <Text
              as="span"
              className="font-mono text-[9.5px] leading-[1.4] tracking-[0.05em] text-ink/60 uppercase"
            >
              {step.cadence}
            </Text>
          </Box>
        </Fragment>
      ))}
      <Text
        as="span"
        aria-hidden="true"
        className="col-span-2 text-center font-display text-[28px] leading-none font-bold text-olive sm:ml-2.5"
      >
        ↻
      </Text>
    </Box>
  );
}

const DIAGRAMS = {
  alignment: AlignmentDiagram,
  operating_model: OperatingModelDiagram,
  competency_matrix: CompetencyMatrixDiagram,
  curriculum_tree: CurriculumTreeDiagram,
  kpi_dashboard: KpiDashboardDiagram,
  governance_cycle: GovernanceCycleDiagram,
};

/**
 * One infographic per "What's included" item, picked by `diagram.type`, with
 * its mono caption underneath. Pure markup — rendered on the server and
 * handed to the client tab strip as a prop, so none of it ships as JS.
 *
 * Design: `.dg`, `.dg-lab`, `.al2`, `.om`, `.mx2`, `.ct`, `.ds2`, `.gov2`.
 */
export default function Diagram({ diagram }) {
  const Component = DIAGRAMS[diagram?.type];
  if (!Component) return null;

  return (
    <Box className="flex w-full flex-1 flex-col items-center justify-center gap-6">
      <Component diagram={diagram} />
      {diagram.caption ? (
        <Text as="span" className={cn(MONO_LABEL, "text-center tracking-[0.1em]")}>
          {diagram.caption}
        </Text>
      ) : null}
    </Box>
  );
}
