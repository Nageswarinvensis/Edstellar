"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import V2Section from "@/components/sections/course/v2/section";
import V2Heading from "@/components/sections/course/v2/heading";
import V2CtaBand from "@/components/sections/course/v2/cta-band";
import V2ScrollLink from "@/components/sections/course/v2/scroll-link";
import V2Icon from "@/components/sections/course/v2/icon";
import { cn } from "@/lib/utils";

const TABS = ["view", "practice", "take"];
const LIME_WASH = "bg-[color-mix(in_srgb,var(--color-lime)_20%,white)]";
const MONO = "font-mono uppercase tracking-[0.12em]";
const SHADOW_REST = "shadow-[0_1px_2px_rgba(10,22,40,0.06),0_8px_24px_rgba(10,22,40,0.06)]";
const SHADOW_LIFT = "shadow-[0_2px_4px_rgba(10,22,40,0.08),0_18px_40px_rgba(10,22,40,0.12)]";
/** Group colour keys, in order (the design's `.fx-gk i`). */
const GROUP_KEY = ["bg-lime", "bg-gold", "bg-gold/55"];
const SELECTED = cn("border-navy shadow-[0_0_0_2px_var(--color-lime-soft)]", LIME_WASH);

/**
 * The info line under a picker: muted until something is picked. Every
 * item's text is rendered (the unselected ones `hidden`) so it is all in the
 * page source for crawlers, not only the one a visitor clicked.
 */
function Info({ empty, items, sel, className }) {
  return (
    <Box aria-live="polite">
      <p hidden={sel >= 0} className={cn("rounded-[14px] border border-dashed border-ink/12 px-3.5 py-3 text-[13.5px] leading-[1.5] text-ink-muted", className)}>{empty}</p>
      {items.map((item, i) => (
        <Box key={i} hidden={sel !== i} className={cn("rounded-[14px] border border-ink/12 bg-white px-3.5 py-3 text-[13.5px] leading-[1.5] text-ink", className)}>
          <span className={cn("mb-[3px] block text-[9.5px] text-olive", MONO)}>{item.label}</span>
          <p className="text-[13px] leading-[1.5]">{item.text}</p>
        </Box>
      ))}
    </Box>
  );
}

function FrameworkView({ fx, hint }) {
  const [sel, setSel] = useState(-1);
  const parts = fx.view?.parts ?? [];
  return (
    <Box>
      <Box className={cn("rounded-[14px] border border-ink/12 bg-white px-4 py-3.5", SHADOW_LIFT)}>
        <Box className="mb-2.5 flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
          <p className="font-serif text-[21px] font-medium italic leading-[1.15] text-ink">{fx.heading || fx.title}</p>
          <span className={cn("rounded-md bg-paper-warm px-[7px] py-[3px] text-[9.5px] whitespace-nowrap text-ink-muted", MONO)}>Framework view</span>
        </Box>
        <Box className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {parts.map(([name, short], k) => (
            <button
              key={name}
              type="button"
              aria-pressed={sel === k}
              onClick={() => setSel(k)}
              className={cn(
                "cursor-pointer rounded-[10px] border px-[11px] py-[9px] text-left transition-[background-color,border-color,box-shadow] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive",
                sel === k ? SELECTED : "border-ink/12 bg-paper hover:border-ink/35",
              )}
            >
              <span className={cn("mb-[3px] block text-[9.5px] text-olive", MONO)}>{name}</span>
              <span className="block text-[12.5px] leading-[1.4] text-ink">{short}</span>
            </button>
          ))}
        </Box>
      </Box>
      <Info className="mt-2.5" empty={hint} sel={sel} items={parts.map(([label, , text]) => ({ label, text }))} />
    </Box>
  );
}

