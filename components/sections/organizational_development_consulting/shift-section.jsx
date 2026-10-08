import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import { cn } from "@/lib/utils";

/**
 * The OD sub-pages' dark "shift" band: an eyebrow, heading, lede and three
 * points on the left, and a signature illustration on a white card to the
 * right. The illustration is chosen by the data — a current→target culture-chip
 * diagram when `data.shift` is present (cultural transformation), a
 * representation-by-level bar chart when `data.levels` is present (DEI), else
 * the fixed change-curve chart (change management). Each is decorative.
 *
 * Shared by more than one OD sub-page, so it lives in the OD section folder
 * (the family-level sharing TASTE.md §6.1 allows for consulting).
 *
 * Design: `#change-journey` / `#culture-shift` / `#representation` → `.cj-grid`,
 * `.cj-copy`, `.cj-points`, `.cj-viz` (white card), `.cshift`, `.dei-*`.
 */
export default function ShiftSection({ data }) {
  if (!data?.heading) return null;

  const {
    section_id,
    eyebrow,
    heading,
    description,
    points,
    shift,
    levels,
    Image: imageSrc,
  } = data;

  return (
    <Section id={section_id ?? "shift"} className="bg-navy">
      <Box className="mx-auto grid max-w-[1060px] grid-cols-[0.82fr_1.18fr] items-center gap-[46px] max-[900px]:grid-cols-1 max-[900px]:gap-9">
        <Box>
          {eyebrow ? (
            <Reveal>
              <Text
                as="p"
                className="mb-3 font-mono text-[11px] leading-none tracking-[0.14em] text-lime uppercase"
              >
                {eyebrow}
              </Text>
            </Reveal>
          ) : null}

          <Reveal delay={1}>
            <RichHeading
              heading={heading}
              className="mb-4 text-paper"
              emphasisClassName="font-normal text-lime"
            />
          </Reveal>

          {description ? (
            <Reveal delay={2}>
              <Text
                as="p"
                className="mb-6.5 max-w-[56ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-paper/72"
              >
                {description}
              </Text>
            </Reveal>
          ) : null}

          {points?.length ? (
            <Reveal delay={3}>
              <Box as="ul" className="flex flex-col gap-4">
                {points.map((point) => (
                  <Box as="li" key={point.title} className="relative pl-5.5">
                    <Box
                      aria-hidden="true"
                      className="absolute top-2.5 left-0 size-1.75 rounded-full bg-lime"
                    />
                    <Text
                      as="b"
                      className="block font-display text-[15px] leading-[1.3] font-bold text-paper"
                    >
                      {point.title}
                    </Text>
                    <Text as="span" className="block text-[14px] leading-[1.5] text-paper/62">
                      {point.description}
                    </Text>
                  </Box>
                ))}
              </Box>
            </Reveal>
          ) : null}
        </Box>

        <Reveal delay={2}>
          {imageSrc ? (
            // The right side is now a CMS-supplied image (`Image`), which wins
            // over the built-in illustrations when present.
            <img
              src={imageSrc}
              alt=""
              loading="lazy"
              decoding="async"
              className="w-full rounded-[14px] object-cover shadow-lift"
            />
          ) : (
            /* The white viz card (`.cj-viz`). */
            <Box className="rounded-[14px] bg-white px-6 py-5.5 shadow-lift">
              {shift ? (
                <ShiftColumns shift={shift} />
              ) : levels ? (
                <RepresentationBars levels={levels} target={data.target ?? 50} />
              ) : (
                <ChangeCurve />
              )}
            </Box>
          )}
        </Reveal>
      </Box>
    </Section>
  );
}

/** Current-culture → target-culture chip diagram (cultural transformation). */
function ShiftColumns({ shift }) {
  const { current_label, current = [], target_label, target = [], caption } = shift;

  return (
    <Box>
      <Box className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 max-[560px]:grid-cols-1">
        <ShiftColumn
          label={current_label ?? "Current culture"}
          chips={current}
          tone="current"
        />
        <Box
          aria-hidden="true"
          className="text-center font-body text-[26px] leading-none text-navy max-[560px]:rotate-90"
        >
          →
        </Box>
        <ShiftColumn
          label={target_label ?? "Target culture"}
          chips={target}
          tone="target"
        />
      </Box>
      {caption ? (
        <Text
          as="p"
          className="mt-4 text-center font-mono text-[11px] leading-normal tracking-[0.02em] text-ink/60"
        >
          {caption}
        </Text>
      ) : null}
    </Box>
  );
}

