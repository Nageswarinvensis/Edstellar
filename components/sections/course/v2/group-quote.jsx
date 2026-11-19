"use client";

import { useState } from "react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import V2Section from "@/components/sections/course/v2/section";
import V2Heading from "@/components/sections/course/v2/heading";
import V2ScrollLink from "@/components/sections/course/v2/scroll-link";
import { V2_BUTTON, V2_QUOTE_TOPIC_EVENT } from "@/components/sections/course/v2/buttons";
import { cn } from "@/lib/utils";

/** One-time: size → frequency → review. Multiple: size → programs → frequency → review. */
const FLOW = {
  "one-time": ["size", "frequency", "review"],
  multiple: ["size", "programs", "frequency", "review"],
};
const ARROW = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

function Options({ options, value, onPick, columns }) {
  return (
    <Box role="radiogroup" className={cn("grid gap-2.5", columns)}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onPick(o.value)}
          className={cn(
            "flex cursor-pointer items-center justify-center rounded-xl border p-4 text-center text-[14px] text-ink transition-[border-color,background-color,box-shadow] duration-200 hover:border-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy",
            value === o.value ? "border-navy bg-lime/15 shadow-[0_0_0_3px_rgba(10,22,40,0.07)]" : "border-ink/15",
          )}
        >
          {o.label}
        </button>
      ))}
    </Box>
  );
}

function Stepper({ value, min, onChange, label }) {
  const nb = "grid w-11 flex-none cursor-pointer place-items-center bg-paper-warm text-ink transition-colors hover:bg-paper-cream focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-navy";
  return (
    <Box className="mx-auto mt-4 flex w-44 items-stretch overflow-hidden rounded-xl border border-ink/15">
      <button type="button" aria-label={`Decrease ${label}`} onClick={() => onChange(Math.max(min, value - 1))} className={nb}>−</button>
      <input
        type="number"
        min={min}
        value={value}
        aria-label={label}
        onChange={(e) => onChange(Math.max(min, Number(e.target.value) || min))}
        className="w-full min-w-0 border-0 bg-white py-2.5 text-center font-mono text-[15px] text-ink outline-none"
      />
      <button type="button" aria-label={`Increase ${label}`} onClick={() => onChange(value + 1)} className={nb}>+</button>
    </Box>
  );
}

/**
 * v2 · 12b Start an RFP (the design's `#group-quote`) — the quote wizard
 * (one-time or multiple training) with numbered steps, then the annual
 * license packages and the pricing CTA. "Continue to the request form"
 * hands the answers to the quote form below; nothing is sent from here.
 */
