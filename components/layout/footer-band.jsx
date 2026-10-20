"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { CtaButton } from "@/components/common/cta-button";
import { FOOTER_BANDS } from "@/lib/constants";

/** Pages that end with their own contact or lead form: no band above the
 * footer there, or it would repeat the form's ask. Matched by path prefix. */
const ENDS_WITH_FORM = [
  "/learning-development-consulting-services",
  "/organizational-development-consulting",
  "/talent-assessment-services",
  "/coaching-solutions",
  "/training-needs-analysis-solutions",
  "/managed-learning-services",
  "/about-us",
  "/exceptional-customer-experience",
  "/corporate-training-catalog",
  "/corporate-training-pricing",
  "/corporate-training/",
  "/contact-us",
  "/clients",
  "/who-we-serve",
  "/leadership-retreats",
  "/partner-program",
  "/request-for-proposal",
  "/training-for-government-enquiry",
  "/training-for-universities-enquiry",
  "/become-a-guest-author",
  "/thank-you",
];

const RESOURCES = ["/blog", "/learning-development-resources", "/learning-development-templates", "/resources", "/templates"];

/** A prefix ending in "/" matches only pages below it ("/corporate-training/"
 * = domains and courses, not the hub); otherwise the page itself or below. */
const startsWithAny = (path, prefixes) =>
  prefixes.some((prefix) =>
    prefix.endsWith("/") ? path.startsWith(prefix) : path === prefix || path.startsWith(`${prefix}/`),
  );

/** Which band a page gets: `null` when it ends with its own form. */
export function footerBandFor(path) {
  if (startsWithAny(path, ENDS_WITH_FORM)) return null;
  if (startsWithAny(path, RESOURCES)) return FOOTER_BANDS.resources;
  return FOOTER_BANDS.consulting;
}

/**
 * The slim pre-footer band: one line of ask and one button, its copy by page
 * family (`FOOTER_BANDS`). A client leaf only because it reads the path.
 *
 * Design: footer-option-c-v3-launch 51 `.band.band-slim`.
 */
export default function FooterBand() {
  const band = footerBandFor(usePathname() ?? "/");
  if (!band) return null;

  return (
    <Box as="section" aria-labelledby="footer-band-h" className="border-t border-ink/12 bg-paper-warm text-ink">
      <Box className="mx-auto grid max-w-[1360px] grid-cols-[minmax(0,1fr)_auto] items-center gap-x-12 gap-y-6 px-10 py-10 max-[900px]:grid-cols-1 max-sm:px-4 max-sm:py-8">
        <Text as="h2" id="footer-band-h" className="m-0 text-[clamp(24px,2.6vw,28px)] leading-[1.1] font-bold tracking-[-0.03em]">
          {band.heading}
          <em className="font-serif font-normal text-ink">{band.emphasis}</em>
        </Text>
        <CtaButton render={<Link href={band.cta.href} />} className="justify-self-start max-sm:w-full max-sm:justify-center">
          {band.cta.label}
        </CtaButton>
      </Box>
    </Box>
  );
}
