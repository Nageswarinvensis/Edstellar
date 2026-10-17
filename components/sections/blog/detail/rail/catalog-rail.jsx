"use client";

import { useState } from "react";
import { Check } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import CtaButton from "@/components/common/cta-button";
import { RailEyebrow } from "./rail-card";

const CATALOG_PDF =
  "https://cdn.prod.website-files.com/6482a3cf7db698c2a80cc5e6/69ef2b22fcefd48cb366f1d5_Combined%20Catalog%20A5.pdf";

/**
 * "Free download" rail card: navy panel with a white work-email form; once
 * the email and consent check out, the form gives way to the PDF link.
 * Front-end only for now, as in the design — no lead is sent anywhere yet.
 *
 * Design: Blog page v2 `.cat-dl.rail`, `.cat-dl-panel`, `.cat-dl-done`.
 */
export default function CatalogRail() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function submit(event) {
    event.preventDefault();
    if (!/^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(email)) {
      setError("Use your work email so we can send the catalog.");
      return;
    }
    if (!consent) {
      setError("We need your agreement before we can send it.");
      return;
    }
    setError("");
    setSent(true);
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

            <label className="mt-3 flex cursor-pointer items-start gap-2.5 text-[12.5px] leading-[1.5] text-ink/60">
              <input
                type="checkbox"
                checked={consent}
                onChange={(event) => setConsent(event.target.checked)}
                className="mt-0.5 size-4 flex-none cursor-pointer accent-navy"
              />
              I agree to Edstellar contacting me about this catalog and related
              training.
            </label>

            <input
              type="text"
              name="company_website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />

            <CtaButton type="submit" arrow block className="mt-3.5 py-3.5 text-[13px]">
              Download the catalog (PDF)
            </CtaButton>
          </form>
        )}
      </Box>
    </Box>
  );
}
