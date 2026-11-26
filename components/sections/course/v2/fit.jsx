"use client";

import { useState } from "react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import V2Section from "@/components/sections/course/v2/section";
import V2Heading from "@/components/sections/course/v2/heading";
import V2CtaBand from "@/components/sections/course/v2/cta-band";
import V2Icon from "@/components/sections/course/v2/icon";
import { cn } from "@/lib/utils";

const TABS = ["learn", "practice", "apply"];
const MONO = "font-mono uppercase tracking-[0.12em]";
const SHADOW_REST = "shadow-[0_1px_2px_rgba(10,22,40,0.06),0_8px_24px_rgba(10,22,40,0.06)]";
/** Where each staircase level's button sits over the art (% of the 600×440 drawing). */
const STEP_BOX = [
  "left-[1.333%] top-[65.4545%] h-[30%]",
  "left-[31.667%] top-[44.545%] h-[50.909%]",
  "left-[62%] top-[23.636%] h-[71.818%]",
];

/** The isometric staircase: three blocks rising left to right, the selected one lime. */
function Staircase({ selected }) {
  const front = (i) => (selected === i ? "fill-lime" : "fill-paper-warm");
  const top = (i) => (selected === i || selected === 3 ? "fill-lime-soft" : "fill-paper");
  const edge = "stroke-ink/22 [stroke-linejoin:round] transition-[fill] duration-300";
  return (
    <svg viewBox="0 0 600 440" aria-hidden="true" focusable="false" className="absolute inset-0 size-full overflow-visible">
      <defs>
        <filter id="wfBlur" x="-10%" y="-300%" width="120%" height="700%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>
      <ellipse cx="300" cy="426" rx="292" ry="11" className="fill-ink/12" filter="url(#wfBlur)" />
      <polygon className={cn(top(0), edge)} points="8,288 190,288 224,264 42,264" />
      <rect className={cn(front(0), edge)} x="8" y="288" width="182" height="132" />
      <polygon className={cn(top(1), edge)} points="190,196 372,196 406,172 224,172" />
      <rect className={cn(front(1), edge)} x="190" y="196" width="182" height="224" />
      <polygon className={cn(selected === 2 ? "fill-olive" : "fill-paper-cream", edge)} points="554,104 588,80 588,396 554,420" />
      <polygon className={cn(top(2), edge)} points="372,104 554,104 588,80 406,80" />
      <rect className={cn(front(2), edge)} x="372" y="104" width="182" height="316" />
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-navy">
        <ellipse cx="116" cy="275" rx="26" ry="5" className="fill-ink/9" stroke="none" />
        <g transform="translate(95.6,229) scale(1.7)">
          <circle cx="12" cy="6" r="2.6" /><circle cx="5.5" cy="8" r="2.2" /><circle cx="18.5" cy="8" r="2.2" />
          <path d="M7.5 20v-4.5a4.5 4.5 0 0 1 9 0V20M2 19v-3a3.5 3.5 0 0 1 5-3.2M22 19v-3a3.5 3.5 0 0 0-5-3.2" />
        </g>
        <ellipse cx="298" cy="183" rx="26" ry="5" className="fill-ink/9" stroke="none" />
        <g transform="translate(277.6,137) scale(1.7)">
          <path d="M12 23V12M12 12l-6-5M12 12l6-5" /><circle cx="12" cy="4" r="2.2" /><circle cx="5" cy="6" r="2.2" /><circle cx="19" cy="6" r="2.2" />
        </g>
        <ellipse cx="480" cy="91" rx="26" ry="5" className="fill-ink/9" stroke="none" />
        <g transform="translate(459.6,45) scale(1.7)">
          <circle cx="12" cy="11" r="8.5" /><path d="M15.5 7.5l-2 5.5-5.5 2 2-5.5z" fill="currentColor" /><path d="M12 19.5V24" />
        </g>
      </g>
    </svg>
  );
}

