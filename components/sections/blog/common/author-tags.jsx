import Box from "@/components/ui/Box";
import { cn } from "@/lib/utils";

/**
 * An author's topic tags — the CMS's `author_tags`, a comma-separated string
 * ("soft skills , in-demand skills"); an array is accepted too, should the
 * CMS start sending one. Renders nothing without tags.
 *
 * Shown after the author's description on the post page's author card
 * (`tone="light"`) and after the bio in the author page's navy hero
 * (`tone="dark"`).
 */
const TONES = {
  light: "border-olive/25 bg-lime/22 text-olive",
  dark: "border-lime/35 bg-lime/10 text-lime",
};

export function parseAuthorTags(tags) {
  return (Array.isArray(tags) ? tags : String(tags ?? "").split(","))
    .map((tag) => String(tag).trim())
    .filter(Boolean);
}

export default function AuthorTags({ tags, name, tone = "light", className }) {
  const list = parseAuthorTags(tags);
  if (!list.length) return null;

  return (
    <Box
      as="ul"
      aria-label={name ? `${name}'s topics` : "Author topics"}
      className={cn("flex list-none flex-wrap gap-2 p-0", className)}
    >
      {list.map((tag) => (
        <li
          key={tag}
          className={cn(
            "rounded-full border px-2.75 py-1 font-mono text-[10px] uppercase leading-none tracking-[0.14em]",
            TONES[tone],
          )}
        >
          {tag}
        </li>
      ))}
    </Box>
  );
}
