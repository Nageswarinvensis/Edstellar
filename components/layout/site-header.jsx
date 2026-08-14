"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

import Box from "@/components/ui/Box";
import { CtaButton } from "@/components/shared/CtaButton";
import MobileNav from "@/components/layout/mobile-nav";
import { NAV_LINKS, HEADER_CTA } from "@/lib/constants";
import {
  subscribeHeaderHidden,
  getHeaderHiddenSnapshot,
  getHeaderHiddenServerSnapshot,
} from "@/lib/header-visibility";

/**
 * Global sticky nav. Client Component for the mobile menu toggle — the
 * links, logo, and desktop CTA underneath are static, but the whole file
 * lives on the client so the toggle button and its `open` state sit next to
 * what they control (TASTE.md §3.2).
 *
 * On course pages the sticky tab bar takes over the top of the viewport once
 * it's pinned, so this hides itself rather than sit underneath it — see
 * `lib/header-visibility.js`.
 */
export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const hidden = useSyncExternalStore(
    subscribeHeaderHidden,
    getHeaderHiddenSnapshot,
    getHeaderHiddenServerSnapshot,
  );

  return (
    <>
      <Box
        as="header"
        className={`
          sticky top-0 z-[900] border-b border-ink/12 bg-paper/94 backdrop-blur-[14px]
          transition-transform duration-300 ease-out px-5 lg:px-10
          ${hidden ? "-translate-y-full" : "translate-y-0"}
        `}
      >
        <Box className="mx-auto flex h-17 max-w-7xl items-center gap-8 ">
          <Link
            href="/"
            aria-label="Edstellar home"
            className="flex shrink-0 items-center duration-200 "
          >
            <Image
              src="/course/Edstellar.svg"
              alt="Edstellar"
              width={139}
              height={50}
              priority
            />
          </Link>

          <Box
            as="nav"
            aria-label="Main"
            className="ml-2 flex flex-1 items-center gap-6.5 max-lg:hidden"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative py-1.5 font-body text-[13.5px] font-medium text-ink/60 transition-colors duration-200 hover:text-ink"
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-0.5 h-[1.5px] w-0 bg-lime transition-[width] duration-200 group-hover:w-full"
                />
              </Link>
            ))}
          </Box>

          <CtaButton
            size="sm"
            arrow
            className="ml-auto max-lg:hidden"
            render={<Link href={HEADER_CTA.href} />}
          >
            {HEADER_CTA.label}
          </CtaButton>

          <Box
            as="button"
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
            className="ml-auto hidden shrink-0 cursor-pointer items-center justify-center rounded-full p-2 text-ink transition-colors duration-200 hover:bg-ink/6 max-lg:flex"
          >
            {open ? (
              <X size={22} strokeWidth={2} />
            ) : (
              <Menu size={22} strokeWidth={2} />
            )}
          </Box>
        </Box>
      </Box>

      {/* Rendered as a sibling, not a child, of the header: a `transform` on
          an ancestor creates a new containing block for `fixed` descendants,
          which would otherwise drag this along whenever the header hides. */}
      <MobileNav
        id="mobile-nav"
        open={open}
        onClose={() => setOpen(false)}
        links={NAV_LINKS}
        cta={HEADER_CTA}
      />
    </>
  );
}
