import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import { cn } from "@/lib/utils";

const EMAIL = /([\w.+-]+@[\w-]+\.[\w.]*\w)/;
const pad = (n) => String(n).padStart(2, "0");

/** An answer with its email addresses as `mailto:` links. The content stays
 * plain text, so the FAQPage JSON-LD gets clean answers. */
function Answer({ text }) {
  return text.split(EMAIL).map((part, index) =>
    index % 2 ? (
      <a
        key={index}
        href={`mailto:${part}`}
        title="Click Here to Email Edstellar"
        className="border-b border-current text-olive"
      >
        {part}
      </a>
    ) : (
      part
    ),
  );
}

/**
 * A numbered FAQ list of native `<details>` disclosures — they open and
 * close with no JavaScript, and every answer is in the HTML. The first
 * question starts open; a plus turns into a minus on a navy disc.
 *
 * `items`: `{ question, answer }[]` (plain-text answers).
 *
 * Design: corporate-training-pricing-v2 / Learning_Development_Resources
 * `.faq`, `details`, `.q`, `.pm`, `.a`.
 */
export default function FaqDetails({ items, className }) {
  if (!items?.length) return null;

  return (
    <Reveal className={cn("border-t border-ink/12", className)}>
      {items.map((item, index) => (
        <Box as="details" key={item.question} open={index === 0} className="group border-b border-ink/12">
          <Box
            as="summary"
            title={`Click Here to View ${item.question}`}
            className="flex cursor-pointer list-none items-start gap-4.5 py-5.5 transition-colors duration-200 hover:text-olive [&::-webkit-details-marker]:hidden"
          >
            <Text
              as="span"
              aria-hidden="true"
              className="flex-[0_0_24px] pt-1.25 font-mono text-[11px] leading-none font-medium tracking-[0.1em] text-olive"
            >
              {pad(index + 1)}
            </Text>
            <Text as="h3" className="flex-1 text-[17px] leading-[1.4] font-medium tracking-[-0.015em] text-inherit">
              {item.question}
            </Text>
            <Box
              as="span"
              aria-hidden="true"
              className={cn(
                "relative size-7.5 flex-none rounded-full border border-ink/22 transition-[background-color,border-color,color] duration-250",
                "group-open:border-navy group-open:bg-navy group-open:text-lime",
                "before:absolute before:top-1/2 before:left-1/2 before:h-[1.5px] before:w-2.75 before:-translate-1/2 before:bg-current before:content-['']",
                "after:absolute after:top-1/2 after:left-1/2 after:h-[1.5px] after:w-2.75 after:-translate-1/2 after:rotate-90 after:bg-current after:transition-transform after:duration-250 after:content-[''] group-open:after:rotate-0",
              )}
            />
          </Box>
          <Text as="p" className="pr-0 pb-5.5 pl-10.5 text-[15.5px] leading-[1.8] sm:pr-12 sm:pb-6">
            <Answer text={item.answer} />
          </Text>
        </Box>
      ))}
    </Reveal>
  );
}
