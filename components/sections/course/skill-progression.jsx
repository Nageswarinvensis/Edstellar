import { Info } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils";

// The design's dot/pill greens are a muted, olive-leaning green with no
// equivalent design token (`--color-olive` is a different, more yellow
// shade) — arbitrary hex here matches the source exactly rather than
// approximating with Tailwind's more saturated default green scale, which
// reads visibly "off" next to the source at this size.
const PILL_CLASSES = {
  true: "bg-[#eaf6e3] text-[#3f7d27]",
  false: "bg-[#f1f3f6] text-ink/65",
};

const DOT_BASE = "block size-3.25 rounded-full";
const DOT_OFF = "border border-[#d5dae1] bg-[#eaedf1]";
const DOT_ENTRY = "border-2 border-[#4a9e2b] bg-white";
const DOT_MID = "border border-[#a3d283] bg-[#a3d283]";
const DOT_EXIT = "border border-[#3f8f22] bg-[#3f8f22]";
const LINE_ON = "bg-[#6cb84c]";
const LINE_OFF = "bg-[#dfe4ea]";

/**
 * One continuous rail across every level (grey), with a green segment
 * overlaid from the entry dot's center to the exit dot's center. Every dot
 * after the first sits on the rail — including the "not covered" ones past
 * exit — matching the source, which colors every connecting segment either
 * on or off but never removes one. Dot centers are at each cell's midpoint,
 * so the overlay's offsets are computed as percentages of the rail width;
 * this is genuine geometry, not a design value, so it's the one legitimate
 * use of inline `style` here (`curriculum.jsx`'s split bar does the same
 * for its per-segment widths).
 */
function Rail({ levels, entry, exit }) {
  const count = levels.length;
  const centerPct = (index) => ((index + 0.5) / count) * 100;

  return (
    <Box className="relative flex h-7.5 items-center">
      <Box
        aria-hidden="true"
        className={cn("absolute top-1/2 h-0.5 -translate-y-1/2", LINE_OFF)}
        style={{
          left: `${centerPct(0)}%`,
          right: `${100 - centerPct(count - 1)}%`,
        }}
      />
      <Box
        aria-hidden="true"
        className={cn("absolute top-1/2 h-0.5 -translate-y-1/2", LINE_ON)}
        style={{
          left: `${centerPct(entry)}%`,
          right: `${100 - centerPct(exit)}%`,
        }}
      />

      {levels.map((_, index) => {
        const dotClass =
          index === entry ? DOT_ENTRY : index === exit ? DOT_EXIT : index > entry && index < exit ? DOT_MID : DOT_OFF;

        return (
          <Box
            key={index}
            className="relative z-[1] flex flex-1 items-center justify-center"
          >
            <Box aria-hidden="true" className={cn(DOT_BASE, dotClass)} />
          </Box>
        );
      })}
    </Box>
  );
}

/**
 * Skill-levels matrix — where a typical participant starts and finishes on
 * each topic, grouped into prerequisite / taught-here bands. A static
 * table, not a filled-on-scroll bar chart: that read better as a design but
 * this is what the approved design actually shows.
 *
 * Design: `.eds-path`, `.eds-path-table`, `.eds-path-row`, `.eds-path-dot`.
 */
export default function SkillProgression({ progression }) {
  if (!progression?.bands?.length) return null;

  const { title, description, levels, bands, note } = progression;

  return (
    <Box className="mt-6.5 overflow-hidden rounded-2xl border border-ink/12 bg-white">
      <Box className="flex flex-wrap items-start justify-between gap-6 px-6 pt-5.5 pb-4.5">
        <Box>
          <Text
            as="h3"
            className="font-body text-[18px] font-bold tracking-[-0.02em] text-ink"
          >
            {title}
          </Text>
          {description ? (
            <Text as="p" className="mt-1.25 text-[12.5px] leading-[1.55] text-ink/60">
              {description}
            </Text>
          ) : null}
        </Box>

        <Box className="flex items-center gap-2.25 font-mono text-[10px] tracking-[0.06em] text-ink/60 uppercase">
          <span className="inline-flex items-center gap-1.5">
            <Box aria-hidden="true" className={cn(DOT_BASE, DOT_ENTRY)} />
            Entry
          </span>
          <Box aria-hidden="true" className={cn("h-0.5 w-6.5 flex-none rounded-full", LINE_ON)} />
          <span className="inline-flex items-center gap-1.5">
            <Box aria-hidden="true" className={cn(DOT_BASE, DOT_EXIT)} />
            Exit
          </span>
          <span className="ml-2 inline-flex items-center gap-1.5">
            <Box aria-hidden="true" className={cn(DOT_BASE, DOT_OFF)} />
            Not covered
          </span>
        </Box>
      </Box>

      <Box className="grid grid-cols-[minmax(0,1fr)_84px] border-t border-ink/12 min-[901px]:grid-cols-[minmax(0,1.5fr)_104px_repeat(4,minmax(0,1fr))]">
        <Text
          as="span"
          className="border-b border-ink/12 bg-slate-50 py-2.75 pl-6 text-[11.5px] font-semibold text-ink/70"
        >
          Skill / Topic
        </Text>
        <Text
          as="span"
          className="border-b border-ink/12 bg-slate-50 py-2.75 pr-3 text-[11.5px] font-semibold text-ink/70"
        >
          Prerequisite?
        </Text>
        {levels.map((level) => (
          <Text
            key={level}
            as="span"
            className="hidden border-b border-ink/12 bg-slate-50 py-2.75 text-center text-[11.5px] font-semibold text-ink/70 min-[901px]:block"
          >
            {level}
          </Text>
        ))}

        {bands.map((band, bandIndex) => (
          <Box key={`${band.variant}-${bandIndex}`} className="contents">
            {band.rows.map((row) => (
              <Box key={row.skill} className="contents">
                <Text
                  as="span"
                  className="flex items-center border-b border-ink/8 py-3.25 pl-6 text-[13px] leading-[1.35] text-ink"
                >
                  {row.skill}
                </Text>
                <Box className="flex items-center border-b border-ink/8 py-3.25">
                  <Text
                    as="span"
                    className={cn(
                      "inline-block rounded-[6px] px-3.25 py-1 text-[11.5px] font-semibold",
                      PILL_CLASSES[String(Boolean(row.prerequisite))],
                    )}
                  >
                    {row.prerequisite ? "Yes" : "No"}
                  </Text>
                </Box>
                <Box className="col-span-full border-b border-ink/8 px-6 pb-3 min-[901px]:col-span-4 min-[901px]:col-start-3 min-[901px]:grid min-[901px]:content-center min-[901px]:px-0 min-[901px]:pb-0">
                  <Rail levels={levels} entry={row.entry} exit={row.exit} />
                </Box>
              </Box>
            ))}
          </Box>
        ))}
      </Box>

      {note ? (
        <Box className="flex items-center gap-4.5 border-t border-ink/12 bg-paper px-6 py-4">
          <Box className="grid size-9 flex-none place-items-center rounded-full bg-[#e6f4dd] text-[#3f7d27]">
            <Info size={18} strokeWidth={2} aria-hidden="true" />
          </Box>
          <Text as="p" className="text-[12.5px] leading-[1.6] text-ink/65">
            {note}
          </Text>
        </Box>
      ) : null}
    </Box>
  );
}
