import defaults from "./defaults.json";

/**
 * Local defaults for the NEW v2 course design — not tied to any course.
 *
 * WHICH DESIGN a course uses is decided by the CMS alone: a course page whose
 * `page.meta.is_new_design` is `"yes"` renders through
 * `components/templates/training/v2/course-page-v2.jsx` from its own
 * `course_*` components; every other course keeps the old layout.
 *
 * This JSON only fills sections or fields a new-design course's CMS page
 * does not send (field by field — see `withFallback` in
 * `lib/content/course-v2.js`), for every new-design course alike. Where the
 * text names the course it says `{course}`, filled from the CMS course name
 * ("ETL Testing Training" → "ETL Testing Corporate Training").
 */
export const COURSE_V2_DEFAULTS = defaults;
