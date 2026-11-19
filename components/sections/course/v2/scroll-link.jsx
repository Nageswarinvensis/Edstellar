"use client";

import { cn } from "@/lib/utils";
import { V2_QUOTE_TOPIC_EVENT } from "@/components/sections/course/v2/buttons";

/**
 * An in-page link for the v2 sections. A `#hash` href smooth-scrolls to its
 * target without writing the hash into the URL bar; when `topic` is set it
 * is announced to the quote form (`V2_QUOTE_TOPIC_EVENT`), so the form shows
 * which section the visitor came from — the design's "contextual CTA".
 */

export default function V2ScrollLink({ href, topic, className, children, ...props }) {
  function onClick(event) {
    if (!href?.startsWith("#")) return;
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    event.preventDefault();
    // A module in the outline is a <details>: open it as well as scroll to it.
    if (target.tagName === "DETAILS") target.open = true;
    if (topic) window.dispatchEvent(new CustomEvent(V2_QUOTE_TOPIC_EVENT, { detail: topic }));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  }

  return (
    <a href={href} onClick={onClick} className={cn(className)} {...props}>
      {children}
    </a>
  );
}

