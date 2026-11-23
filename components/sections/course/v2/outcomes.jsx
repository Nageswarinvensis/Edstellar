"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import V2Section from "@/components/sections/course/v2/section";
import Reveal from "@/components/common/reveal";
import V2Heading from "@/components/sections/course/v2/heading";
import V2ScrollLink from "@/components/sections/course/v2/scroll-link";
import OutcomesTower from "@/components/sections/course/v2/outcomes-tower";
import { V2_BUTTON, V2ButtonArrow } from "@/components/sections/course/v2/buttons";
import { cn } from "@/lib/utils";

import styles from "./outcomes.module.css";

/**
 * v2 · 4 Outcomes — "What your team can do after…". The capability tower
 * (one floor per outcome) beside the outcome cards. Selecting a card lights
 * its floor: floors below show as built, floors above wait, and the line
 * under the tower shows the business result. Click, tap and arrow keys
 * select; while scrolling, the card crossing the middle of the screen
 * becomes active (the design's scroll scrub, without pinning the page).
 * Then the progression image band.
 */
export default function V2Outcomes({ data }) {
  const [active, setActive] = useState(1);
  const listRef = useRef(null);
  const clickedAt = useRef(0);

  // Scroll: the card crossing the middle of the viewport becomes active —
  // except just after a click, so a click is not undone by its own scroll.
  useEffect(() => {
    const list = listRef.current;
    if (!list || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (Date.now() - clickedAt.current < 800) return;
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number(entry.target.dataset.o));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    list.querySelectorAll("li").forEach((li) => observer.observe(li));
    return () => observer.disconnect();
  }, []);

  if (!data?.items?.length) return null;
  const { heading, tower_labels = [], items, banner } = data;
  const total = items.length;

  function select(n) {
    clickedAt.current = Date.now();
    setActive(n);
  }

  function onKey(event, i) {
    const next = { ArrowDown: i + 1, ArrowRight: i + 1, ArrowUp: i - 1, ArrowLeft: i - 1, Home: 0, End: total - 1 }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    const j = (next + total) % total;
    select(j + 1);
    listRef.current?.querySelectorAll("button")[j]?.focus();
  }

  return (
    <V2Section id="outcomes">
      <Reveal className="mb-[34px] max-w-[820px]">
        <V2Heading parts={heading} className={cn("max-w-[640px]", styles.swash)} emClassName="text-ink" />
      </Reveal>

      <Box className="grid grid-cols-1 items-start gap-7 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-11">
        {/* The tower, its progress and the result line */}
        <figure className="min-w-0 lg:sticky lg:top-24">
          <Box className="grid place-items-center overflow-hidden rounded-[22px] bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,var(--color-navy-soft),var(--color-navy)_75%)] px-2.5 pt-3 pb-1.5 shadow-[0_1px_2px_rgba(10,22,40,0.06),0_8px_24px_rgba(10,22,40,0.06)]">
            <OutcomesTower active={active} labels={tower_labels} />
          </Box>
          <Box className="mt-3 flex items-center gap-3">
            <span className="min-w-11 font-mono text-[11px] tracking-[0.12em] text-olive">
              {active} / {total}
            </span>
            <svg viewBox="0 0 100 4" preserveAspectRatio="none" className="block h-1 flex-1 overflow-hidden rounded-full bg-ink/12" aria-hidden="true">
              <defs>
                <linearGradient id="oc-prog" x1="0" x2="1">
                  <stop offset="0" className="[stop-color:var(--color-navy)]" />
                  <stop offset="1" className="[stop-color:var(--color-olive)]" />
                </linearGradient>
              </defs>
              <rect width={(active / total) * 100} height="4" fill="url(#oc-prog)" className="transition-[width] duration-300" />
            </svg>
          </Box>
          <figcaption aria-live="polite" className="mt-2.5 text-[13.5px] leading-[1.5] text-ink">
            {/* Every outcome's result is in the HTML; only the active one shows. */}
            {items.map((item, i) => (
              <span key={i} hidden={active !== i + 1}>{item.result}</span>
            ))}
          </figcaption>
        </figure>

        {/* The outcome cards */}
        <ol ref={listRef} aria-label="Outcomes: select one to see it in the illustration" className="grid min-w-0 gap-3">
          {items.map((item, i) => {
            const n = i + 1;
            const on = n === active;
            const done = n < active;
            const next = n > active;
            return (
              <li key={item.number} data-o={n}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => select(n)}
                  onKeyDown={(e) => onKey(e, i)}
                  className={cn(
                    "relative grid w-full cursor-pointer grid-cols-1 items-center gap-2 overflow-hidden rounded-lg border px-[18px] pt-[18px] pb-3 text-left transition-[transform,box-shadow,background-color,border-color] duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-olive min-[561px]:grid-cols-[auto_minmax(0,1fr)] min-[561px]:gap-4 motion-reduce:transition-none",
                    "before:absolute before:inset-x-0 before:top-0 before:h-1.5 before:bg-[linear-gradient(90deg,var(--color-navy)_0%,var(--color-olive)_55%,var(--color-lime-soft)_100%)]",
                    on && "border-navy bg-white shadow-[0_0_0_1px_var(--color-navy),0_10px_24px_rgba(10,22,40,0.12)] lg:-translate-x-2.5 lg:scale-[1.015] motion-reduce:transform-none",
                    done && "border-ink/12 bg-white shadow-[0_1px_2px_rgba(10,22,40,0.06),0_8px_24px_rgba(10,22,40,0.06)] hover:-translate-y-0.5",
                    next && "border-dashed border-ink/12 bg-paper before:opacity-35 hover:-translate-y-0.5",
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex min-w-24 items-center gap-2 justify-self-start rounded-full px-3.5 py-1.5 font-display text-[15px] font-medium whitespace-nowrap",
                      on && "bg-navy text-lime",
                      done && "bg-olive text-white",
                      next && "bg-white text-ink shadow-[inset_0_0_0_1px_rgba(10,22,40,0.12)]",
                    )}
                  >
                    <b className="font-medium">
                      {item.number}
                      <span aria-hidden="true" className={done ? "" : "invisible"}> ✓</span>
                    </b>
                    {item.label}
                  </span>
                  <span className={cn("font-body text-[14.5px] font-medium leading-[1.45]", next ? "text-ink-muted" : "text-ink")}>
                    {item.text}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </Box>

      {banner && (
        <Reveal className="relative mt-8 grid items-center gap-5 overflow-hidden rounded-r-[20px] border-l-[6px] border-lime bg-[linear-gradient(100deg,color-mix(in_srgb,var(--color-lime)_10%,transparent),color-mix(in_srgb,var(--color-lime)_24%,transparent))] px-[18px] py-6 min-[481px]:px-7 min-[481px]:py-[30px] min-[900px]:grid-cols-[minmax(0,1fr)_minmax(360px,520px)] min-[900px]:py-[34px] min-[900px]:pr-10 min-[900px]:pl-[34px]">
          <Box className="self-center">
            <Text as="h3" className="mb-2 text-[clamp(20px,2vw,24px)] leading-[1.2]">{banner.heading}</Text>
            <Text className="mb-5 max-w-[560px] text-[15px] text-ink">{banner.text}</Text>
            <V2ScrollLink
              href={banner.href || "#quote"}
              topic={banner.heading}
              title={banner.title || `Click here to ${banner.label}`}
              className={V2_BUTTON.primary}
            >
              {banner.label}
              <V2ButtonArrow />
            </V2ScrollLink>
          </Box>
          {banner.image && (
            <Image
              src={banner.image}
              alt={banner.image_alt || ""}
              title={banner.image_alt || undefined}
              width={banner.image_width || 650}
              height={banner.image_height || 258}
              loading="lazy"
              className="h-auto w-full max-w-[520px] justify-self-end self-center"
            />
          )}
        </Reveal>
      )}
    </V2Section>
  );
}
