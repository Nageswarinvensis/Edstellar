"use client";

import { useEffect, useRef } from "react";

import Box from "@/components/ui/Box";

/**
 * Scroll sync for the "what we deliver" layer stack. The steps are rendered by
 * the server and passed through as children, so every step's copy is in the
 * initial HTML; this only moves `data-on` / `data-done` attributes between the
 * sticky stack's layers as the steps scroll past.
 *
 * Three states, matching the design: the step currently in view is `data-on`
 * (lime), every step already passed is `data-done` (navy), and upcoming steps
 * have neither (white). The active step is the last one whose top has crossed
 * the viewport's middle.
 *
 * All styling keyed off these attributes is gated to the two-column layout
 * (≥900px), so on narrow screens — where the stack is hidden and the steps
 * simply stack — this has no visible effect.
 */
export default function DeliverScroller({ className, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const wrap = ref.current;
    if (!wrap) return;

    const steps = [...wrap.querySelectorAll("[data-stage-step]")];
    const figs = [...wrap.querySelectorAll("[data-stage-fig]")];

    const apply = (active) => {
      figs.forEach((fig) => {
        const i = Number(fig.dataset.i);
        fig.toggleAttribute("data-on", i === active);
        fig.toggleAttribute("data-done", i < active);
      });
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply(0);
      return;
    }

    let current = -1;
    let frame = 0;

    const update = () => {
      frame = 0;
      const middle = window.innerHeight * 0.5;
      let active = 0;
      steps.forEach((step, index) => {
        if (step.getBoundingClientRect().top <= middle) active = index;
      });
      if (active === current) return;
      current = active;
      apply(active);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <Box ref={ref} className={className}>
      {children}
    </Box>
  );
}