function PracticeView({ fx, hint }) {
  const [sel, setSel] = useState(-1);
  const p = fx.practice ?? {};
  return (
    <Box className="grid items-start gap-4 min-[761px]:grid-cols-[minmax(0,1fr)_214px]">
      <Box className="grid content-start gap-2.5">
        <p className="text-[13.5px] leading-[1.5] text-ink">
          <span className={cn("mb-[3px] flex items-center gap-1.5 text-[9.5px] text-olive", MONO)}>Sample exercise</span>
          {p.task}
        </p>
        <Box className={cn("rounded-[14px] border border-ink/12 bg-paper-bright px-4 py-3.5", SHADOW_REST)}>
          <p className="mb-1 flex items-center gap-2.5 border-b border-ink/12 pb-[11px] font-display text-[16px] font-medium text-ink">
            {p.title}
            <span className={cn("rounded-md bg-paper-warm px-[7px] py-[3px] text-[9.5px] text-ink-muted", MONO)}>Sample</span>
          </p>
          {p.steps?.map(([name, detail], k) => (
            <button
              key={name}
              type="button"
              aria-pressed={sel === k}
              onClick={() => setSel(k)}
              className={cn(
                "mt-1.5 grid w-full cursor-pointer grid-cols-[28px_1fr] gap-x-2.5 gap-y-px rounded-[10px] border px-[11px] py-2 text-left transition-[background-color,border-color,box-shadow] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive",
                sel === k ? SELECTED : "border-ink/12 bg-white hover:border-ink/35",
              )}
            >
              <i className="row-span-2 grid size-[26px] place-items-center rounded-full bg-lime-soft font-mono text-[12px] not-italic text-navy">{k + 1}</i>
              <b className="text-[14px] font-medium text-ink">{name}</b>
              <span className="text-[12.5px] leading-[1.4] text-ink-muted">{detail}</span>
            </button>
          ))}
        </Box>
      </Box>
      <Box className="grid content-start gap-2.5">
        {p.prompt && (
          <Box className={cn("rounded-xl border border-olive/35 px-3 py-2.5 text-[13px] leading-[1.45] text-ink", LIME_WASH)}>
            <span className={cn("mb-[3px] flex items-center gap-1.5 text-[9.5px] text-olive", MONO)}>Instructor prompt</span>
            {p.prompt}
          </Box>
        )}
        <Info empty={hint} sel={sel} items={(p.steps ?? []).map((step, i) => ({ label: `Step ${i + 1}`, text: step[1] }))} />
      </Box>
    </Box>
  );
}

function TakeawayView({ fx, hint }) {
  const [sel, setSel] = useState(-1);
  const t = fx.take ?? {};
  return (
    <Box className={cn("relative z-[1] mx-auto w-full max-w-[600px] rounded-[14px] border border-ink/12 bg-white px-4 py-3.5", SHADOW_LIFT)}>
      <span className={cn("block text-[9.5px] text-ink-muted", MONO)}>Takeaway tool · sample</span>
      <p className="mt-0.5 mb-2.5 font-serif text-[21px] font-medium italic leading-[1.15] text-ink">{t.title}</p>
      <Box className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {t.fields?.map(([name], k) => (
          <button
            key={name}
            type="button"
            aria-pressed={sel === k}
            onClick={() => setSel(k)}
            className={cn(
              "cursor-pointer rounded-[10px] border px-[11px] pt-2 pb-2.5 text-left transition-[background-color,border-color,box-shadow] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive",
              sel === k ? SELECTED : "border-dashed border-ink/28 bg-paper hover:border-ink/35",
            )}
          >
            <b className="block text-[13px] font-semibold text-ink">{name}</b>
            <i aria-hidden="true" className="mt-[7px] block h-1.5 w-[78%] rounded-[3px] bg-ink/10" />
            <i aria-hidden="true" className="mt-[5px] block h-1.5 w-[52%] rounded-[3px] bg-ink/10" />
          </button>
        ))}
      </Box>
      <Info className="mt-2.5 min-h-[62px]" empty={hint} sel={sel} items={(t.fields ?? []).map(([label, text]) => ({ label, text }))} />
      <p className="mt-2 text-[11.5px] italic text-ink-muted">A practice aid for the training, not a finished policy or certification.</p>
    </Box>
  );
}

