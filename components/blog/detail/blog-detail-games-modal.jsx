"use client";

import { useEffect } from "react";

/**
 * Progressive enhancement for the CMS's step-by-step "demo" games content
 * (`.gdemo`/`.activity-card`/`.tabs-wrap`/`.bottom-grid` — the "games" style
 * block, lib/content/blog.js#STYLE_BLOCK_SIGNATURES). Ported from the
 * Webflow site's own embed script, which isn't part of this pipeline.
 *
 * Unlike the other `*-interactivity` components, this one also renders real
 * markup: the `#fsModal` fullscreen shell isn't part of `blog.body` — it's a
 * single page-level overlay every `.gdemo`'s fullscreen button opens into.
 * Everything else this wires up (.gdemo, .activity-card, .tabs-wrap,
 * .bottom-grid) already exists in the CMS body HTML.
 */
function initDemo(demo) {
  const scenes = demo.querySelectorAll(".gscene");
  const progEl = demo.querySelector(".gdemo-progress");
  const countEl = demo.querySelector(".gdemo-counter");
  const titleEl = demo.querySelector(".gtitle");
  const subEl = demo.querySelector(".gsub");
  const total = scenes.length;
  let idx = 0;

  progEl.innerHTML = "";
  for (let i = 0; i < total; i++) {
    const dot = document.createElement("div");
    dot.className = "gstep";
    dot.textContent = i + 1;
    dot.addEventListener("click", (e) => {
      e.stopPropagation();
      demo.classList.add("is-started");
      idx = i;
      render();
    });
    progEl.appendChild(dot);
    if (i < total - 1) {
      const line = document.createElement("div");
      line.className = "gline";
      progEl.appendChild(line);
    }
  }

  function render() {
    const dots = progEl.querySelectorAll(".gstep");
    const lines = progEl.querySelectorAll(".gline");
    dots.forEach((dot, d) => {
      dot.classList.toggle("active", d === idx);
      dot.classList.toggle("done", d < idx);
    });
    lines.forEach((line, l) => line.classList.toggle("done", l < idx));

    scenes.forEach((scene, s) => {
      if (s === idx) {
        scene.classList.remove("active");
        void scene.offsetWidth;
        scene.classList.add("active");
        if (!demo.closest("#fsMount")) {
          if (titleEl) titleEl.innerHTML = scene.getAttribute("data-title") || "";
          if (subEl) subEl.innerHTML = scene.getAttribute("data-sub") || "";
        }
      } else {
        scene.classList.remove("active");
      }
    });

    if (countEl) countEl.textContent = `Step ${idx + 1} of ${total}`;
    demo.classList.toggle("is-done", idx === total - 1);
  }

  function next() {
    demo.classList.add("is-started");
    idx = (idx + 1) % total;
    render();
  }

  function prev() {
    if (idx > 0) {
      idx--;
      render();
    }
  }

  function handleClick(e) {
    if (e.target.closest(".gdemo-fs-btn")) return;
    next();
  }

  demo.addEventListener("click", handleClick);

  if (!demo.closest("#fsMount") && scenes[0]) {
    if (titleEl) titleEl.innerHTML = scenes[0].getAttribute("data-title") || "";
    if (subEl) subEl.innerHTML = scenes[0].getAttribute("data-sub") || "";
  }
  render();

  return {
    next,
    prev,
    destroy: () => demo.removeEventListener("click", handleClick),
  };
}

