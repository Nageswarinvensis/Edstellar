"use client";

import { useEffect, useRef } from "react";

import { setHeaderHidden } from "@/lib/client/header-visibility";

/**
 * Zero-height marker placed directly above a `sticky top-0` in-page nav. Once
 * it scrolls past the top of the viewport the nav has pinned, so the global
 * SiteHeader slides away instead of sitting on top of it — the same hand-off
 * the course/TNA tab bar (`sections/domain/sticky-navbar.jsx`) does.
 */
export default function HeaderHideSentinel() {
  const ref = useRef(null);

  useEffect(() => {
    const sentinel = ref.current;
    if (!sentinel) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      setHeaderHidden(sentinel.getBoundingClientRect().top < 0);
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
      setHeaderHidden(false);
    };
  }, []);

  return <div ref={ref} aria-hidden="true" className="h-px w-full" />;
}
