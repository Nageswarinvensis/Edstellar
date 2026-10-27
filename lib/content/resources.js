import { getSitePage } from "@/lib/content/site-pages";

/**
 * Resource reads: the L&D resource hub and the tools-and-templates page, both
 * CMS site pages. There is no `/resources/{type}` section — its empty listing
 * pages were removed (Oct 2026). Blog posts stay at `/blog/{slug}` and case
 * studies at `/case-studies` and `/case-study/{slug}` (TASTE.md §1.1).
 */

/** The L&D resource hub (`/learning-development-resources`), from the CMS
 * site page `learning-development-resources`: `seo`, `breadcrumbs`,
 * `resources_hero`, `resources_about`, `resources_picks`, `resources_library`
 * (every resource card), `resources-testimonial`, `faqs`, `resources_cta`,
 * `resources_disclaimer`. `null` when the CMS has no published page (the
 * route turns that into a 404). */
export function getResourcesHub() {
  return getSitePage("learning-development-resources");
}

/** Free L&D Tools and Templates (`/learning-development-templates`), from
 * the CMS site page `learning-development-templates`: `seo`, `breadcrumbs`,
 * `template_hero`, `templates` (the cards) and `template_cta`. `null` when
 * the CMS has no published page (the route turns that into a 404). */
export async function getTemplatesPage() {
  const page = await getSitePage("learning-development-templates");
  if (!page) return null;
  // The CMS links each card to `/resources/templates/{slug}`, but a template
  // lives at the live site's `/templates/{slug}` (TASTE.md §1.1). Rewriting
  // here saves every card a redirect hop; the redirect still covers old links.
  return JSON.parse(JSON.stringify(page).replaceAll('"/resources/templates/', '"/templates/'));
}
