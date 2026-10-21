/**
 * "Latest corporate training courses" — the hand-picked course list shown on
 * trainer profiles ("More Corporate Training Programs") and case studies
 * ("Explore our Latest Corporate Training Courses"), in display order.
 *
 * Each entry is a CMS course slug, `{domain}/{course}` — exactly as the CMS
 * sitemap lists it. `getLatestCourses` (`lib/content/latest-courses.js`)
 * takes the label from the CMS title and links to the course's page here, and
 * drops any slug the CMS does not have, so a typo or a retired course can
 * never become a broken link.
 */
export const LATEST_COURSE_SLUGS = [
  "hr/employee-experience-ex-design-measurement-course",
  "ai/ai-and-llm-observability-course",
  "data-engineering/data-mesh-streaming-architecture-course",
  "databases/postgresql-performance-tuning-course",
  "devops/platform-engineering-internal-developer-platforms-course",
  "software-development/micro-frontends-architecture-course",
  "ai/langchain-llm-application-development-course",
  "engineering/human-factors-engineering-course",
];
