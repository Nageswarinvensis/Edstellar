import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import InlineHtml from "@/components/common/inline-html";
import { cn } from "@/lib/utils";

const LINK = "text-ink underline decoration-ink/22 underline-offset-3 hover:decoration-ink";
const EM = "font-serif text-[1.08em] font-medium italic";

/** One block of legal copy, by `type`. */
function Block({ block }) {
  switch (block.type) {
    case "h3":
      return (
        <Text as="h3" className="mt-10 mb-4 text-[18px] leading-[1.35] font-semibold tracking-normal">
          {block.text}
        </Text>
      );
    case "list":
      return (
        <Box
          as={block.style === "lettered" ? "ol" : "ul"}
          className={cn(
            "mb-6 max-w-[72ch] list-none p-0",
            block.style === "cards" && "mt-4 mb-8 grid gap-4",
          )}
        >
          {block.items.map((item, index) =>
            block.style === "cards" ? (
              <Box
                as="li"
                key={item}
                className="relative rounded-[10px] border border-ink/12 bg-white py-3.5 pr-4.5 pl-11 text-ink"
              >
                <Box
                  aria-hidden="true"
                  className="absolute top-5 left-4 size-2.25 rounded-[2px] bg-lime ring-1 ring-navy"
                />
                <InlineHtml text={item} linkClassName={LINK} emClassName={EM} />
              </Box>
            ) : (
              <Box as="li" key={item} className="relative mb-4 max-w-[70ch] pl-7 leading-[1.7] text-ink">
                {block.style === "lettered" ? (
                  <Box as="span" aria-hidden="true" className="absolute top-0 left-0 font-mono text-[13px] text-ink/60">
                    ({String.fromCharCode(97 + index)})
                  </Box>
                ) : (
                  <Box
                    aria-hidden="true"
                    className="absolute top-2.75 left-1.5 size-1.75 rounded-[2px] bg-lime ring-1 ring-navy"
                  />
                )}
                <InlineHtml text={item} linkClassName={LINK} emClassName={EM} />
              </Box>
            ),
          )}
        </Box>
      );
    case "callout":
      return (
        <Box className="my-8 rounded-[14px] border border-l-3 border-ink/12 border-l-lime bg-paper-warm p-8 text-[15.5px] leading-[1.7] text-ink">
          {block.heading ? (
            <Text as="h3" className="mb-2 text-[18px] leading-[1.35] font-semibold tracking-normal">
              {block.heading}
            </Text>
          ) : null}
          {block.paragraphs.map((paragraph) => (
            <Text as="p" key={paragraph} className="mb-4 max-w-[72ch] text-[15.5px] text-ink last:mb-0">
              <InlineHtml text={paragraph} linkClassName={LINK} emClassName={EM} />
            </Text>
          ))}
          {block.email ? (
            <a
              href={`mailto:${block.email}`}
              title="Click Here to Email Edstellar"
              className="border-b-2 border-lime font-display text-[18px] font-semibold text-ink hover:bg-lime-soft"
            >
              {block.email}
            </a>
          ) : null}
        </Box>
      );
    case "emphasis":
      return (
        <Text
          as="p"
          className="mb-6 max-w-[72ch] rounded-[10px] border border-ink/12 bg-paper-warm px-8 py-6 font-mono text-[13.5px] leading-[1.7] tracking-[0.01em] text-ink"
        >
          <InlineHtml text={block.text} linkClassName={LINK} emClassName={EM} />
        </Text>
      );
    default:
      return (
        <Text as="p" className="mb-6 max-w-[72ch] text-ink last:mb-0">
          <InlineHtml text={block.text} linkClassName={LINK} emClassName={EM} />
        </Text>
      );
  }
}

/**
 * The body of a legal page: a narrow column of `sections`, each an optional
 * heading and its typed blocks, with a hairline between sections. `backToTop` is the id
 * of the element to link back to after the last section (the page hero).
 *
 * Design: terms-conditions `.content`; modern-slavery-statement `.content`,
 * `.policy-list`, `.callout`.
 */
export default function LegalBody({ sections, backToTop }) {
  if (!sections?.length) return null;

  return (
    <Box as="article" className="mx-auto max-w-230 px-5 py-12 lg:px-0 lg:py-24">
      {sections.map((section) => (
        <Reveal
          as="section"
          key={section.id}
          id={section.id}
          aria-labelledby={section.heading ? `h-${section.id}` : undefined}
          className="scroll-mt-21 [&+&]:mt-10 [&+&]:border-t [&+&]:border-ink/12 [&+&]:pt-10"
        >
          {section.heading ? (
            <Text
              as="h2"
              id={`h-${section.id}`}
              className="mb-6"
            >
              <InlineHtml text={section.heading} />
            </Text>
          ) : null}
          {section.blocks.map((block, index) => (
            <Block key={index} block={block} />
          ))}
        </Reveal>
      ))}

      {backToTop ? (
        <Text as="p" className="mt-8">
          <a href={`#${backToTop}`} title="Click Here to Go Back to Top" className="font-mono text-[13px] text-ink/60 hover:text-ink">
            ↑ Back to top
          </a>
        </Text>
      ) : null}
    </Box>
  );
}
