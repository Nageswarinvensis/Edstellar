/**
 * The domain CMS sends course links relative to `/corporate-training/`
 * (`"ai/agentic-ai-corporate-training-course"`). Absolute paths, full URLs
 * and in-page anchors pass through unchanged.
 */
export function courseUrl(href) {
  if (!href) return "#";
  if (/^(https?:|\/|#)/.test(href)) return href;
  return `/corporate-training/${href}`;
}
