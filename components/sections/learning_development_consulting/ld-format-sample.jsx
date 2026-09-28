"use client";

import { Dialog } from "@base-ui/react/dialog";

import Text from "@/components/ui/Text";

/**
 * A format row's "View sample" button and the preview dialog it opens. The
 * smallest client leaf of the formats table — the table itself is rendered
 * on the server. Base UI handles focus trapping, Escape and scroll lock.
 *
 * The stage is a placeholder until real sample assets exist; the design
 * marks it "VERIFY: embed the real sample asset".
 *
 * Design: `.fmt-sample`, `.smodal`, `.smodal-box`, `.smodal-stage`.
 */
export default function LdFormatSample({ name, label, dialog }) {
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
        <Dialog.Viewport className="fixed inset-0 z-200 flex items-center justify-center p-6">
          <Dialog.Popup className="relative w-full max-w-160 rounded-[18px] bg-white px-8 py-7.5 shadow-[0_30px_80px_-20px_rgba(10,22,40,0.5)] outline-none">
            <Dialog.Close
              aria-label="Close"
              className="absolute top-3.5 right-3.5 grid size-9 cursor-pointer place-items-center rounded-full border border-ink/12 bg-paper text-[20px] leading-none text-navy hover:bg-paper-warm"
            >
              ×
            </Dialog.Close>

            <Text
              as="p"
              className="mb-1.5 font-mono text-[10px] leading-[1.7] tracking-[0.14em] text-ink/60 uppercase"
            >
              {dialog.kicker}
            </Text>
            <Dialog.Title
              render={
                <Text
                  as="h3"
                  className="mb-4.5 pr-10 text-[22px] leading-[1.2] tracking-normal text-navy"
                />
              }
            >
              {name}
            </Dialog.Title>

            <Text
              as="div"
              className="grid aspect-video place-items-center rounded-[12px] border border-dashed border-ink/22 bg-paper-warm p-3 text-center font-mono text-[12px] leading-[1.7] tracking-[0.05em] text-ink/60"
            >
              {name} — {dialog.stage_suffix}
            </Text>

            <Text as="p" className="mt-4 text-[13.5px] leading-[1.7] text-ink/60">
              {dialog.note}{" "}
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