/** A side note (the design's `.wf-note`): mono label, title, text, hint. */
function Note({ label, title, text, hint }) {
  return (
    <Box aria-live="polite" className="rounded-xl border border-l-4 border-ink/12 border-l-lime bg-white px-4 py-3.5">
      <span className={cn("mb-1.5 block text-[10px] text-olive", MONO)}>{label}</span>
      <b className="mb-1.5 block font-display text-[15.5px] leading-[1.3] font-medium tracking-[-0.015em] text-ink">{title}</b>
      <p className="text-[13.5px] leading-[1.55] text-ink">{text}</p>
      {hint && <span className="mt-2.5 block text-[12px] text-ink-muted">{hint}</span>}
    </Box>
  );
}

/*
 * Entrance motion for the Learn / Practice / Apply views (the design's
 * wf-in / wf-pp / wf-gx / drw). CSS animations restart whenever a hidden
 * panel is shown, so each plays on every level or tab change, and on Replay
 * (which re-mounts the views). Delays are literal classes so Tailwind
 * generates them; reduced motion turns all of it off.
 */
const DELAY = {
  0: "[animation-delay:0ms]",
  60: "[animation-delay:60ms]",
  100: "[animation-delay:100ms]",
  200: "[animation-delay:200ms]",
  250: "[animation-delay:250ms]",
  300: "[animation-delay:300ms]",
  350: "[animation-delay:350ms]",
  380: "[animation-delay:380ms]",
  400: "[animation-delay:400ms]",
  450: "[animation-delay:450ms]",
  500: "[animation-delay:500ms]",
  550: "[animation-delay:550ms]",
  600: "[animation-delay:600ms]",
  650: "[animation-delay:650ms]",
  700: "[animation-delay:700ms]",
  750: "[animation-delay:750ms]",
  800: "[animation-delay:800ms]",
  850: "[animation-delay:850ms]",
  900: "[animation-delay:900ms]",
  950: "[animation-delay:950ms]",
  1000: "[animation-delay:1000ms]",
  1050: "[animation-delay:1050ms]",
  1100: "[animation-delay:1100ms]",
};
const IN = (ms) => cn("animate-lab-rise motion-reduce:animate-none", DELAY[ms]);
const PP = (ms) => cn("animate-pop-in motion-reduce:animate-none", DELAY[ms]);
const SVG_PP = (ms) => cn("[transform-box:fill-box] origin-center animate-pop-in motion-reduce:animate-none", DELAY[ms]);
const GX = (ms) => cn("[transform-box:fill-box] origin-left animate-grow-x motion-reduce:animate-none", DELAY[ms]);
const DRW = (ms) => cn("[stroke-dasharray:1] animate-line-draw motion-reduce:animate-none", DELAY[ms]);

