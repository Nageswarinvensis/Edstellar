import { SITE } from "@/lib/constants";
import { getSitemapIndex } from "@/lib/content/training-catalog";
import {
  CONSULTING_PILLARS,
  getConsultingServiceSlugs,
} from "@/lib/content/consulting";
import { getTalentAssessmentServiceSlugs } from "@/lib/content/talent-assessment";
import { RESOURCE_TYPES } from "@/lib/content/resources";
import { getCaseStudySlugs } from "@/lib/content/case-studies";
import { getTemplateSlugs } from "@/lib/content/templates";

/**
 * Single XML sitemap — every Edstellar page in one file.
 *
 * The bulk of the URLs (domains, courses, blogs, site_pages) come from a
 * single call to GET /api/v2/sitemap, which the CMS maintains:
 *   77  domains  → /corporate-training/{slug}
 *   2,049 courses → /corporate-training/{domain}/{slug}
 *   446  blogs   → /blog/{slug}
 *   47   site_pages → /{slug} (with known overrides)
 *
 * Consulting sub-services are fetched from their own CMS endpoints (they are
 * not in site_pages). Static pages this repo owns but the CMS does not list
 * are appended last, deduplicated against whatever the CMS returned.
 *
 * **All courses must come from the CMS list, not the prerendered subset.**
 * Catalog pagination is client-side; the sitemap is the only crawler path to
 * the long tail (TASTE.md §2.3).
 */
export const revalidate = 3600;

/** CMS site_page slugs whose public URL differs from `/{slug}`. `null` = skip. */
const SITE_PAGE_URL = {
  "book-a-demo": null,
};

export default async function sitemap() {
  const entry = (path, priority, changeFrequency = "weekly", lastModified) => ({
    url: `${SITE.url}${path}`,
    lastModified: lastModified ? new Date(lastModified) : new Date(),
    changeFrequency,
    priority,
  });

  const [index, servicePaths, talentAssessmentSlugs, templateSlugs] =
    await Promise.all([
      getSitemapIndex(),
      Promise.all(
        CONSULTING_PILLARS.map(async ({ slug: pillar }) =>
          (await getConsultingServiceSlugs(pillar)).map(
            (slug) => `/${pillar}/${slug}`,
          ),
        ),
      ).then((paths) => paths.flat()),
      getTalentAssessmentServiceSlugs(),
      getTemplateSlugs(),
    ]);

  // ── CMS-backed entries ────────────────────────────────────────────────────

  // 77 training domains → /corporate-training/{slug}
  const domainEntries = (index.domains ?? []).map(({ slug, updated_at }) =>
    entry(`/corporate-training/${slug}`, 0.7, "weekly", updated_at),
  );

  // 2,049 courses → /corporate-training/{domain}/{course}
  const courseEntries = (index.courses ?? []).map(({ slug, updated_at }) =>
    entry(`/corporate-training/${slug}`, 0.8, "weekly", updated_at),
  );

  // 446 blog posts → /blog/{slug}
  const blogEntries = (index.blogs ?? []).map(({ slug, updated_at }) =>
    entry(`/blog/${slug}`, 0.6, "weekly", updated_at),
  );

  // 47 site pages — map known URL overrides, skip null entries
  const cmsPageEntries = (index.site_pages ?? [])
    .map(({ slug, updated_at }) => {
      const path = slug in SITE_PAGE_URL ? SITE_PAGE_URL[slug] : `/${slug}`;
      return path ? entry(path, 0.5, "monthly", updated_at) : null;
    })
    .filter(Boolean);

  // ── Static pages this repo owns ───────────────────────────────────────────
  // Skipped when the CMS already returned the same URL via site_pages.
  const cmsPaths = new Set(cmsPageEntries.map((e) => e.url));
  const staticEntry = (path, priority, changeFrequency = "monthly") => {
    const url = `${SITE.url}${path}`;
    return cmsPaths.has(url) ? null : entry(path, priority, changeFrequency);
  };

  return [
    // ── Core ──────────────────────────────────────────────────────────────
    entry("/", 1, "daily"),
    entry("/corporate-training", 0.8, "daily"),
    entry("/corporate-training-catalog", 0.8, "daily"),

    // ── CMS-backed ────────────────────────────────────────────────────────
    ...domainEntries,
    ...courseEntries,
    ...blogEntries,
    ...cmsPageEntries,

    // ── Consulting (own CMS content type — not in site_pages) ────────────
    ...CONSULTING_PILLARS.map(({ slug }) => entry(`/${slug}`, 0.7)),
    ...servicePaths.map((path) => entry(path, 0.6)),
    ...talentAssessmentSlugs.map((slug) =>
      entry(`/talent-assessment-services/${slug}`, 0.6),
    ),

    // ── Resources ─────────────────────────────────────────────────────────
    entry("/learning-development-resources", 0.6, "weekly"),
    entry("/learning-development-templates", 0.5, "weekly"),
    ...RESOURCE_TYPES.map(({ slug }) => entry(`/resources/${slug}`, 0.5)),
    ...templateSlugs.map((slug) =>
      entry(`/templates/${slug}`, 0.5, "monthly"),
    ),

    // ── Case studies (local content — not in CMS sitemap) ────────────────
    entry("/case-studies", 0.5),
    ...getCaseStudySlugs().map((slug) =>
      entry(`/case-study/${slug}`, 0.5, "monthly"),
    ),

    // ── Blog index ────────────────────────────────────────────────────────
    // Explicit even if the CMS site_pages happens to include /blog, to lock
    // its priority/frequency independently of the catch-all site_page entries.
    entry("/blog", 0.6, "daily"),

    // ── Static fallbacks (skipped when CMS site_pages covered them) ───────
    staticEntry("/sitemap", 0.3, "weekly"),
    staticEntry("/corporate-training-pricing", 0.6),
    staticEntry("/leadership-retreats", 0.6),
    staticEntry("/about-us", 0.4),
    staticEntry("/contact-us", 0.4),
    staticEntry("/become-a-guest-author", 0.4),
    staticEntry("/careers", 0.4),
    staticEntry("/clients", 0.6),
    staticEntry("/success-stories", 0.5),
    staticEntry("/exceptional-customer-experience", 0.5),
    staticEntry("/request-for-proposal", 0.5),
    staticEntry("/trainer-platform", 0.5),
    staticEntry("/training-for-universities", 0.6),
    staticEntry("/government-employees-training-courses", 0.6),
    staticEntry("/partner-program", 0.5),
    staticEntry("/training-for-universities-enquiry", 0.4),
    staticEntry("/training-for-government-enquiry", 0.4),
    staticEntry("/privacy-policy", 0.1, "yearly"),
    staticEntry("/terms-conditions", 0.1, "yearly"),
    staticEntry("/modern-slavery-statement", 0.1, "yearly"),
  ].filter(Boolean);
}
