"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import V2Section from "@/components/sections/course/v2/section";
import V2SectionHead from "@/components/sections/course/v2/section-head";
import V2CtaBand from "@/components/sections/course/v2/cta-band";
import { DELIVERY_SCENES } from "@/components/sections/course/v2/delivery-scenes";
import V2Heading from "@/components/sections/course/v2/heading";
import { cn } from "@/lib/utils";

import styles from "./delivery.module.css";

/** Heading words per selection, as the design writes them. */
const SCALE_S = { one: "One team", multi: "Multiple cohorts", ent: "Enterprise-wide" };
/** Grid cells for the 3 + 3 snake: row 1 left → right, row 2 right → left. */
const CELL = ["", "", "", "min-[720px]:row-start-2 min-[720px]:col-start-3", "min-[720px]:row-start-2 min-[720px]:col-start-2", "min-[720px]:row-start-2 min-[720px]:col-start-1"];
const LINE = "border-lime/22";
const MONO = "font-mono uppercase";

/** Fills `{format}` / `{Format}` with the selected format's word. */
function withFormat(text, words, fmt) {
  const [lower, title] = words?.[fmt] ?? [fmt, fmt];
  return String(text ?? "").replaceAll("{format}", lower).replaceAll("{Format}", title);
}

/** A row holds one variant per format, per scale, or a single fixed one. */
function pickVariant(row, fmt, scale) {
  return row.find((v) => v.format === fmt) ?? row.find((v) => v.scale === scale) ?? row.find((v) => !v.format && !v.scale) ?? row[0];
}

/** Trusted static SVG markup from the design file. */
function Markup({ html, viewBox, className }) {
  return (
    <svg viewBox={viewBox} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" className={className} dangerouslySetInnerHTML={{ __html: html }} />
  );
}

/**
 * v2 · 9 How Edstellar delivers (the design's navy `#delivery`) — team
 * scale and delivery format chips, the six-stage journey as isometric
 * scenes on a 3 + 3 path, and the selected stage's panel, whose rows and
 * scenes change with the chosen format and scale. Then the three modes, the
 * customization note and the CTA.
 */
/**
 * The journey path, measured like the design's `layout()`: through each
 * scene's centre (55% down the scene), a 3 + 3 snake whose turn goes out to
 * the right, clear of every stage caption it passes, with rounded corners.
 * Re-measured on resize. `null` below 720px, where the CSS rail takes over.
 */
function useJourneyPath(journeyRef, sceneRefs, captionRefs) {
  const [path, setPath] = useState(null);

  const draw = useCallback(() => {
    const journey = journeyRef.current;
    if (!journey) return;
    const jr = journey.getBoundingClientRect();
    if (!jr.width) return;
    // Each scene's resting position: its offset inside its (untransformed)
    // stage button, so the selected/hover lift does not kink the line.
    const P = sceneRefs.current.filter(Boolean).map((el) => {
      const b = el.offsetParent.getBoundingClientRect();
      return [b.left - jr.left + el.offsetLeft + el.offsetWidth / 2, b.top - jr.top + el.offsetTop + el.offsetHeight * 0.55];
    });
    if (P.length < 2 || P.every((p) => Math.abs(p[0] - P[0][0]) < 4)) {
      setPath(null); // one column: the CSS rail is used instead
      return;
    }
    let d = `M${P[0][0]} ${P[0][1]}`;
    for (let i = 1; i < P.length; i++) {
      const a = P[i - 1];
      const q = P[i];
      if (Math.abs(q[1] - a[1]) > 8 && Math.abs(q[0] - a[0]) < 8) {
        // The turn: out to the right, down clear of the captions (16px gap),
        // and back in — never past the journey's own edge.
        const y0 = Math.min(a[1], q[1]);
        const y1 = Math.max(a[1], q[1]);
        let X = a[0] + Math.min(70, jr.width * 0.06) * 2.2 * 0.75;
        captionRefs.current.filter(Boolean).forEach((cap) => {
          const r = cap.getBoundingClientRect();
          const top = r.top - jr.top;
          const bot = r.bottom - jr.top;
          if (bot > y0 && top < y1 && r.right - jr.left > a[0] - 40) X = Math.max(X, r.right - jr.left + 16);
        });
        X = Math.min(X, jr.width - 3);
        const rr = Math.max(8, Math.min(90, (y1 - y0) / 2, X - Math.max(a[0], q[0])));
        d +=
          q[1] > a[1]
            ? ` L${X - rr} ${a[1]} A${rr} ${rr} 0 0 1 ${X} ${a[1] + rr} L${X} ${q[1] - rr} A${rr} ${rr} 0 0 1 ${X - rr} ${q[1]} L${q[0]} ${q[1]}`
            : ` L${X - rr} ${a[1]} A${rr} ${rr} 0 0 0 ${X} ${a[1] - rr} L${X} ${q[1] + rr} A${rr} ${rr} 0 0 0 ${X - rr} ${q[1]} L${q[0]} ${q[1]}`;
      } else {
        d += ` L${q[0]} ${q[1]}`;
      }
    }
    setPath({ box: `0 0 ${Math.round(jr.width)} ${Math.round(jr.height)}`, d });
  }, [journeyRef, sceneRefs, captionRefs]);

  useEffect(() => {
    draw();
    const journey = journeyRef.current;
    if (!journey || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => draw());
    ro.observe(journey);
    return () => ro.disconnect();
  }, [draw, journeyRef]);

  return path;
}

