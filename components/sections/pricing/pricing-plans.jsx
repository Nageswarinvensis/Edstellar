"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import { CtaButton } from "@/components/common/cta-button";
import { cn } from "@/lib/utils";

/** Fired on "Enquire Now" with `{ origin, thankYou }`; `PricingQuoteForm` listens. */
export const PRICING_ENQUIRE_EVENT = "pricing:enquire";

/**
 * A footnote marker — jumps to the "Points to note" box (`#points`).
 */
function Footnote({ mark, dark }) {
  if (!mark) return null;
  return (
    <a
      href="#points"
     
      className={cn(
        "ml-0.5 align-super font-mono text-[10px] leading-none underline underline-offset-2",
        dark ? "text-lime" : "text-olive",
      )}
    >
      {mark}
    </a>
  );
}

const TIP_ALIGN = {
  start: "left-0 translate-x-0 after:left-3.5",
  center: "left-1/2 -translate-x-1/2 after:left-1/2 after:-ml-1.5",
  end: "right-[-8px] left-auto translate-x-0 after:right-2.5",
};

/**
 * The circled "i" with a navy bubble above it. CSS-only (hover and
 * focus-within), so it works before hydration and from the keyboard. The
 * first card's bubbles open rightwards and the last card's leftwards, so
 * none spill off the grid.
 */
function Tip({ text, align = "center" }) {
  if (!text) return null;
  return (
    <Box as="span" className="group/tip relative inline-flex align-middle">
      <button
        type="button"
        aria-label="More info"
        className="inline-flex size-4 cursor-help items-center justify-center rounded-full border border-current font-mono text-[9px] leading-none normal-case"
      >
        i
      </button>
      <Box
        as="span"
        role="tooltip"
        className={cn(
          "absolute bottom-[calc(100%+10px)] z-5 hidden w-[min(250px,calc(100vw-64px))] rounded-xl bg-navy-deep px-3.5 py-3 font-body text-[12.5px] leading-[1.55] tracking-normal text-paper normal-case shadow-[0_18px_40px_-16px_rgba(0,0,0,0.6)] group-focus-within/tip:block group-hover/tip:block",
          "after:absolute after:top-full after:border-6 after:border-transparent after:border-t-navy-deep after:content-['']",
          TIP_ALIGN[align],
        )}
      >
        {text}
      </Box>
    </Box>
  );
}

/** The key of `byTab` the current tab shows: its own entry, else "all". */
const shownKey = (byTab, tab) => (tab in byTab ? tab : "all");

/** Every tab's version of a text, only the current tab's shown — so each
 * tab's copy is in the server HTML, not just the first tab's. */
function TabText({ byTab, tab }) {
  const shown = shownKey(byTab, tab);
  return Object.entries(byTab).map(([key, text]) => (
    <span key={key} hidden={key !== shown}>
      {text}
    </span>
  ));
}

/** One cell of a plan: a big figure, a line of text, a tick, or a list. */
function PlanValue({ value, programs, tab, dark, tipAlign }) {
  if (!value) return null;

  if (value.programs) {
    // Every tab's line is rendered; only the current tab's shows.
    const shown = shownKey(programs.by_tab, tab);
    return Object.entries(programs.by_tab).map(([key, line]) => (
      <span key={key} hidden={key !== shown}>
        {line.count}{" "}
        <Link
          href={programs.href}
         
          className={cn("border-b border-current", dark ? "text-lime" : "text-olive")}
        >
          {programs.link_label}
        </Link>{" "}
        {line.domains}
      </span>
    ));
  }

  if (value.big) {
    const word = !/^\d/.test(value.big);
    return (
      <>
        <Text
          as="span"
          className={cn(
            "font-display leading-none font-bold tracking-[-0.04em]",
            word ? "text-[28px]" : "text-[40px]",
            dark ? "text-lime" : "text-ink",
          )}
        >
          {value.big}
        </Text>
        <Footnote mark={value.footnote} dark={dark} />{" "}
        <Tip text={value.tip} align={tipAlign} />
      </>
    );
  }

  if (value.included) {
    return (
      <Text
        as="span"
        aria-label="Included"
        className={cn(
          "inline-flex size-6 items-center justify-center rounded-full text-[12px] leading-none font-bold",
          dark ? "bg-lime text-navy" : "bg-navy text-lime",
        )}
      >
        ✓
      </Text>
    );
  }

  if (value.list) {
    return (
      <Box as="ul" className="list-none">
        {value.list.map((item) => (
          <Box as="li" key={item} className="py-0.5 before:content-['–\00a0']">
            {item}
          </Box>
        ))}
      </Box>
    );
  }

  return (
    <>
      {value.text}
      <Footnote mark={value.footnote} dark={dark} />
      {value.after}
      {value.sub ? (
        <>
          <br />
          {value.sub}
        </>
      ) : null}
    </>
  );
}

