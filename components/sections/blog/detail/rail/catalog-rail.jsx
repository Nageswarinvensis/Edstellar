import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import DownloadForm from "@/components/forms/download-form";
import { RailEyebrow } from "./rail-card";

/**
 * "Free download" rail card: navy panel with the white gated-download form
 * (`DownloadForm`). Once Zoho has the lead the visitor lands on
 * `/thank-you/{thankYou}`; the catalog link arrives only in Zoho's thank-you
 * email, so the PDF URL is not in the page source.
 *
 * Design: Blog page v2 `.cat-dl.rail`, `.cat-dl-panel`, `.cat-dl-done`.
 */
export default function CatalogRail({ thankYou }) {
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
        2,000+ instructor-led programs across 76 domains, in one PDF.
      </Text>

      <Box className="mt-3 rounded-[14px] bg-white p-3.5 text-ink">
        <DownloadForm
          brochureKey="catalog"
          idPrefix="rail-catalog"
          formLabel="Catalog download"
          submitLabel="Get the catalog"
          thankYou={thankYou}
        />
      </Box>
    </Box>
  );
}
