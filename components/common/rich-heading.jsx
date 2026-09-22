import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils";

/**
 * Headings in these designs mix Sora roman with a Cormorant Garamond italic
 * accent on one phrase. `heading` is a plain string with the emphasis phrase
 * wrapped in `<span>` — this splits that string and renders the wrapped
 * phrase as `<em>`.
 *
 * Rendering it as a single heading element keeps one accessible name and one
 * <h1>/<h2> per section, rather than splitting the phrase across elements.
 *
 * `plain` drops the `<span>` markers instead of emphasizing them — for a
 * heading whose source (CMS or otherwise) authors that convention but the
 * design calls for no accent here. It still has to go through this same
 * split, not a raw render of `heading`: a literal `<span>` in a string
 * dumped straight into `<Text>` shows as visible escaped text, not markup.
 */
function RichHeading({
  as = "h2",
  heading,
  className,
  emphasisClassName,
  plain = false,
  ...props
}) {
  const text = typeof heading === "string" ? heading : "";
  if (!text) return null;

  return (
    <Text as={as} className={className} {...props}>
      {text.split(/(<span>[\s\S]*?<\/span>)/g).map((fragment, index) => {
        const match = fragment.match(/^<span>([\s\S]*?)<\/span>$/);
        if (!match) return fragment;
        if (plain) return match[1];
        return (
          <em
            key={index}
            className={cn("font-serif italic", emphasisClassName)}
          >
            {match[1]}
          </em>
        );
      })}
    </Text>
  );
}

export default RichHeading;