function PlanCard({ plan, rows, programs, tab, ctaLabel, ctaHref, index, total, onEnquire }) {
  const dark = Boolean(plan.popular);
  const tipAlign = index === 0 ? "start" : index === total - 1 ? "end" : "center";

  return (
    <Reveal
      as="article"
      delay={Math.min(index + 1, 4)}
      className={cn(
        "relative flex flex-col rounded-[22px] border transition-[transform,box-shadow,border-color] duration-250 hover:-translate-y-1.5",
        "min-[1101px]:row-span-11 min-[1101px]:grid min-[1101px]:grid-rows-subgrid min-[1101px]:gap-y-0",
        dark
          ? "border-navy bg-navy text-paper shadow-[0_30px_60px_-32px_rgba(10,22,40,0.7)] before:absolute before:inset-x-6 before:top-0 before:h-0.75 before:rounded-b-[3px] before:bg-lime before:content-['']"
          : "border-ink/12 bg-white hover:border-ink/22 hover:shadow-[0_26px_54px_-30px_rgba(10,22,40,0.45)]",
      )}
    >
      <Box className={cn("border-b px-6 pt-7 pb-6", dark ? "border-paper/12" : "border-ink/12")}>
        <Box className="mb-3.5 flex min-h-6 flex-nowrap gap-1">
          {plan.flags?.map((flag) => (
            <Text
              as="span"
              key={flag.label}
              className={cn(
                "rounded-full px-2 py-1 font-mono text-[9px] leading-[1.4] tracking-[0.1em] whitespace-nowrap uppercase",
                dark
                  ? flag.ghost
                    ? "bg-lime/14 text-lime"
                    : "bg-lime text-navy"
                  : "bg-lime/25 text-olive",
              )}
            >
              {flag.label}
            </Text>
          ))}
        </Box>
        <Text as="h3" className={cn("text-[26px] leading-[1.1]", dark && "text-paper")}>
          {plan.name}
        </Text>
        <Text
          as="p"
          className={cn("mt-2.5 min-h-17 text-[14px] leading-[1.6]", dark ? "text-paper/72" : "text-ink-muted")}
        >
          <TabText byTab={plan.description} tab={tab} />
        </Text>
        <Text
          as="p"
          className={cn(
            "mt-4 font-mono text-[11px] leading-none tracking-[0.12em] uppercase",
            dark ? "text-paper/72" : "text-ink-muted",
          )}
        >
          {plan.validity}
        </Text>
        <CtaButton
          color={dark ? "lime" : "navy"}
          block
          arrow
          render={<a href={ctaHref} />}
          onClick={onEnquire}
          title={`Click Here to Enquire About the ${plan.name} Package`}
          className="mt-4.5"
        >
          {ctaLabel}
        </CtaButton>
      </Box>

      <Box as="dl" className="flex-1 px-6 pt-1.5 pb-6.5 min-[1101px]:contents">
        {rows.map((row, rowIndex) => {
          const value = row.values ? row.values[index] : row.value;
          const last = rowIndex === rows.length - 1;
          return (
            <Box
              key={row.label}
              className={cn(
                "py-3.5 min-[1101px]:mx-6",
                !last && "border-b",
                dark ? "border-paper/12" : "border-ink/12",
                rowIndex === 0 && "min-[1101px]:pt-5",
                last && "min-[1101px]:pb-6.5",
              )}
            >
              <Box
                as="dt"
                className={cn(
                  "mb-1.5 flex flex-wrap items-center gap-1.5 font-mono text-[10px] leading-[1.5] tracking-[0.14em] uppercase",
                  dark ? "text-paper/50" : "text-ink-muted",
                )}
              >
                <Text as="span" className="font-mono text-[10px] leading-[1.5] text-inherit">
                  {row.label}
                  <Footnote mark={row.footnote} dark={dark} />
                </Text>
                <Tip text={row.tip} align={tipAlign} />
                {row.note ? (
                  <Text
                    as="span"
                    className="font-body text-[11.5px] leading-[1.5] tracking-normal text-inherit normal-case"
                  >
                    {row.note}
                  </Text>
                ) : null}
              </Box>
              <Box
                as="dd"
                className={cn("text-[14px] leading-[1.55]", dark ? "text-paper/72" : "text-ink-muted")}
              >
                <PlanValue value={value} programs={programs} tab={tab} dark={dark} tipAlign={tipAlign} />
              </Box>
            </Box>
          );
        })}
      </Box>
    </Reveal>
  );
}