/** Learn: the role at the root, three sample topics below it; the selected topic's note beside. */
function LearnView({ level, label, note }) {
  const [sel, setSel] = useState(0);
  const topics = level.learn.topics ?? [];
  const xs = [17.5, 50, 82.5];
  const LEFT = ["left-[17.5%]", "left-1/2", "left-[82.5%]"];
  return (
    <Box className="grid gap-3.5 @min-[500px]:grid-cols-[minmax(0,1.32fr)_minmax(0,1fr)] @min-[500px]:items-start">
      <Box className="min-w-0 rounded-[14px] border border-ink/8 bg-paper p-3.5">
        <Box className="relative aspect-[4/3]">
          <svg viewBox="0 0 400 300" aria-hidden="true" className="absolute inset-0 size-full overflow-visible">
            {xs.map((x, i) => (
              <path
                key={x}
                d={`M200 96C200 146 ${x * 4} 140 ${x * 4} 184`}
                pathLength="1"
                className={cn("fill-none transition-[stroke,stroke-width] duration-200", sel === i ? "stroke-navy [stroke-width:2.4]" : "stroke-ink/22 [stroke-width:1.6]", DRW([300, 400, 500][i]))}
              />
            ))}
          </svg>
          <span className={cn("absolute top-[20.67%] left-1/2 -mt-[29px] -ml-[29px] grid size-[58px] place-items-center rounded-full bg-navy text-lime shadow-[0_0_0_6px_color-mix(in_srgb,var(--color-lime)_22%,transparent)]", PP(60))}>
            <V2Icon name={level.icon} size={26} />
          </span>
          <span className={cn("absolute top-[20.67%] left-[calc(50%+37px)] max-w-[calc(50%-39px)] -translate-y-1/2 rounded-[10px] border border-ink/12 bg-white px-[9px] py-[3px] text-[11.5px] leading-[1.3] font-semibold text-ink", IN(200))}>
            {level.role}
          </span>
          {topics.map(([icon, title], i) => (
            <button
              key={title}
              type="button"
              aria-pressed={sel === i}
              onClick={() => setSel(i)}
              className={cn("absolute top-[61.33%] -ml-[15.5%] flex w-[31%] cursor-pointer flex-col items-center gap-1.5 text-center focus-visible:rounded-lg focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-olive", LEFT[i], PP([750, 850, 950][i]))}
              data-topic={i}
            >
              <span
                className={cn(
                  "grid size-11 place-items-center rounded-full border-[1.5px] text-navy transition-[background-color,border-color,box-shadow] duration-200",
                  sel === i ? "border-navy bg-lime shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-lime)_22%,transparent)]" : "border-ink/45 bg-white hover:border-navy",
                )}
              >
                <V2Icon name={icon} size={20} />
              </span>
              <span className="text-[11px] leading-[1.3] font-semibold text-ink @min-[300px]:text-[12px]">{title}</span>
            </button>
          ))}
        </Box>
        <span className={cn("mt-2.5 block text-[12px] leading-[1.45] text-ink-muted", IN(1000))}>{note}</span>
      </Box>
      {topics.map((topic, i) => (
        <Box key={i} hidden={sel !== i} className={IN(400)}>
          <Note label={label} title={topic[1]} text={topic[2]} hint="Select another topic icon to compare." />
        </Box>
      ))}
    </Box>
  );
}

