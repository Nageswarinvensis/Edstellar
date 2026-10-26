"use client";

import { useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { ArrowUpRight, Check, FileText, Mail, X } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import CtaButton from "@/components/common/cta-button";
import DownloadForm from "@/components/forms/download-form";
import { newTabProps } from "@/lib/links";

/**
 * Whether a clicked link is one of the page's brochure buttons: it points at
 * the brochure, or its label says "brochure" — the CMS gives some of them a
 * stale href (`#contact`, `/brochures/{pillar}`), and they still mean this
 * page's brochure. The talent-assessment pages' "Readiness check" pill shares
 * the brochure's href in the CMS but is a different tool, so it passes through.
 */
function isBrochureLink(link, brochure) {
  const label = `${link.textContent} ${link.getAttribute("aria-label") ?? ""}`;
  if (/readiness/i.test(label)) return false;
  return link.href === brochure || /\bbrochure\b/i.test(label);
}

/**
 * Wraps a page's sections — domain, course and consulting pages. A click on
 * any brochure link inside it (`isBrochureLink`) opens a right-side drawer
 * with the gated-download form instead; once Zoho has the lead, the brochure
 * (a PDF, or an HTML page for consulting) opens in a new tab and the visitor
 * stays on the page. The links keep their real `href`, so without JavaScript
 * they still open it.
 *
 * One capture-phase listener on a `display: contents` wrapper catches every
 * brochure button the sections render — heroes, proof bands, CMS sections,
 * the sticky footer — without each component knowing about the gate. The
 * site header and footer sit outside it, and so does the drawer itself, whose
 * own "Open the brochure" links must not reopen it.
 *
 * Built on Base UI's Dialog for the focus trap, Escape and scroll lock; the
 * look matches the domain page's other right-side drawers (`program.jsx`).
 */
export default function BrochureGate({ brochure, title = "Brochure", children }) {
  const [open, setOpen] = useState(false);
  // `{ opened, name, email }` once Zoho has the lead; `null` while the form shows.
  const [sent, setSent] = useState(null);
  const firstName = sent?.name.split(/\s+/)[0];
  const isPdf = /\.pdf$/i.test(brochure ?? "");

  function onClickCapture(event) {
    const link = event.target.closest?.("a[href]");
    if (!link || !isBrochureLink(link, brochure)) return;
    event.preventDefault();
    setSent(null);
    setOpen(true);
  }

  if (!brochure) return children;

  return (
    <>
      <Box className="contents" onClickCapture={onClickCapture}>
        {children}
      </Box>

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
              {sent ? (
                <Text
                  as="span"
                  className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-olive"
                >
                  <span
                    aria-hidden="true"
                    className="grid size-4.5 place-items-center rounded-full bg-lime text-navy"
                  >
                    <Check size={11} strokeWidth={3} />
                  </span>
                  Download ready
                </Text>
              ) : (
                <Text
                  as="span"
                  className="mb-2 block font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted"
                >
                  Free download
                </Text>
              )}
              <Dialog.Title
                render={<Text as="h2" />}
                className="mb-2 pr-10 font-display text-[22px] font-medium leading-[1.2] tracking-[-0.02em] text-ink"
              >
                {title}
              </Dialog.Title>
              <Dialog.Description
                render={<Text as="p" />}
                className="text-[14.5px] leading-[1.55] text-ink-muted"
              >
                {!sent
                  ? `Fill in your details and the brochure opens${isPdf ? " as a PDF" : ""} in a new tab.`
                  : sent.opened
                    ? `Thanks, ${firstName}. Your brochure has opened in a new tab.`
                    : `Thanks, ${firstName}. Your browser blocked the new tab, so open the brochure below.`}
              </Dialog.Description>
            </Box>

            <Box className="flex-1 overflow-y-auto overscroll-contain px-[34px] pt-6 pb-7 max-sm:px-5">
              {sent ? (
                <BrochureSent
                  brochure={brochure}
                  title={title}
                  isPdf={isPdf}
                  sent={sent}
                  onClose={() => setOpen(false)}
                />
              ) : (
                <DownloadForm
                  pdf={brochure}
                  idPrefix="brochure-gate"
                  submitLabel={isPdf ? "Download the brochure (PDF)" : "View the brochure"}
                  onSuccess={(opened, lead) => setSent({ opened, ...lead })}
                />
              )}
            </Box>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

/** The page's enquiry form: `apply` on domain, course and most consulting
 * pages (`LeadForm` / `ConsultingForm`), `contact` on the coaching pages. */
const ENQUIRY_FORM_IDS = ["apply", "contact"];

/**
 * The drawer after a successful submit: the brochure as a file card (the
 * primary button instead, when the browser blocked the new tab), where the
 * link was emailed, and the next step — the page's enquiry form.
 */
function BrochureSent({ brochure, title, isPdf, sent, onClose }) {
  // Close first, then scroll once the drawer has slid out and Base UI has
  // handed focus back to the brochure button.
  function talkToAdvisor() {
    onClose();
    setTimeout(() => {
      const form = ENQUIRY_FORM_IDS.map((id) => document.getElementById(id)).find(Boolean);
      if (!form) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      form.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    }, 400);
  }

  return (
    <Box role="status" className="flex flex-col">
      {sent.opened ? null : (
        <CtaButton
          arrow
          block
          render={<a href={brochure} {...newTabProps(brochure)} />}
          className="mb-3 py-3.5 text-[13px]"
        >
          {isPdf ? "Open the brochure (PDF)" : "Open the brochure"}
        </CtaButton>
      )}

      <a
        href={brochure}
        {...newTabProps(brochure)}
        className="group flex items-center gap-3.5 rounded-[14px] border border-ink/12 bg-paper p-3.5 transition-colors duration-200 hover:border-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
      >
        <span
          aria-hidden="true"
          className="grid size-11 flex-none place-items-center rounded-[10px] bg-navy text-lime"
        >
          <FileText size={20} strokeWidth={1.8} />
        </span>
        <span className="min-w-0 flex-1">
          <b className="line-clamp-2 block font-display text-[14.5px] leading-[1.3] font-medium text-ink">
            {title}
          </b>
          <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted">
            {isPdf ? "PDF" : "Brochure"} · {sent.opened ? "Opened in a new tab" : "Ready to open"}
          </span>
        </span>
        <span className="flex flex-none items-center gap-1 text-[12.5px] font-semibold text-ink transition-colors duration-200 group-hover:text-olive">
          {sent.opened ? "Open again" : "Open"}
          <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" />
        </span>
      </a>

      <Text as="p" className="mt-3.5 flex items-start gap-2 text-[13px] leading-[1.55] text-ink-muted">
        <Mail size={15} strokeWidth={1.8} aria-hidden="true" className="mt-0.75 flex-none" />
        <span>
          A copy of the link is on its way to{" "}
          <b className="font-semibold break-words text-ink">{sent.email}</b>.
        </span>
      </Text>

      <Box className="mt-7 border-t border-ink/12 pt-6">
        <Text
          as="span"
          className="mb-2 block font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted"
        >
          What&rsquo;s next
        </Text>
        <Text as="h3" className="mb-1.5 text-[18px] leading-[1.25] font-medium text-ink">
          Want this tailored to your team?
        </Text>
        <Text as="p" className="mb-4.5 text-[13.5px] leading-[1.6] text-ink-muted">
          Share your team&rsquo;s goals and a training advisor will shape a program around them.
        </Text>
        <CtaButton
          type="button"
          variant={sent.opened ? "primary" : "outline"}
          arrow
          block
          onClick={talkToAdvisor}
          className="py-3.5 text-[13px]"
        >
          Talk to a training advisor
        </CtaButton>
        <Dialog.Close className="mt-3 block w-full cursor-pointer py-2 text-center text-[13px] font-medium text-ink-muted underline-offset-4 transition-colors hover:text-ink hover:underline">
          Back to the page
        </Dialog.Close>
      </Box>
    </Box>
  );
}
