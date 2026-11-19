import etlTestingCourse from "./etl-testing-course.json";

/**
 * Course pages in the NEW v2 design — local JSON only, nothing from the CMS.
 *
 * This is a testing area. The old course layout (`course-page.jsx`) and its
 * sections are not touched: a course listed here renders through
 * `components/templates/training/v2/course-page-v2.jsx` and the sections in
 * `components/sections/course/v2/` instead, at its normal course URL.
 *
 * THE SWITCH — `mode` per course:
 *   "off"      the old layout everywhere (CMS data), as if it were not listed
 *   "preview"  the new design ONLY where `COURSE_V2_PREVIEW=true` is set
 *              (put it in your git-ignored `.env.local`). Every deployment
 *              that does not set it — production — keeps the old layout, so
 *              committing this file can never take the design live.
 *   "live"     the new design everywhere, production included
 *
 * The key is `{domain}/{course-slug}`, exactly as in the URL.
 */
export const COURSE_V2 = {
  "data-engineering/etl-testing-course": { mode: "preview", data: etlTestingCourse },
};
