"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import EnquiryForm from "@/components/forms/enquiry-form";

/** The CMS blog body's CTAs that open the enquiry drawer — the same ids the
 * Webflow blog script wires up (`#form-btn` on the in-article "Request a Free
 * Consultation" card, `#get-quote`). They are plain `<div>`s in the CMS HTML. */
const TRIGGER_SELECTOR = "#form-btn, #get-quote";

/** Where the form lands after a submit — the live popup's thank-you page. */
const THANK_YOU = "blog";

const FORM_DATA = { submit_label: "Submit" };

/**
 * Training enquiry drawer on blog posts. The trigger lives in `blog.body`
 * (server-rendered CMS HTML), so this leaf listens on the document for clicks
 * on it rather than rendering its own button; the CMS sends the triggers as
 * divs, so they are made keyboard reachable too. The form posts to Zoho
 * "TrainingEnquiry" with Branch "blog" and the post slug as PAGE NAME, as the
 * live popup does.
 *
 * Same right-side drawer as the brochure gate (`components/common/brochure-gate.jsx`):
 * Base UI Dialog for the focus trap, Escape and scroll lock.
 */
export default function BlogDetailEnquiryPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.querySelectorAll(TRIGGER_SELECTOR).forEach((el) => {
      if (el.tagName === "A" || el.tagName === "BUTTON") return;
      el.setAttribute("role", "button");
      el.setAttribute("tabindex", "0");
      el.setAttribute("aria-haspopup", "dialog");
    });

    function onClick(event) {
      if (!event.target.closest?.(TRIGGER_SELECTOR)) return;
      event.preventDefault();
      setOpen(true);
    }
    function onKeyDown(event) {
      if (event.key !== "Enter" && event.key !== " ") return;
      if (!event.target.matches?.(TRIGGER_SELECTOR)) return;
      event.preventDefault();
      setOpen(true);
    }

    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[1300] bg-navy/50 backdrop-blur-[2px] transition-opacity duration-300 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup className="fixed inset-y-0 right-0 z-[1301] flex w-[min(480px,94vw)] flex-col bg-white shadow-[-24px_0_60px_rgba(5,13,26,0.26)] outline-none transition-transform duration-[360ms] ease-[cubic-bezier(.4,0,.1,1)] data-ending-style:translate-x-full data-starting-style:translate-x-full">
          <Dialog.Close
            aria-label="Close"
            className="absolute top-[18px] right-[18px] z-[4] grid size-10 cursor-pointer place-items-center rounded-[10px] border border-ink/12 bg-white text-ink transition-colors duration-200 hover:bg-paper-warm"
          >
            <X size={18} strokeWidth={1.7} aria-hidden="true" />
          </Dialog.Close>

          <Box className="flex-none border-b border-ink/12 px-[34px] pt-[34px] pb-[22px] max-sm:px-5">
            <Text
              as="span"
              className="mb-2 block font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted"
            >
              Free consultation
            </Text>
            <Dialog.Title
              render={<Text as="h2" />}
              className="mb-2 pr-10 font-display text-[22px] font-medium leading-[1.2] tracking-[-0.02em] text-ink"
            >
              Tell us about your corporate training requirements
            </Dialog.Title>
            <Dialog.Description
              render={<Text as="p" />}
              className="text-[14.5px] leading-[1.55] text-ink-muted"
            >
              Fields marked <Text as="span" className="text-red-600">*</Text> are required.
            </Dialog.Description>
          </Box>

          <Box className="flex-1 overflow-y-auto overscroll-contain px-[34px] pt-6 pb-7 max-sm:px-5">
            <EnquiryForm data={FORM_DATA} thankYou={THANK_YOU} branch="blog" variant="drawer" />
          </Box>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
