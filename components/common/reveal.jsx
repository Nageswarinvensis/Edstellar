"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const DELAY_CLASS = {
  0: "",
  1: "delay-[80ms]",
  2: "delay-[160ms]",
  3: "delay-[240ms]",
  4: "delay-[320ms]",
};

/**
 * Scroll-reveal wrapper.
 *
 * Children are rendered by the *server* and passed through untouched, so the
 * full content is present in the initial HTML for crawlers — this component only
 * toggles a class. It starts visible and hides itself on mount, so with JS
 * disabled or before hydration nothing is ever invisible.
 *
 * Honours `prefers-reduced-motion` via the `.reveal-init` media query override
 * in globals.css.
 */
function Reveal({ as = "div", delay = 0, className, children, ...props }) {
  const Tag = as;
  const ref = useRef(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      typeof window === "undefined" ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true);
      return;
    }

    setArmed(true);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn(
        armed && "reveal-init",
        armed && shown && "reveal-in",
        armed && DELAY_CLASS[delay],
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

export default Reveal;
