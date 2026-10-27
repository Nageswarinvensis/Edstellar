"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

import Box from "@/components/ui/Box";
import MegaMenu from "@/components/layout/mega-menu";
import MobileNav from "@/components/layout/mobile-nav";
import BriefComposer from "@/components/layout/brief-composer";
import HeaderSearch from "@/components/layout/header-search";
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
 * Open state for a panel that is not in the HTML until first used. `show`
 * mounts it closed, then opens it two frames later, so its enter transition
 * still plays the first time; after that it stays mounted (closing animates
 * out, reopening is instant).
 */
function useLazyPanel() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  const show = () => {
    if (mounted) {
      setOpen(true);
      return;
    }
    setMounted(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setOpen(true)));
  };

  return { mounted, open, show, hide: () => setOpen(false) };
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
 * The mobile drawer and both brief panels are mounted only on first open
 * (`useLazyPanel`). Every page would otherwise ship ~55 KB of hidden markup:
 * the drawer repeats the mega menu's links, which stay in the HTML through
 * the desktop menu, so crawlers lose nothing; the brief panels are a form.
 *
 * On course pages the sticky tab bar takes over the top of the viewport once
 * pinned, so the header hides itself rather than sit underneath — see
 * `lib/client/header-visibility.js`.
 */
export default function SiteHeader() {
  const nav = useLazyPanel();
  const brief = useLazyPanel();
  const hidden = useSyncExternalStore(
    subscribeHeaderHidden,
    getHeaderHiddenSnapshot,
    getHeaderHiddenServerSnapshot,
  );

  const openBrief = () => {
    nav.hide();
    brief.show();
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
        <Box className="mx-auto flex h-17 max-w-[1360px] items-center gap-5 px-5 max-[1279px]:gap-4 lg:px-10">
          <Link
            href="/"
            aria-label="Edstellar home"
           
            className="mr-3 flex shrink-0 items-center duration-200 min-[1280px]:mr-6"
          >
            <Image src="/course/edstellar.svg" alt="Edstellar" width={139} height={50} priority />
          </Link>

          <MegaMenu onOpenBrief={brief.show} />

          <HeaderSearch className="shrink-0 max-nav:hidden" />

          <Box
            as="button"
            type="button"
            onClick={openBrief}
            aria-haspopup="dialog"
            aria-expanded={brief.open}
            className="ml-auto inline-flex shrink-0 cursor-pointer items-center gap-2 whitespace-nowrap rounded-full bg-navy px-6 py-3 font-body text-[14px] font-semibold text-lime transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(10,22,40,0.14)] max-nav:hidden"
          >
            <Spark />
            {MEGA_CTA.label}
          </Box>

          <Box
            as="button"
            type="button"
            aria-label={nav.open ? "Close menu" : "Open menu"}
            aria-expanded={nav.open}
            // Only once the drawer exists — it is not in the HTML until opened.
            aria-controls={nav.mounted ? "mobile-nav" : undefined}
            onClick={nav.open ? nav.hide : nav.show}
            className="ml-auto hidden shrink-0 cursor-pointer items-center justify-center rounded-full p-2 text-ink transition-colors duration-200 hover:bg-ink/6 max-nav:flex"
          >
            {nav.open ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
          </Box>
        </Box>

        {/* Desktop brief composer — absolute, positioned to the header. */}
        {brief.mounted ? (
          <BriefComposer
            open={brief.open}
            onClose={brief.hide}
            variant="desktop"
            idPrefix="bd"
          />
        ) : null}
      </Box>

      {/* Rendered as siblings, not children, of the header: a `transform` on
          an ancestor creates a new containing block for `fixed` descendants,
          which would otherwise drag these along whenever the header hides. */}
      {nav.mounted ? (
        <MobileNav
          id="mobile-nav"
          open={nav.open}
          onClose={nav.hide}
          onOpenBrief={openBrief}
          cta={MEGA_CTA}
        />
      ) : null}
      {brief.mounted ? (
        <BriefComposer
          open={brief.open}
          onClose={brief.hide}
          variant="mobile"
          idPrefix="bm"
        />
      ) : null}
    </>
  );
}
