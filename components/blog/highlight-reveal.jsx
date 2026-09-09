"use client";

import { useEffect } from "react";

const LINE_STAGGER_SECONDS = 0.35;

/**
 * `box-decoration-break: clone` gives a `.highlet` that wraps onto several
 * visual lines one background box per line, but it's still ONE element with
 * ONE `background-size`, so every wrapped line fills in lock-step. To make
 * the lines fill one after another instead, each multi-line `.highlet` is
 * split here into one real `<span class="highlet">` per rendered line (each
 * getting its own `transition-delay`), joined with a forced `<br>` at the
 * exact point the browser itself wrapped the text.
 *
 * Only plain-text `.highlet`s are split — one containing element children
 * (a nested `<a>`/`<b>`) is left as a single unit and falls back to the old
 * simultaneous fill, rather than risk mangling markup we didn't anticipate.
 *
 * The split happens once, at mount, against whatever width the viewport is
 * then — a later resize can leave the forced `<br>`s not matching where the
 * browser would now wrap the text on its own.
 */
function splitIntoLines(el) {
  if (el.children.length > 0) return;

  const words = el.textContent.split(" ").filter(Boolean);
  if (words.length < 2) return;

  const wordSpans = words.map((word) => {
    const span = document.createElement("span");
    span.textContent = word;
    return span;
  });

  el.textContent = "";
  wordSpans.forEach((span, i) => {
    el.appendChild(span);
    if (i < wordSpans.length - 1) el.appendChild(document.createTextNode(" "));
  });

  const lines = [];
  let lastTop = null;
  wordSpans.forEach((span) => {
    const top = span.offsetTop;
    if (lastTop === null || top !== lastTop) {
      lines.push([]);
      lastTop = top;
    }
    lines[lines.length - 1].push(span);
  });

  if (lines.length < 2) {
    // Fits on one line after all — put the plain text back.
    el.textContent = words.join(" ");
    return;
  }

  el.textContent = "";
  el.classList.remove("highlet");
  el.classList.add("highlet-split");
  lines.forEach((line, i) => {
    const lineEl = document.createElement("span");
    lineEl.className = "highlet";
    lineEl.style.transitionDelay = `${i * LINE_STAGGER_SECONDS}s`;
    line.forEach((span, j) => {
      lineEl.appendChild(span);
      if (j < line.length - 1) lineEl.appendChild(document.createTextNode(" "));
    });
    el.appendChild(lineEl);
    if (i < lines.length - 1) el.appendChild(document.createElement("br"));
  });
}

export default function HighlightReveal() {
  useEffect(() => {
    const originals = document.querySelectorAll(".highlet");
    if (!originals.length) return;

    originals.forEach(splitIntoLines);

    const marks = document.querySelectorAll(".highlet");

    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      marks.forEach((el) => el.classList.add("in-view"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("in-view", entry.isIntersecting);
        });
      },
      { threshold: 0.9 },
    );

    marks.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