/** The practice figure — one design per `kind` of exercise. */
function PracticeFigure({ practice }) {
  const f = practice.figure;
  if (!f) return null;

  if (practice.kind === "conv") {
    return (
      <Box className="grid gap-2.5">
        <p className={cn("max-w-[84%] rounded-[14px_14px_14px_4px] border border-ink/12 bg-white px-3.5 pt-2.5 pb-[11px] text-[13px] leading-[1.45] text-ink", IN(100))}>
          <span className={cn("mb-[3px] block text-[9.5px] text-ink-muted", MONO)}>{f.from}</span>
          {f.message}
        </p>
        <p className={cn("max-w-[84%] justify-self-end rounded-[14px_14px_4px_14px] border border-ink/22 bg-lime-soft px-3.5 pt-2.5 pb-[11px] text-[13px] leading-[1.45] text-ink", IN(380))}>
          <span className={cn("mb-[3px] block text-[9.5px] text-ink-muted", MONO)}>{f.response_label}</span>
          {f.response}
        </p>
        <Box className={cn("rounded-xl border border-dashed border-ink/22 bg-white px-2.5 pt-[9px] pb-[11px]", IN(600))}>
          <span className={cn("mb-3 block text-[9.5px] text-ink-muted", MONO)}>{f.flow_label}</span>
          <ol className="flex items-center gap-0.5">
            {f.flow.map((step, i) => (
              <li key={step} className={cn("flex min-w-0 flex-1 items-center gap-0.5", IN([700, 800, 900, 1000, 1100][i] ?? 1100))}>
                <span className={cn("min-w-0 flex-1 rounded-lg border px-1 py-[7px] text-center text-[11.5px] leading-[1.25] text-ink", i === f.flow_highlight ? "border-navy bg-white font-semibold" : "border-ink/12 bg-sand")}>
                  {step}
                </span>
                {i < f.flow.length - 1 && <V2Icon name="arrow" size={12} className="shrink-0 text-ink-muted" />}
              </li>
            ))}
          </ol>
        </Box>
      </Box>
    );
  }

  if (practice.kind === "matrix") {
    return (
      <Box className="relative aspect-[4/3]">
        <svg viewBox="0 0 400 300" aria-hidden="true" className="absolute inset-0 size-full overflow-visible">
          <path d="M227 34V250M70 142H376" className={cn("fill-none stroke-ink/22 [stroke-dasharray:4_4]", IN(400))} strokeWidth="1.2" />
          <path d="M70 26V250H384" pathLength="1" className={cn("fill-none stroke-navy", DRW(100))} strokeWidth="1.6" />
          <path d="M64 34l6-8 6 8M376 244l8 6-8 6" className={cn("fill-none stroke-navy", IN(600))} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
          {f.points.map((p, i) => {
            const x = p.x * 4;
            const y = p.y * 3;
            return (
              <g key={p.label} className={SVG_PP([650, 800, 950, 1100][i] ?? 1100)}>
                <circle cx={x} cy={y} r="17" className="fill-lime/65" />
                <circle cx={x} cy={y} r="13" className={i === 0 ? "fill-navy stroke-navy" : "fill-white stroke-navy"} strokeWidth="1.5" />
                <text x={x} y={y + 4} textAnchor="middle" className={cn("font-mono text-[12px] font-medium", i === 0 ? "fill-lime" : "fill-navy")}>{i + 1}</text>
                <text x={x} y={y + 31} textAnchor="middle" className="fill-ink font-body text-[11.5px] font-semibold">{p.label}</text>
              </g>
            );
          })}
        </svg>
        <span className={cn("absolute top-[6%] left-[9%] text-[11px] text-ink-muted", IN(300))}>{f.high}</span>
        <span className={cn("absolute top-[40%] left-0 w-[16%] text-[11px] leading-[1.25] font-semibold text-ink", IN(300))}>{f.y_axis}</span>
        <span className={cn("absolute top-[80%] left-[9%] text-[11px] text-ink-muted", IN(300))}>{f.low}</span>
        <span className={cn("absolute top-[86%] left-[17%] text-[11px] text-ink-muted", IN(300))}>{f.low}</span>
        <span className={cn("absolute top-[86%] left-[46%] text-[11px] font-semibold text-ink", IN(300))}>{f.x_axis}</span>
        <span className={cn("absolute top-[86%] right-0 text-[11px] text-ink-muted", IN(300))}>{f.high}</span>
      </Box>
    );
  }

  if (practice.kind === "invest") {
    return (
      <Box className="grid gap-2.5">
        {/* One card per option, stacked: its name, then one row per measure
            (label on the left, bar on the right). */}
        <Box className="grid grid-cols-1 gap-2">
          {f.options.map((o, i) => (
            <Box key={o.key} className={cn("relative grid grid-cols-1 gap-2 rounded-xl border bg-white px-3 py-2.5", i === 1 ? "border-navy" : "border-ink/12", IN([100, 250, 400][i] ?? 400))}>
              <Box className="min-w-0">
                <span className={cn("block text-[9.5px] text-ink-muted", MONO)}>{o.key}</span>
                <b className="mt-0.5 block text-[12.5px] leading-[1.3] text-ink">{o.label}</b>
              </Box>
              <Box className="grid min-w-0 gap-1.5 border-t border-ink/8 pt-2">
                {f.bars.map((bar, j) => (
                  <span key={bar} className={cn("grid grid-cols-[minmax(0,1fr)_42%] items-center gap-3 text-[11px] leading-[1.3]", j === 0 ? "font-semibold text-ink" : "text-ink-muted")}>
                    {bar}
                    <svg viewBox="0 0 100 6" preserveAspectRatio="none" className="block h-1.5 w-full rounded-full bg-ink/10" aria-hidden="true">
                      <rect width={o.values[j]} height="6" rx="3" className={cn(j === 0 ? "fill-navy" : "fill-olive", GX([500, 600, 700, 800][j] ?? 800))} />
                    </svg>
                  </span>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
        <Box className={cn("rounded-xl border border-dashed border-ink/22 bg-white px-2.5 py-2", IN(800))}>
          <span className={cn("mb-1.5 block text-[9.5px] text-ink-muted", MONO)}>{f.rehearse_label}</span>
          <Box className="flex flex-wrap gap-1.5">
            {f.rehearse.map((r) => (
              <span key={r} className="rounded-lg bg-sand px-2 py-1 text-[11.5px] text-ink">{r}</span>
            ))}
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box className="grid gap-2.5">
      <p className={cn("rounded-xl border border-ink/12 bg-white px-3 py-2.5 text-[13px] leading-[1.45] text-ink", IN(100))}>
        <span className={cn("mb-[3px] block text-[9.5px] text-ink-muted", MONO)}>{f.scenario_label}</span>
        {f.scenario}
      </p>
      <Box className="grid gap-2 border-l-2 border-lime pl-3">
        {f.lanes.map((lane, i) => (
          <p key={lane.role} className={cn("rounded-xl border px-3 py-2.5 text-[13px] leading-[1.45] text-ink", i === 0 ? "border-navy bg-lime-soft" : "border-ink/12 bg-white", IN([300, 450, 600, 750][i] ?? 750))}>
            <span className={cn("mb-[3px] block text-[9.5px] text-ink-muted", MONO)}>{lane.role}</span>
            {lane.text}
          </p>
        ))}
      </Box>
    </Box>
  );
}

function PracticeView({ level, kinds }) {
  const [sel, setSel] = useState(0);
  const practice = level.practice;
  return (
    <Box className="grid gap-3.5 @min-[500px]:grid-cols-[minmax(0,1.32fr)_minmax(0,1fr)] @min-[500px]:items-start">
      <Box className="min-w-0 rounded-[14px] border border-ink/8 bg-paper p-3.5">
        <PracticeFigure practice={practice} />
        <span className={cn("mt-2.5 block text-[12px] leading-[1.45] text-ink-muted", IN(1000))}>{practice.note}</span>
      </Box>
      <Box className="grid content-start gap-2.5">
        {practice.hints?.map((h, i) => (
          <button
            key={h}
            type="button"
            aria-pressed={sel === i}
            onClick={() => setSel(i)}
            className={cn(
              "grid cursor-pointer grid-cols-[22px_1fr] items-start gap-2.5 rounded-xl border px-[13px] py-[11px] text-left transition-[border-color,background-color] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive",
              sel === i ? cn("border-navy shadow-[0_0_0_2px_var(--color-lime-soft)]", i === 1 ? "bg-paper" : "bg-lime-soft") : cn("border-ink/12", i === 0 ? "bg-white" : "bg-paper"),
              IN([200, 350, 500][i] ?? 500),
            )}
          >
            <span className="grid size-[22px] place-items-center rounded-full bg-navy font-mono text-[11px] text-lime">{i + 1}</span>
            <span>
              <span className={cn("mt-[3px] mb-1 block text-[10px]", MONO, sel === i ? (i === 1 ? "text-navy" : "text-olive") : "text-ink-muted")}>{kinds?.[i]}</span>
              <span className="block text-[13.5px] leading-[1.5] text-ink">{h}</span>
            </span>
          </button>
        ))}
      </Box>
    </Box>
  );
}

/** Apply: a sample page of the team playbook, its headings selectable; the note beside. */
function ApplyView({ level, label, bookLabel, badge, note }) {
  const [sel, setSel] = useState(0);
  const heads = level.apply.headings ?? [];
  const widths = [["w-[calc(88%-31px)]", "w-[calc(64%-31px)]"], ["w-[calc(80%-31px)]", "w-[calc(52%-31px)]"], ["w-[calc(92%-31px)]", "w-[calc(58%-31px)]"]];
  return (
    <Box className="grid gap-3.5 @min-[500px]:grid-cols-[minmax(0,1.32fr)_minmax(0,1fr)] @min-[500px]:items-start">
      <Box className="min-w-0 rounded-[14px] border border-ink/8 bg-paper p-3.5">
        <Box className={cn("rounded-xl border border-ink/12 bg-white px-4 py-3.5", SHADOW_REST, IN(60))}>
          <Box className="mb-1.5 flex flex-wrap items-center justify-between gap-2">
            <span className={cn("text-[9.5px] text-ink-muted", MONO)}>{bookLabel}</span>
            <span className="rounded-md bg-lime-soft px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.1em] text-navy">{badge}</span>
          </Box>
          <b className="mb-2 block font-serif text-[20px] font-medium italic text-ink">{level.apply.book}</b>
          {heads.map(([h], i) => (
            <Box key={h} className={cn("mb-2", IN([300, 450, 600][i] ?? 600))}>
              <button
                type="button"
                aria-pressed={sel === i}
                onClick={() => setSel(i)}
                className={cn(
                  "flex w-full cursor-pointer items-center gap-2 rounded-lg px-1.5 py-1 text-left text-[13.5px] font-semibold text-ink transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive",
                  sel === i ? "bg-lime-soft" : "hover:bg-paper",
                )}
              >
                <span className="grid size-[22px] flex-none place-items-center rounded-full bg-navy font-mono text-[11px] text-lime">{i + 1}</span>
                {h}
              </button>
              {(widths[i] ?? widths[0]).map((w) => (
                <span key={w} aria-hidden="true" className={cn("mt-1.5 ml-[31px] block h-1.5 rounded-[3px] bg-ink/10", w, GX([450, 600, 750][i] ?? 750))} />
              ))}
            </Box>
          ))}
        </Box>
        <span className={cn("mt-2.5 block text-[12px] leading-[1.45] text-ink-muted", IN(1000))}>{note}</span>
      </Box>
      {heads.map((head, i) => (
        <Box key={i} hidden={sel !== i} className={IN(400)}>
          <Note label={label} title={head[0]} text={head[1]} hint="Select another heading to compare." />
        </Box>
      ))}
    </Box>
  );
}

/**
 * v2 · 7b Where it fits (the design's `#fit`) — pick a level of data quality
 * ownership on the staircase (step height reflects scope) or the mixed-team
 * cohort, and see how the program is adapted: Learn (sample topics),
 * Practice (a sample exercise with the participant, peer and instructor
 * questions) and Apply (a page of the team playbook). Every level and view
 * is in the HTML. Then the three closing points and the CTA.
 */
export default function V2Fit({ data }) {
  const [level, setLevel] = useState(data?.default_level ?? 0);
  const [tab, setTab] = useState(data?.default_tab ?? "learn");
  const [round, setRound] = useState(0);
  if (!data?.levels?.length) return null;
  const { heading, lead, select_label, scale_note, selected_label, tabs = {}, levels, hint_kinds, learn_note, apply_note, learn_label, apply_label, apply_book_label, apply_badge, capability_label, sample_note, close = [], cta } = data;
  // Only the tabs the levels carry: a course without "apply" playbooks shows
  // Learn and Practice.
  const tabList = TABS.filter((t) => levels.some((l) => l[t]));
  const steps = levels.slice(0, 3);
  const mixed = levels[3];

  function pick(i) {
    setLevel(i);
    setTab("learn");
  }

  function onTabKey(event, i) {
    const j = { ArrowRight: i + 1, ArrowLeft: i - 1 }[event.key];
    if (j === undefined) return;
    event.preventDefault();
    const next = tabList[(j + tabList.length) % tabList.length];
    setTab(next);
    event.currentTarget.parentElement?.querySelector(`[data-t="${next}"]`)?.focus();
  }

  const levelButton = (l, i, className) => (
    <button
      key={l.name}
      type="button"
      aria-pressed={level === i}
      onClick={() => pick(i)}
      className={className(level === i)}
    >
      <span className="grid place-items-center text-navy"><V2Icon name={l.icon} size={22} /></span>
      <span>
        <b className="block font-display text-[16px] leading-[1.3] font-medium tracking-[-0.02em] text-ink">{l.name}</b>
        <small className="block text-[13px] text-ink-muted">{l.subtitle}</small>
      </span>
      <span className="grid text-ink-muted"><V2Icon name="chevron" size={16} strokeWidth={2} /></span>
    </button>
  );
  const rowClass = (on) =>
    cn(
      "grid w-full cursor-pointer grid-cols-[40px_1fr_16px] items-center gap-3.5 rounded-[14px] border px-[18px] py-3.5 text-left transition-[background-color,border-color,box-shadow] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive",
      on ? cn("border-navy bg-lime-soft shadow-[inset_4px_0_0_var(--color-lime)]", SHADOW_REST) : "border-ink/12 bg-white hover:border-ink/45",
    );

  return (
    <V2Section id="fit">
      <Reveal className="mb-[30px] max-w-[820px]">
        <V2Heading parts={heading} className="mb-3" />
        {lead && <Text className="max-w-[780px] text-[16.5px] leading-[1.7]">{lead}</Text>}
      </Reveal>

      <Box className="grid gap-[26px] min-[900px]:grid-cols-[minmax(0,42fr)_minmax(0,58fr)] min-[900px]:items-start min-[900px]:gap-[clamp(24px,3vw,44px)]">
        <Box className="min-w-0">
          {select_label && <Text as="h3" className="mt-1.5 mb-3.5 text-[clamp(20px,1.9vw,25px)] min-[900px]:mb-5">{select_label}</Text>}

          {/* Desktop: the staircase */}
          <Box role="group" aria-label={select_label} className="hidden min-[900px]:block">
            <Box className="@container relative aspect-[600/440]">
              <Staircase selected={level} />
              {steps.map((l, i) => (
                <button
                  key={l.name}
                  type="button"
                  aria-pressed={level === i}
                  onClick={() => pick(i)}
                  className={cn(
                    "absolute flex w-[30.333%] cursor-pointer flex-col gap-[3px] pt-[clamp(8px,2.2cqw,14px)] pr-[clamp(14px,3.8cqw,24px)] pb-1.5 pl-[clamp(8px,2.2cqw,14px)] text-left focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-olive",
                    STEP_BOX[i],
                  )}
                >
                  <b className="font-display text-[clamp(12.5px,2.9cqw,16px)] leading-[1.2] font-semibold tracking-[-0.02em] text-ink">{l.name}</b>
                  <small className="text-[clamp(11px,2.25cqw,13px)] leading-[1.3] text-ink/60">{l.subtitle}</small>
                  <i
                    aria-hidden="true"
                    className={cn(
                      "absolute top-[clamp(9px,2.6cqw,16px)] right-[clamp(6px,1.8cqw,11px)] size-[11px] rounded-full bg-navy shadow-[0_0_0_3px_white] transition-[opacity,scale] duration-200",
                      level === i ? "scale-100 opacity-100" : "scale-40 opacity-0",
                    )}
                  />
                </button>
              ))}
            </Box>
            {scale_note && <Text className="mt-3 mb-4 text-[13.5px]">{scale_note}</Text>}
            {mixed && levelButton(mixed, 3, rowClass)}
          </Box>

          {/* Phones and tablets: the same four options, stacked */}
          <Box role="group" aria-label={select_label} className="grid gap-2.5 min-[900px]:hidden">
            {levels.map((l, i) => levelButton(l, i, rowClass))}
          </Box>
        </Box>

        <Box className="flex min-w-0 flex-col overflow-hidden rounded-[20px] border-[1.5px] border-navy bg-white shadow-[0_2px_4px_rgba(10,22,40,0.08),0_18px_40px_rgba(10,22,40,0.12)]">
          {levels.map((l, i) => (
            <Box key={l.name} hidden={level !== i} className="flex flex-col">
              <Box className="px-4 pt-[18px] pb-4 min-[701px]:px-7 min-[701px]:pt-6 min-[701px]:pb-5">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-olive">{selected_label}</span>
                <Box className="mb-3.5">
                  <Text as="h3" className="mt-2.5 mb-1 text-[clamp(19px,1.9vw,25px)] leading-[1.25]">{l.heading}</Text>
                  <Text className="text-[14.5px]">{l.description}</Text>
                </Box>

                <Box role="tablist" aria-label="Learning preview" className="mb-4 flex gap-[clamp(6px,2.2vw,26px)] border-b border-ink/12">
                  {tabList.map((t, n) => (
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
                        "-mb-px cursor-pointer border-b-[3px] px-4 pt-2 pb-[11px] text-center text-[15px] transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive",
                        tab === t ? "border-lime font-semibold text-ink" : "border-transparent text-ink-muted",
                      )}
                    >
                      {tabs[t] || t}
                    </button>
                  ))}
                </Box>

                <Box key={round} className="@container relative">
                  {tabList.map((t) => (
                    <Box key={t} role="tabpanel" hidden={tab !== t}>
                      <Text as="h4" className="mb-1.5 text-[18px] leading-[1.3]">{l[t]?.heading}</Text>
                      <Text className="mb-3.5 text-[14.5px] leading-[1.6]">{l[t]?.description}</Text>
                      {t === "learn" && <LearnView level={l} label={learn_label} note={learn_note} />}
                      {t === "practice" && <PracticeView level={l} kinds={hint_kinds} />}
                      {t === "apply" && <ApplyView level={l} label={apply_label} bookLabel={apply_book_label} badge={apply_badge} note={apply_note} />}
                    </Box>
                  ))}
                </Box>
              </Box>

              {l.capability && (
                <Box className="grid grid-cols-[40px_1fr] items-start gap-3.5 bg-navy px-4 py-4 text-white min-[701px]:px-7 min-[701px]:py-[18px]">
                  <span className="grid size-10 place-items-center rounded-full border-[1.5px] border-lime text-lime">
                    <V2Icon name="sprout" size={20} strokeWidth={1.8} />
                  </span>
                  <Box>
                    <span className={cn("mb-1 block text-[10px] text-white/72", MONO)}>{capability_label}</span>
                    <p className="text-[14.5px] leading-[1.5] text-white">{l.capability}</p>
                  </Box>
                </Box>
              )}
              <Box className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-ink/12 bg-sand px-4 py-3 min-[701px]:px-7">
                <span className={cn("text-[10px] text-ink-muted", MONO)}>{sample_note}</span>
                <button
                  type="button"
                  onClick={() => setRound((r) => r + 1)}
                  className="inline-flex cursor-pointer items-center gap-1.5 text-[13.5px] font-semibold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive"
                >
                  Replay preview
                  <V2Icon name="replay" size={16} strokeWidth={2} />
                </button>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {close.length > 0 && (
        <ul className="mt-[34px] grid gap-4 border-y border-ink/12 py-[22px] min-[900px]:grid-cols-3 min-[900px]:gap-0">
          {close.map((c, i) => (
            <li key={c.title} className={cn("flex items-start gap-3.5 min-[900px]:px-6 min-[900px]:first:pl-0", i > 0 && "min-[900px]:border-l min-[900px]:border-ink/12")}>
              <span aria-hidden="true" className="grid size-11 flex-none place-items-center rounded-full bg-paper-warm text-navy">
                <V2Icon name={c.icon} size={22} />
              </span>
              <span>
                <b className="block font-display text-[15.5px] font-medium text-ink">{c.title}</b>
                <span className="text-[13.5px] text-ink-muted">{c.text}</span>
              </span>
            </li>
          ))}
        </ul>
      )}

      <V2CtaBand cta={cta} />
    </V2Section>
  );
}
