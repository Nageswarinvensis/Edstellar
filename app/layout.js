import { Sora, Cormorant_Garamond, DM_Sans, DM_Mono } from "next/font/google";

import { SITE } from "@/lib/constants";
import "./globals.css";

/**
 * Root layout. Fonts, `metadataBase`, and the document shell — nothing else.
 *
 * The header and footer live in `(site)/layout.js` rather than here, so a page
 * can opt out of them by living in `(bare)/` instead. There is exactly one
 * root layout: a second one would turn every navigation between groups into a
 * full page load (TASTE.md §1.4).
 */

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Corporate Training and Consulting`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sora.variable} ${cormorant.variable} ${dmSans.variable} ${dmMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
