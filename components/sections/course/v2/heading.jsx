import { Fragment } from "react";

import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils";

/**
 * A v2 heading from the page JSON: `[{ text, is_italic }]`, rendered in
 * order with the italic parts in the serif italic accent, in the heading's
 * own colour (as the design's `h2 em`). A plain string is accepted too.
 */
export default function V2Heading({ parts, as = "h2", className, emClassName }) {
  if (!parts) return null;
  const list = typeof parts === "string" ? [{ text: parts }] : parts;
  return (
    <Text as={as} className={cn(as === "h2" && "text-[clamp(28px,3.2vw,38px)] leading-[1.12] tracking-[-0.03em]", className)}>
      {list.map((part, i) => (
        // No <span> wrapper: globals.css styles every `h1–h3 span` as the
        // serif italic accent, which would italicize the whole heading.
        <Fragment key={i}>
          {i > 0 && " "}
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
