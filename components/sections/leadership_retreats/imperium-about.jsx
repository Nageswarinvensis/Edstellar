import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";

/**
 * "Imperium, Edstellar's executive retreat division" — the Imperium roundel
 * beside the copy and links to Edstellar's wider services.
 * Design: leadership-retreats `.ab-grid`, `.ab-mark`, `.ab-links`.
 */
export default function ImperiumAbout({ data }) {
  return (
    <Section aria-labelledby="ab-h" className="bg-paper">
      <Box className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[300px_1fr] lg:gap-12">
        <Reveal aria-hidden="true" className="mx-auto">
          <Box className="relative grid size-60 place-items-center rounded-full bg-navy text-center shadow-[0_24px_60px_-24px_rgba(10,22,40,0.55)] before:absolute before:inset-3.5 before:rounded-full before:border before:border-gold/60 before:content-[''] lg:size-75">
            <Box>
              <Text as="span" className="block font-display text-[clamp(30px,3vw,38px)] leading-tight font-semibold text-paper">
                {data.mark.title}
              </Text>
              <Text as="span" className="mt-2 block text-[14px] text-gold">
                {data.mark.subtitle}
              </Text>
            </Box>
          </Box>
        </Reveal>

        <Reveal delay={1}>
          <RichHeading as="h2" id="ab-h" heading={data.heading} className="mb-4" />
          <Text as="p" className="max-w-[70ch] border-b border-ink/12 pb-8 text-[clamp(16px,1.2vw,18px)] leading-[1.7]">
            {data.description}
          </Text>
          <Text as="p" className="mt-7 mb-3 text-[14px] font-medium">
            {data.links_label}
          </Text>
          <Box as="ul" className="m-0 flex list-none flex-wrap p-0">
            {data.links.map((link, index) => (
              <Box as="li" key={link.href} className={index > 0 ? "border-l border-ink/15 pl-4.5" : undefined}>
                <Link
                  href={link.href}
                  title={`Click Here to View ${link.label}`}
                  className="inline-flex items-center gap-2 py-2 pr-4.5 font-display text-[15px] font-semibold text-ink hover:text-olive"
                >
                  {link.label}
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </Box>
            ))}
          </Box>
        </Reveal>
      </Box>
    </Section>
  );
}
