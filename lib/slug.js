/**
 * Turn a URL slug into a human-readable label — `learning-strategy-design`
 * becomes "Learning Strategy Design".
 *
 * Used by placeholder routes to derive a heading and a metadata title before
 * real content exists. Once a route reads from `lib/content/`, the title comes
 * from the content record and this is no longer involved.
 */
export function titleFromSlug(slug) {
  return String(slug)
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
