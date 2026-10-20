"use client";

import { Dialog } from "@base-ui/react/dialog";

import Text from "@/components/ui/Text";

/**
 * A format row's "View sample" button and the preview dialog it opens. The
 * smallest client leaf of the formats table — the table itself is rendered
 * on the server. Base UI handles focus trapping, Escape and scroll lock.
 *
 * The stage is an iframe of the format's live sample page
 * (`public/samples/learning-content/{file}.html`). The popup only mounts while
 * open, so a sample loads when its dialog opens and unloads (stopping any
 * audio or video) when it closes.
 *
 * Design: `.fmt-sample`, `.smodal.is-live`, `.smodal-box`, `.smodal-frame`.
 */
export default function LdFormatSample({ name, label, sample, dialog }) {
  // No sample or dialog copy, no button — rather than a crash that 500s the page.
  if (!sample || !dialog) return null;

  return (
    <Dialog.Root>
      <Dialog.Trigger
        title={`Click Here to View a ${name} Sample`}
        className="inline-flex cursor-pointer items-center gap-1.5 bg-transparent p-0 font-mono text-[11px] leading-normal tracking-[0.06em] whitespace-nowrap text-navy uppercase after:content-['→'] hover:underline hover:underline-offset-3"
      >
        {label}
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-200 bg-navy/60" />
        <Dialog.Viewport className="fixed inset-0 z-200 flex items-center justify-center p-6 max-sm:p-2.5">
          <Dialog.Popup className="relative max-h-[calc(100dvh-48px)] w-full max-w-220 overflow-auto rounded-[18px] bg-white px-7 pt-6.5 pb-5.5 shadow-[0_30px_80px_-20px_rgba(10,22,40,0.5)] outline-none max-sm:px-3.5 max-sm:pt-5 max-sm:pb-4">
            <Dialog.Close
              aria-label="Close"
              className="absolute top-3.5 right-3.5 grid size-9 cursor-pointer place-items-center rounded-full border border-ink/12 bg-paper text-[20px] leading-none text-navy hover:bg-paper-warm"
            >
              ×
            </Dialog.Close>

            <Text
              as="p"
              className="mb-1.5 font-mono text-[10px] leading-[1.7] tracking-[0.14em] text-ink-muted uppercase"
            >
              {dialog.kicker}
            </Text>
            <Dialog.Title
              render={
                <Text
                  as="h3"
                  className="mb-3.5 pr-10 text-[22px] leading-[1.2] tracking-normal text-navy"
                />
              }
            >
              {name}
            </Dialog.Title>

            <Text
              as="div"
              className="h-[clamp(420px,calc(100dvh-230px),560px)] overflow-hidden rounded-[12px] border border-ink/12 bg-paper max-sm:h-[calc(100dvh-190px)]"
            >
              <iframe
                title={sample.title}
                src={`/samples/learning-content/${sample.file}.html`}
                className="block size-full border-0"
              />
            </Text>

            <Text as="p" className="mt-4 text-[13.5px] leading-[1.7] text-ink-muted">
              {sample.note}{" "}
              <Dialog.Close
                render={<a href={dialog.note_cta.href} />}
                className="font-semibold text-navy"
              >
                {dialog.note_cta.label}
              </Dialog.Close>
              .
            </Text>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
