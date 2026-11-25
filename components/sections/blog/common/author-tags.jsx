import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils";

/**
 * An author's "Areas of expertise:" label and topic tags on one line — the
 * CMS's `author_tags`, a comma-separated string
 * ("soft skills , in-demand skills"); an array is accepted too, should the
 * CMS start sending one. Renders nothing without tags.
 *
 * Shown after the author's description on the post page's author card
 * (`tone="light"`) and after the bio in the author page's navy hero
 * (`tone="dark"`).
 */
const TONES = {
  light: { label: "text-ink-muted", tag: "border-olive/25 bg-lime/22 text-olive" },
  dark: { label: "text-paper/65", tag: "border-lime/35 bg-lime/10 text-lime" },
};

const LABEL = "Areas of expertise";

export function parseAuthorTags(tags) {
  return (Array.isArray(tags) ? tags : String(tags ?? "").split(","))
    .map((tag) => String(tag).trim())
    .filter(Boolean);
}

export default function AuthorTags({ tags, name, tone = "light", className }) {
  const list = parseAuthorTags(tags);
  if (!list.length) return null;
  const colors = TONES[tone] ?? TONES.light;

  return (
    <Box className={cn("flex flex-wrap items-center gap-x-3 gap-y-2", className)}>
      <Text
        as="p"
        className={cn("m-0 font-mono text-[10px] uppercase leading-[1.6] tracking-[0.16em]", colors.label)}
      >
        {LABEL}:
      </Text>
      <Box
        as="ul"
        aria-label={name ? `${name}'s ${LABEL.toLowerCase()}` : LABEL}
        className="m-0 flex list-none flex-wrap gap-2 p-0"
      >
        {list.map((tag) => (
          <li
            key={tag}
            className={cn(
              "rounded-full border px-2.75 py-1 font-mono text-[10px] uppercase leading-none tracking-[0.14em]",
              colors.tag,
            )}
          >
            {tag}
          </li>
        ))}
      </Box>
    </Box>
  );
}
