import Link from "next/link";
import Image from "next/image";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import {
  SITE,
  FOOTER_NAV,
  FOOTER_LEGAL_LINKS,
  FOOTER_CONTACT,
  FOOTER_CERTS,
  FOOTER_SOCIAL,
} from "@/lib/constants";

/* Social glyphs keyed by `FOOTER_SOCIAL[].key`. Stroked to match the design. */
const SOCIAL_PATHS = {
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10.5V17M12 17v-3.5a2 2 0 0 1 4 0V17M12 10.5V17" />
      <circle cx="8" cy="7.4" r=".9" fill="currentColor" stroke="none" />
    </>
  ),
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="m10.5 9.3 4.2 2.7-4.2 2.7z" />
    </>
  ),
  x: <path d="M4 4h4.6L20 20h-4.6zM19.6 4l-6.4 7.2M4.4 20l6.4-7.2" />,
  facebook: (
    <path d="M14.5 8H16V4.6h-2a3.6 3.6 0 0 0-3.6 3.6V10.6H8.5V14h1.9v6.4h3.4V14H16l.5-3.4h-2.7V8.7a.7.7 0 0 1 .7-.7z" />
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r=".9" fill="currentColor" stroke="none" />
    </>
  ),
};

function SocialIcon({ name }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-[18px]"
    >
      {SOCIAL_PATHS[name]}
    </svg>
  );
}

function IsoSeal() {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      className="size-[22px] flex-none text-lime"
    >
      <circle cx="20" cy="20" r="18" />
      <circle cx="20" cy="20" r="13" strokeDasharray="2 3" />
      <path d="m14 20 4 4 8-8" />
    </svg>
  );
}

