"use client";

import { useEffect } from "react";

/**
 * Progressive enhancement for the two accordion patterns the CMS body HTML
 * ships as static markup (`.faq-item`/`.faq-question` and `.nz-item`/`.nz-header`).
 * Webflow's own site JS drove these originally; that script isn't part of this
 * pipeline, so without this the markup renders but nothing responds to a click.
 *
 * The source HTML has no button semantics on the trigger elements, so the
 * accessibility attributes are applied here on mount rather than trusting the
 * CMS output.
 */
const PATTERNS = [
  { trigger: ".faq-question", item: ".faq-item", toggleClass: "active" },
  { trigger: ".nz-header", item: ".nz-item", toggleClass: "open" },
];

export default function AccordionInteractivity() {
  useEffect(() => {
    const cleanups = PATTERNS.map(({ trigger, item, toggleClass }) => {
      const triggers = document.querySelectorAll(trigger);

      triggers.forEach((el) => {
        el.setAttribute("role", "button");
        el.setAttribute("tabindex", "0");
        el.setAttribute(
          "aria-expanded",
          el.closest(item)?.classList.contains(toggleClass) ? "true" : "false",
        );
      });

      function toggle(el) {
        const container = el.closest(item);
        if (!container) return;
        const isOpen = container.classList.toggle(toggleClass);
        el.setAttribute("aria-expanded", isOpen ? "true" : "false");
      }

      function handleClick(e) {
        const el = e.target.closest(trigger);
        if (el) toggle(el);
      }

      function handleKeydown(e) {
        if (e.key !== "Enter" && e.key !== " ") return;
        const el = e.target.closest(trigger);
        if (!el) return;
        e.preventDefault();
        toggle(el);
      }

      document.addEventListener("click", handleClick);
      document.addEventListener("keydown", handleKeydown);

      return () => {
        document.removeEventListener("click", handleClick);
        document.removeEventListener("keydown", handleKeydown);
      };
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return null;
}
