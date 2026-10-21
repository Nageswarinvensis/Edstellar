"use client";

import { useEffect } from "react";
import Link from "next/link";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { MEGA_NAV } from "@/lib/nav-data";
import SiteSearch from "@/components/layout/site-search";

function Chevron() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-5 flex-none text-ink-muted transition-transform duration-200 group-open/sec:rotate-180"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

/**
 * Slide-down drawer for SiteHeader below the mega-menu breakpoint. Controlled
 * by the parent (no open state here). Each top-level section is a native
 * <details> accordion — no JS, and every link stays in the HTML for crawlers.
 */
export default function MobileNav({ id, open, onClose, onOpenBrief, cta }) {
  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <>
      <Box
        aria-hidden="true"
        onClick={onClose}
        className={`
          fixed inset-0 z-[895] bg-navy/40 backdrop-blur-[2px]
          transition-opacity duration-200 nav:hidden
          ${open ? "opacity-100" : "pointer-events-none opacity-0"}
        `}
      />
      <Box
        id={id}
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        className={`
          fixed inset-x-0 top-17 z-899
          max-h-[calc(100vh-68px)] overflow-y-auto overscroll-contain
          border-t border-ink/12 bg-paper
          shadow-[0_24px_48px_-24px_rgba(10,22,40,0.35)]
          transition-[transform,opacity] duration-250 ease-out nav:hidden
          ${open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"}
        `}
      >
        <Box as="nav" aria-label="Main" className="flex flex-col px-5 pt-2 pb-8">
          <SiteSearch id="site-q-mobile" mobile className="mt-3 mb-1" />
          {MEGA_NAV.map((section) => (
            <Box
              as="details"
              key={section.id}
              className="group/sec border-b border-ink/12"
            >
              <Box
                as="summary"
                className="flex cursor-pointer list-none items-center justify-between gap-3 py-4 font-display text-[17px] font-semibold text-ink marker:hidden [&::-webkit-details-marker]:hidden"
              >
                {section.tab}
                <Chevron />
              </Box>
              <Box className="pb-4">
                {section.groups.map((group) => (
                  <Box key={group.heading} className="mb-3 last:mb-0">
                    <Text
                      as="p"
                      className="mt-3 mb-1 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted"
                    >
                      {group.heading}
                    </Text>
                    <Box as="ul" className="list-none">
                      {group.links.map((link) => (
                        <li key={link.href + link.label}>
                          <Link
                            href={link.href}
                            title={`Click Here to View ${link.label}`}
                            onClick={onClose}
                            className="block min-h-11 py-2 text-[15px] leading-relaxed text-ink/75 transition-colors duration-200 hover:text-ink hover:underline hover:underline-offset-4"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </Box>
                    {group.more && (
                      <Link
                        href={group.more.href}
                        title={`Click Here to View ${group.more.label}`}
                        onClick={onClose}
                        className="mb-1 inline-flex min-h-11 items-center gap-2 py-2 text-[15px] font-semibold text-navy transition-colors duration-200 hover:underline hover:underline-offset-4"
                      >
                        {group.more.label}
                        <svg
                          viewBox="0 0 24 24"
                          width="16"
                          height="16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                          className="size-4 flex-none"
                        >
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </Link>
                    )}
                  </Box>
                ))}
                {section.foot && (
                  <Link
                    href={section.foot.href}
                    title={`Click Here to View ${section.foot.label}`}
                    onClick={onClose}
                    className="mt-1 inline-flex min-h-11 items-center gap-2 py-2 text-[15px] font-semibold text-navy transition-colors duration-200 hover:underline hover:underline-offset-4"
                  >
                    {section.foot.label}
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="size-4"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </Link>
                )}
              </Box>
            </Box>
          ))}

          <Box
            as="button"
            type="button"
            onClick={onOpenBrief}
            className="mt-6 inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-navy px-6 py-3.5 font-body text-[14px] font-semibold text-lime transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(10,22,40,0.14)]"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true" className="size-3.5 flex-none">
              <path d="M12 3v5M12 16v5M3 12h5M16 12h5M6.5 6.5l2.5 2.5M15 15l2.5 2.5M6.5 17.5L9 15M15 9l2.5-2.5" />
            </svg>
            {cta.label}
          </Box>
        </Box>
      </Box>
    </>
  );
}
