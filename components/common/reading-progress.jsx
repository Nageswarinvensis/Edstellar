"use client";

import { useEffect, useState } from "react";
import { Progress as ProgressPrimitive } from "@base-ui/react/progress";

import { ProgressIndicator, ProgressTrack } from "@/components/ui/progress";

/**
 * Hairline at the very top of the viewport tracking scroll depth through
 * the page. Sits above `SiteHeader` (z-1000 vs the header's z-900/mobile
 * nav's z-899) so it stays visible whether the header is pinned, hidden,
 * or a page-level sub-nav has taken over underneath it.
 */
export default function ReadingProgress() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    function update() {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const max = scrollHeight - clientHeight;
      setValue(max > 0 ? (scrollTop / max) * 100 : 0);
    }

    let raf = 0;
    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        update();
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <ProgressPrimitive.Root
      value={value}
      aria-label="Page scroll progress"
      className="fixed inset-x-0 top-0 z-1000"
    >
      <ProgressTrack className="h-0.75 w-full rounded-none bg-transparent">
        <ProgressIndicator className="rounded-none bg-lime transition-[width] duration-100 ease-linear" />
      </ProgressTrack>
    </ProgressPrimitive.Root>
  );
}