/** Stagger for each wire's travelling dash (the design's `(i % 6) * 0.42s`). */
const WIRE_DELAY = [
  "[animation-delay:0s]",
  "[animation-delay:0.42s]",
  "[animation-delay:0.84s]",
  "[animation-delay:1.26s]",
  "[animation-delay:1.68s]",
  "[animation-delay:2.1s]",
];

/**
 * Wires from every visible tool tile to the hub: a soft S-curve, sideways
 * when the hub sits beside the grid, downwards when it sits below (phones).
 * Re-measured on filter change and on resize. Returns `{ d, i }` per tile.
 */
function useWires(stageRef, ringRef, tileRefs, filter) {
  const [box, setBox] = useState(null);
  const [wires, setWires] = useState([]);

  const draw = useCallback(() => {
    const stage = stageRef.current;
    const ring = ringRef.current;
    if (!stage || !ring) return;
    const r = stage.getBoundingClientRect();
    if (!r.width) return;
    const n = ring.getBoundingClientRect();
    const nx = n.left + n.width / 2 - r.left;
    const ny = n.top + n.height / 2 - r.top;
    const tiles = tileRefs.current.map((el, i) => ({ el, i })).filter(({ el }) => el && !el.hidden);
    const gridBottom = Math.max(...tiles.map(({ el }) => el.getBoundingClientRect().bottom));
    const below = n.top >= gridBottom - 1;
    setBox(`0 0 ${r.width} ${r.height}`);
    setWires(
      tiles.map(({ el, i }) => {
        const b = el.getBoundingClientRect();
        const sx = b.left + b.width / 2 - r.left;
        const sy = b.top + b.height / 2 - r.top;
        if (below) {
          const my = sy + (ny - sy) * 0.55;
          return { i, d: `M${sx} ${sy}C${sx} ${my} ${nx} ${my} ${nx} ${ny}` };
        }
        const mx = sx + (nx - sx) * 0.55;
        return { i, d: `M${sx} ${sy}C${mx} ${sy} ${mx} ${ny} ${nx} ${ny}` };
      }),
    );
  }, [stageRef, ringRef, tileRefs]);

  useEffect(() => {
    draw();
  }, [draw, filter]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => draw());
    ro.observe(stage);
    return () => ro.disconnect();
  }, [draw, stageRef]);

  return { box, wires };
}

