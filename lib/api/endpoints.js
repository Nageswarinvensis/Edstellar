import "server-only";

/**
 * Every external URL this site talks to, in one place.
 *
 * Base URLs are read from the environment here and nowhere else. Neither name
 * carries the `NEXT_PUBLIC_` prefix, so neither is embedded in the client
 * bundle (TASTE.md §5.2) — which is only true as long as these stay behind
 * `server-only`.
 */
const CMS_BASE = process.env.CMS_API_URL || "http://localhost:8000";

/**
 * `page` and `q` (the search term — searches `title`/`excerpt`, scoped by
 * whichever of the three listing endpoints below is called) share the same
 * query-string assembly across all three, so it's built once here.
 */
function listingQuery({ page = 1, q } = {}) {
  const params = new URLSearchParams();
  if (page > 1) params.set("page", String(page));
  if (q?.trim()) params.set("q", q.trim());
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export const endpoints = {
  /** A CMS page and its resolved components, by slug. */
  cmsPage: (slug) => `${CMS_BASE}/api/v2/pages/${encodeURIComponent(slug)}`,

  /** A single blog post with its resolved author and category, by slug. */
  blogPost: (slug) => `${CMS_BASE}/api/v2/blog/${encodeURIComponent(slug)}`,

  /** A blog author's profile, bio, and paginated post list, by slug —
   * `q` searches only this author's posts. */
  blogAuthor: (slug, page = 1, q) =>
    `${CMS_BASE}/api/v2/blog/authors/${encodeURIComponent(slug)}${listingQuery({ page, q })}`,

  /** A blog category's name/description and paginated post list, by slug —
   * `q` searches only this category's posts. */
  blogCategory: (slug, page = 1, q) =>
    `${CMS_BASE}/api/v2/blog/categories/${encodeURIComponent(slug)}${listingQuery({ page, q })}`,

  /** The blog index's paginated post list plus the category list, own CMS —
   * `q` searches every published post. */
  blogMain: (page = 1, q) =>
    `${CMS_BASE}/api/v2/blog${listingQuery({ page, q })}`,

  /** A trainer's profile, by slug. No index endpoint exists — see
   * `content/trainers/trainersdata.js`'s `otherTrainers`. */
  trainer: (slug) => `${CMS_BASE}/api/v2/trainer/${encodeURIComponent(slug)}`,

  /** Type-ahead course search — returns `{ results: [{ id, title }], pagination }`.
   * Omitting `q` returns an empty result, not everything. */
  courseSearch: (q, page = 1, perPage = 20) => {
    const params = new URLSearchParams();
    if (q?.trim()) params.set("q", q.trim());
    if (page > 1) params.set("page", String(page));
    if (perPage !== 12) params.set("per_page", String(perPage));
    const qs = params.toString();
    return `${CMS_BASE}/api/v2/pages/search${qs ? `?${qs}` : ""}`;
  },

  /** A domain page and its resolved components, by slug — its own endpoint,
   * distinct from `cmsPage`. The CMS's domain slug is not guaranteed to
   * match the site's route slug (e.g. `ai` vs `artificial-intelligence`);
   * `lib/content/domains.js` resolves that via each domain's `cmsSlug`
   * before calling this. */
  domainPage: (slug) => `${CMS_BASE}/api/v2/domains/${encodeURIComponent(slug)}`,

  /** A site page and its components, by slug — its own endpoint, distinct
   * from `cmsPage`. A nested page's slug keeps its `/` (e.g.
   * `learning-development-consulting-services/{slug}` for an L&D sub-page),
   * so each segment is encoded on its own. */
  sitePage: (slug) =>
    `${CMS_BASE}/api/v2/site-pages/${slug.split("/").map(encodeURIComponent).join("/")}`,

  /** Every published slug, grouped as `{ domains, courses, site_pages,
   * blogs }` — each `{ id, slug }` plus `name` (domains) or `title`. Feeds the
   * HTML sitemap page (`/sitemap`). */
  sitemap: () => `${CMS_BASE}/api/v2/sitemap`,

  /** Zoho Forms "TrainingEnquiry" — the same form the live site's
   * `/enquiry-form` posts to. Leads land in Zoho, and through it the CRM.
   * Field names are Zoho's own (see `lib/leads/zoho.js`). */
  zohoTrainingEnquiry: () =>
    "https://forms.zohopublic.in/arvindedst1/form/TrainingEnquiry/formperma/uB1eKs_l1E4npKVJKC49HDEQm5jBlAC3Ow4h9zLcGmA/htmlRecords/submit",

  /** Zoho Forms "EdstellarLDConsultingform1" — the form on the live L&D, OD,
   * talent assessment, coaching and managed training pages. */
  zohoLdConsulting: () =>
    "https://forms.zohopublic.in/arvindedst1/form/EdstellarLDConsultingform1/formperma/j0lltkHA9cdyNTTyW3zC0uRt1c--sWP6VDvqj6rYPuE/htmlRecords/submit",

  /** Zoho Forms "PartnershipForm" — both tabs (businesses, individuals) of
   * the live `/partner-program` application form. */
  zohoPartnership: () =>
    "https://forms.zohopublic.in/arvindedst1/form/PartnershipForm/formperma/SJ9N1u72DtmC9eKjQAePz2KzKhI0zAdVMkUMXnIZCpo/htmlRecords/submit",

  /** Zoho Forms "CourseMultiStepFrom" (sic) — the live course pages'
   * multi-step group-quote form. */
  zohoCourseQuote: () =>
    "https://forms.zohopublic.in/arvindedst1/form/CourseMultiStepFrom/formperma/oDUgNvo8zSVHWxs89aZNS-AdElsu-zsF0IuFOiMJf60/htmlRecords/submit",
};

/**
 * Revalidation windows, colocated with the endpoints they apply to so a page
 * and its data can never disagree about freshness.
 */
export const REVALIDATE = {
  cms: 3600,
  domain: 20,
  course: 20,
  author: 300,
  category: 300,
  main: 300,
  trainer: 3600,
};
