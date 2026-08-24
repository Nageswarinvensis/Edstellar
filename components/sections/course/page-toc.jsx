"use client";

import { useEffect, useRef, useState } from "react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { CtaButton } from "@/components/shared/CtaButton";
import { cn } from "@/lib/utils";

/**
 * Left-hand "on this page" rail beside the Curriculum/Audience/Delivery/FAQ
 * run — sticky at `xl` and up only, matching the source design's `.spine`
 * (it hides below the source's 1000px breakpoint entirely — there is no
 * mobile fallback nav on this page, matching its `.spine-m` chip bar not
 * being ported either).
 *
 * `top-17` matches `SiteHeader`'s own height (`h-17`, always sticky and
 * visible on this page — there is no secondary nav bar above this one to
 * additionally clear).
 *
 * The nav is a real grid column, not an absolute overlay: the wrapper is
 * `xl:grid xl:grid-cols-[nav_1fr]` with exactly two grid items — the nav and
 * a single Box wrapping every section — so there is only one implicit row
 * and no row-spanning trick is needed. The nav stays visually pinned via
 * `xl:sticky` against that row's height (the combined height of every
 * section). This is safe because every section in this run shares the same
 * background — there is no full-bleed color difference between them that a
 * shared column width would clip.
 *
 * Active-state tracking is scroll-position-based (which section's top has
 * been crossed), not IntersectionObserver, matching the source design — a
 * thin observer band can sit fully inside one of these (very tall) sections
 * without ever re-firing, and the same scroll calc is what lets the
 * curriculum item nest its own active module underneath it.
 */
