/**
 * Courses to prerender and list in the sitemap.
 *
 * **This is an enumeration hint, not a gate.** Ownership is decided by the
 * CMS page's own slug (`{domain}/{course}`), so a published course that is
 * *not* listed here still renders correctly at its URL — it is generated on
 * first request and cached from then on, with no code change and no deploy.
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
 *
 * `ml-model-monitoring-training` is not in the CMS at all yet — it renders
 * entirely from `COURSE_FALLBACKS` below, via `lib/content/courses.js`'s
 * `toLocalCourse`. Listed here so it still prerenders and appears in the
 * sitemap despite having no CMS record to enumerate it.
 */
export const COURSES_BY_DOMAIN = {
  "artificial-intelligence": ["ml-model-monitoring-training"],
};

/**
 * Per-course fallback content, deep-merged *under* the CMS response by
 * `lib/content/courses.js`. It covers whole sections the CMS does not model
 * and individual fields missing from ones it does.
 *
 * Keys here use the CMS's own names and casing so the merge is a plain
 * overlay with no translation step. Delete an entry once the backend sends it.
 *
 * `"artificial-intelligence/ml-model-monitoring-training"` has no CMS record
 * at all, so `toLocalCourse` renders this entry alone (deep-merged only with
 * `COURSE_DEFAULTS`). It has no `about`/`curriculum`/`audience`/`skills`
 * content of its own here — every field those sections carry (verified
 * against the real, published CMS components for this same course at
 * `data-science/ml-model-monitoring-course`) is CMS-sourced, so duplicating
 * it locally would just be a second copy to keep in sync for no reason.
 * The handful of fields those real components *don't* send yet (most of
 * `curriculum.method`; see `content/courses/defaults.js`'s doc comment)
 * live in `COURSE_DEFAULTS` instead, since that's where "static until the
 * CMS sends it" content already lives.
 *
 * The practical result: on this slug, until it has its own CMS record,
 * `about`/`curriculum`/`audience`/`skills` render only whatever
 * `COURSE_DEFAULTS` still supplies for them — which for `curriculum` is
 * just the method box's non-API fields (not enough on its own: `Curriculum`
 * still needs `modules` to render at all) and for the others is nothing,
 * same as `faqs` already renders nothing. This entry stays only for its
 * required `name`, which is what keeps this slug resolving instead of
 * 404ing — see `toLocalCourse`'s doc comment in `lib/content/courses.js`.
 */
export const COURSE_FALLBACKS = {
  "artificial-intelligence/ml-model-monitoring-training": {
    name: "ML Model Monitoring",
  },
};
