/**
 * Renders a raw HTML string from the CMS verbatim.
 *
 * The CMS author writes the block with Tailwind classes already applied, so
 * no wrapper styling is added here. Returns nothing when html is absent so
 * callers need no null-check of their own.
 *
 * Server Component — no interactivity, no "use client".
 */
export default function HtmlBlock({ html }) {
  if (!html) return null;
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
