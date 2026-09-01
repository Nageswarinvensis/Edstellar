import Link from "next/link";
import Image from "next/image";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { SITE, FOOTER_NAV, FOOTER_LEGAL_LINKS } from "@/lib/constants";

/**
 * Global site footer. Server Component — purely presentational, no
 * interactivity, so it never needs "use client" (TASTE.md §3.2).
 */
export default function SiteFooter() {
  return (
    <Box
      as="footer"
      id="site-footer"
      className="bg-navy-deep px-10 pt-16.5 pb-9.5 text-paper/70 max-lg:px-6 max-sm:px-4"
    >
      <Box className="mx-auto max-w-7xl">
        <Box className="grid grid-cols-1 gap-10 border-b border-paper/12 pb-11 md:grid-cols-[1.4fr_1fr_1fr]">
          <Box>
            <Link
              href="/"
              aria-label="Edstellar home"
              className="mb-4 inline-flex items-center"
            >
              <Image
                src="/course/Edstellar.svg"
                alt="Edstellar"
                width={139}
                height={50}
                className="block brightness-0 invert"
              />
            </Link>
            <Text
              as="p"
              className="max-w-[42ch] text-[14px] leading-[1.7] text-paper/70"
            >
              A one-stop instructor-led corporate training and coaching solution
              that addresses organizational upskilling and talent transformation
              needs globally.
            </Text>
          </Box>

          {FOOTER_NAV.map((column) => (
            <Box key={column.heading}>
              <Text
                as="p"
                className="mb-4.5 text-[10px] leading-none font-mono tracking-[0.18em] text-paper/50 uppercase"
              >
                {column.heading}
              </Text>
              {column.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-1.5 text-[14px] text-paper/72 transition-colors duration-200 hover:text-lime"
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          ))}
        </Box>

        <Box className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 pt-6.5 text-[12.5px] text-paper/45">
          <Box className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Text as="span" className="text-[12.5px] text-paper/45">
              © 2021–2026 {SITE.legalName}. All rights reserved.
            </Text>
            <Text as="span" className="text-[12.5px] text-paper/45">
              ISO 9001:2015 · ISO 27001:2022 Certified
            </Text>
          </Box>

          <Box as="nav" aria-label="Legal" className="flex items-center gap-5">
            {FOOTER_LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[12.5px] text-paper/45 transition-colors duration-200 hover:text-lime"
              >
                {link.label}
              </Link>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
