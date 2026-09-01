import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils";

/**
 * Headings in these designs mix Sora roman with a Cormorant Garamond italic
 * accent on one phrase. The CMS sends `heading` as a plain string with the
 * emphasis phrase wrapped in `<span>` — this splits that string and renders
 * the wrapped phrase as `<em>`.
 *
 * Rendering it as a single heading element keeps one accessible name and one
 * <h1>/<h2> per section, rather than splitting the phrase across elements.
 */
function RichHeading({
  as = "h2",
  heading,
  className,
  emphasisClassName,
  ...props
}) {
  const text = typeof heading === "string" ? heading : "";
  if (!text) return null;

  return (
    <Text as={as} className={className} {...props}>
      {text.split(/(<span>[\s\S]*?<\/span>)/g).map((fragment, index) => {
        const match = fragment.match(/^<span>([\s\S]*?)<\/span>$/);
        return match ? (
          <em
            key={index}
            className={cn("font-serif italic", emphasisClassName)}
          >
            {match[1]}
          </em>
        ) : (
          fragment
        );
      })}
    </Text>
  );
}

export default RichHeading;
