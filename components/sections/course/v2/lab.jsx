"use client";

import { useState } from "react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import V2Section from "@/components/sections/course/v2/section";
import { V2Eyebrow } from "@/components/sections/course/v2/section-head";
import V2Heading from "@/components/sections/course/v2/heading";
import V2CtaBand from "@/components/sections/course/v2/cta-band";
import V2ScrollLink from "@/components/sections/course/v2/scroll-link";
import V2Icon from "@/components/sections/course/v2/icon";
import { cn } from "@/lib/utils";

const TABS = ["practice", "discuss", "reflect"];
/** The pale lime the design uses for selected items and prompts. */
const LIME_WASH = "bg-[color-mix(in_srgb,var(--color-lime)_20%,white)]";
const MONO = "font-mono uppercase tracking-[0.12em]";
const STEP_ICONS = ["book", "users", "chat", "file"];
/** Each tab's format badge uses its activity's icon from the strip below:
 * Practice → people, Discuss (compare) → chat, Reflect → document. */
const TAB_ICONS = { practice: "users", discuss: "chat", reflect: "file" };

function Prompt({ text, className }) {
  return (
    <Box className={cn("rounded-xl border border-olive/35 px-3 py-2.5 text-[13px] leading-[1.45] text-ink", LIME_WASH, className)}>
      <span className={cn("mb-1 flex items-center gap-1.5 text-[9.5px] text-olive", MONO)}>
        <V2Icon name="bulb" size={12} />
        Instructor prompt
      </span>
      {text}
    </Box>
  );
}

/** Practice: the fictional case, then choices that each reveal a question to practise. */
function PracticeStage({ scenario }) {
  const [choice, setChoice] = useState(-1);
  return (
    <Box>
      {scenario.case && (
        <figure className="rounded-xl border border-l-4 border-ink/12 border-l-gold bg-white px-4 py-3.5 shadow-[0_1px_2px_rgba(10,22,40,0.06),0_8px_24px_rgba(10,22,40,0.06)]">
          <span className={cn("block text-[9.5px] text-ink-muted", MONO)}>{scenario.case.tag}</span>
          <blockquote className="mt-1.5 mb-1 font-serif text-[21px] italic leading-[1.28] text-ink">{scenario.case.quote}</blockquote>
          <figcaption className="text-[12px] text-ink-muted">{scenario.case.source}</figcaption>
        </figure>
      )}
      <Box className="mt-3.5 flex flex-wrap gap-2">
        {scenario.choices?.map((c, i) => (
          <button
            key={c.label}
            type="button"
            aria-pressed={choice === i}
            onClick={() => setChoice(i)}
            className={cn(
              "inline-flex items-center gap-[7px] rounded-[10px] border px-[11px] py-2 text-left text-[12.5px] leading-[1.3] text-ink transition-[background-color,border-color,box-shadow] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive",
              choice === i ? cn("border-navy shadow-[0_0_0_2px_var(--color-lime-soft)]", LIME_WASH) : "border-ink/12 bg-white hover:border-ink/35",
            )}
          >
            {c.label}
          </button>
        ))}
      </Box>
      <Box aria-live="polite">
        <p hidden={choice >= 0} className="mt-3 min-h-[62px] rounded-xl border border-dashed border-ink/12 px-[13px] py-[11px] text-[13.5px] leading-[1.5] text-ink-muted">
          Select a choice to see the question to practise.
        </p>
        {/* Every choice's question is in the HTML; only the picked one shows. */}
        {scenario.choices?.map((c, i) => (
          <p key={c.label} hidden={choice !== i} className="mt-3 min-h-[62px] rounded-xl border border-ink/12 bg-white px-[13px] py-[11px] text-[13.5px] leading-[1.5] text-ink">
            <span className={cn("mb-0.5 block text-[9.5px] text-olive", MONO)}>Question to practise · {c.label}</span>
            {c.question}
          </p>
        ))}
      </Box>
    </Box>
  );
}

/** The lab stage's entrance (design `lrv`): items fade up in turn. Replay
 * re-mounts the stage, which restarts it. Delays are literal classes so
 * Tailwind generates them. */