function ShiftColumn({ label, chips, tone }) {
  return (
    <Box>
      <Text
        as="h4"
        className={cn(
          "mb-3 text-center font-mono text-[11px] leading-none tracking-[0.1em] uppercase",
          tone === "target" ? "text-navy" : "text-ink/45",
        )}
      >
        {label}
      </Text>
      <Box className="flex flex-col gap-2.25">
        {chips.map((chip) => (
          <Text
            key={chip}
            as="span"
            className={cn(
              "rounded-[10px] px-2.5 py-2.25 text-center font-display text-[13.5px] leading-tight font-semibold",
              tone === "target"
                ? "bg-lime text-navy"
                : "border border-ink/12 bg-paper-cream text-ink/60",
            )}
          >
            {chip}
          </Text>
        ))}
      </Box>
    </Box>
  );
}

/** Representation-by-level bar chart against a target (DEI; decorative). */
function RepresentationBars({ levels, target = 50 }) {
  const X0 = 206;
  const FULL = 430;
  const ROW_H = 20;
  const ROW_GAP = 16;
  const START_Y = 72;
  const xAt = (pct) => X0 + (pct / 100) * FULL;
  const targetX = xAt(target);
  const lastRowBottom = START_Y + levels.length * (ROW_H + ROW_GAP);

  return (
    <svg
      viewBox="0 0 680 300"
      role="img"
      aria-label={`Representation by level on a 0 to 100 percent scale, each level short of the ${target} percent target, with the gap to target shown`}
      className="h-auto w-full"
    >
      {/* Scale */}
      <text x={X0} y="54" className={BAR_AXIS} textAnchor="start">0%</text>
      <text x={targetX} y="54" className={BAR_AXIS} textAnchor="middle">{`Target ${target}%`}</text>
      <text x={X0 + FULL} y="54" className={BAR_AXIS} textAnchor="end">100%</text>
      {/* Target line */}
      <line
        x1={targetX}
        y1="62"
        x2={targetX}
        y2={lastRowBottom + 4}
        className="stroke-ink/55"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />

      {levels.map((level, index) => {
        const y = START_Y + index * (ROW_H + ROW_GAP);
        const midY = y + 14;
        const currentW = (level.value / 100) * FULL;
        const gap = Math.max(0, target - level.value);
        const gapW = (gap / 100) * FULL;

        return (
          <g key={level.label}>
            <text x="190" y={midY} className={BAR_LEVEL} textAnchor="end">
              {level.label}
            </text>
            <rect x={X0} y={y} width={FULL} height={ROW_H} rx="4" className="fill-navy/5" />
            <rect x={X0} y={y} width={currentW} height={ROW_H} rx="4" className="fill-lime" />
            {gapW > 0 ? (
              <rect x={X0 + currentW} y={y} width={gapW} height={ROW_H} className="fill-ink/12" />
            ) : null}
            <text x={X0 + currentW - 7} y={midY} className={BAR_PCT} textAnchor="end">
              {`${level.value}%`}
            </text>
            {gap > 0 ? (
              <text x={X0 + currentW + gapW / 2} y={midY} className={BAR_GAP} textAnchor="middle">
                {`-${gap}pp`}
              </text>
            ) : null}
          </g>
        );
      })}

      {/* Legend */}
      <rect x={X0} y={lastRowBottom + 5} width="13" height="10" className="fill-lime" />
      <text x={X0 + 17} y={lastRowBottom + 14} className={BAR_LEG} textAnchor="start">Current</text>
      <rect x={X0 + 85} y={lastRowBottom + 5} width="13" height="10" className="fill-ink/12" />
      <text x={X0 + 102} y={lastRowBottom + 14} className={BAR_LEG} textAnchor="start">Gap to target</text>
    </svg>
  );
}