/**
 * The four packages, side by side, under a tab bar (All / IT & Technical /
 * Non-Technical). The packages stay the same across tabs — only each plan's
 * description and the "Training Programs" line change. From 1101px the
 * cards share one subgrid, so every row (licenses, duration, …) lines up
 * across all four however long its text runs.
 *
 * "Enquire Now" scrolls to the quote form and focuses its first field. It
 * also tells the form which package was asked about (a `pricing:enquire`
 * window event — the form sits in another section): the live page records
 * "{tab label}: {plan} Package" in Zoho and sends each of its twelve
 * tab/package buttons to its own thank-you page,
 * `/thank-you/{tab.thank_you_prefix}{plan}-package`.
 *
 * Design: corporate-training-pricing-v2 `#table`, `.tabs`, `.plans`, `.plan`,
 * `.tip`.
 */
export default function PricingPlans({ data, quoteId = "quote" }) {
  const tabs = data?.tabs ?? [];
  const [tab, setTab] = useState(tabs[0]?.key ?? "all");
  const tabRefs = useRef([]);
  const baseId = useId();

  const items = data?.items ?? [];
  if (!items.length) return null;

  function onTabKeyDown(event, index) {
    const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = (index + step + tabs.length) % tabs.length;
    setTab(tabs[next].key);
    tabRefs.current[next]?.focus();
  }

  function onEnquire(event, plan) {
    const active = tabs.find((item) => item.key === tab);
    window.dispatchEvent(
      new CustomEvent(PRICING_ENQUIRE_EVENT, {
        detail: {
          origin: `${active?.label ?? "All Included"}: ${plan.name} Package`,
          thankYou: `${active?.thank_you_prefix ?? ""}${plan.name.toLowerCase()}-package`,
        },
      }),
    );

    const form = document.getElementById(quoteId);
    if (!form) return;
    event.preventDefault();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    form.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    setTimeout(() => form.querySelector("input")?.focus({ preventScroll: true }), reduced ? 0 : 600);
  }

  return (
    <>
      {tabs.length > 1 ? (
        <Reveal className="flex justify-center">
          <Box
            role="tablist"
            aria-label="Training type"
            className="mb-10 inline-flex flex-wrap gap-1 rounded-full border border-ink/12 bg-white p-1.25"
          >
            {tabs.map((item, index) => {
              const selected = item.key === tab;
              return (
                <button
                  key={item.key}
                  ref={(node) => (tabRefs.current[index] = node)}
                  id={`${baseId}-tab-${item.key}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setTab(item.key)}
                  onKeyDown={(event) => onTabKeyDown(event, index)}
                  className={cn(
                    "cursor-pointer rounded-full px-5.5 py-2.75 font-body text-[14px] font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy",
                    selected ? "bg-navy text-lime" : "text-ink-muted hover:text-ink",
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </Box>
        </Reveal>
      ) : null}

      <Box
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${tab}`}
        className="grid items-stretch gap-4.5 min-[641px]:grid-cols-2 min-[1101px]:grid-cols-4"
      >
        {items.map((plan, index) => (
          <PlanCard
            key={plan.name}
            plan={plan}
            rows={data.rows}
            programs={data.programs}
            tab={tab}
            ctaLabel={data.cta_label}
            ctaHref={data.cta_href}
            index={index}
            total={items.length}
            onEnquire={(event) => onEnquire(event, plan)}
          />
        ))}
      </Box>

      {data.valid_note ? (
        <Text
          as="p"
          className="mt-5.5 text-center font-mono text-[11px] leading-none tracking-[0.14em] text-ink-muted uppercase"
        >
          {data.valid_note}
        </Text>
      ) : null}
    </>
  );
}
