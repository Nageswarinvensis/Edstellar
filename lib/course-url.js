/**
 * The domain CMS sends course links relative to `/corporate-training/`
 * (`"ai/agentic-ai-course"`). Absolute paths, full URLs
 * and in-page anchors pass through unchanged.
 */
export function courseUrl(href) {
  if (!href) return "#";
  if (/^(https?:|\/|#)/.test(href)) return href;
  return `/corporate-training/${href}`;
}

/**
 * A course card's description: the course's own, else the generic line the
 * CMS uses for courses without copy (its `courses` component sends none).
 */
export function courseDescription(course) {
  return (
    course.description ||
    `Instructor-led training on ${course.title}, scoped to your team's level and use cases.`
  );
}
