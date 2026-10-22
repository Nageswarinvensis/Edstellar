"use client";

import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";

import Box from "@/components/ui/Box";
import SiteSearch from "@/components/layout/site-search";
import { cn } from "@/lib/utils";

const INPUT_ID = "site-q";

/**
 * Desktop header search — a round icon button that drops a full-width search
 * bar under the header, because the nav has no room for an inline field.
 * The bar is positioned against the header (the nearest positioned ancestor),
 * and sits below the mega-menu panels so a hovered tab still opens over it.
 * Closes on Escape or a click outside.
 */
export default function HeaderSearch({ className }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    document.getElementById(INPUT_ID)?.focus();

    const onKey = (ev) => {
      if (ev.key === "Escape") setOpen(false);
    };
    const onDocClick = (ev) => {
      if (rootRef.current && !rootRef.current.contains(ev.target)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDocClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDocClick);
    };
  }, [open]);

  return (
    <Box ref={rootRef} className={className}>
      <Box
        as="button"
        type="button"
        aria-label={open ? "Close search" : "Search Edstellar"}
        aria-expanded={open}
        aria-controls="header-search-panel"
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "grid size-10 cursor-pointer place-items-center rounded-full border border-ink/22 text-navy transition-colors duration-200 hover:border-navy",
          open && "border-navy bg-navy text-paper",
        )}
      >
        {open ? <X size={18} strokeWidth={1.8} /> : <Search size={18} strokeWidth={1.8} />}
      </Box>

      <Box
        id="header-search-panel"
        hidden={!open}
        className="absolute inset-x-0 top-full z-10 border-b border-ink/12 bg-white shadow-[0_12px_32px_rgba(10,22,40,0.10)]"
      >
        <Box className="mx-auto max-w-[1360px] px-10 py-5">
          <SiteSearch id={INPUT_ID} mobile className="mx-auto max-w-[720px]" />
        </Box>
      </Box>
    </Box>
  );
}