export default function BlogDetailGamesModal() {
  useEffect(() => {
    const cleanups = [];
    const on = (el, type, handler) => {
      el.addEventListener(type, handler);
      cleanups.push(() => el.removeEventListener(type, handler));
    };

    // ══ Boot every .gdemo already on the page (CMS body content) ══
    const allDemos = Array.from(document.querySelectorAll(".gdemo")).filter(
      (demo) => !demo.closest("#fsMount"),
    );

    allDemos.forEach((demo) => {
      const engine = initDemo(demo);
      cleanups.push(engine.destroy);

      let fsBtn = demo.querySelector(":scope > .gdemo-fs-btn");
      if (!fsBtn) {
        fsBtn = document.createElement("button");
        fsBtn.type = "button";
        fsBtn.className = "gdemo-fs-btn";
        fsBtn.innerHTML =
          '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg> Fullscreen';
        demo.appendChild(fsBtn);
      }

      on(fsBtn, "click", (e) => {
        e.stopPropagation();
        openFullscreen(demo);
      });
    });

    // ══ Fullscreen modal ══
    const modal = document.getElementById("fsModal");
    const mount = document.getElementById("fsMount");
    const closeBtn = document.getElementById("fsClose");
    const bfsBtn = document.getElementById("fsBrowserFs");
    const prevBtn = document.getElementById("fsPrev");
    const nextBtn = document.getElementById("fsNext");
    const fsTitleEl = modal?.querySelector(".fs-title");
    const fsSubEl = modal?.querySelector(".fs-sub");
    let fsEngine = null;

    function openFullscreen(src) {
      if (!modal || !mount) return;
      const card = src.closest(".activity-card");

      mount.innerHTML = "";

      const clone = src.cloneNode(true);
      clone.removeAttribute("id");
      clone.classList.remove("is-done", "is-started");
      clone.querySelector(".gdemo-fs-btn")?.remove();

      mount.appendChild(clone);

      modal.classList.add("show");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";

      fsEngine = initDemo(clone);

      if (fsTitleEl) {
        fsTitleEl.textContent = card?.querySelector("h3.ac-title")?.textContent.trim() || "";
      }
      if (fsSubEl) {
        fsSubEl.textContent = card?.querySelector(".ac-desc")?.textContent.trim() || "";
      }
    }

    function closeFullscreen() {
      if (!modal || !mount) return;
      modal.classList.remove("show");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      mount.innerHTML = "";
      fsEngine?.destroy();
      fsEngine = null;
    }

    if (modal && mount && closeBtn && bfsBtn && prevBtn && nextBtn) {
      on(closeBtn, "click", closeFullscreen);
      on(modal, "click", (e) => {
        if (e.target === modal) closeFullscreen();
      });
      on(document, "keydown", (e) => {
        if (!modal.classList.contains("show")) return;
        if (e.key === "Escape") closeFullscreen();
        if (e.key === "ArrowRight") fsEngine?.next();
        if (e.key === "ArrowLeft") fsEngine?.prev();
      });
      on(nextBtn, "click", () => fsEngine?.next());
      on(prevBtn, "click", () => fsEngine?.prev());
      on(bfsBtn, "click", () => {
        const shell = modal.querySelector(".fs-shell");
        if (!document.fullscreenElement && shell?.requestFullscreen) {
          shell.requestFullscreen().catch(() => {
            // eslint-disable-next-line no-alert
            alert("Browser fullscreen was blocked.");
          });
        } else if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      });
    }

    // ══ Tabs — scoped per card ══
    document.querySelectorAll(".tabs-wrap").forEach((wrap) => {
      const row = wrap.querySelector(".tab-row");
      const tPrev = wrap.querySelector(".tab-prev");
      const tNext = wrap.querySelector(".tab-next");
      const tabs = wrap.querySelectorAll(".tab");
      const panels = wrap.closest(".activity-card")?.querySelectorAll(".tab-panels .tab-panel");
      if (!row || !tPrev || !tNext || !panels) return;

      tabs.forEach((tab, i) => {
        on(tab, "click", () => {
          tabs.forEach((t) => t.classList.remove("active"));
          panels.forEach((p) => p.classList.remove("active"));
          tab.classList.add("active");
          panels[i]?.classList.add("active");
        });
      });

      const scrollStep = () => Math.max(120, row.clientWidth * 0.65);
      const updateArrows = () => {
        tPrev.disabled = row.scrollLeft <= 2;
        tNext.disabled = row.scrollLeft + row.clientWidth >= row.scrollWidth - 2;
      };

      on(tPrev, "click", () => row.scrollBy({ left: -scrollStep(), behavior: "smooth" }));
      on(tNext, "click", () => row.scrollBy({ left: scrollStep(), behavior: "smooth" }));
      row.addEventListener("scroll", updateArrows, { passive: true });
      cleanups.push(() => row.removeEventListener("scroll", updateArrows));
      updateArrows();
    });

    function updateAllTabArrows() {
      document.querySelectorAll(".tab-row").forEach((row) => {
        const wrap = row.closest(".tabs-wrap");
        const tPrev = wrap?.querySelector(".tab-prev");
        const tNext = wrap?.querySelector(".tab-next");
        if (!tPrev || !tNext) return;
        tPrev.disabled = row.scrollLeft <= 2;
        tNext.disabled = row.scrollLeft + row.clientWidth >= row.scrollWidth - 2;
      });
    }
    on(window, "resize", updateAllTabArrows);

    // ══ Mobile carousel dots — all grids ══
    document.querySelectorAll(".bottom-grid").forEach((grid) => {
      const card = grid.closest(".activity-card");
      const dotWrap = card?.querySelector(".bg-dots");
      const dotEls = dotWrap ? dotWrap.querySelectorAll(".dot") : [];
      const miniCards = grid.querySelectorAll(".mini-card");

      const getIdx = () => {
        if (!miniCards.length) return 0;
        const w = miniCards[0].getBoundingClientRect().width + 12;
        return Math.round(grid.scrollLeft / w);
      };
      const syncDots = () => {
        const i = Math.max(0, Math.min(miniCards.length - 1, getIdx()));
        dotEls.forEach((d, n) => d.classList.toggle("active", n === i));
      };

      grid.addEventListener("scroll", syncDots, { passive: true });
      cleanups.push(() => grid.removeEventListener("scroll", syncDots));

      dotEls.forEach((d, i) => {
        on(d, "click", () => {
          if (!miniCards.length) return;
          const w = miniCards[0].getBoundingClientRect().width + 12;
          grid.scrollTo({ left: i * w, behavior: "smooth" });
        });
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return (
    <div className="fs-modal" id="fsModal" aria-hidden="true">
      <div className="fs-shell" role="dialog" aria-modal="true">
        <div className="fs-head">
          <div>
            <h2 className="fs-title" id="fsTitle" />
            <p className="fs-sub" id="fsSub">
              Click the demo to advance · Arrow keys work too · Esc to close
            </p>
          </div>
          <div className="fs-actions">
            <button className="fs-action" id="fsBrowserFs" type="button">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
              Browser Fullscreen
            </button>
            <button className="fs-action fs-close" id="fsClose" type="button" aria-label="Close">
              &times;
            </button>
          </div>
        </div>

        <div className="fs-body">
          <div className="fs-demo-wrap" id="fsMount" />
        </div>

        <div className="fs-footer">
          <div className="fs-note">Click the demo to advance. Arrow keys and Esc also work.</div>
          <div className="fs-controls">
            <button className="fs-nav sec" id="fsPrev" type="button">
              &#x2190; Previous
            </button>
            <button className="fs-nav" id="fsNext" type="button">
              Next &#x2192;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
