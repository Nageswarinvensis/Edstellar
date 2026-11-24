"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
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
 * "Enquire Now" (`enquireLabel`) swaps the course list for the enquiry
 * `form` in the same pop-up, headed `formHeading` with the program's name
 * (`formSubheading`) under it; "Back to courses" swaps back, and closing the
 * pop-up resets it to the course list. The form is only mounted while shown,
 * so each opening starts with an empty form.
 *
 * `titleId` is the id of the dialog's heading, inside `children`.
 *
 * Design: government-employees-training-courses / training-for-universities
 * `.prog-btn`, `[data-cmp="sample-modal"]` `.smodal`, `.smodal-box.cat-box`,
 * `.smodal-x`.
 */
export default function ProgramCatalog({
  label,
  title,
  titleId,
  enquireLabel,
  form,
  formHeading,
  formSubheading,
  children,
}) {
  const dialogRef = useRef(null);
  const formHeadingRef = useRef(null);
  const [view, setView] = useState("catalog");
  const formTitleId = `${titleId}-enquiry`;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;
    const onClose = () => {
      document.documentElement.classList.remove("overflow-hidden");
      setView("catalog");
    };
    dialog.addEventListener("close", onClose);
    return () => {
      dialog.removeEventListener("close", onClose);
      document.documentElement.classList.remove("overflow-hidden");
    };
  }, []);

  // Each swap moves focus to the top of the new view, so keyboard and
  // screen-reader users land on its heading rather than on a removed button.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog?.open) return;
    if (view === "form") {
      formHeadingRef.current?.focus();
      dialog.querySelector("[data-form-scroll]")?.scrollTo(0, 0);
    } else {
      dialog.querySelector(`#${CSS.escape(titleId)}`)?.focus();
    }
  }, [view, titleId]);

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
      <CtaButton variant="ghost" arrow title={title} onClick={open} className="self-start">
        {label}
      </CtaButton>

      <Box
        as="dialog"
        ref={dialogRef}
        aria-labelledby={view === "form" ? formTitleId : titleId}
        // A click that lands on the <dialog> itself (not its inner panel) is a
        // click on the backdrop.
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        // A catalog with category filters (CatalogCourses, `data-catalog-filter`)
        // keeps one fixed height, so picking a small category doesn't shrink
        // the pop-up; one without fits its content as before.
        className="fixed inset-0 m-auto h-fit max-h-[88vh] w-[calc(100%-48px)] max-w-225 overflow-hidden rounded-[18px] bg-white p-0 text-ink shadow-[0_30px_80px_-20px_rgba(10,22,40,0.5)] backdrop:bg-navy/60 has-[[data-catalog-filter]]:h-[88vh] max-sm:w-[calc(100%-32px)]"
      >
        <Box className="relative flex h-full max-h-[88vh] flex-col px-8 py-7.5 max-sm:px-5 max-sm:py-6">
          <button
            type="button"
            aria-label="Close"
            title="Click Here to Close"
            onClick={close}
            className="absolute top-3.5 right-3.5 z-10 grid size-9 cursor-pointer place-items-center rounded-full border border-ink/12 bg-paper text-[20px] leading-none text-navy hover:bg-paper-warm focus-visible:outline-2 focus-visible:outline-navy"
          >
            ×
          </button>

          {/* The course list stays in the DOM (hidden) while the form shows,
              so the server-rendered catalog is never thrown away. */}
          <Box hidden={view !== "catalog"} className="flex min-h-0 flex-1 flex-col">
            {children}
            {form ? (
              <Box className="flex justify-center pt-4">
                <CtaButton
                  arrow
                  title={`Click here to enquire about the ${formSubheading}`}
                  onClick={() => setView("form")}
                >
                  {enquireLabel}
                </CtaButton>
              </Box>
            ) : null}
          </Box>

          {form && view === "form" ? (
            <Box className="flex min-h-0 flex-1 flex-col">
              <button
                type="button"
                title="Click here to go back to the course list"
                onClick={() => setView("catalog")}
                className="mb-3 inline-flex cursor-pointer items-center gap-1.5 self-start font-mono text-[11px] tracking-[0.1em] text-ink-muted uppercase hover:text-navy focus-visible:outline-2 focus-visible:outline-navy"
              >
                <ArrowLeft size={14} aria-hidden="true" />
                Back to courses
              </button>
              <Text
                as="h3"
                id={formTitleId}
                ref={formHeadingRef}
                tabIndex={-1}
                className="pr-10 text-[22px] leading-[1.2] tracking-normal text-navy outline-none"
              >
                {formHeading}
              </Text>
              <Text as="p" className="mt-1.5 mb-5 text-[14px] leading-[1.5] text-ink-muted">
                {formSubheading}
              </Text>
              <Box data-form-scroll="" className="min-h-0 flex-1 overflow-auto pr-1">
                {form}
              </Box>
            </Box>
          ) : null}
        </Box>
      </Box>
    </>
  );
}