const RISE = "animate-lab-rise motion-reduce:animate-none";
const DELAY = [
  "[animation-delay:0ms]",
  "[animation-delay:120ms]",
  "[animation-delay:240ms]",
  "[animation-delay:360ms]",
  "[animation-delay:480ms]",
  "[animation-delay:600ms]",
  "[animation-delay:720ms]",
];
const rise = (step) => cn(RISE, DELAY[Math.min(step, DELAY.length - 1)]);

/** Discuss: two contrasting readings, "vs", and the instructor's prompt. */
function DiscussStage({ scenario }) {
  const [a, b] = scenario.readings ?? [];
  const Reading = ({ r, step }) => (
    <Box className={cn("flex h-full flex-col rounded-xl border border-ink/12 bg-white p-3", rise(step))}>
      <span className={cn("block text-[9.5px] text-ink-muted", MONO)}>{r.label}</span>
      <b className="mt-1 mb-2.5 block text-[14px] leading-[1.35] text-ink">{r.claim}</b>
      {/* Assumptions: soft cards, not pills — the sentences wrap, and a pill
          shape breaks on two or three lines. */}
      <ul className="flex flex-col gap-1.5">
        {r.assumptions?.map((x) => (
          <li
            key={x}
            className="flex items-start gap-2 rounded-lg bg-lime-soft px-2.5 py-[7px] text-[12.5px] leading-[1.4] text-ink before:mt-[0.45em] before:size-1.5 before:flex-none before:rounded-full before:bg-olive before:content-['']"
          >
            {x}
          </li>
        ))}
      </ul>
    </Box>
  );
  return (
    <Box>
      {a && b && (
        <Box className="grid grid-cols-1 items-stretch gap-2.5 min-[561px]:grid-cols-[1fr_auto_1fr]">
          <Reading r={a} step={0} />
          <span className={cn("self-center justify-self-center font-mono text-[11px] text-ink-muted", rise(1))}>vs</span>
          <Reading r={b} step={2} />
        </Box>
      )}
      {scenario.prompt && <Prompt text={scenario.prompt} className={cn("mt-3", rise(3))} />}
    </Box>
  );
}

/** Reflect: the practice worksheet — notes stay on this page, never saved or sent. */
function ReflectStage({ scenario, index }) {
  const sheet = scenario.sheet;
  if (!sheet) return null;
  return (
    <Box>
      <Box className={cn("grid gap-[9px] rounded-[14px] border border-ink/12 bg-white px-4 py-3.5 shadow-[0_2px_4px_rgba(10,22,40,0.08),0_18px_40px_rgba(10,22,40,0.12)]", rise(0))}>
        <span className={cn("text-[9.5px] text-ink-muted", MONO)}>Practice worksheet · sample</span>
        <p className="font-serif text-[20px] font-medium italic text-ink">{sheet.title}</p>
        {sheet.rows?.map(([label, hint], i) => (
          <label key={label} className={cn("block border-t border-ink/8 pt-2", rise(i + 1))}>
            <b className="block text-[13px] text-ink">{label}</b>
            <span className="block text-[12px] text-ink-muted">{hint}</span>
            <textarea
              rows={1}
              name={`lab-${index}-${i}`}
              aria-label={`${label}: your notes`}
              placeholder="Your notes"
              className="mt-[5px] block min-h-8 w-full resize-y rounded-lg border border-dashed border-ink/25 bg-paper px-2 py-1.5 text-[12.5px] text-ink"
            />
          </label>
        ))}
      </Box>
      <p className={cn("mt-0.5 text-[11.5px] italic text-ink-muted", rise((sheet.rows?.length ?? 0) + 1))}>{scenario.reflect?.[1]}</p>
    </Box>
  );
}

/**
 * v2 · 2b Learning through practice (the design's `#lab`) — the scenario
 * lab: a list of practice scenarios; each opens a lab card with Practice /
 * Discuss / Reflect activities and a navy capability footer. Every
 * scenario and activity is in the HTML (crawlable); selection only toggles
 * which one shows. Tabs never switch on their own; picking a scenario
 * resets to Practice. Then the Learn → Practice → Compare → Reflect strip.
 */
