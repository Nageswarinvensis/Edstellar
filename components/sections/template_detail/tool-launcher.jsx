"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Download } from "lucide-react";

import Box from "@/components/ui/Box";
import { CtaButton } from "@/components/common/cta-button";

/**
 * "Access Tool" — opens the hosted tool full-screen over the page, with a
 * Back bar. The iframe only loads on the first open, so the page never pays
 * for it otherwise.
 *
 * A native `<dialog>` opened with `showModal()` sits in the browser's top
 * layer — above every z-index, including the Zoho SalesIQ widget's cookie
 * banner and chat bubble — and brings Escape-to-close, focus trapping and
 * focus return with it. Design: free-organizational-chart-generator `.app`.
 */
export default function ToolLauncher({ tool, title }) {
  const [loaded, setLoaded] = useState(false);
  const dialogRef = useRef(null);

  // Lock page scroll while the tool is open; `close` fires for Back and Escape.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;
    const unlock = () => {
      document.documentElement.style.overflow = "";
    };
    dialog.addEventListener("close", unlock);
    return () => dialog.removeEventListener("close", unlock);
  }, [loaded]);

  function launch() {
    setLoaded(true);
    // The dialog mounts on the first click; open it once it exists.
    requestAnimationFrame(() => {
      document.documentElement.style.overflow = "hidden";
      dialogRef.current?.showModal();
    });
  }

  return (
    <>
      <CtaButton
        type="button"
        onClick={launch}
        title={`Click Here to Open the ${title}`}
        className="mt-8 bg-paper text-navy hover:bg-white"
      >
        <Download size={17} aria-hidden="true" />
        {tool.label}
      </CtaButton>

      {loaded ? (
        <dialog
          ref={dialogRef}
          aria-label={title}
          className="m-0 h-dvh max-h-none w-screen max-w-none flex-col border-0 bg-paper p-0 open:flex backdrop:bg-navy/60"
        >
          <Box className="flex flex-none items-center border-b border-ink/12 bg-white px-4 py-2.5">
            <button
              type="button"
              autoFocus
              onClick={() => dialogRef.current?.close()}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full px-3 py-1.5 font-display text-[14px] font-semibold text-ink hover:bg-ink/6"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              {tool.back_label}
            </button>
          </Box>
          <iframe title={title} src={tool.url} className="w-full flex-1 border-0" />
        </dialog>
      ) : null}
    </>
  );
}