export default function PageToc({ toc, modules, children }) {
  const items = toc?.items;
  const [activeId, setActiveId] = useState(null);
  const [activeModule, setActiveModule] = useState(null);
  const navRef = useRef(null);
  const mobileNavRef = useRef(null);

  // Publishes the mobile chip bar's real height as a CSS var so anything
  // else that needs to stick below it (e.g. CurriculumModules' own filter
  // bar) can offset off `var(--mobile-toc-h)` instead of a guessed pixel
  // value. Resolves to 0 automatically once `xl:hidden` takes the bar out
  // of layout, so downstream consumers don't need a breakpoint of their own.
  useEffect(() => {
    const nav = mobileNavRef.current;
    if (!nav || typeof ResizeObserver === "undefined") return;

    const setHeight = () => {
      document.documentElement.style.setProperty(
        "--mobile-toc-h",
        `${nav.offsetHeight}px`,
      );
    };

    const observer = new ResizeObserver(setHeight);
    observer.observe(nav);
    setHeight();

    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--mobile-toc-h");
    };
  }, [items]);

  useEffect(() => {
    if (!items?.length || typeof window === "undefined") return;

    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);
    if (!sections.length) return;

    const moduleSectionId = items.find((item) => item.hasModules)?.id;
    const moduleEls = modules?.length
      ? modules
          .map((module) => document.getElementById(`mod-${module.number}`))
          .filter(Boolean)
      : [];

    const topOf = (el) => el.getBoundingClientRect().top + window.scrollY;

    function update() {
      const y = window.scrollY + window.innerHeight * 0.3;

      let current = null;
      sections.forEach((section) => {
        if (topOf(section) <= y) current = section.id;
      });
      setActiveId(current);

      if (current === moduleSectionId && moduleEls.length) {
        let index = -1;
        moduleEls.forEach((el, i) => {
          if (topOf(el) <= y) index = i;
        });
        setActiveModule(index >= 0 ? modules[index].number : null);
      } else {
        setActiveModule(null);
      }
    }

    let raf = 0;
    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        update();
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, [items, modules]);

  // Keep the active module link inside the nav's own scroll container —
  // the module sub-list can run longer than the viewport.
  useEffect(() => {
    if (!activeModule || !navRef.current) return;
    navRef.current
      .querySelector(`[data-mod="${activeModule}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [activeModule]);

  // Center the active chip in the mobile scrolling bar as the section
  // changes underneath, so the highlighted item never sits clipped at the
  // scroller's edge.
  useEffect(() => {
    if (!activeId || !mobileNavRef.current) return;
    mobileNavRef.current
      .querySelector(`[data-section="${activeId}"]`)
      ?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
  }, [activeId]);

  function scrollToId(id, block) {
    return (event) => {
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block });
    };
  }

  if (!items?.length) return <>{children}</>;

  return (
    <Box className="relative lg:px-10">
      {/* Mobile/tablet fallback: the sticky rail becomes a scrolling chip
          bar below `xl` — matching the source design's `.spine-m`. No
          module sub-list here, only the top-level sections. */}
      <nav
        ref={mobileNavRef}
        aria-label="Sections"
        className="no-scrollbar sticky top-17 z-30 flex gap-2 overflow-x-auto border-b border-ink/10 bg-paper px-5 py-2.75 xl:hidden"
      >
        {items.map((item) => {
          const isActive = item.id === activeId;

          return (
            <Box
              as="a"
              key={item.id}
              data-section={item.id}
              href={`#${item.id}`}
              onClick={scrollToId(item.id, "start")}
              className={cn(
                "flex-none rounded-full border px-3.25 py-1.75 font-mono text-[10.5px] tracking-[0.08em] whitespace-nowrap uppercase transition-colors duration-200",
                isActive
                  ? "border-navy bg-navy text-lime"
                  : "border-ink/22 text-ink/60",
              )}
            >
              {item.label}
            </Box>
          );
        })}
      </nav>

      <Box className="xl:mx-auto xl:grid xl:max-w-7xl xl:grid-cols-[15.25rem_1fr] xl:items-start xl:gap-x-10 ">
        <nav
          ref={navRef}
          aria-label="On this page"
          className="hidden xl:block xl:sticky xl:top-17 xl:max-h-[calc(100vh-6.25rem)] xl:self-start xl:overflow-y-auto xl:pt-6 xl:pb-6"
        >
          <Box as="ol" className="space-y-1">
            {items.map((item) => {
              const isActive = item.id === activeId;
              const showModules =
                item.hasModules && isActive && modules?.length;

              return (
                <Box as="li" key={item.id}>
                  <Box
                    as="a"
                    href={`#${item.id}`}
                    onClick={scrollToId(item.id, "start")}
                    className={cn(
                      "flex items-baseline gap-2.5 rounded-[9px] border-l-2 px-3 py-2 transition-colors duration-200",
                      isActive
                        ? "border-l-lime bg-paper-warm"
                        : "border-l-transparent hover:bg-paper-warm",
                    )}
                  >
                    <Text
                      as="span"
                      className={cn(
                        "flex-none pt-px font-mono text-[10px] tracking-[0.1em]",
                        isActive ? "text-ink" : "text-ink/45",
                      )}
                    >
                      {item.number}
                    </Text>
                    <Text
                      as="span"
                      className={cn(
                        "font-display text-[13.5px] leading-[1.35] font-semibold tracking-[-0.015em]",
                        isActive ? "text-ink" : "text-ink/60",
                      )}
                    >
                      {item.label}
                    </Text>
                  </Box>

                  {showModules ? (
                    <Box
                      as="ol"
                      className="mt-0.5 mb-2.5 space-y-0.25 border-l border-ink/12 pl-3"
                    >
                      {modules.map((module) => {
                        const isActiveModule = module.number === activeModule;

                        return (
                          <Box as="li" key={module.number}>
                            <Box
                              as="a"
                              href={`#mod-${module.number}`}
                              data-mod={module.number}
                              onClick={scrollToId(
                                `mod-${module.number}`,
                                "center",
                              )}
                              className={cn(
                                "flex items-baseline gap-2 rounded-[7px] px-2.5 py-1.25 transition-colors duration-200",
                                isActiveModule
                                  ? "bg-paper-cream"
                                  : "hover:bg-paper-warm",
                              )}
                            >
                              <Text
                                as="span"
                                className={cn(
                                  "flex-none font-mono text-[9.5px] tracking-[0.08em]",
                                  isActiveModule
                                    ? "text-ink/75"
                                    : "text-ink/40",
                                )}
                              >
                                {module.number}
                              </Text>
                              <Text
                                as="span"
                                className={cn(
                                  "text-[12px] leading-[1.4] font-medium",
                                  isActiveModule ? "text-ink" : "text-ink/55",
                                )}
                              >
                                {module.title}
                              </Text>
                            </Box>
                          </Box>
                        );
                      })}
                    </Box>
                  ) : null}
                </Box>
              );
            })}
          </Box>

          {toc.cta ? (
            <Box className="mt-5.5 border-t border-ink/12 pt-5">
              <CtaButton
                block
                arrow
                render={<a href={toc.cta.href} />}
              >
                {toc.cta.label}
              </CtaButton>
              {toc.cta.note ? (
                <Text
                  as="p"
                  className="mt-2.25 text-[11.5px] leading-[1.5] text-ink/45"
                >
                  {toc.cta.note}
                </Text>
              ) : null}
            </Box>
          ) : null}
        </nav>

        <Box className="min-w-0 xl:[&>section]:px-0">{children}</Box>
      </Box>
    </Box>
  );
}