export default function V2Lab({ data }) {
  const [active, setActive] = useState(0);
  const [tab, setTab] = useState("practice");
  const [round, setRound] = useState(0);
  if (!data?.scenarios?.length) return null;
  const { eyebrow, heading, lead, badge, list_label, note, lab_kicker, tabs = {}, task_keys = {}, scenarios, steps = [], cta } = data;

  function pick(i) {
    setActive(i);
    setTab("practice");
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
    <V2Section id="lab">
      <Reveal className="mb-[30px] flex flex-wrap items-start justify-between gap-x-[30px] gap-y-4">
        <Box>
          <V2Eyebrow>{eyebrow}</V2Eyebrow>
          <V2Heading parts={heading} className="mb-3" />
          {lead && <Text className="max-w-[720px] text-[16.5px] leading-[1.7]">{lead}</Text>}
        </Box>
        {badge && (
          <span className={cn("inline-flex items-center gap-2.5 rounded-full border border-olive/30 px-5 py-3 text-[14px] font-semibold whitespace-nowrap text-ink", LIME_WASH)}>
            <V2Icon name="book" size={18} />
            {badge}
          </span>
        )}
      </Reveal>

      <Box className="grid gap-6 lg:grid-cols-[minmax(250px,0.4fr)_minmax(0,1fr)] lg:items-start lg:gap-7">
        <Box>
          {list_label && <p className={cn("mb-3.5 text-[11px] text-ink", MONO)}>{list_label}</p>}
          <Box role="list" aria-label="Practice scenarios" className="grid gap-3">
            {scenarios.map((s, i) => (
              <button
                key={s.short_title}
                type="button"
                role="listitem"
                aria-pressed={active === i}
                onClick={() => pick(i)}
                className={cn(
                  "grid cursor-pointer grid-cols-[34px_24px_1fr] items-center gap-2.5 rounded-[14px] border px-[18px] py-4 text-left transition-[background-color,border-color,box-shadow] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive",
                  active === i
                    ? cn("border-navy shadow-[inset_4px_0_0_var(--color-lime),0_1px_2px_rgba(10,22,40,0.06),0_8px_24px_rgba(10,22,40,0.06)]", LIME_WASH)
                    : "border-ink/12 bg-white hover:border-ink/30",
                )}
              >
                <span className="grid text-navy"><V2Icon name={s.icon} size={28} /></span>
                <span className="self-start pt-0.5 font-mono text-[13px] text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <b className="block font-display text-[16px] font-medium tracking-[-0.015em] text-ink">{s.short_title}</b>
                  <span className="mt-0.5 block text-[13.5px] text-ink-muted">{s.summary}</span>
                </span>
              </button>
            ))}
          </Box>
          {note && <Text className="mt-[18px] border-t border-ink/12 pt-4 text-[13px]">{note}</Text>}
        </Box>

        <Box className="flex flex-col overflow-hidden rounded-[20px] border border-ink/12 bg-white shadow-[0_1px_2px_rgba(10,22,40,0.06),0_8px_24px_rgba(10,22,40,0.06)]">
          {scenarios.map((s, i) => (
            <Box key={s.short_title} hidden={active !== i} className="flex flex-col">
              <Box className="px-4 py-[18px] min-[701px]:px-[26px] min-[701px]:pt-6 min-[701px]:pb-5">
                {lab_kicker && (
                  <p className={cn("flex items-center gap-2 text-[11px] text-ink", MONO)}>
                    <V2Icon name="book" size={16} />
                    {lab_kicker}
                  </p>
                )}
                <Text as="h3" className="mt-2.5 mb-3.5 text-[clamp(22px,2.3vw,30px)] leading-[1.2]">{s.heading || s.title}</Text>

                <Box role="tablist" aria-label="Lab activity" className="mb-5 flex gap-3 border-b border-ink/12 min-[421px]:gap-[clamp(14px,3vw,30px)]">
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
                        "-mb-px inline-flex cursor-pointer items-center gap-1.5 border-b-[3px] px-0.5 pt-2 pb-3 text-[13.5px] transition-colors min-[421px]:gap-2.5 min-[421px]:text-[14px] min-[701px]:text-[16px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive",
                        tab === t ? "border-lime font-semibold text-ink" : "border-transparent text-ink-muted",
                      )}
                    >
                      <span className={cn("grid size-6 place-items-center rounded-full font-mono text-[12px] min-[421px]:size-7 min-[421px]:text-[13px]", tab === t ? "bg-lime text-navy" : "bg-paper-warm")}>
                        {n + 1}
                      </span>
                      {tabs[t] || t}
                    </button>
                  ))}
                </Box>

                {TABS.map((t, n) => (
                  <Box key={t} role="tabpanel" hidden={tab !== t} className="grid gap-5 min-[900px]:grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)]">
                    <Box>
                      <p className={cn("mb-2 text-[10.5px] text-ink-muted", MONO)}>{task_keys[t]}</p>
                      <p className="mb-4 text-[16.5px] leading-[1.5] text-ink">{s[t]?.[0]}</p>
                      {s.formats?.[n] && (
                        <span className="inline-flex items-center gap-2 rounded-full border border-ink/12 px-3.5 py-2 text-[13px] text-ink">
                          <V2Icon name={TAB_ICONS[t] ?? "users"} size={16} />
                          {s.formats[n]}
                        </span>
                      )}
                    </Box>
                    <Box>
                      <Box key={`${t}-${round}`} className="relative min-h-[372px] overflow-hidden rounded-2xl border border-ink/8 bg-[radial-gradient(ellipse_at_70%_15%,color-mix(in_srgb,var(--color-lime)_5%,white),color-mix(in_srgb,var(--color-olive)_9%,var(--color-paper)))] p-3.5">
                        {t === "practice" && <PracticeStage scenario={s} />}
                        {t === "discuss" && <DiscussStage scenario={s} />}
                        {t === "reflect" && <ReflectStage scenario={s} index={i} />}
                      </Box>
                      <Box className="mt-2.5 flex items-center justify-between gap-3 text-[12.5px] text-ink-muted">
                        <span>{s[t]?.[1]}</span>
                        <button
                          type="button"
                          onClick={() => setRound((r) => r + 1)}
                          className="inline-flex flex-none cursor-pointer items-center gap-1.5 rounded-full border border-ink/12 px-3 py-[5px] text-[12.5px] text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive"
                        >
                          <V2Icon name="replay" size={13} />
                          Replay
                        </button>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>

              <Box className="grid grid-cols-[auto_1fr] items-center gap-[18px] bg-navy px-4 py-[18px] text-white min-[701px]:grid-cols-[auto_1fr_auto] min-[701px]:px-[26px] min-[701px]:py-5">
                <span className="grid size-[42px] place-items-center rounded-full border-2 border-lime text-lime">
                  <V2Icon name="check" size={20} strokeWidth={2} />
                </span>
                <Box>
                  <span className={cn("mb-1 block text-[10px] text-white/60", MONO)}>Capability participants build</span>
                  <p className="text-[16px] leading-[1.45] text-white">{s.capability}</p>
                </Box>
                {s.module_number && (
                  <V2ScrollLink
                    href={`#mod-${String(s.module_number).padStart(2, "0")}`}
                    className="col-span-full justify-self-start border-b border-lime pb-0.5 text-[14px] whitespace-nowrap text-lime min-[701px]:col-auto"
                  >
                    Explore Module {String(s.module_number).padStart(2, "0")} ↗
                  </V2ScrollLink>
                )}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {steps.length > 0 && (
        <ol className="mt-[34px] grid gap-[18px] border-t border-ink/12 pt-[26px] min-[720px]:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li
              key={step.label}
              className={cn(
                "relative grid grid-cols-[34px_1fr] items-start gap-3 text-navy",
                i < steps.length - 1 && "lg:after:absolute lg:after:top-0.5 lg:after:right-3.5 lg:after:text-[22px] lg:after:text-ink-muted lg:after:content-['→']",
              )}
            >
              <V2Icon name={STEP_ICONS[i] ?? "book"} size={26} />
              <span>
                <b className="block font-display text-[16px] font-medium text-ink">{step.label}</b>
                <span className="text-[13.5px] text-ink-muted">{step.text}</span>
              </span>
            </li>
          ))}
        </ol>
      )}

      <V2CtaBand cta={cta} />
    </V2Section>
  );
}
