import { Fragment } from "react";

import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils";

const SPAN = /(<span>[\s\S]*?<\/span>)/;

/**
 * Splits a heading into `{ text, is_italic }` parts. The page JSON writes a
 * heading the CMS way — one string, the accent phrase in `<span>`:
 * `"ETL Testing Corporate Training <span>FAQs</span>"`. An older parts array
 * (`[{ text, is_italic }]`) is still read, joined with spaces as before.
 */
function toParts(heading) {
  if (Array.isArray(heading)) {
    return heading.map((part, i) => ({
      ...part,
      // A part that starts with punctuation ("." after an italic phrase)
      // joins without a space.
      text: i > 0 && !/^[.,:;!?)]/.test(part.text) ? ` ${part.text}` : part.text,
    }));
  }
  return String(heading)
    .split(SPAN)
    .filter(Boolean)
    .map((piece) => {
      const em = piece.match(/^<span>([\s\S]*)<\/span>$/);
      return em ? { text: em[1], is_italic: true } : { text: piece };
    });
}

/**
 * A v2 heading from the page JSON, the accent phrase in the serif italic
 * accent, in the heading's own colour (as the design's `h2 em`).
 */
export default function V2Heading({ parts, as = "h2", className, emClassName }) {
  if (!parts) return null;
  return (
    <Text as={as} className={cn(as === "h2" && "text-[clamp(28px,3.2vw,38px)] leading-[1.12] tracking-[-0.03em]", className)}>
      {toParts(parts).map((part, i) => (
        // No <span> in the output: globals.css styles every `h1–h3 span` as
        // the serif italic accent, which would italicize the whole heading.
        <Fragment key={i}>
          {part.is_italic ? (
            <em className={cn("font-serif font-medium tracking-[-0.01em] italic", emClassName)}>{part.text}</em>
          ) : (
            part.text
          )}
        </Fragment>
      ))}
    </Text>
  );
}
