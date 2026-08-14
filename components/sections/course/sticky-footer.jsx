"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { CtaButton } from "@/components/shared/CtaButton";

const ROTATE_MS = 5200;

/**
 * Fixed enquiry bar that appears once the hero has scrolled away and retreats
 * while the quote form is on screen, so it never competes with the form it
 * exists to promote. Dismissal is session-only (component state, not storage)
 * since this is a soft nudge, not a persistent preference.
 */
export default function StickyFooter({ data }) {
  const [dismissed, setDismissed] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [atForm, setAtForm] = useState(false);
  const [atFooter, setAtFooter] = useState(false);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const visible = pastHero && !atForm && !atFooter && !dismissed;
  const messages = data?.messages;

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window))
      return;

    const hero = document.getElementById("top");
    const form = document.getElementById(data?.formAnchorId || "apply");
    const footer = document.getElementById("site-footer");
    if (!hero) return;

    const heroObserver = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { threshold: 0 },
    );
    heroObserver.observe(hero);

    const formObserver = form
      ? new IntersectionObserver(([entry]) => setAtForm(entry.isIntersecting), {
          threshold: 0.15,
        })
      : null;
    formObserver?.observe(form);

    // The bar is fixed to the viewport bottom, so it would otherwise sit on
    // top of the site footer's last row (copyright/ISO line) once scrolled
    // into view. Hide it as soon as any part of the footer is visible.
    const footerObserver = footer
      ? new IntersectionObserver(
          ([entry]) => setAtFooter(entry.isIntersecting),
          {
            threshold: 0,
          },
        )
      : null;
    footerObserver?.observe(footer);

    return () => {
      heroObserver.disconnect();
      formObserver?.disconnect();
      footerObserver?.disconnect();
    };
  }, [data?.formAnchorId]);

  useEffect(() => {
    if (
      !visible ||
      paused ||
      !messages?.length ||
      messages.length < 2 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const timer = setInterval(
      () => setIndex((cur) => (cur + 1) % messages.length),
      ROTATE_MS,
    );
    return () => clearInterval(timer);
  }, [visible, paused, messages?.length]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  if (!data || !messages?.length) return null;

  const message = messages[index % messages.length];

  return (
    <Box
      role="region"
      aria-label="Training enquiry bar"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className={`
        fixed inset-x-0 bottom-0 z-[920] px-5 lg:px-10
        border-t border-lime/22 bg-navy
        shadow-[0_-18px_40px_-30px_rgba(10,22,40,0.9)]
        transition-transform duration-[450ms] ease-out
        ${visible ? "translate-y-0" : "translate-y-[110%]"}
      `}
    >
      <Box
        className="
          mx-auto flex h-15.5 w-full max-w-7xl items-center justify-center gap-5.5
          max-lg:h-auto max-lg:py-3  
        "
      >
        <Box
          className="relative h-4.5 min-w-0 flex-1 max-lg:hidden"
          aria-live="polite"
          aria-atomic="true"
        >
          <Box
            key={index}
            className="
              absolute inset-0 flex items-center gap-1.75
              animate-in fade-in slide-in-from-bottom-2 duration-500
            "
          >
            <Text
              as="span"
              className="font-mono text-[11px] tracking-[0.12em] text-lime uppercase max-md:text-[10px]"
            >
              {message.highlight}
            </Text>
            <Text
              as="span"
              className="font-mono text-[11px] tracking-[0.12em] whitespace-nowrap text-paper/62 uppercase max-md:text-[10px]"
            >
              {message.rest}
            </Text>
          </Box>
        </Box>

        <Box className="flex flex-none items-center gap-3 max-lg:w-full max-lg:justify-center">
          {data.cta ? (
            <CtaButton
              size="sm"
              color="lime"
              arrow
              className="max-lg:w-full"
              render={<a href={data.cta.href} />}
            >
              {data.cta.label}
            </CtaButton>
          ) : null}

          <Box
            as="button"
            type="button"
            aria-label="Dismiss this bar"
            onClick={() => setDismissed(true)}
            className="cursor-pointer p-1.25 text-paper/45 transition-colors duration-200 hover:text-paper max-lg:hidden"
          >
            <X size={19} strokeWidth={2} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
