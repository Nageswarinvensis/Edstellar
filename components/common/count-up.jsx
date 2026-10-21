"use client";

import { useEffect, useRef, useState } from "react";

const DURATION = 1600;
const format = (n) => n.toLocaleString("en-US");
const easeOut = (t) => 1 - (1 - t) ** 3;

/**
 * A figure that counts up from 0 the first time it scrolls into view.
 * `value` is the display string ("1,200"). The server renders it as-is, so
 * crawlers and no-JS visitors get the real number; anything non-numeric, or a
 * visitor who prefers reduced motion, also gets it unanimated.
 */
export default function CountUp({ value, className }) {
  const target = Number(String(value).replace(/,/g, ""));
  const [shown, setShown] = useState(value);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !Number.isFinite(target) || !("IntersectionObserver" in window)) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let frame;
    setShown(format(0));

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min((now - start) / DURATION, 1);
          setShown(format(Math.round(target * easeOut(t))));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target]);

  return (
    <span ref={ref} className={className}>
      {shown}
    </span>
  );
}
