"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

import Box from "@/components/ui/Box";
import MegaMenu from "@/components/layout/mega-menu";
import MobileNav from "@/components/layout/mobile-nav";
import BriefComposer from "@/components/layout/brief-composer";
import SiteSearch from "@/components/layout/site-search";
import { MEGA_CTA } from "@/lib/constants";
import {
  subscribeHeaderHidden,
  getHeaderHiddenSnapshot,
  getHeaderHiddenServerSnapshot,
} from "@/lib/client/header-visibility";

function Spark() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true" className="size-3.5 flex-none">
      <path d="M12 3v5M12 16v5M3 12h5M16 12h5M6.5 6.5l2.5 2.5M15 15l2.5 2.5M6.5 17.5L9 15M15 9l2.5-2.5" />
    </svg>
  );
}

/**
 * Global sticky nav. Client Component: owns the mobile-drawer and
 * "Build your brief" open state, and hosts the desktop mega menu (which carries
 * its own open/hover/preview state). The header is the positioning context for
 * the full-width dropdown panels, so its horizontal padding lives on the inner
 * bar, not the header itself.
 *
 * The brief composer renders twice: a desktop panel inside the header
 * (absolute) and a mobile sheet outside it (fixed — a `transform` on the header
 * would otherwise capture it), with distinct id prefixes to avoid id clashes.
 *
 * On course pages the sticky tab bar takes over the top of the viewport once
 * pinned, so the header hides itself rather than sit underneath — see
 * `lib/client/header-visibility.js`.
 */
export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [briefOpen, setBriefOpen] = useState(false);
  const hidden = useSyncExternalStore(
    subscribeHeaderHidden,
    getHeaderHiddenSnapshot,
    getHeaderHiddenServerSnapshot,
  );

  const openBrief = () => {
    setOpen(false);
    setBriefOpen(true);
  };

  return (
    <>
      <Box
        as="header"
        className={`
          sticky top-0 z-900 border-b border-ink/12 bg-paper/94 backdrop-blur-[14px]
          transition-transform duration-300 ease-out
          ${hidden ? "-translate-y-full" : "translate-y-0"}
        `}
      >
        <Box className="mx-auto flex h-17 max-w-[1360px] items-center gap-5 px-5 lg:px-10">
          <Link
            href="/"
            aria-label="Edstellar home"
            title="Click Here to View Edstellar Home"
            className="mr-3 flex shrink-0 items-center duration-200 min-[1280px]:mr-6"
          >
            <Image src="/course/Edstellar.svg" alt="Edstellar" width={139} height={50} priority />
          </Link>

          <MegaMenu onOpenBrief={() => setBriefOpen(true)} />

          <SiteSearch id="site-q" className="w-60 shrink-0 max-[1439px]:w-52 max-[1279px]:w-36 max-nav:hidden" />

          <Box
            as="button"
            type="button"
            onClick={openBrief}
            aria-haspopup="dialog"
            aria-expanded={briefOpen}
            className="ml-auto inline-flex shrink-0 cursor-pointer items-center gap-2 whitespace-nowrap rounded-full bg-navy px-6 py-3 font-body text-[14px] font-semibold text-lime transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(10,22,40,0.14)] max-nav:hidden"
          >
            <Spark />
            {MEGA_CTA.label}
          </Box>

          <Box
            as="button"
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
            className="ml-auto hidden shrink-0 cursor-pointer items-center justify-center rounded-full p-2 text-ink transition-colors duration-200 hover:bg-ink/6 max-nav:flex"
          >
            {open ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
          </Box>
        </Box>

        {/* Desktop brief composer — absolute, positioned to the header. */}
        <BriefComposer
          open={briefOpen}
          onClose={() => setBriefOpen(false)}
          variant="desktop"
          idPrefix="bd"
        />
      </Box>

      {/* Rendered as siblings, not children, of the header: a `transform` on
          an ancestor creates a new containing block for `fixed` descendants,
          which would otherwise drag these along whenever the header hides. */}
      <MobileNav
        id="mobile-nav"
        open={open}
        onClose={() => setOpen(false)}
        onOpenBrief={openBrief}
        cta={MEGA_CTA}
      />
      <BriefComposer
        open={briefOpen}
        onClose={() => setBriefOpen(false)}
        variant="mobile"
        idPrefix="bm"
      />
    </>
  );
}