/** "Tools in the labs": filter chips, the tool tiles, their wires and the pipeline hub. */
function ToolsPanel({ panel }) {
  const [filter, setFilter] = useState("all");
  const [tool, setTool] = useState(null);
  const [live, setLive] = useState(false);
  const stageRef = useRef(null);
  const ringRef = useRef(null);
  const tileRefs = useRef([]);
  const { box, wires } = useWires(stageRef, ringRef, tileRefs, filter);

  // The dash loops run only while the tools are on screen.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setLive(entry.isIntersecting), { threshold: 0.05 });
    io.observe(stage);
    return () => io.disconnect();
  }, []);

  if (!panel?.tools?.length) return null;
  const count = (g) => (g === "all" ? panel.tools.length : panel.tools.filter((t) => t.group === g).length);
  const summary = panel.filters.find((f) => f.value === filter)?.summary;
  const picked = tool === null ? null : panel.tools[tool];

  return (
    <Reveal
      id="aiTools"
      className={cn(
        "relative mt-10 min-w-0 overflow-hidden rounded-2xl border border-ink/12 bg-white p-[clamp(20px,3.4vw,36px)] text-ink before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(60%_70%_at_88%_50%,color-mix(in_srgb,var(--color-lime)_16%,transparent),transparent_70%)]",
        SHADOW_REST,
      )}
    >
      <Box className="relative max-w-[760px]">
        <Text as="h3" className="mb-2 text-[clamp(22px,2.4vw,28px)] leading-[1.2] tracking-[-0.02em]">{panel.heading}</Text>
        <Text className="text-[15.5px] leading-[1.55]">{panel.text}</Text>
      </Box>

      <Box role="group" aria-label="Filter tools by type" className="relative -mx-1 mt-[18px] mb-[18px] flex flex-nowrap gap-2 overflow-x-auto px-1 pt-0.5 pb-1.5 [scrollbar-width:none] min-[761px]:mx-0 min-[761px]:mt-5 min-[761px]:mb-[22px] min-[761px]:flex-wrap min-[761px]:overflow-visible min-[761px]:p-0">
        {panel.filters.map((f) => (
          <button
            key={f.value}
            type="button"
            aria-pressed={filter === f.value}
            onClick={() => {
              setFilter(f.value);
              setTool(null);
            }}
            className={cn(
              "inline-flex min-h-10 flex-none cursor-pointer items-center gap-2 rounded-full border px-3.5 py-2 font-body text-[14px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive",
              filter === f.value ? "border-navy bg-navy text-lime" : "border-ink/20 text-ink hover:border-olive",
            )}
          >
            {f.label}
            <span className="font-mono text-[11.5px] opacity-70">{count(f.value)}</span>
          </button>
        ))}
      </Box>

      <Box ref={stageRef} className="relative grid min-w-0 grid-cols-1 items-center gap-[22px] min-[761px]:grid-cols-[minmax(0,1fr)_230px] min-[761px]:gap-7">
        {/* Wires: tile → hub, with a lime dash travelling each one. Behind
            the tiles; decorative (the names and the readout carry meaning). */}
        {box && (
          <svg viewBox={box} aria-hidden="true" focusable="false" className="pointer-events-none absolute inset-0 z-0 size-full overflow-visible">
            {wires.map(({ d, i }) => (
              <path
                key={`l-${i}`}
                d={d}
                pathLength="100"
                className={cn("fill-none transition-[stroke] duration-200", tool === i ? "stroke-olive [stroke-width:1.5]" : "stroke-ink/14 [stroke-width:1]")}
              />
            ))}
            {wires.map(({ d, i }) => (
              <path
                key={`d-${i}-${filter}`}
                d={d}
                pathLength="100"
                className={cn(
                  "fill-none stroke-olive/85 [stroke-dasharray:6_200] [stroke-dashoffset:6] [stroke-linecap:round] [stroke-width:2] animate-wire-dash motion-reduce:hidden",
                  WIRE_DELAY[i % WIRE_DELAY.length],
                  !live && "[animation-play-state:paused]",
                )}
              />
            ))}
          </svg>
        )}
        <ul aria-label="Tools covered in the labs" className="relative z-[1] grid min-w-0 grid-cols-[repeat(auto-fill,minmax(92px,1fr))] gap-2 min-[761px]:grid-cols-[repeat(auto-fill,minmax(132px,1fr))] min-[761px]:gap-2.5">
          {panel.tools.map((t, i) => (
            <li
              key={t.name}
              ref={(el) => {
                tileRefs.current[i] = el;
              }}
              hidden={filter !== "all" && t.group !== filter}
              className="min-w-0"
            >
              {/* Re-keyed per filter so the tiles grow in when the filter changes. */}
              <Box key={filter} className="size-full animate-tool-in motion-reduce:animate-none">
              <button
                type="button"
                aria-pressed={tool === i}
                aria-label={`${t.name}, ${t.maker}. ${t.note}`}
                onClick={() => setTool(i)}
                className={cn(
                  "grid size-full cursor-pointer justify-items-center gap-1 rounded-xl border px-1 pt-3 pb-2.5 text-center transition-[transform,box-shadow,border-color,background-color] duration-200 min-[761px]:px-2 min-[761px]:pt-3.5 min-[761px]:pb-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive motion-reduce:transition-none",
                  tool === i ? cn("-translate-y-0.5 border-navy", LIME_WASH, SHADOW_LIFT) : "border-ink/12 bg-paper hover:-translate-y-0.5 hover:border-navy hover:bg-[color-mix(in_srgb,var(--color-lime)_20%,white)]",
                )}
              >
                {t.logo_paths ? (
                  <svg viewBox={t.logo_viewbox || "0 0 24 24"} className="mb-1 size-7 fill-navy" aria-hidden="true" focusable="false">
                    {t.logo_paths.map((d) => <path key={d.slice(0, 24)} d={d} />)}
                  </svg>
                ) : (
                  <span aria-hidden="true" className="mb-1 grid h-7 min-w-7 place-items-center rounded-[7px] border-[1.5px] border-navy px-1 font-mono text-[10.5px] font-medium tracking-[0.04em] text-navy">
                    {t.monogram}
                  </span>
                )}
                <span className="text-[12.5px] leading-[1.3] font-medium [overflow-wrap:anywhere] text-ink min-[761px]:text-[13.5px]">{t.name}</span>
                <span className="hidden text-[12px] [overflow-wrap:anywhere] text-ink-muted min-[761px]:block">{t.maker}</span>
              </button>
              </Box>
            </li>
          ))}
        </ul>

        <Box className="relative z-[1] grid justify-items-center gap-1.5 text-center">
          <span ref={ringRef} aria-hidden="true" className="grid size-[84px] place-items-center rounded-full border-[1.5px] border-lime bg-navy shadow-[0_0_0_8px_color-mix(in_srgb,var(--color-lime)_22%,transparent),0_0_32px_color-mix(in_srgb,var(--color-lime)_35%,transparent)]">
            <svg viewBox="0 0 32 32" className="size-[34px] fill-none stroke-lime" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 27V11l10-6 10 6v16" />
              <path d="M11 27V16h10v11" />
              <path d="M13 21.5l2.2 2.2L19.5 19" />
            </svg>
          </span>
          <p className="mt-1.5 font-display text-[16px] font-medium text-ink">{panel.hub?.title}</p>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-olive">{panel.hub?.steps}</p>
          <p aria-live="polite" className="mt-2 min-h-[4.6em] text-[14px] leading-[1.5] text-ink-muted">
            {picked ? (
              <>
                <b className="block font-semibold text-ink">{picked.name}</b>
                {picked.note}
              </>
            ) : (
              // Every filter's summary is in the HTML; only the current one shows.
              panel.filters.map((f) => (
                <span key={f.value} hidden={f.value !== filter}>{f.summary}</span>
              ))
            )}
          </p>
        </Box>
      </Box>
    </Reveal>
  );
}