const BAR_AXIS = "font-mono text-[10px] tracking-[0.04em] fill-ink/45";
const BAR_LEVEL = "font-display text-[12.5px] font-semibold fill-navy";
const BAR_PCT = "font-display text-[11px] font-bold fill-navy";
const BAR_GAP = "font-mono text-[9.5px] fill-ink/45";
const BAR_LEG = "font-mono text-[10px] tracking-[0.02em] fill-ink/60";

const LEGEND_TEXT = "font-mono text-[11px] tracking-[0.03em] fill-ink/60 [text-transform:uppercase]";
const AXIS_TEXT = "font-mono text-[11px] tracking-[0.04em] fill-ink/60";
const AXIS_LABEL = "font-mono text-[10px] tracking-[0.1em] fill-ink/45 [text-transform:uppercase]";

/** The fixed change-curve illustration (change management; decorative). */
function ChangeCurve() {
  return (
    <svg
      viewBox="0 0 680 384"
      role="img"
      aria-label="Change curve: change managed with Edstellar dips less and recovers faster and higher than change left to chance"
      className="h-auto w-full"
    >
      {/* Axes */}
      <line x1="64" y1="56" x2="64" y2="300" className="stroke-ink/22" strokeWidth="1.5" />
      <line x1="64" y1="300" x2="648" y2="300" className="stroke-ink/22" strokeWidth="1.5" />
      {/* Baseline + gridlines */}
      <line x1="64" y1="132" x2="648" y2="132" className="stroke-ink/12" strokeWidth="1.5" strokeDasharray="3 5" />
      <line x1="250" y1="64" x2="250" y2="300" className="stroke-ink/10" strokeWidth="1" />
      <line x1="430" y1="64" x2="430" y2="300" className="stroke-ink/10" strokeWidth="1" />
      {/* Area under the managed curve */}
      <path
        d="M64,132 C150,138 210,196 288,190 C392,182 496,112 648,72 L648,168 C520,214 420,286 300,286 C205,286 150,140 64,132 Z"
        className="fill-lime/10"
      />
      {/* Left to chance */}
      <path
        d="M64,132 C150,140 205,286 300,286 C420,286 520,214 648,168"
        fill="none"
        className="stroke-ink/55"
        strokeWidth="2.2"
        strokeDasharray="5 5"
        strokeLinecap="round"
      />
      {/* Managed with Edstellar */}
      <path
        d="M64,132 C150,138 210,196 288,190 C392,182 496,112 648,72"
        fill="none"
        className="stroke-lime"
        strokeWidth="3.6"
        strokeLinecap="round"
      />
      {/* Nodes */}
      <circle cx="64" cy="132" r="5" className="fill-navy stroke-lime" strokeWidth="2.5" />
      <circle cx="288" cy="190" r="5" className="fill-navy stroke-lime" strokeWidth="2.5" />
      <circle cx="470" cy="120" r="5" className="fill-navy stroke-lime" strokeWidth="2.5" />
      <circle cx="648" cy="72" r="6" className="fill-lime stroke-navy" strokeWidth="2.5" />
      {/* Legend */}
      <line x1="82" y1="74" x2="108" y2="74" className="stroke-lime" strokeWidth="3.6" strokeLinecap="round" />
      <text x="116" y="78" className={LEGEND_TEXT}>Managed with Edstellar</text>
      <line x1="82" y1="96" x2="108" y2="96" className="stroke-ink/55" strokeWidth="2.2" strokeDasharray="5 5" strokeLinecap="round" />
      <text x="116" y="100" className={LEGEND_TEXT}>Left to chance</text>
      {/* Axis labels */}
      <text x="26" y="182" className={AXIS_LABEL} transform="rotate(-90 26 182)" textAnchor="middle">Performance</text>
      <text x="64" y="322" className={AXIS_TEXT} textAnchor="start">Decision</text>
      <text x="250" y="322" className={AXIS_TEXT} textAnchor="middle">Disruption</text>
      <text x="430" y="322" className={AXIS_TEXT} textAnchor="middle">Adoption</text>
      <text x="648" y="322" className={AXIS_TEXT} textAnchor="end">New normal</text>
      <text x="356" y="352" className={AXIS_LABEL} textAnchor="middle">Time</text>
    </svg>
  );
}
