"use client";

import { useEffect } from "react";

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
 * - `#last-revised-date` is filled in from `#update-date`, a hidden CMS field
 *   elsewhere in the post body carrying the raw "Updated On {date}" text.
 */
export default function WhatsNewInteractivity() {
  useEffect(() => {
    const hub = document.querySelector(".whats-new-hub");
    if (hub) {
      hub.style.display = document.querySelector(".whats-new") ? "flex" : "none";
    }

    const updateDateEl = document.getElementById("update-date");
    const revisedDateEl = document.getElementById("last-revised-date");
    if (updateDateEl && revisedDateEl) {
      revisedDateEl.innerHTML = `<b>${updateDateEl.innerText.replace("Updated On", "").trim()}</b>`;
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
  }, []);

  return null;
}
