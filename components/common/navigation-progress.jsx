"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * Top-of-page progress bar for client-side navigations.
 *
 * WHY NOT loading.jsx:
 *   A route-level loading.jsx wraps the page in a Suspense boundary, and
 *   Next.js commits a streaming 200 as soon as that fallback renders. A later
 *   notFound() cannot then set the HTTP status — every bogus URL becomes a
 *   soft 404 (200 carrying not-found content, which Google indexes). This bar
 *   renders outside the page tree, so it cannot affect any status code.
 *
 * WHY usePathname AND NOT useSearchParams:
 *   useSearchParams() in a client component requires a Suspense boundary during
 *   static rendering; without one the build fails, and wrapping the layout in
 *   one reintroduces the soft-404 problem above.
 *
 * WHY CLICK AND NOT pushState:
 *   The App Router calls pushState when a navigation *commits*, i.e. after the
 *   RSC payload has already arrived. Starting the bar there shows it after the
 *   wait is over. A capture-phase click fires at the real start of the wait.
 */

const SHOW_DELAY_MS = 150;  // navigations faster than this show no bar at all
const CREEP_TARGET = 0.9;   // never signals "done" early
const CREEP_MS = 8000;
const FINISH_MS = 200;
const STALL_TIMEOUT_MS = 15000;

// Brand colours for the favicon spinner
const NAVY = "#0a1628";
const LIME  = "#c8f135";

function getFaviconLink() {
  return (
    document.querySelector("link[rel~='icon']") ||
    (() => {
      const l = document.createElement("link");
      l.rel = "icon";
      document.head.appendChild(l);
      return l;
    })()
  );
}

export default function NavigationProgress() {
  const pathname = usePathname();
  const [phase, setPhase] = useState("idle");
  const phaseRef = useRef("idle");
  const timers = useRef([]);
  const faviconState = useRef(null); // { link, originalHref, rafId }

  const go = (next) => {
    phaseRef.current = next;
    setPhase(next);
  };

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const after = (ms, fn) => {
    timers.current.push(setTimeout(fn, ms));
  };

  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor =
        e.target instanceof Element ? e.target.closest("a[href]") : null;
      if (!anchor) return;
      if (anchor.hasAttribute("download")) return;
      if (anchor.target && anchor.target !== "_self") return;

      let url;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return;

      clearTimers();
      phaseRef.current = "pending";
      after(SHOW_DELAY_MS, () => {
        if (phaseRef.current !== "pending") return;
        go("loading");
        after(STALL_TIMEOUT_MS, () => {
          if (phaseRef.current === "loading") go("idle");
        });
      });
    };

    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      clearTimers();
    };
  }, []);

  useEffect(() => {
    const current = phaseRef.current;
    if (current !== "loading" && current !== "pending") return;
    clearTimers();
    if (current === "pending") {
      phaseRef.current = "idle";
      return;
    }
    go("done");
    after(FINISH_MS, () => go("idle"));
  }, [pathname]);

  // Favicon spinner — starts when loading, restores when done/idle.
  useEffect(() => {
    if (phase === "loading") {
      const link = getFaviconLink();
      const originalHref = link.href;
      const canvas = document.createElement("canvas");
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext("2d");
      let start = null;
      let rafId;

      function draw(ts) {
        if (!start) start = ts;
        const angle = ((ts - start) / 800) * Math.PI * 2;
        ctx.clearRect(0, 0, 32, 32);
        // Navy background circle
        ctx.beginPath();
        ctx.arc(16, 16, 15, 0, Math.PI * 2);
        ctx.fillStyle = NAVY;
        ctx.fill();
        // Lime spinning arc
        ctx.beginPath();
        ctx.arc(16, 16, 10, angle, angle + Math.PI * 1.4);
        ctx.strokeStyle = LIME;
        ctx.lineWidth = 3.5;
        ctx.lineCap = "round";
        ctx.stroke();
        link.href = canvas.toDataURL("image/png");
        rafId = requestAnimationFrame(draw);
      }

      rafId = requestAnimationFrame(draw);
      faviconState.current = { link, originalHref, rafId };

      return () => {
        cancelAnimationFrame(rafId);
      };
    } else {
      // Restore original favicon
      if (faviconState.current) {
        cancelAnimationFrame(faviconState.current.rafId);
        faviconState.current.link.href = faviconState.current.originalHref;
        faviconState.current = null;
      }
    }
  }, [phase]);

  const [grown, setGrown] = useState(false);
  useEffect(() => {
    if (phase !== "loading") {
      setGrown(false);
      return;
    }
    const id = requestAnimationFrame(() => setGrown(true));
    return () => cancelAnimationFrame(id);
  }, [phase]);

  if (phase === "idle" || phase === "pending") return null;

  const finishing = phase === "done";
  const scale = finishing ? 1 : grown ? CREEP_TARGET : 0.02;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[1001] h-[2px]"
    >
      <div
        className="h-full w-full origin-left bg-navy"
        style={{
          transform: `scaleX(${scale})`,
          transition: finishing
            ? `transform ${FINISH_MS}ms ease-out, opacity ${FINISH_MS}ms ease-out`
            : `transform ${CREEP_MS}ms cubic-bezier(0.1, 0.9, 0.2, 1)`,
          opacity: finishing ? 0 : 1,
        }}
      />
    </div>
  );
}