/**
 * v2 · 6 Toolkit (the design's `#toolkit`) — the framework explorer:
 * frameworks grouped by area in a list card, each tied to its module, each
 * with three views (Framework view, Practice in training, Takeaway tool)
 * and a navy footer with what participants practise and the capability
 * they build. Every framework is in the HTML; picking one resets to its
 * Framework view; tabs never switch on their own. Then the CTA, the "Tools
 * in the labs" panel and the not-affiliated note.
 */
export default function V2Toolkit({ data }) {
  const [active, setActive] = useState(0);
  const [tab, setTab] = useState("view");
  if (!data?.frameworks?.length) return null;
  const { heading, lead, badge, list_label, note, kicker, tabs = {}, instructions = {}, groups = [], frameworks, cta, tools_panel, note_disclaimer } = data;

  let cursor = 0;
  const grouped = groups.map((g) => {
    const items = frameworks.slice(cursor, cursor + g.items).map((fx, k) => ({ fx, index: cursor + k }));
    cursor += g.items;
    return { label: g.label, items };
  });

  function pick(i) {
    setActive(i);
    setTab("view");
  }

  function onTabKey(event, i) {
    const j = { ArrowRight: i + 1, ArrowLeft: i - 1 }[event.key];
    if (j === undefined) return;
    event.preventDefault();
    const next = TABS[(j + TABS.length) % TABS.length];
    setTab(next);
    event.currentTarget.parentElement?.querySelector(`[data-t="${next}"]`)?.focus();
  }

  return (
    <V2Section id="toolkit">
      <Reveal className="mb-[30px] flex flex-wrap items-start justify-between gap-x-[30px] gap-y-4">
        <Box>
          <V2Heading parts={heading} className="mb-3" />
          {lead && <Text className="max-w-[720px] text-[16.5px] leading-[1.7]">{lead}</Text>}
        </Box>
        {badge && (
          <span className={cn("inline-flex items-center gap-2.5 rounded-full border border-olive/30 px-5 py-3 text-[14px] font-semibold text-ink min-[701px]:whitespace-nowrap", LIME_WASH)}>
            <V2Icon name="spark" size={16} />
            {badge}
          </span>
        )}
      </Reveal>

      <Box className="grid gap-6 lg:grid-cols-[minmax(270px,0.34fr)_minmax(0,1fr)] lg:items-start">
        <Box className="rounded-[20px] border border-ink/12 bg-white px-5 pt-[22px] pb-5">
          {list_label && <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink">{list_label}</p>}
          <Box role="group" aria-label="Frameworks">
            {grouped.map((group, gi) => (
              <Box key={group.label} className="mb-4 grid gap-2.5 border-b border-ink/12 pb-[18px] last:mb-0 last:border-b-0 last:pb-0">
                <p className={cn("flex items-center gap-2 text-[10.5px] text-ink-muted", MONO)}>
                  <i aria-hidden="true" className={cn("size-2.5 shrink-0 rounded-[3px]", GROUP_KEY[gi % GROUP_KEY.length])} />
                  {group.label}
                </p>
                {group.items.map(({ fx, index }) => (
                  <button
                    key={fx.title}
                    type="button"
                    aria-pressed={active === index}
                    onClick={() => pick(index)}
                    className={cn(
                      "grid cursor-pointer grid-cols-[28px_1fr_16px] items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition-[background-color,border-color,box-shadow] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive",
                      active === index ? cn("border-navy shadow-[inset_4px_0_0_var(--color-lime),0_1px_2px_rgba(10,22,40,0.06),0_8px_24px_rgba(10,22,40,0.06)]", LIME_WASH) : "border-ink/12 bg-white hover:border-ink/30",
                    )}
                  >
                    <span className="grid text-navy"><V2Icon name={fx.icon} size={24} strokeWidth={1.6} /></span>
                    <b className="text-[15px] leading-[1.35] font-medium text-ink">
                      {fx.title}
                      {group.items.length === 1 && <small className="mt-px block text-[12px] font-normal text-ink-muted">Module {fx.module_number}</small>}
                    </b>
                    <span className={cn("grid transition-[transform,color] duration-200", active === index ? "translate-x-0.5 text-navy" : "text-ink-muted")}>
                      <V2Icon name="chevron" size={16} strokeWidth={2} />
                    </span>
                  </button>
                ))}
              </Box>
            ))}
          </Box>
          {note && <Text className="mt-4 border-t border-ink/12 pt-3.5 text-[13px]">{note}</Text>}
        </Box>

        <Box className={cn("flex min-w-0 flex-col overflow-hidden rounded-[20px] border border-ink/12 bg-white", SHADOW_REST)}>
          {frameworks.map((fx, i) => (
            <Box key={fx.title} hidden={active !== i} className="flex flex-col">
              <Box className="px-4 py-[18px] min-[701px]:px-7 min-[701px]:pt-6 min-[701px]:pb-[22px]">
                <p className="flex items-center gap-3 text-ink-muted">
                  <span className={cn("text-[11px]", MONO)}>{kicker}</span>
                  <span className="rounded-full bg-lime-soft px-3 py-[3px] font-mono text-[12px] tracking-[0.06em] text-navy">Module {fx.module_number}</span>
                </p>
                <Text as="h3" className="mt-3 mb-1 text-[clamp(22px,2.3vw,30px)] leading-[1.2]">{fx.heading || fx.title}</Text>
                <Text className="mb-4 text-[15px]">{fx.subtitle}</Text>

                <Box role="tablist" aria-label="Framework preview" className="mb-3.5 flex gap-1.5 border-b border-ink/12 min-[561px]:gap-[clamp(10px,2.6vw,30px)]">
                  {TABS.map((t, n) => (
                    <button
                      key={t}
                      type="button"
                      role="tab"
                      data-t={t}
                      aria-selected={tab === t}
                      tabIndex={tab === t ? 0 : -1}
                      onClick={() => setTab(t)}
                      onKeyDown={(e) => onTabKey(e, n)}
                      className={cn(
                        "-mb-px flex-1 cursor-pointer border-b-[3px] px-0.5 pt-1.5 pb-2.5 text-center text-[13.5px] leading-[1.3] transition-colors hover:text-ink min-[561px]:flex-none min-[561px]:px-4 min-[561px]:pt-2 min-[561px]:pb-[11px] min-[561px]:text-[15px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive",
                        tab === t ? "border-lime font-semibold text-ink" : "border-transparent text-ink-muted",
                      )}
                    >
                      {tabs[t] || t}
                    </button>
                  ))}
                </Box>
                <p className="mb-3 min-h-[23px] text-[14px] text-ink-muted">{instructions[tab]}</p>

                <Box className="relative min-w-0 p-1.5 min-[561px]:min-h-[396px] -mx-1.5">
                  <Box role="tabpanel" hidden={tab !== "view"}><FrameworkView fx={fx} hint={instructions.view} /></Box>
                  <Box role="tabpanel" hidden={tab !== "practice"}><PracticeView fx={fx} hint={instructions.practice} /></Box>
                  <Box role="tabpanel" hidden={tab !== "take"}><TakeawayView fx={fx} hint={instructions.take} /></Box>
                </Box>
              </Box>

              <Box className="grid grid-cols-1 items-center gap-4 bg-navy px-4 py-[18px] text-white min-[701px]:px-7 min-[701px]:py-5 min-[861px]:grid-cols-[1fr_1fr_auto] min-[861px]:gap-6">
                {[
                  ["users", "What participants practise", fx.practice_summary],
                  ["bulb", "Capability they build", fx.capability],
                ].map(([icon, label, text]) => (
                  <Box key={label} className="grid grid-cols-[40px_1fr] items-start gap-3.5">
                    <span className="grid size-10 place-items-center rounded-full border-[1.5px] border-lime text-lime">
                      <V2Icon name={icon} size={18} />
                    </span>
                    <Box>
                      <span className={cn("mb-1 block text-[10px] text-white/60", MONO)}>{label}</span>
                      <p className="text-[14px] leading-[1.5] text-white min-[861px]:min-h-[4.5em]">{text}</p>
                    </Box>
                  </Box>
                ))}
                <V2ScrollLink href={`#mod-${fx.module_number}`} title={`Click here to view module ${fx.module_number}`} className="justify-self-start border-b border-lime pb-0.5 text-[14px] whitespace-nowrap text-lime">
                  View Module {fx.module_number} ↗
                </V2ScrollLink>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <V2CtaBand cta={cta} />
      <ToolsPanel panel={tools_panel} />
      {note_disclaimer && <Text className="mt-3.5 text-[12.5px]">{note_disclaimer}</Text>}
    </V2Section>
  );
}