export default function V2GroupQuote({ data }) {
  const [type, setType] = useState(data?.tabs?.[0]?.value ?? "one-time");
  const [step, setStep] = useState(0);
  const [size, setSize] = useState("");
  const [sizeN, setSizeN] = useState(data?.steps?.size?.custom_default ?? 120);
  const [programs, setPrograms] = useState("");
  const [freq, setFreq] = useState("");
  const [sess, setSess] = useState("");
  const [sessN, setSessN] = useState(data?.steps?.frequency?.custom_default ?? 12);
  const [error, setError] = useState("");
  if (!data?.steps) return null;
  const { heading, intro, tabs = [], steps, packages } = data;
  const flow = FLOW[type] ?? FLOW["one-time"];
  const at = flow[step];

  const sizeText = size === "custom" ? `${sizeN} people` : size ? `${size} people` : "Not selected";
  const freqText = freq === "Recurring" ? `Recurring, ${sess === "custom" ? sessN : sess || "?"} sessions` : freq || "Not selected";
  const typeLabel = tabs.find((t) => t.value === type)?.label ?? type;
  const programList = [steps.programs.fixed, ...programs.split("\n").map((p) => p.trim()).filter(Boolean)];
  const summary = `${typeLabel} · ${sizeText} · ${freqText}${type === "multiple" ? ` · Programs: ${programList.join(", ")}` : ""}`;

  function next() {
    if (at === "size" && !size) return setError(steps.size.error);
    if (at === "frequency" && (!freq || (freq === "Recurring" && !sess))) return setError(steps.frequency.error);
    setError("");
    setStep((s) => Math.min(s + 1, flow.length - 1));
  }
  function back() {
    setError("");
    setStep((s) => Math.max(s - 1, 0));
  }

  const backButton = step > 0 && (
    <button type="button" onClick={back} className="cursor-pointer rounded-full border border-ink/20 px-[22px] py-[11px] text-center font-body text-[14px] font-semibold text-ink transition-colors hover:border-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy">
      Back
    </button>
  );
  const nav = "mt-7 flex flex-col-reverse items-stretch justify-end gap-3 border-t border-ink/10 pt-[22px] min-[640px]:flex-row min-[640px]:items-center";
  const stepHeading = "mb-6 text-center text-[clamp(19px,2vw,25px)] tracking-[-0.025em]";

  return (
    <V2Section id="group-quote" tone="warm" aria-label="Group training quote wizard">
      <V2Heading parts={heading} className="mb-5 max-w-[18ch]" />
      {intro && <Text className="mb-11 max-w-[64ch] text-[15px] leading-[1.7] lg:text-[17px]">{intro}</Text>}

      <Box className="overflow-hidden rounded-[20px] border border-ink/15 bg-white shadow-[0_1px_0_rgba(10,22,40,0.04),0_30px_60px_-40px_rgba(10,22,40,0.4)]">
        <Box role="tablist" aria-label="Quote request type" className="flex border-b border-ink/10 bg-paper-warm">
          {tabs.map((t) => (
            <button
              key={t.value}
              type="button"
              role="tab"
              aria-selected={type === t.value}
              onClick={() => {
                setType(t.value);
                setStep(0);
                setError("");
              }}
              className={cn(
                "flex-1 cursor-pointer border-b-2 px-3 py-4 text-center font-body text-[13px] font-semibold transition-colors hover:text-ink focus-visible:outline-2 focus-visible:-outline-offset-3 focus-visible:outline-navy min-[640px]:px-5 min-[640px]:text-[14px]",
                type === t.value ? "border-navy bg-white text-ink" : "border-transparent text-ink-muted",
              )}
            >
              {t.label}
            </button>
          ))}
        </Box>

        <Box role="tabpanel" className="px-4 py-[30px] min-[640px]:p-8 lg:p-10">
          <ol aria-label="Steps" className="mb-8 flex items-center justify-center">
            {flow.map((f, i) => (
              <li key={f} className="flex items-center">
                {i > 0 && <i aria-hidden="true" className="block h-px w-8 border-t border-dashed border-ink/25 min-[640px]:w-14" />}
                <b
                  aria-current={i === step ? "step" : undefined}
                  className={cn(
                    "grid size-[30px] flex-none place-items-center rounded-full border font-mono text-[12px] font-normal transition-colors",
                    i < step ? "border-navy bg-navy text-lime" : i === step ? "border-navy bg-white text-ink" : "border-ink/20 bg-white text-ink-muted",
                  )}
                >
                  {i + 1}
                </b>
              </li>
            ))}
          </ol>

          {at === "size" && (
            <Box>
              <Text as="h3" className={stepHeading}>{steps.size.heading}</Text>
              <Options
                columns="grid-cols-2 min-[640px]:grid-cols-3 lg:grid-cols-5"
                value={size}
                onPick={setSize}
                options={[...steps.size.options.map((o) => ({ value: o, label: `${o} people` })), { value: "custom", label: "Custom" }]}
              />
              {size === "custom" && <Stepper value={sizeN} min={1} onChange={setSizeN} label="number of team members" />}
            </Box>
          )}

          {at === "programs" && (
            <Box>
              <Text as="h3" className={stepHeading}>{steps.programs.heading}</Text>
              <Box className="mx-auto max-w-[440px]">
                <p className="mb-3.5 flex items-baseline justify-between gap-3 rounded-xl bg-paper-warm px-3.5 py-2.5 text-[13.5px] text-ink">
                  <span>{steps.programs.fixed}</span>
                  <small className="font-mono text-[10px] tracking-[0.05em] text-ink-muted">{steps.programs.fixed_note}</small>
                </p>
                <label htmlFor="v2-rf-programs" className="mb-1.5 block text-[13px] text-ink-muted">{steps.programs.label}</label>
                <textarea
                  id="v2-rf-programs"
                  rows={4}
                  value={programs}
                  onChange={(e) => setPrograms(e.target.value)}
                  placeholder={steps.programs.placeholder}
                  className="block w-full resize-y rounded-xl border border-ink/15 px-3.5 py-2.5 text-[13.5px] text-ink focus:border-navy focus:outline-none"
                />
              </Box>
            </Box>
          )}

          {at === "frequency" && (
            <Box>
              <Text as="h3" className={stepHeading}>{steps.frequency.heading}</Text>
              <Options columns="mx-auto max-w-[512px] grid-cols-1 min-[640px]:grid-cols-2" value={freq} onPick={setFreq} options={steps.frequency.options.map((o) => ({ value: o, label: o }))} />
              {freq === "Recurring" && (
                <Box className="mt-[26px]">
                  <p className="mb-3.5 text-center font-mono text-[10.5px] uppercase tracking-[0.15em] text-ink-muted">{steps.frequency.sessions_label}</p>
                  <Options
                    columns="grid-cols-2 min-[640px]:grid-cols-4"
                    value={sess}
                    onPick={setSess}
                    options={[...steps.frequency.sessions.map((o) => ({ value: o, label: o })), { value: "custom", label: "Custom" }]}
                  />
                  {sess === "custom" && <Stepper value={sessN} min={2} onChange={setSessN} label="number of sessions" />}
                </Box>
              )}
            </Box>
          )}

          {at === "review" && (
            <Box>
              <Text as="h3" className={stepHeading}>{steps.review.heading}</Text>
              <Box className="grid items-start gap-5 lg:grid-cols-[2fr_3fr]">
                <dl className="grid grid-cols-1 gap-x-6 gap-y-2.5 rounded-[14px] bg-paper-warm p-[22px] min-[640px]:grid-cols-[auto_1fr]">
                  <dt className="text-[13.5px] text-ink-muted">Team members</dt>
                  <dd className="text-[13.5px] font-semibold text-ink min-[640px]:text-right">{sizeText}</dd>
                  <dt className="text-[13.5px] text-ink-muted">Request type</dt>
                  <dd className="text-[13.5px] font-semibold text-ink min-[640px]:text-right">{typeLabel}</dd>
                  <dt className="text-[13.5px] text-ink-muted">Frequency</dt>
                  <dd className="text-[13.5px] font-semibold text-ink min-[640px]:text-right">{freqText}</dd>
                  {type === "multiple" && (
                    <>
                      <dt className="text-[13.5px] text-ink-muted">Programs</dt>
                      <dd className="text-[13.5px] font-semibold text-ink min-[640px]:text-right">{programList.join(", ")}</dd>
                    </>
                  )}
                </dl>
                <Box className="rounded-[14px] border border-ink/15 bg-white px-4 py-[30px] min-[640px]:p-[26px]">
                  <h4 className="mb-1 font-display text-[18px] font-semibold text-ink">{steps.review.contact_heading}</h4>
                  <p className="text-[13px] leading-[1.6] text-ink-muted">{steps.review.contact_text}</p>
                  <Box className={cn(nav, "mt-5")}>
                    {backButton}
                    <V2ScrollLink
                      href="#quote"
                      className={cn(V2_BUTTON.primary, "justify-center")}
                      onClickCapture={() => window.dispatchEvent(new CustomEvent(V2_QUOTE_TOPIC_EVENT, { detail: summary }))}
                    >
                      {steps.review.label}
                      {ARROW}
                    </V2ScrollLink>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}

          {error && <p role="alert" className="mt-4 text-center text-[12.5px] text-error">{error}</p>}

          {at !== "review" && (
            <Box className={nav}>
              {backButton}
              <button type="button" onClick={next} className={cn(V2_BUTTON.primary, "cursor-pointer justify-center")}>
                Next
                {ARROW}
              </button>
            </Box>
          )}
        </Box>
      </Box>

      {packages?.items?.length > 0 && (
        <Box className="mt-12 border-t border-ink/10 pt-9 lg:mt-14">
          <Text as="h3" className="mb-2.5 max-w-[26ch] text-[clamp(19px,2vw,24px)] leading-[1.25] tracking-[-0.025em]">{packages.heading}</Text>
          {packages.text && <Text className="mb-7 max-w-[78ch] text-[13.5px] leading-[1.7]">{packages.text}</Text>}
          <ul className="grid grid-cols-1 gap-4 min-[640px]:grid-cols-2 lg:grid-cols-4">
            {packages.items.map((p) => (
              <li key={p.name} className={cn("flex flex-col rounded-2xl bg-white p-[22px]", p.best ? "border-2 border-navy" : "border border-ink/12")}>
                <span className="mb-2.5 h-[19px]">
                  {p.badge && <span className="inline-block rounded bg-lime px-2 py-[3px] font-mono text-[10px] uppercase tracking-[0.1em] text-navy">{p.badge}</span>}
                </span>
                <p className="mb-3 font-display text-[16px] font-bold tracking-[-0.02em] text-ink">{p.name}</p>
                <p className="font-display text-[clamp(22px,2.4vw,28px)] leading-none font-bold tracking-[-0.035em] text-ink">{p.licenses}</p>
                <span className="mt-1.5 mb-3.5 block font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted">{p.unit}</span>
                <p className="border-t border-ink/10 pt-3 text-[13px] leading-[1.5] text-ink">{p.hours}</p>
                <p className="mt-auto pt-2.5 text-[12px] leading-[1.5] text-ink-muted">{p.fit}</p>
              </li>
            ))}
          </ul>
          {packages.cta?.label && (
            <Box className="mt-9 flex flex-col flex-wrap items-start justify-between gap-[22px] rounded-r-2xl border border-l-4 border-ink/12 border-l-lime bg-paper-cream px-[22px] py-5 min-[621px]:flex-row min-[621px]:items-center min-[621px]:px-7 min-[621px]:py-6">
              <Box className="min-w-0 flex-[1_1_300px]">
                <p className="font-display text-[18.5px] leading-[1.28] font-bold tracking-[-0.025em] text-ink">{packages.cta.heading}</p>
                <p className="mt-1.5 max-w-[58ch] text-[13.5px] leading-[1.6] text-ink-muted">{packages.cta.text}</p>
              </Box>
              <V2ScrollLink href={packages.cta.href} className={cn(V2_BUTTON.primary, "w-full flex-none justify-center min-[621px]:w-auto")}>
                {packages.cta.label}
                {ARROW}
              </V2ScrollLink>
            </Box>
          )}
        </Box>
      )}
    </V2Section>
  );
}