function Chevron({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

const FOOTER_LINK_CLASS =
  "inline-flex min-h-6 items-center py-0.5 text-[14px] text-paper/[0.78] transition-colors duration-200 hover:text-paper";

/* One link group rendered as a native <details>: a disclosure the visitor can
 * collapse on mobile, and a plain always-open heading from `sm` up (the
 * summary is made non-interactive there). No JS, and every link stays in the
 * HTML for crawlers whether open or not. */
function LinkGroup({ heading, links }) {
  return (
    <Box
      as="details"
      open
      className="group/col border-paper/12 max-sm:border-t [&:not(:first-child)]:sm:mt-8 max-sm:[&:not(:first-child)]:border-t"
    >
      <Box
        as="summary"
        className="flex cursor-pointer list-none items-center justify-between py-3.5 text-[14px] font-semibold text-paper marker:hidden sm:cursor-default sm:py-0 sm:pointer-events-none max-sm:text-[16px] [&::-webkit-details-marker]:hidden"
      >
        {heading}
        <Chevron className="size-4.5 transition-transform duration-200 group-open/col:rotate-180 sm:hidden" />
      </Box>
      <Box
        as="ul"
        className="list-none pb-4 sm:mt-3 sm:pb-0 [&>li+li]:mt-1"
      >
        {links.map((link) => (
          <li key={`${heading}-${link.href}-${link.label}`}>
            <Link
              href={link.href}
              title={`Click Here to View ${link.label}`}
              className={FOOTER_LINK_CLASS}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </Box>
    </Box>
  );
}

/**
 * Global site footer (slim design). Server Component — purely presentational,
 * the mobile accordion is native `<details>`, so it never needs "use client"
 * (TASTE.md §3.2). Composes: a pre-footer CTA band, the dark main footer
 * (brand + contact + five link columns), and the bottom legal bar.
 */
export default function SiteFooter() {
  return (
    <Box as="footer" id="site-footer" className="text-[14px] leading-[1.5]">
      {/* Main footer */}
      <Box className="bg-navy text-paper">
        <Box className="mx-auto max-w-7xl px-10 pt-16 pb-12 max-sm:px-4 max-sm:pt-10 max-sm:pb-8">
          <Text as="h2" className="sr-only">
            Edstellar site links
          </Text>

          <Box className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,2fr)_minmax(0,5fr)]">
            {/* Brand column */}
            <Box className="grid grid-cols-1 gap-x-12 gap-y-6 sm:grid-cols-2 xl:grid-cols-1">
              <Box>
                <Link
                  href="/"
                  aria-label="Edstellar home"
                  title="Click Here to View Edstellar Home"
                  className="inline-flex items-center"
                >
                  <Image
                    src="/course/Edstellar.svg"
                    alt="Edstellar"
                    width={139}
                    height={50}
                    className="block h-[50px] w-auto brightness-0 invert"
                  />
                </Link>
                <Text
                  as="p"
                  className="mt-4 max-w-[32ch] text-[14px] leading-[1.7] text-paper/60"
                >
                  Edstellar is a capability transformation partner for
                  organizations in 100+ countries.
                </Text>

                <Box
                  as="ul"
                  aria-label="ISO certifications"
                  className="mt-5 flex list-none flex-wrap gap-1.5"
                >
                  {FOOTER_CERTS.map((cert) => (
                    <li key={cert.title}>
                      <a
                        href={cert.href}
                        className="flex items-center gap-1.5 rounded-[10px] border border-paper/12 py-1.5 pr-2.5 pl-1.5 text-paper transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(5,13,26,0.4)]"
                      >
                        <IsoSeal />
                        <Text as="span" className="text-paper">
                          <Text as="b" className="block text-[12px] font-semibold leading-[1.3] text-paper">
                            {cert.title}
                          </Text>
                          <Text as="span" className="block text-[12px] leading-[1.3] text-paper/60">
                            {cert.label}
                          </Text>
                          <Text as="span" className="sr-only"> certificate (PDF)</Text>
                        </Text>
                      </a>
                    </li>
                  ))}
                </Box>

                <Box className="mt-4 flex gap-2">
                  {FOOTER_SOCIAL.map((social) => (
                    <a
                      key={social.key}
                      href={social.href}
                      aria-label={social.label}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="grid size-9 place-items-center rounded-full border border-paper/[0.22] text-paper transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(5,13,26,0.4)]"
                    >
                      <SocialIcon name={social.key} />
                    </a>
                  ))}
                </Box>
              </Box>

              {/* Contact reach list */}
              <Box>
                <Text as="h3" id="footer-reach" className="sr-only">
                  Contact Edstellar
                </Text>
                <Box
                  as="ul"
                  aria-labelledby="footer-reach"
                  className="m-0 list-none text-[14px] max-sm:mt-5 xl:mt-5"
                >
                  {FOOTER_CONTACT.map((item) => (
                    <li
                      key={item.label}
                      className="flex min-h-7 flex-nowrap items-center gap-x-2 gap-y-1 max-[360px]:flex-wrap"
                    >
                      <Text as="span" className="min-w-[120px] text-paper/60">
                        {item.label}
                      </Text>
                      <a
                        href={item.href}
                        className="whitespace-nowrap text-paper transition-colors hover:text-lime-soft"
                      >
                        {item.value}
                      </a>
                    </li>
                  ))}
                </Box>
              </Box>
            </Box>

            {/* Link columns */}
            <Box
              as="nav"
              aria-label="Footer"
              className="grid grid-cols-1 gap-x-7 gap-y-0 md:grid-cols-3 md:gap-y-10 xl:grid-cols-5"
            >
              {FOOTER_NAV.map((column, index) => (
                <Box key={column.groups[0].heading + index}>
                  {column.groups.map((group) => (
                    <LinkGroup
                      key={group.heading}
                      heading={group.heading}
                      links={group.links}
                    />
                  ))}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Bottom bar */}
      <Box className="bg-navy-deep text-paper/60">
        <Box className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-10 py-5 max-sm:px-4">
          <Text as="p" className="m-0 text-[12px] text-paper/60">
            © 2021 to 2026 {SITE.legalName}. All rights reserved.
          </Text>
          <Box as="nav" aria-label="Legal" className="flex flex-wrap items-center gap-x-5 gap-y-1">
            {FOOTER_LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                title={`Click Here to View ${link.label}`}
                className="text-[14px] text-paper/[0.78] transition-colors duration-200 hover:text-paper"
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
