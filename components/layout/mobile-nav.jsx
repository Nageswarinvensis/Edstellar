"use client";

import { useEffect } from "react";
import Link from "next/link";

import Box from "@/components/ui/Box";
import { CtaButton } from "@/components/shared/CtaButton";

/**
 * Slide-down panel for SiteHeader's mobile menu. Controlled entirely by the
 * parent — no menu-open state lives here — so it stays a dumb presentational
 * leaf that SiteHeader (or any future trigger) can drive.
 */
export default function MobileNav({ id, open, onClose, links, cta }) {
  useEffect(() => {
    if (!open) return;

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
          transition-opacity duration-200 lg:hidden
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
          max-h-[calc(100vh-68px)] overflow-y-auto
          border-t border-ink/12 bg-paper
          shadow-[0_24px_48px_-24px_rgba(10,22,40,0.35)]
          transition-[transform,opacity] duration-250 ease-out lg:hidden
          ${open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"}
        `}
      >
        <Box as="nav" aria-label="Main" className="flex flex-col px-6 py-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="border-b border-ink/8 py-3.5 font-body text-[15px] font-medium text-ink/75 transition-colors duration-200 last:border-none hover:text-ink"
            >
              {link.label}
            </Link>
          ))}

          <CtaButton
            size="sm"
            arrow
            block
            className="mt-5"
            render={<Link href={cta.href} onClick={onClose} />}
          >
            {cta.label}
          </CtaButton>
        </Box>
      </Box>
    </>
  );
}
