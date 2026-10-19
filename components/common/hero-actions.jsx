"use client";

import Box from "@/components/ui/Box";
import CtaButton from "@/components/common/cta-button";
import { newTabProps } from "@/lib/links";

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

// Button styling is fixed by position, not read from the CMS: the primary CTA
// first, a secondary next, everything after it an outline. The CMS `action`
// only supplies the label and href.
const VARIANTS = ["primary", "secondary", "outline"];

function HeroActions({ actions }) {
  // `actions` is optional CMS content — a domain can ship a hero with no CTAs
  // (and `hero.jsx` already treats it as optional). Render nothing rather than
  // crashing on `undefined.map`.
  if (!actions?.length) return null;

  return (
    <Box className="flex flex-wrap gap-3">
      {actions.map((action, index) => (
        <CtaButton
          key={action.label}
          variant={VARIANTS[index] ?? "outline"}
          arrow
          // In-page anchors scroll; an absolute URL (a domain's brochure PDF)
          // opens in a new tab so the page stays open. Site paths navigate.
          render={
            <a
              href={action.href}
              onClick={scrollToHash}
              {...(/^https?:\/\//i.test(action.href ?? "")
                ? newTabProps(action.href)
                : {})}
            />
          }
        >
          {action.label}
        </CtaButton>
      ))}
    </Box>
  );
}

export default HeroActions;
