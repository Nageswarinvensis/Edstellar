import { Sora, Cormorant_Garamond, DM_Sans, DM_Mono } from "next/font/google";

import { SITE } from "@/lib/constants";
// import SchemaOrg from "@/components/seo/schema-org";
// Zoho SalesIQ chat widget temporarily disabled — re-enable when ready.
// import ZohoSalesIq from "@/components/layout/zoho-salesiq";
import GoogleAnalytics from "@/components/layout/google-analytics";
import MicrosoftClarity from "@/components/layout/microsoft-clarity";
import { DEFAULT_OG_IMAGE } from "@/lib/seo/metadata";
import "./globals.css";

/**
 * Root layout. Fonts, `metadataBase`, the document shell, Google Analytics
 * and the Zoho SalesIQ chat widget (here rather than in the footer so `(bare)`
 * pages get them too).
 *
 * The header and footer live in `(site)/layout.js` rather than here, so a page
 * can opt out of them by living in `(bare)/` instead. There is exactly one
 * root layout: a second one would turn every navigation between groups into a
 * full page load (TASTE.md §1.4).
 */

/*
 * Font display: "optional" for Sora, Cormorant Garamond and DM Sans (all three
 * preloaded). With "swap", headings first paint in the metric-adjusted
 * fallback, whose widths differ enough — the serif italic accent most — that a
 * heading changes its line count when the real font lands and pushes the page
 * down. PageSpeed measured CLS 0.19 on /corporate-training/ai/generative-ai-course
 * from exactly this (Nov 2026); forcing "optional" took it to ~0.01. A first,
 * slow visit keeps the fallback for that page view instead of reflowing; the
 * font is cached for the next navigation. DM Mono is not preloaded, so it keeps
 * "swap" — with "optional" it would almost never be used on a first visit, and
 * its one-line kickers do not reflow.
 */
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "optional",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "optional",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "optional",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: false,
});

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Corporate Training and Consulting`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    locale: "en_US",
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@edstellarglobal",
    images: [DEFAULT_OG_IMAGE],
  },
  // Domain ownership check for Twilio; every page inherits it.
  other: {
    "twilio-domain-verification": "df46382efd09591bc409fe52bb17223c",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-US" suppressHydrationWarning>
      <body
        className={`${sora.variable} ${cormorant.variable} ${dmSans.variable} ${dmMono.variable} antialiased`}
      >
        {/* <SchemaOrg website /> */}
        {children}
        {/* <ZohoSalesIq /> */}
        <GoogleAnalytics />
        <MicrosoftClarity />
      </body>
    </html>
  );
}
