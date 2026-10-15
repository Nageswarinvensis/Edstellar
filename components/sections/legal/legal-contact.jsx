import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";

/**
 * Closing navy band on the legal pages: heading and a line of copy on the
 * left, labelled email and phone rows on the right.
 *
 * Design: terms-conditions `.contact`, `.contact-list`.
 */
export default function LegalContact({ data }) {
  if (!data?.links?.length) return null;

  return (
    <Box as="section" aria-labelledby="legal-contact-h" className="bg-navy-deep px-5 text-white lg:px-10">
      <Box className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 py-12 lg:grid-cols-[1.2fr_1fr] lg:gap-12 lg:py-20">
        <Reveal>
          <Text
            as="h2"
            id="legal-contact-h"
            className="mb-2 text-white"
          >
            {data.heading}
          </Text>
          <Text as="p" className="max-w-[60ch] text-white/80">
            {data.description}
          </Text>
        </Reveal>

        <Reveal delay={1} className="grid gap-4">
          {data.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              title={`Click Here to ${link.href.startsWith("mailto:") ? "Email" : "Call"} Edstellar ${link.label === "Email" ? "" : link.label}`.trim()}
              className="flex items-center gap-3 rounded-[10px] border border-white/14 bg-white/6 px-4 py-3 text-[15px] text-white transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(10,22,40,0.08)]"
            >
              <Text as="span" className="w-16 flex-none font-mono text-[11px] tracking-[0.1em] text-lime uppercase">
                {link.label}
              </Text>
              {link.value}
            </a>
          ))}
        </Reveal>
      </Box>
    </Box>
  );
}
