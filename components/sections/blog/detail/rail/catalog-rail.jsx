"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import CtaButton from "@/components/common/cta-button";
import { submitCatalogDownload } from "@/lib/actions/submit-catalog-download";
import { RailEyebrow } from "./rail-card";

const CATALOG_PDF = "https://media.edstellar.com/brochures/all-courses-catalog.pdf";

/**
 * "Free download" rail card: navy panel with a white work-email form. The
 * email goes to Zoho "DownloadCatalog" (Branch and PAGE NAME "blog") through
 * the `submitCatalogDownload` Server Action; once Zoho has it, the catalog
 * opens in a new tab and this tab goes to `/thank-you/{thankYou}`. If the
 * browser blocked the new tab, the form gives way to the PDF link instead —
 * the thank-you page has no link to the catalog.
 *
 * The tab is opened on the click itself and pointed at the PDF after the
 * submit succeeds — a tab opened only after the server round-trip is no
 * longer tied to the click, and browsers block it as a pop-up.
 *
 * Design: Blog page v2 `.cat-dl.rail`, `.cat-dl-panel`, `.cat-dl-done`.
 */
export default function CatalogRail({ thankYou = "download-catalog" }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function submit(event) {
    event.preventDefault();
    if (!/^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(email)) {
      setError("Use your work email so we can send the catalog.");
      return;
    }
    setError("");
    setSubmitting(true);

    // Opened now, while the click still counts, then sent to the PDF below.
    const tab = window.open("", "_blank");
    if (tab) tab.opener = null;

    let result;
    try {
      result = await submitCatalogDownload({
        email,
        company_website: event.currentTarget.elements.company_website?.value ?? "",
        page: window.location.pathname,
      });
    } catch {
      result = null;
    }
    setSubmitting(false);

    if (result?.ok) {
      if (tab) {
        tab.location.href = CATALOG_PDF;
        router.push(`/thank-you/${thankYou}`);
      } else {
        setSent(true);
      }
      return;
    }
    tab?.close();
    setError(
      result?.errors?.email ||
        result?.error ||
        "We could not send your request. Please try again, or email us at contact@edstellar.com.",
    );
  }

  return (
    <Box
      as="section"
      aria-labelledby="rail-catalog-h"
      className="relative overflow-hidden rounded-2xl bg-navy p-4.5 text-paper"
    >
      <RailEyebrow className="text-paper/60">Free download</RailEyebrow>
      <Text
        as="h2"
        id="rail-catalog-h"
        className="mt-2 text-[18px] leading-[1.1] font-medium tracking-[-0.03em] text-paper"
      >
        The Edstellar{" "}
        <em className="font-serif text-[1.12em] font-bold">training catalog</em>.
      </Text>
      <Text as="p" className="mt-1.5 text-[12px] leading-[1.5] text-paper/72">
        2,000+ instructor-led programs across 77 domains, in one PDF.
      </Text>

      <Box className="mt-3 rounded-[14px] bg-white p-3.5 text-ink">
        {sent ? (
          <Box role="status">
            <span
              aria-hidden="true"
              className="mb-3 grid size-10 place-items-center rounded-full bg-lime text-navy"
            >
              <Check size={18} strokeWidth={2.5} />
            </span>
            <b className="mb-1 block font-display text-[16px] text-ink">
              You&rsquo;re all set.
            </b>
            <Text as="p" className="mb-4 text-[13.5px] leading-[1.6] text-ink/60">
              Your catalog is ready to download.
            </Text>
            <CtaButton
              arrow
              block
              render={<a href={CATALOG_PDF} target="_blank" rel="noopener noreferrer" />}
              className="py-3.5 text-[13px]"
            >
              Open the catalog (PDF)
            </CtaButton>
          </Box>
        ) : (
          <form noValidate onSubmit={submit}>
            {error ? (
              <Text as="p" role="alert" className="mb-2.5 text-[12px] leading-[1.45] text-destructive">
                {error}
              </Text>
            ) : null}

            <label
              htmlFor="rail-catalog-email"
              className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-ink/60"
            >
              Work email <span className="text-destructive">*</span>
            </label>
            <input
              id="rail-catalog-email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-[10px] border border-ink/22 bg-paper px-3.5 py-3 text-[14px] text-ink outline-none placeholder:text-ink/45 focus:border-navy"
            />

            <input
              type="text"
              name="company_website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />

            <CtaButton type="submit" arrow block disabled={submitting} className="mt-3.5 py-3.5 text-[13px]">
              {submitting ? "Sending…" : "Download the catalog (PDF)"}
            </CtaButton>
          </form>
        )}
      </Box>
    </Box>
  );
}
