"use client";

import { useEffect, useRef } from "react";

import Box from "@/components/ui/Box";

/**
 * Scroll sync for the TNA stages. The steps and screens are rendered by the
 * server and passed through as children, so every stage's copy is in the
 * initial HTML; this only moves a `data-on` attribute between them. The
 * active stage is the last step whose top has crossed the viewport's middle.
 *
 * All styling keyed off `data-on` is gated to the two-column layout, so on
 * narrow screens (where the stages simply stack) this has no visible effect.
 */
export default function TnaStageScroller({ className, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const wrap = ref.current;
    if (!wrap) return;

    const steps = [...wrap.querySelectorAll("[data-stage-step]")];
    const nodes = [...steps, ...wrap.querySelectorAll("[data-stage-fig]")];

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach((node) => node.setAttribute("data-on", ""));
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
      nodes.forEach((node) =>
        node.toggleAttribute("data-on", Number(node.dataset.i) === active),
      );
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
