"use client";

import { useEffect, useRef } from "react";

import Box from "@/components/ui/Box";
import { CtaButton } from "@/components/common/cta-button";

/**
 * A program card's "View Catalog" button and the course-list pop-up it opens
 * — the smallest client leaf of the programs grid. The pop-up is a native
 * `<dialog>` whose contents (`children`) are rendered by the server, so every
 * program's course list is in the page HTML even while closed; this file only
 * opens and closes it. `showModal()` gives focus trapping and Escape; a click
 * on the backdrop closes it too, and the page behind stops scrolling while it
 * is open.
 *
 * `titleId` is the id of the dialog's heading, inside `children`.
 *
 * Design: government-employees-training-courses / training-for-universities
 * `.prog-btn`, `[data-cmp="sample-modal"]` `.smodal`, `.smodal-box.cat-box`,
 * `.smodal-x`.
 */
export default function ProgramCatalog({ label, title, titleId, children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;
    const unlock = () => document.documentElement.classList.remove("overflow-hidden");
    dialog.addEventListener("close", unlock);
    return () => {
      dialog.removeEventListener("close", unlock);
      unlock();
    };
  }, []);

  const open = () => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    document.documentElement.classList.add("overflow-hidden");
    dialog.showModal();
    dialog.querySelector("[data-scroll]")?.scrollTo(0, 0);
  };

  const close = () => dialogRef.current?.close();

  return (
    <>
      <CtaButton variant="ghost" title={title} onClick={open} className="self-start">
        {label}
      </CtaButton>

      <Box
        as="dialog"
        ref={dialogRef}
        aria-labelledby={titleId}
        // A click that lands on the <dialog> itself (not its inner panel) is a
        // click on the backdrop.
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        className="fixed inset-0 m-auto h-fit max-h-[88vh] w-[calc(100%-48px)] max-w-225 overflow-hidden rounded-[18px] bg-white p-0 text-ink shadow-[0_30px_80px_-20px_rgba(10,22,40,0.5)] backdrop:bg-navy/60 max-sm:w-[calc(100%-32px)]"
      >
        <Box className="relative flex max-h-[88vh] flex-col px-8 py-7.5 max-sm:px-5 max-sm:py-6">
          <button
            type="button"
            aria-label="Close"
            title="Click Here to Close"
            onClick={close}
            className="absolute top-3.5 right-3.5 grid size-9 cursor-pointer place-items-center rounded-full border border-ink/12 bg-paper text-[20px] leading-none text-navy hover:bg-paper-warm focus-visible:outline-2 focus-visible:outline-navy"
          >
            ×
          </button>
          {children}
        </Box>
      </Box>
    </>
  );
}
