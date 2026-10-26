"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import DownloadForm, { DownloadReady } from "@/components/forms/download-form";
import { RailEyebrow } from "./rail-card";

const CATALOG_PDF = "https://media.edstellar.com/brochures/all-courses-catalog.pdf";

/**
 * "Free download" rail card: navy panel with the white gated-download form
 * (`DownloadForm`). Once Zoho has the lead, the catalog opens in a new tab
 * and this tab goes to `/thank-you/{thankYou}`. If the browser blocked the
 * new tab, the form gives way to the PDF link instead — the thank-you page
 * has no link to the catalog.
 *
 * Design: Blog page v2 `.cat-dl.rail`, `.cat-dl-panel`, `.cat-dl-done`.
 */
export default function CatalogRail({ thankYou = "download-catalog" }) {
  const router = useRouter();
  const [sent, setSent] = useState(false);

  function onSuccess(opened) {
    if (opened) router.push(`/thank-you/${thankYou}`);
    else setSent(true);
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
          <DownloadReady
            pdf={CATALOG_PDF}
            message="Your catalog is ready to download."
            linkLabel="Open the catalog (PDF)"
          />
        ) : (
          <DownloadForm
            pdf={CATALOG_PDF}
            idPrefix="rail-catalog"
            submitLabel="Download the catalog (PDF)"
            onSuccess={onSuccess}
          />
        )}
      </Box>
    </Box>
  );
}
