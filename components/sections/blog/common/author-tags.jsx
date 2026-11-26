import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils";

/**
 * An author's "Areas of expertise:" line — the CMS's `author_tags`, a
 * comma-separated string ("soft skills , in-demand skills"); an array is
 * accepted too, should the CMS start sending one. Plain small text, the
 * topics comma-separated after the label. Renders nothing without tags.
 *
 * Shown after the author's description on the post page's author card
 * (`tone="light"`) and after the bio in the author page's navy hero
 * (`tone="dark"`).
 */
const TONES = {
  light: { label: "text-ink", text: "text-ink-muted" },
  dark: { label: "text-paper", text: "text-paper/75" },
};

const LABEL = "Areas of expertise";

export function parseAuthorTags(tags) {
  return (Array.isArray(tags) ? tags : String(tags ?? "").split(","))
    .map((tag) => String(tag).trim())
    .filter(Boolean);
}

export default function AuthorTags({ tags, tone = "light", className }) {
  const list = parseAuthorTags(tags);
  if (!list.length) return null;
  const colors = TONES[tone] ?? TONES.light;

  return (
    <Text as="p" className={cn("m-0 text-[13px] leading-[1.6] tracking-[0.02em]", colors.text, className)}>
      <Text as="span" className={cn("text-[13px] leading-[1.6] font-medium", colors.label)}>
        {LABEL}:
      </Text>{" "}
      {list.join(", ")}
    </Text>
  );
}
