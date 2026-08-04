import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils";

/**
 * Headings in these designs mix Sora roman with a Cormorant Garamond italic
 * accent on one phrase. `parts` carries that structure from the content layer:
 * `[{ text }, { text, em: true }, { text }]`.
 *
 * Rendering it as a single heading element keeps one accessible name and one
 * <h1>/<h2> per section, rather than splitting the phrase across elements.
 */
function RichHeading({
  as = "h2",
  parts = [],
  className,
  emphasisClassName,
  ...props
}) {
  if (!parts.length) return null;

  return (
    <Text as={as} className={className} {...props}>
      {parts.map((part, index) =>
        part.em ? (
          <em
            key={index}
            className={cn("font-serif font-bold italic", emphasisClassName)}
          >
            {part.text}
          </em>
        ) : (
          part.text
        )
      )}
    </Text>
  );
}

export default RichHeading;
