"use client";

import { useRef, useState } from "react";

import Box from "@/components/ui/Box";
import { cn } from "@/lib/utils";

/**
 * The "Skill gap / Required level" switch on the hero matrix. The matrix
 * itself is server-rendered with both views' numbers and colours already in
 * the HTML; this only flips `data-view` on the enclosing `[data-matrix]`
 * element, and the matrix's `group-data-[view=req]` classes do the rest.
 */
export default function TnaMatrixToggle({ views, defaultView }) {
  const ref = useRef(null);
  const [view, setView] = useState(defaultView);

  const select = (id) => {
    setView(id);
    const matrix = ref.current?.closest("[data-matrix]");
    if (matrix) matrix.dataset.view = id;
  };

  return (
    <Box
      ref={ref}
      role="tablist"
      aria-label="Matrix view"
      className="inline-flex flex-none rounded-full bg-paper-warm p-[3px]"
    >
      {views.map((option) => {
        const active = option.id === view;
        return (
          <Box
            key={option.id}
            as="button"
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => select(option.id)}
            className={cn(
              "cursor-pointer rounded-full px-3 py-1.5 font-body text-[11.5px] leading-[1.7] font-bold transition-colors duration-200",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy",
              active ? "bg-navy text-paper" : "bg-transparent text-ink/60",
            )}
          >
            {option.label}
          </Box>
        );
      })}
    </Box>
  );
}