export default function V2Delivery({ data }) {
  const controls = data?.controls ?? {};
  const [scale, setScale] = useState(controls.scale?.default ?? "one");
  const [fmt, setFmt] = useState(controls.format?.default ?? "onsite");
  const [stage, setStage] = useState(4);
  const journeyRef = useRef(null);
  const sceneRefs = useRef([]);
  const captionRefs = useRef([]);
  const journeyPath = useJourneyPath(journeyRef, sceneRefs, captionRefs);

  // The lit line draws itself once, the first time the journey scrolls into
  // view (top at 75% of the viewport, as the design's onScreenOnce), with a
  // signal dot travelling its front (the design's `.dl-pl` + `.dl-sig`).
  const [drawn, setDrawn] = useState(false);
  const [signal, setSignal] = useState(false);
  const motionRef = useRef(null);
  useEffect(() => {
    const journey = journeyRef.current;
    if (!journey) return;
    if (typeof IntersectionObserver === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDrawn(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        setDrawn(true);
        setSignal(true);
      },
      { threshold: 0, rootMargin: "0px 0px -25% 0px" },
    );
    io.observe(journey);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!signal) return;
    const start = setTimeout(() => motionRef.current?.beginElement?.(), 200);
    const end = setTimeout(() => setSignal(false), 200 + 3800);
    return () => {
      clearTimeout(start);
      clearTimeout(end);
    };
  }, [signal]);
  if (!data?.stages?.length) return null;
  const { heading, lead, panel_kicker, panel_heading, format_titles = {}, scale_titles = {}, stages, modes = [], mode_keys = [], custom, cta, format_words } = data;
  // The panel heading follows the chips: `{format}` / `{scale}` in the JSON's
  // span-format heading are filled from `format_titles` / `scale_titles`.
  const panelHeading = String(panel_heading ?? "")
    .replace("{format}", format_titles[fmt] ?? fmt)
    .replace("{scale}", scale_titles[scale] ?? scale);

  const groups = [
    { key: "scale", value: scale, set: setScale, on: "border-white bg-white text-navy" },
    { key: "format", value: fmt, set: setFmt, on: "border-lime bg-lime text-navy" },
  ];

  function choose(key, value) {
    if (key === "format") {
      setFmt(value);
      setStage(4);
    } else {
      setScale(value);
      if (stage !== 1 && stage !== 4) setStage(1);
    }
  }

  function onStageKey(event, i) {
    const j = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: stages.length - 1 }[event.key];
    if (j === undefined) return;
    event.preventDefault();
    const k = (j + stages.length) % stages.length;
    setStage(k);
    event.currentTarget.parentElement?.querySelectorAll("button")[k]?.focus();
  }

  return (
    <V2Section id="delivery" tone="navy">
      <V2SectionHead
        heading={heading}
        lead={lead}
        headingClassName="text-white"
        leadClassName="text-white/72"
        emClassName="text-lime"
      />

      <Box className="mb-7 flex flex-wrap items-center gap-x-[26px] gap-y-3.5">
        {groups.map(({ key, value, on }, gi) =>
          controls[key] ? (
            <Box key={key} role="group" aria-label={controls[key].label} className={cn("flex flex-wrap items-center gap-2", gi > 0 && cn("border-l pl-[26px]", LINE))}>
              <span className={cn("mr-1.5 text-[10.5px] tracking-[0.14em] text-lime/65", MONO)}>{controls[key].label}</span>
              {controls[key].options.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  aria-pressed={value === o.value}
                  onClick={() => choose(key, o.value)}
                  className={cn(
                    "min-h-10 cursor-pointer rounded-full border px-[17px] py-[9px] text-[13.5px] font-medium transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(10,22,40,0.6)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-lime",
                    value === o.value ? on : cn("bg-transparent text-white", LINE),
                  )}
                >
                  {o.label}
                </button>
              ))}
            </Box>
          ) : null,
        )}
      </Box>

      <Box className="mb-[30px] grid gap-6 min-[1200px]:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] min-[1200px]:items-stretch">
        {/* The journey: six scenes on a 3 + 3 path */}
        <Box ref={journeyRef} data-scale={scale} data-fmt={fmt} className={cn(styles.journey, "relative min-w-0 min-[1200px]:flex min-[1200px]:flex-col")}>
          {journeyPath && (
            <svg viewBox={journeyPath.box} aria-hidden="true" focusable="false" className="pointer-events-none absolute inset-0 z-0 hidden size-full overflow-visible min-[720px]:block">
              {/* Base route: faint dotted line (the design's `.dl-pb`). */}
              <path d={journeyPath.d} className="fill-none stroke-lime/22 [stroke-dasharray:1_7] [stroke-linecap:round]" strokeWidth="2.5" />
              {/* Lit line: draws from Consult to Evaluate over 3.8s once in view (`.dl-pl`). */}
              <path
                d={journeyPath.d}
                pathLength="1"
                strokeWidth="2.6"
                className={cn(
                  "fill-none stroke-lime [stroke-dasharray:1_2] [stroke-linecap:round] [stroke-linejoin:round] [filter:drop-shadow(0_0_4px_color-mix(in_srgb,var(--color-lime)_65%,transparent))] transition-[stroke-dashoffset] delay-200 duration-[3800ms] ease-in-out motion-reduce:transition-none",
                  drawn ? "[stroke-dashoffset:0]" : "[stroke-dashoffset:1]",
                )}
              />
              {/* Signal dot riding the front of the line while it draws (`.dl-sig`). */}
              <g className={cn("transition-opacity duration-300", signal ? "opacity-100" : "opacity-0")}>
                <circle r="9" className="fill-lime opacity-[0.22]" />
                <circle r="4.5" className="fill-lime" />
                <animateMotion
                  ref={motionRef}
                  begin="indefinite"
                  dur="3.8s"
                  fill="freeze"
                  calcMode="spline"
                  keyTimes="0;1"
                  keyPoints="0;1"
                  keySplines="0.45 0 0.55 1"
                  path={journeyPath.d}
                />
              </g>
            </svg>
          )}
          <Box role="group" aria-label="Edstellar delivery journey: select a stage" className="relative z-[1] grid grid-cols-1 gap-[18px] before:absolute before:top-4 before:bottom-4 before:left-[16px] before:w-0.5 before:bg-lime/65 min-[720px]:grid-cols-3 min-[720px]:gap-x-[22px] min-[720px]:gap-y-[34px] min-[720px]:before:hidden min-[1200px]:flex-1 min-[1200px]:content-around">
            {stages.map((s, i) => {
              const on = stage === i;
              const scene = DELIVERY_SCENES[i];
              return (
                <button
                  key={s.number}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setStage(i)}
                  onKeyDown={(e) => onStageKey(e, i)}
                  className={cn("group relative grid min-w-0 cursor-pointer grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-1.5 rounded-2xl text-left focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-lime min-[720px]:flex min-[720px]:flex-col min-[720px]:items-start min-[720px]:gap-2", CELL[i])}
                >
                  <span className="col-span-2 flex items-center gap-2.5 font-display text-[16.5px] leading-[1.2] font-medium tracking-[-0.02em] text-white">
                    <b
                      className={cn(
                        "grid size-[34px] flex-none place-items-center rounded-full border font-mono text-[12px] font-medium transition-[background-color,color,box-shadow] duration-300",
                        on ? "border-lime bg-lime text-navy shadow-[0_0_0_3px_var(--color-navy),0_0_0_5px_var(--color-lime)]" : "border-lime-soft bg-lime-soft text-navy",
                      )}
                    >
                      {s.number}
                    </b>
                    {s.label}
                  </span>
                  {scene && (
                    <span
                      ref={(el) => {
                        sceneRefs.current[i] = el;
                      }}
                      className={cn(
                        styles.scene,
                        "relative ml-11 block aspect-[315/257] w-[118px] transition-transform min-[720px]:ml-0 min-[720px]:w-full duration-[400ms] group-hover:-translate-y-[3px] after:absolute after:inset-x-[10%] after:bottom-[4%] after:-z-[1] after:h-[30%] after:rounded-full after:bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--color-lime)_22%,transparent),transparent)] after:transition-opacity after:duration-[400ms]",
                        on ? "-translate-y-1.5 after:opacity-100" : "after:opacity-0",
                      )}
                    >
                      <svg viewBox={scene.viewBox} aria-hidden="true" focusable="false" dangerouslySetInnerHTML={{ __html: scene.markup }} />
                    </span>
                  )}
                  <span
                    ref={(el) => {
                      captionRefs.current[i] = el;
                    }}
                    className={cn(
                      "inline-flex max-w-full items-center gap-[7px] justify-self-start rounded-full border px-[11px] py-[5px] text-[12px] leading-[1.3] font-medium",
                      on ? "border-lime bg-lime text-navy" : cn("text-white", LINE),
                    )}
                  >
                    <i aria-hidden="true" className={cn("size-[7px] flex-none rounded-full", on ? "bg-navy" : "bg-lime/65")} />
                    {withFormat(s.caption, format_words, fmt)}
                  </span>
                </button>
              );
            })}
          </Box>
        </Box>

        {/* The selected stage */}
        <aside aria-label="Selected stage of the Edstellar delivery" className={cn("flex min-w-0 flex-col gap-1.5 rounded-[22px] border bg-navy-soft px-6 pt-6 pb-[18px]", LINE)}>
          <V2Heading
            parts={panelHeading}
            as="h3"
            className="text-[21px] leading-[1.25] font-medium tracking-[-0.02em] [text-wrap:balance] text-white"
            emClassName="font-display font-medium tracking-[-0.02em] not-italic text-lime"
          />
          {panel_kicker && (
            <p className={cn("mt-0.5 mb-2.5 border-b pb-3 text-[10.5px] font-medium tracking-[0.16em] text-lime/65", MONO, LINE)}>{panel_kicker}</p>
          )}
          {stages.map((s, i) => (
            <Box key={s.number} hidden={stage !== i} className="grid gap-2.5 pb-4 min-[720px]:max-[1199px]:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] min-[720px]:max-[1199px]:content-start min-[720px]:max-[1199px]:gap-x-8 min-[720px]:max-[1199px]:*:col-start-1">
              <Box className="flex flex-wrap items-center justify-between gap-x-2.5 gap-y-1.5">
                <span className={cn("text-[10.5px] tracking-[0.14em] text-lime", MONO)}>
                  Stage {s.number} of {String(stages.length).padStart(2, "0")} · {s.label}
                </span>
                <span className={cn("rounded-full bg-lime px-[9px] py-[3px] text-[10px] tracking-[0.12em] text-navy", MONO)}>
                  {SCALE_S[scale]} · {format_words?.[fmt]?.[1] ?? fmt}
                </span>
              </Box>
              <h4 className="font-display text-[19px] leading-[1.25] font-medium tracking-[-0.02em] text-white">{s.heading}</h4>
              <p className="text-[14.5px] text-white/72">{s.text}</p>
              {s.steps?.length > 0 && (
                <ol className="relative my-1 grid grid-cols-2 gap-x-1.5 gap-y-3 min-[720px]:grid-cols-4 min-[720px]:gap-y-1.5 min-[720px]:before:absolute min-[720px]:before:top-[5px] min-[720px]:before:right-[12%] min-[720px]:before:left-1 min-[720px]:before:border-t min-[720px]:before:border-dashed min-[720px]:before:border-lime/65">
                  {s.steps.map((m) => (
                    <li key={m.label} className="relative pt-4 text-[11.5px] leading-[1.35] text-white/72 before:absolute before:top-0 before:left-0 before:size-[11px] before:rounded-full before:bg-lime">
                      <b className="block text-[12.5px] font-semibold text-white">{m.label}</b>
                      {m.text}
                    </li>
                  ))}
                </ol>
              )}
              <ul className="mt-0.5 grid gap-3 min-[720px]:max-[1199px]:col-start-2! min-[720px]:max-[1199px]:row-span-7 min-[720px]:max-[1199px]:row-start-1 min-[720px]:max-[1199px]:self-start">
                {s.rows.map((row, r) => {
                  const v = pickVariant(row, fmt, scale);
                  return (
                    <li key={r} className="flex items-start gap-3">
                      {s.row_icons?.[r] && <Markup html={s.row_icons[r]} viewBox="0 0 24 24" className="mt-0.5 size-5 flex-none text-lime" />}
                      {/* Every variant (per format / per scale) is in the HTML so
                          crawlers see all of it; only the one matching the
                          selected chips shows. */}
                      {row.map((variant, vi) => (
                        <span key={vi} hidden={variant !== v} className="text-[14px] leading-[1.5] text-white/72">
                          <b className="mb-px block text-[14px] font-semibold text-white">{variant.label}</b>
                          {withFormat(variant.text, format_words, variant.format ?? fmt)}
                        </span>
                      ))}
                    </li>
                  );
                })}
              </ul>
              {s.benefits?.map((b) => (
                <p key={b.label} className={cn("border-t pt-2.5 text-[14.5px] text-white/72", LINE)}>
                  <b className={cn("mb-[3px] block text-[10px] font-medium tracking-[0.14em] text-lime/65", MONO)}>{b.label}</b>
                  {b.text}
                </p>
              ))}
            </Box>
          ))}
        </aside>
      </Box>

      {modes.length > 0 && (
        <Box className="grid gap-3 min-[720px]:grid-cols-2 lg:auto-cols-fr lg:grid-flow-col lg:grid-cols-none">
          {modes.map((m, i) => {
            const on = mode_keys[i] === fmt;
            return (
              <Reveal
                key={m.heading}
                delay={Math.min(i + 1, 4)}
                className={cn(
                  "rounded-2xl border p-[18px] transition-[transform,box-shadow] duration-200 hover:-translate-y-[3px] hover:shadow-[0_14px_30px_rgba(10,22,40,0.6)]",
                  on ? "border-lime shadow-[0_0_0_1px_var(--color-lime),0_0_24px_color-mix(in_srgb,var(--color-lime)_22%,transparent)]" : LINE,
                )}
              >
                {m.icon && <Markup html={m.icon} viewBox={m.icon_viewbox} className="mb-2 size-6 text-lime" />}
                <Text as="h3" className="mb-1.5 text-[16px] text-white">{m.heading}</Text>
                <p className={cn("mb-1.5 text-[10px] tracking-[0.12em] text-lime/65", MONO)}>{m.kicker}</p>
                <p className="text-[14px] text-white/72">{m.text}</p>
              </Reveal>
            );
          })}
        </Box>
      )}

      {custom?.heading && (
        <Reveal className="mt-[22px] max-w-[900px] border-l-[3px] border-lime py-1.5 pl-[18px]">
          <Text as="h3" className="mb-1.5 text-[17px] text-white">{custom.heading}</Text>
          <p className="text-[15px] text-white/72">{custom.text}</p>
        </Reveal>
      )}

      <V2CtaBand cta={cta} tone="dark" />
    </V2Section>
  );
}
