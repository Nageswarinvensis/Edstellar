"use client";

import { useEffect, useRef, useState } from "react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { CtaButton } from "@/components/common/cta-button";
import { cn } from "@/lib/utils";

/**
 * Static TOC configuration.
 *
 * This was previously coming from the API through:
 * toc.items
 *
 * The TOC structure is now maintained directly in the component.
 */
const TOC_ITEMS = [
  {
    id: "curriculum",
    label: "Course syllabus",
    number: "01",
    has_modules: true,
  },
  {
    id: "skills",
    label: "What You'll Learn",
    number: "02",
    has_modules: false,
  },
  {
    id: "audience",
    label: "Who is it for",
    number: "03",
    has_modules: false,
  },
  {
    id: "certificate",
    label: "Certificate",
    number: "04",
    has_modules: false,
  },
  {
    id: "delivery",
    label: "Delivery format",
    number: "05",
    has_modules: false,
  },
  {
    id: "trainers",
    label: "Industry experts",
    number: "06",
    has_modules: false,
  },
  {
    id: "faqs",
    label: "FAQs",
    number: "07",
    has_modules: false,
  },
];

const TOC_CTA = {
  label: "Request a Proposal",
  href: "#apply",
  note: "A specialist replies within one business day.",
};

export default function PageToc({ modules, hasTrainers, children }) {
  /**
   * Keep the static TOC, but hide Trainers when there are
   * no trainers available on the course.
   */
  const items = TOC_ITEMS.filter(
    (item) => item.id !== "trainers" || hasTrainers,
  );

  const [activeId, setActiveId] = useState(null);
  const [activeModule, setActiveModule] = useState(null);

  const navRef = useRef(null);
  const mobileNavRef = useRef(null);

  /**
   * Publish the mobile TOC height as a CSS variable.
   */
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

  /**
   * Track the currently visible section.
   */
  useEffect(() => {
    if (!items?.length || typeof window === "undefined") return;

    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    if (!sections.length) return;

    const moduleSectionId = items.find((item) => item.has_modules)?.id;

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
        if (topOf(section) <= y) {
          current = section.id;
        }
      });

      setActiveId(current);

      /**
       * Track the active curriculum module.
       */
      if (current === moduleSectionId && moduleEls.length) {
        let index = -1;

        moduleEls.forEach((el, i) => {
          if (topOf(el) <= y) {
            index = i;
          }
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

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    window.addEventListener("resize", update, {
      passive: true,
    });

    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);

      if (raf) {
        cancelAnimationFrame(raf);
      }
    };
  }, [items, modules]);

  /**
   * Keep the active module visible inside the desktop TOC.
   */
  useEffect(() => {
    if (!activeModule || !navRef.current) return;

    navRef.current
      .querySelector(`[data-mod="${activeModule}"]`)
      ?.scrollIntoView({
        block: "nearest",
      });
  }, [activeModule]);

  /**
   * Center the active item inside the mobile TOC.
   */
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

  /**
   * Smooth scroll to a section.
   */
  function scrollToId(id, block) {
    return (event) => {
      const target = document.getElementById(id);

      if (!target) return;

      event.preventDefault();

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      target.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block,
      });
    };
  }

  if (!items?.length) {
    return <>{children}</>;
  }

  return (
    <Box className="relative lg:px-10">
      {/* Mobile / Tablet TOC */}
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

      {/* Desktop TOC + Content */}
      <Box className="xl:mx-auto xl:grid xl:max-w-7xl xl:grid-cols-[15.25rem_1fr] xl:items-start xl:gap-x-10">
        {/* Desktop TOC */}
        <nav
          ref={navRef}
          aria-label="On this page"
          className="hidden xl:block xl:sticky xl:top-17 xl:max-h-[calc(100vh-6.25rem)] xl:self-start xl:overflow-y-auto xl:pt-6 xl:pb-6"
        >
          <Box as="ol" className="space-y-1">
            {items.map((item) => {
              const isActive = item.id === activeId;

              const showModules =
                item.has_modules && isActive && modules?.length;

              return (
                <Box as="li" key={item.id}>
                  {/* Main TOC Item */}
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

                  {/* Curriculum Modules */}
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

          {/* CTA */}
          <Box className="mt-5.5 border-t border-ink/12 pt-5">
            <CtaButton block arrow render={<a href={TOC_CTA.href} />}>
              {TOC_CTA.label}
            </CtaButton>

            <Text
              as="p"
              className="mt-2.25 text-[11.5px] leading-normal text-ink/45"
            >
              {TOC_CTA.note}
            </Text>
          </Box>
        </nav>

        {/* Page Content */}
        <Box className="min-w-0 lg:[&>section]:px-0">{children}</Box>
      </Box>
    </Box>
  );
}
