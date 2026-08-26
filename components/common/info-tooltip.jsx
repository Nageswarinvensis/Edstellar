"use client";

import { useEffect, useId, useRef, useState } from "react";

import Box from "@/components/ui/Box";
import { cn } from "@/lib/utils";

/**
 * The small circled "i" in the hero meta row that reveals a navy popover.
 *
 * Design: `.lang-wrap` / `.lang-i` / `.lang-pop`
 *
 * Click-toggled rather than hover-only so it is reachable by keyboard and
 * usable on touch. Closes on Escape and on outside click.
 */
function InfoTooltip({ label, heading, children, className }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const popoverId = useId();

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event) {
      if (event.key === "Escape") setOpen(false);
    }
    function onPointerDown(event) {
      if (!wrapRef.current?.contains(event.target)) setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <Box
      ref={wrapRef}
      as="span"
      className={cn("relative inline-flex items-center gap-2", className)}
    >
      {label}
      <button
        type="button"
        title={`Click Here to View ${heading}`}
        aria-expanded={open}
        aria-describedby={open ? popoverId : undefined}
        onClick={() => setOpen((value) => !value)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className={cn(
          "grid size-4 flex-none cursor-pointer place-items-center rounded-full border font-serif text-[11px] leading-none italic transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy",
          open
            ? "border-navy bg-navy text-lime"
            : "border-ink/22 text-ink/60 hover:border-navy hover:bg-navy hover:text-lime",
        )}
      >
        <span aria-hidden="true">i</span>
        <span className="sr-only">{heading}</span>
      </button>

      <Box
        as="span"
        id={popoverId}
        role="tooltip"
        className={cn(
          // ≤820px the popover flips to right-aligned so it never overflows.
          "absolute top-[calc(100%+11px)] z-60 w-[330px] max-w-[78vw] rounded-[14px] bg-navy px-4.5 py-4 font-body text-[13px] leading-[1.65] tracking-normal text-paper normal-case shadow-[0_26px_54px_-28px_rgba(10,22,40,0.75)] transition-[opacity,transform] duration-200",
          "max-md:right-0 max-md:left-auto md:left-0",
          // Arrow
          "before:absolute before:-top-1.5 before:size-3 before:rotate-45 before:rounded-[2px] before:bg-navy before:content-['']",
          "max-md:before:right-[22px] md:before:left-[22px]",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-[5px] opacity-0",
        )}
      >
        <b className="mb-2 block font-mono text-[9.5px] tracking-[0.15em] text-lime uppercase">
          {heading}
        </b>
        {children}
      </Box>
    </Box>
  );
}

export default InfoTooltip;
