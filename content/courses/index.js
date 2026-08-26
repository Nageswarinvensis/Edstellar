import mlModelMonitoring from "./ml-model-monitoring.json";

/**
 * Courses to prerender and list in the sitemap.
 *
 * **This is an enumeration hint, not a gate.** Ownership is decided by the CMS
 * (`page.meta.category`), so a published course that is *not* listed here
 * still renders correctly at its URL — it is generated on first request and
 * cached from then on, with no code change and no deploy.
 *
 * What being listed here buys a course:
 *   - prerendered at build time instead of on first request
 *   - included in `sitemap.xml`, which is the only crawl path to courses
 *     beyond page one of a catalog listing (TASTE.md §2.3)
 *
 * It exists because the CMS exposes no index endpoint — only
 * `/api/v2/pages/{slug}` — and both `generateStaticParams` and `sitemap.js`
 * need to enumerate. Verified: `/api/v2/pages`, `/api/v2/courses`,
 * `/api/v2/pages/slugs` and seven other candidates all 404.
 *
 * When the backend grows a list endpoint, delete this and derive it there;
 * `lib/content/courses.js` is the only file that changes.
 */
export const COURSES_BY_DOMAIN = {
  "artificial-intelligence": ["ml-model-monitoring", "phishing-awareness-training"],
};

/**
 * Per-course fallback content, deep-merged *under* the CMS response by
 * `lib/content/courses.js`. It covers whole sections the CMS does not model
 * (`ClientsLogosData`, `SlideData`, `customizedTraining`, `groupQuote`,
 * `whyNow`, `lifecycle`, `outcomes`) and individual fields missing from ones
 * it does (`hero.actions`, `hero.meta`, `pageToc.cta`, `section_cta`).
 *
 * Keys here use the CMS's own names and casing so the merge is a plain
 * overlay with no translation step. Delete an entry once the backend sends it.
 */
export const COURSE_FALLBACKS = {
  "ml-model-monitoring": mlModelMonitoring,
};
