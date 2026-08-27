"use client";

import Box from "@/components/ui/Box";
import CtaButton from "@/components/common/cta-button";

// Plain in-page anchors would let the browser natively navigate to `#id` on
// click, leaving that hash in the URL — a later hard refresh then jumps
// straight past the hero to that section instead of starting at the top.
// Intercepting the click and scrolling manually (same pattern as
// page-toc.jsx's scrollToId) keeps the URL clean.
function scrollToHash(event) {
  const id = event.currentTarget.getAttribute("href")?.slice(1);
  const target = id && document.getElementById(id);
  if (!target) return;
  event.preventDefault();
  const reduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  target.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
}

function HeroActions({ actions }) {
  return (
    <Box className="flex flex-wrap gap-3">
      {actions.map((action) => (
        <CtaButton
          key={action.label}
          variant={action.variant}
          arrow
          render={<a href={action.href} onClick={scrollToHash} />}
        >
          {action.label}
        </CtaButton>
      ))}
    </Box>
  );
}

export default HeroActions;
