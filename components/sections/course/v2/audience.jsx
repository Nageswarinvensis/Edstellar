"use client";

import { useEffect, useId, useRef, useState } from "react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import V2Section from "@/components/sections/course/v2/section";
import V2SectionHead from "@/components/sections/course/v2/section-head";
import V2Heading from "@/components/sections/course/v2/heading";
import V2CtaBand from "@/components/sections/course/v2/cta-band";
import { cn } from "@/lib/utils";

const SUBHEAD = "mb-2 font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-olive";

/** A panel's list items fade up in turn each time it is shown (the design's
 * 0.03s-stagger reveal on chip change). Literal classes for Tailwind. */
const ITEM_DELAY = ["[animation-delay:0ms]", "[animation-delay:40ms]", "[animation-delay:80ms]", "[animation-delay:120ms]", "[animation-delay:160ms]", "[animation-delay:200ms]", "[animation-delay:240ms]"];
const item = (i) => cn("animate-lab-rise motion-reduce:animate-none", ITEM_DELAY[Math.min(i, ITEM_DELAY.length - 1)]);

function Panel({ chip, lensKey }) {
  return (
    <Box className="grid min-w-0 content-start gap-2.5">
      <span className="justify-self-start font-mono text-[10px] uppercase tracking-[0.14em] text-olive">{lensKey}</span>
      <Text as="h3" className="text-[21px] leading-[1.25] [text-wrap:balance]">{chip.heading}</Text>
      <Text className="text-[15px] text-ink">{chip.summary}</Text>
      <Box className="mt-1 grid gap-4 min-[720px]:grid-cols-2">
        <Box>
          <p className={SUBHEAD}>{chip.tasks_label}</p>
          <ul className="grid gap-2">
            {chip.tasks.map((task, i) => (
              <li key={task} className={cn("flex items-start gap-2.5 text-[14.5px] text-ink", item(i))}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-0.5 size-[18px] flex-none text-olive">
                  <path d="m5 12 4.5 4.5L19 7" />
                </svg>
                {task}
              </li>
            ))}
          </ul>
        </Box>
        <Box>
          <p className={SUBHEAD}>{chip.cases_label}</p>
          <ul className="grid gap-1.5">
            {chip.cases.map((c, i) => (
              <li key={c.text} className={cn("flex justify-between gap-2.5 border-b border-ink/8 pb-1.5 text-[14px] text-ink", item(i + 1))}>
                <span>{c.text}</span>
                <i className="self-center font-mono text-[10px] not-italic uppercase tracking-[0.06em] whitespace-nowrap text-olive">{c.tag}</i>
              </li>
            ))}
          </ul>
          {chip.cases_note && <p className="mt-1.5 text-[12px] text-ink-muted">{chip.cases_note}</p>}
        </Box>
      </Box>
      {chip.modules?.length > 0 && (
        <Box className="border-t border-ink/12 pt-3">
          <p className={SUBHEAD}>{chip.modules_label}</p>
          <ul className="flex flex-wrap gap-1.5">
            {chip.modules.map((m, i) => (
              <li key={m} className={cn("rounded-full bg-paper-warm px-2.5 py-1 font-mono text-[11.5px] tracking-[0.02em] text-ink-muted", item(i + 3))}>{m}</li>
            ))}
          </ul>
        </Box>
      )}
    </Box>
  );
}

/** One skill row's track: four stops on a dashed line, a fill from typical start to level reached. */
function Track({ levels, start, end, compact = false, seen = true }) {
  // Unique per track: the phone list and the table both render (one hidden),
  // and a shared id would point at a gradient inside a display:none block.
  const fillId = `pg-fill-${useId().replace(/:/g, "")}`;
  const a = Math.max(0, levels.indexOf(start));
  const b = Math.max(a, levels.indexOf(end));
  const step = 100 / levels.length;
  const cx = (i) => i * step + 3;
  return (
    <svg viewBox="0 0 100 14" preserveAspectRatio="none" className={cn("block h-3.5 w-full overflow-visible", compact ? "min-w-0" : "min-w-[300px]")} aria-hidden="true">
      <line x1="2" x2="98" y1="7" y2="7" className="stroke-ink/22 [stroke-dasharray:3_3]" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      <defs>
        <linearGradient id={fillId} x1="0" x2="1">
          <stop offset="0" className="[stop-color:var(--color-lime-soft)]" />
          <stop offset="1" className="[stop-color:var(--color-navy)]" />
        </linearGradient>
      </defs>
      {/* The fill grows from the typical start to the level reached the first
          time the table scrolls into view (the design's `.pg.seen`, 0.8s). */}
      <rect
        x={cx(a)}
        y="5.5"
        width={cx(b) - cx(a)}
        height="3"
        fill={`url(#${fillId})`}
        className={cn(
          "[transform-box:fill-box] origin-left transition-transform duration-800 ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-reduce:transform-none motion-reduce:transition-none",
          seen ? "scale-x-100" : "scale-x-0",
        )}
      />
      {levels.map((_, i) => (
        <ellipse
          key={i}
          cx={cx(i)}
          cy="7"
          rx="1.7"
          ry="5.5"
          vectorEffect="non-scaling-stroke"
          strokeWidth="1"
          className={i === b ? "fill-navy stroke-navy" : i === a ? "fill-lime-soft stroke-olive" : "fill-white stroke-ink/22"}
        />
      ))}
    </svg>
  );
}

