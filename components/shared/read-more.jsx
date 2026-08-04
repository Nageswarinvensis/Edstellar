"use client";

import { useId, useState } from "react";

import Box from "@/components/ui/Box";
import { cn } from "@/lib/utils";

/**
 * "Read more" disclosure used by the definition blocks.
 *
 * Design: `.def-more` / `.def-toggle`
 *
 * The collapsed copy stays in the DOM — it is real indexable content, and this
 * is a genuine disclosure, not hidden text. Uses an animated grid row rather
 * than the design's `max-height:700px` so long copy can never be clipped.
 *
 * Children are server-rendered and passed straight through; this component only
 * toggles state.
 */
function ReadMore({
  children,
  labelClosed = "Read more",
  labelOpen = "Read less",
  showIcon = false,
  tone = "light",
  className,
}) {
  const [open, setOpen] = useState(false);
  const contentId = useId();
  const dark = tone === "dark";

  return (
    <Box className={className}>
      <Box
        id={contentId}
        inert={open ? undefined : true}
        className={cn(
          "grid transition-[grid-template-rows] duration-500 ease-out motion-reduce:transition-none",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <Box className="overflow-hidden">{children}</Box>
      </Box>

      <button
        type="button"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "mt-1.5 inline-flex cursor-pointer items-center gap-2 border-b py-2 font-mono text-[11px] tracking-[0.16em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
          dark
            ? "border-paper/30 text-paper hover:border-paper focus-visible:outline-lime"
            : "border-ink/22 text-ink hover:border-navy focus-visible:outline-navy"
        )}
      >
        {open ? labelOpen : labelClosed}
        {showIcon ? (
          <span
            aria-hidden="true"
            className={cn(
              "inline-block transition-transform duration-300 motion-reduce:transition-none",
              open && "rotate-45"
            )}
          >
            +
          </span>
        ) : null}
      </button>
    </Box>
  );
}

export default ReadMore;
