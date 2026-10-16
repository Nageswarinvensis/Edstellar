import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import { SECTION_WIDTH } from "@/components/common/section-head";

const EMAIL = /([\w.+-]+@[\w-]+\.[\w.]*\w)/;
const pad = (n) => String(n).padStart(2, "0");

/**
 * The resource hub's legal disclaimer — a collapsed `<details>` on navy-deep
 * just above the site footer, its eight numbered points in two columns.
 *
 * Design: Learning_Development_Resources `.legal` (kept from the live page).
 */
export default function HubDisclaimer({ data }) {
  if (!data?.items?.length) return null;

  return (
    <Section aria-label="Legal disclaimer" className="bg-navy-deep py-6 lg:py-8" innerClassName={SECTION_WIDTH}>
      <Box as="details" className="group rounded-2xl border border-paper/12">
        <Box
          as="summary"
          className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-mono text-[11px] leading-[1.5] tracking-[0.14em] text-paper uppercase [&::-webkit-details-marker]:hidden"
        >
          {data.heading}
          <Text as="span" aria-hidden="true" className="text-[16px] leading-none text-lime transition-transform duration-300 group-open:rotate-45">
            +
          </Text>
        </Box>
        <Box as="ol" className="grid list-none gap-x-8 gap-y-4.5 px-5 pt-1 pb-5.5 min-[761px]:grid-cols-2">
          {data.items.map((item, index) => (
            <Box as="li" key={item.title} className="text-[13px] leading-[1.7] text-paper/50">
              <Text as="span" className="mb-1 block font-display text-[13.5px] leading-[1.4] font-semibold tracking-[-0.01em] text-paper">
                <Text as="span" className="mr-1.5 font-mono text-[10.5px] font-medium tracking-[0.1em] text-lime">
                  {pad(index + 1)}
                </Text>
                {item.title}
              </Text>
              {item.text.split(EMAIL).map((part, partIndex) =>
                partIndex % 2 ? (
                  <a key={partIndex} href={`mailto:${part}`} title="Click Here to Email Edstellar" className="text-lime hover:underline">
                    {part}
                  </a>
                ) : (
                  part
                ),
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </Section>
  );
}
