"use client";

import Box from "@/components/ui/Box";
import CtaButton from "@/components/common/cta-button";

/** Smooth-scroll to a hash without writing it into the URL bar. */
function scrollToHash(event) {
  const id = event.currentTarget.getAttribute("href")?.slice(1);
  const target = id && document.getElementById(id);
  if (!target) return;
  event.preventDefault();
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
}

/**
 * CTA row for CourseBannerV2.
 *
 * First action: lime pill (primary CTA).
 * Second action: ghost pill.
 * Hash hrefs are scroll-intercepted so the URL stays clean.
 */
export default function CourseBannerV2Actions({ actions = [] }) {
  if (!actions.length) return null;

  return (
    <Box className="flex flex-wrap gap-3">
      {actions.map((action, i) => (
        <CtaButton
          key={action.label}
          variant={i === 0 ? "primary" : "ghost"}
          color={i === 0 ? "lime" : "navy"}
          arrow={i === 0}
          render={
            <a
              href={action.href}
              title={action.title}
              onClick={scrollToHash}
            />
          }
        >
          {action.label}
        </CtaButton>
      ))}
    </Box>
  );
}
