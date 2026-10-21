import Link from "next/link";
import Image from "next/image";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import FooterBand from "@/components/layout/footer-band";
import FooterIndex from "@/components/layout/footer-index";
import {
  SITE,
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
      className="size-[18px] flex-none text-lime"
    >
      <circle cx="20" cy="20" r="18" />
      <circle cx="20" cy="20" r="13" strokeDasharray="2 3" />
      <path d="m14 20 4 4 8-8" />
    </svg>
  );
}

/** Logo, one-line description, socials and the two ISO certifications. */
function Brand() {
  return (
    <Box>
      <Link href="/" aria-label="Edstellar home" title="Click Here to View Edstellar Home" className="inline-flex items-center">
        <Image src="/course/Edstellar.svg" alt="Edstellar" width={139} height={50} className="block h-[50px] w-auto brightness-0 invert" />
      </Link>
      <Text as="p" className="mt-4 max-w-[44ch] text-[14px] leading-[1.7] text-paper/60">
        Edstellar is a capability transformation partner. Consulting, talent assessments, academies,
        coaching and corporate training, delivered in 100+ countries and 10+ languages.
      </Text>

      <Box className="mt-6 flex gap-2">
        {FOOTER_SOCIAL.map((social) => (
          <a
            key={social.key}
            href={social.href}
            aria-label={social.label}
            title={`Click Here to View ${social.label}`}
            rel="noopener noreferrer"
            target="_blank"
            className="grid size-10 place-items-center rounded-full border border-paper/[0.22] text-paper transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(5,13,26,0.4)]"
          >
            <SocialIcon name={social.key} />
          </a>
        ))}
      </Box>

      {/* Plain badges, not links: there are no certificate files to link to yet. */}
      <Box as="ul" aria-label="ISO certifications" className="mt-4 flex list-none flex-wrap gap-x-4 gap-y-1.5 p-0">
        {FOOTER_CERTS.map((cert) => (
          <li key={cert.title} className="flex items-center gap-1.5 text-paper">
            <IsoSeal />
            <Text as="span" className="text-paper">
              <Text as="b" className="block text-[11px] leading-[1.2] font-semibold text-paper">{cert.title}</Text>
              <Text as="span" className="block text-[10px] leading-[1.3] text-paper/60">{cert.label}</Text>
            </Text>
          </li>
        ))}
      </Box>
    </Box>
  );
}

/** "Talk to Edstellar": the three offices and the email. */
function Contact() {
  return (
    <Box>
      <Text as="h3" id="footer-contact-h" className="m-0 mb-2.5 font-serif text-[20px] leading-[1.2] font-semibold text-paper">
        Talk to Edstellar
      </Text>
      <Box as="ul" aria-labelledby="footer-contact-h" className="m-0 list-none p-0">
        {FOOTER_CONTACT.map((item) => (
          <li key={item.label} className="flex items-center justify-between gap-4 border-t border-paper/12 py-2 first:border-t-0">
            <Text as="b" className="text-[14px] font-semibold text-paper">{item.label}</Text>
            <a href={item.href} title={`Click Here to View ${item.value}`} className="whitespace-nowrap text-[14px] font-medium text-paper transition-colors hover:text-lime-soft">
              {item.value}
            </a>
          </li>
        ))}
      </Box>
    </Box>
  );
}

/**
 * Global site footer (footer option C v3, launch). A Server Component: the
 * pre-footer band (`FooterBand`, by page family) and the 5A index
 * (`FooterIndex`, stage highlighting) are the only client leaves; the brand
 * and contact blocks render here and are passed in. Then the legal bar.
 *
 * Design: `footer-option-c-v3-launch 51.html`.
 */
export default function SiteFooter() {
  return (
    <Box as="footer" id="site-footer" className="text-[14px] leading-[1.5]">
      <FooterBand />

      <Box className="bg-navy text-paper">
        <Box className="mx-auto max-w-[1360px] px-10 pt-20 pb-10 max-sm:px-4 max-sm:pt-10 max-sm:pb-6">
          <Text as="h2" className="sr-only">Edstellar site links</Text>
          <FooterIndex brand={<Brand />} contact={<Contact />} />
        </Box>
      </Box>

      <Box className="bg-navy-deep text-paper/60">
        <Box className="mx-auto flex max-w-[1360px] flex-wrap items-center justify-between gap-x-6 gap-y-3 px-10 py-6 max-sm:px-4">
          <Text as="p" className="m-0 text-[12px] text-paper/60">
            © 2021 to 2026 {SITE.legalName}. All rights reserved.
          </Text>
          <Box as="nav" aria-label="Legal" className="flex flex-wrap items-center gap-x-5 gap-y-1">
            {FOOTER_LEGAL_LINKS.map((link) => (
              <Link key={link.href} href={link.href} title={`Click Here to View ${link.label}`} className="text-[14px] text-paper/[0.78] transition-colors duration-200 hover:text-paper">
                {link.label}
              </Link>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
