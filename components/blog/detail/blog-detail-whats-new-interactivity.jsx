"use client";

import { useEffect } from "react";
import { format } from "date-fns";

/**
 * Progressive enhancement for the `.whats-new` box the CMS body HTML ships as
 * static markup. Ported from the Webflow site's own embed script, which isn't
 * part of this pipeline:
 * - `.custom-scroll` links carry a `data-fs-toc` id instead of a real `href`.
 *   On Webflow, Finsweet's TOC widget generated a matching real anchor to
 *   delegate the click to; that widget isn't part of this pipeline, so this
 *   scrolls straight to the heading `lib/content/blog.js` generates that same
 *   id for (`addHeadingIds`) instead of hunting for a TOC link that doesn't
 *   exist here.
 * - `#last-revised-date` is filled in from `lastRevisedDate` (`blog.meta.site_published_at`),
 *   the same field `BlogHero`'s "Updated On" label reads, rather than parsed
 *   out of a hidden CMS body field — one source of truth for that date.
 */
export default function BlogDetailWhatsNewInteractivity({ lastRevisedDate }) {
  useEffect(() => {
    const hub = document.querySelector(".whats-new-hub");
    if (hub) {
      hub.style.display = document.querySelector(".whats-new") ? "flex" : "none";
    }

    const revisedDateEl = document.getElementById("last-revised-date");
    if (revisedDateEl && lastRevisedDate) {
      revisedDateEl.innerHTML = `<b>${format(new Date(lastRevisedDate), "MMM d, yyyy")}</b>`;
    }

    function handleClick(e) {
      const link = e.target.closest(".custom-scroll");
      if (!link) return;
      e.preventDefault();
      const tocId = link.getAttribute("data-fs-toc");
      if (!tocId) return;
      document.getElementById(tocId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [lastRevisedDate]);

  return null;
}