/**
 * v2 · 7 Who it's for (the design's `#audience`) — lenses (industry /
 * department / designation) × chips: one panel per segment beside the
 * lens's isometric tile. Then the skill progression table (where
 * participants typically start and finish) and the CTA. Every panel is in
 * the HTML.
 */
export default function V2Audience({ data }) {
  const [lens, setLens] = useState(0);
  const [chip, setChip] = useState(0);
  // The progression fills grow once, when the table first scrolls into view
  // (the design's onScreenOnce: in the top three quarters of the screen).
  const progressionRef = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const node = progressionRef.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -25% 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);
  if (!data?.lenses?.length) return null;
  const { heading, lead, lenses, progression, cta } = data;
  const current = lenses[lens];

  return (
    <V2Section id="audience">
      <V2SectionHead heading={heading} lead={lead} />

      <Box role="tablist" aria-label="Browse by" className="mb-3.5 inline-flex max-w-full gap-1.5 overflow-x-auto rounded-full bg-paper-warm p-1 [scrollbar-width:none]">
        {lenses.map((l, i) => (
          <button
            key={l.key}
            type="button"
            role="tab"
            aria-selected={lens === i}
            onClick={() => {
              setLens(i);
              setChip(0);
            }}
            className={cn(
              "min-h-10 cursor-pointer rounded-full px-[18px] py-[9px] text-[13.5px] font-semibold whitespace-nowrap text-ink transition-[transform,box-shadow] duration-200 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-olive",
              lens === i && "bg-navy text-white shadow-[0_1px_2px_rgba(10,22,40,0.06),0_8px_24px_rgba(10,22,40,0.06)]",
            )}
          >
            {l.label}
          </button>
        ))}
      </Box>

      {lenses.map((l, li) => (
        <Box key={l.key} hidden={lens !== li}>
          <Box className="mb-[18px] flex flex-wrap content-start gap-2">
            {l.chips.map((c, ci) => (
              <button
                key={c.label}
                type="button"
                aria-pressed={chip === ci}
                onClick={() => setChip(ci)}
                className={cn(
                  "min-h-10 cursor-pointer rounded-full border px-[15px] py-2 text-[13.5px] font-medium text-ink transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-olive",
                  chip === ci ? "border-olive bg-lime-soft shadow-[inset_0_0_0_1px_var(--color-olive)]" : "border-ink/22 bg-white hover:shadow-[0_1px_2px_rgba(10,22,40,0.06),0_8px_24px_rgba(10,22,40,0.06)]",
                )}
              >
                {c.label}
              </button>
            ))}
          </Box>
        </Box>
      ))}

      <Box className="relative grid gap-[18px] rounded-[22px] border border-ink/12 bg-white p-[22px] shadow-[0_1px_2px_rgba(10,22,40,0.06),0_8px_24px_rgba(10,22,40,0.06)] before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:rounded-t-[22px] before:bg-[linear-gradient(90deg,var(--color-navy),var(--color-lime))] min-[900px]:grid-cols-[200px_minmax(0,1fr)] min-[900px]:gap-[26px]">
        {current.image && (
          // All three lens illustrations stacked in one cell; switching lens
          // crossfades them (the design's 0.4s opacity), instead of a swap.
          <Box className="grid max-w-[220px] self-start rounded-[18px] bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,var(--color-navy-soft),var(--color-navy)_75%)] p-2.5">
            {lenses.map((l, li) =>
              l.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={l.key}
                  src={l.image}
                  alt={l.image_alt || `Illustration of training audiences ${l.label.toLowerCase()}`}
                  title={l.image_alt || undefined}
                  // Only the shown lens is exposed; the faded-out ones stay hidden.
                  aria-hidden={lens === li ? undefined : true}
                  width={198}
                  height={211}
                  loading="lazy"
                  decoding="async"
                  className={cn("[grid-area:1/1] h-auto w-full transition-opacity duration-400 motion-reduce:transition-none", lens === li ? "opacity-100" : "opacity-0")}
                />
              ) : null,
            )}
          </Box>
        )}
        <Box className="min-w-0">
          {lenses.map((l, li) =>
            l.chips.map((c, ci) => (
              <Box key={`${l.key}-${c.label}`} hidden={!(lens === li && chip === ci)}>
                <Panel chip={c} lensKey={l.key} />
              </Box>
            )),
          )}
        </Box>
      </Box>

      {progression?.rows?.length > 0 && (
        <Reveal className="mt-[34px]">
          <V2Heading parts={progression.heading} as="h3" className="mb-1.5 text-[clamp(20px,2vw,24px)] leading-[1.25]" emClassName="font-display tracking-[-0.02em]" />
          <Text ref={progressionRef} className="mb-4 text-[14px]">{progression.text}</Text>
          {/* Phones: one card per skill — a four-stop track and its labels
              cannot fit a table cell at this width without overlapping. */}
          <Box as="ul" className="grid gap-2.5 min-[640px]:hidden">
            {progression.rows.map((row) => (
              <Box as="li" key={row.skill} className="rounded-xl border border-ink/12 bg-white px-4 py-3.5">
                <Text as="p" className="mb-3 text-[14px] leading-[1.4] font-semibold text-ink">{row.skill}</Text>
                <Box className="grid grid-cols-4 font-mono text-[8.5px] leading-[1.3] font-medium tracking-[0.04em] text-ink-muted uppercase">
                  {progression.levels.map((lv) => <span key={lv}>{lv}</span>)}
                </Box>
                <Box className="mt-1.5"><Track levels={progression.levels} start={row.start} end={row.end} compact seen={seen} /></Box>
                <Box className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[12.5px] leading-[1.5] text-ink-muted">
                  <span>{progression.columns?.[1]}: <b className="font-semibold text-ink">{row.start}</b></span>
                  <span>{progression.columns?.[2]}: <b className="font-semibold text-ink">{row.end}</b></span>
                </Box>
              </Box>
            ))}
          </Box>

          <Box className="overflow-x-auto rounded-xl border border-ink/12 bg-white max-[639px]:hidden">
            <table className="w-full min-w-[720px] border-collapse text-left text-[14px]">
              <thead>
                <tr>
                  <th scope="col" className="border-b border-ink/8 px-4 py-3 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-ink-muted">{progression.columns?.[0]}</th>
                  <th scope="col" className="w-[36%] border-b border-ink/8 px-4 py-3">
                    <span className="grid min-w-[300px] grid-cols-4 gap-1 font-mono text-[10px] font-medium uppercase tracking-[0.06em] text-ink-muted">
                      {progression.levels.map((lv) => <span key={lv}>{lv}</span>)}
                    </span>
                  </th>
                  <th scope="col" className="border-b border-ink/8 px-4 py-3 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-ink-muted">{progression.columns?.[1]}</th>
                  <th scope="col" className="border-b border-ink/8 px-4 py-3 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-ink-muted">{progression.columns?.[2]}</th>
                </tr>
              </thead>
              <tbody>
                {progression.rows.map((row) => (
                  <tr key={row.skill}>
                    <th scope="row" className="border-b border-ink/8 px-4 py-3 font-semibold text-ink">{row.skill}</th>
                    <td className="border-b border-ink/8 px-4 py-3"><Track levels={progression.levels} start={row.start} end={row.end} seen={seen} /></td>
                    <td className="border-b border-ink/8 px-4 py-3 text-ink-muted">{row.start}</td>
                    <td className="border-b border-ink/8 px-4 py-3 text-ink-muted">{row.end}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
          {progression.key && (
            <p className="mt-2.5 flex items-center gap-2 text-[12.5px] text-ink-muted">
              <span aria-hidden="true" className="inline-block size-3 rounded-full border border-olive bg-lime-soft" />
              {progression.key[0]}
              <span aria-hidden="true" className="ml-2.5 inline-block size-3 rounded-full bg-navy" />
              {progression.key[1]}
            </p>
          )}
        </Reveal>
      )}

      <V2CtaBand cta={cta} />
    </V2Section>
  );
}
