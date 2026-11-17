import "server-only";

import { getCourse } from "@/lib/content/courses";
import { getDomain } from "@/lib/content/domains";
import { consultingBrochureUrl } from "@/lib/content/shape/consulting-brochure";
import { getSitePageMeta } from "@/lib/content/site-pages";
import { FULL_CATALOG_PDF } from "@/content/corporate-training/catalog";

/**
 * Brochure keys → brochure URLs, resolved on the server only.
 *
 * The SEO team does not want brochure/PDF URLs in the page source, so pages
 * never receive them: the brochure drawer and the blog rail's catalog card
 * carry only a key, the download Server Action turns it into the URL here,
 * and the URL goes to Zoho for the thank-you email — never back to the
 * browser. Keys:
 *
 *   catalog                     the full training catalog PDF
 *   domain:{route slug}         a domain's brochure (`domain.meta.brochure`)
 *   course:{domain}/{course}    the course's domain brochure
 *   consulting:{page path}      a consulting page's HTML brochure (`meta["consulting-brochure"]`)
 *
 * Returns `null` for a malformed key or one with no brochure behind it.
 */
const SLUG = "[a-z0-9]+(?:-[a-z0-9]+)*";
const KEY = new RegExp(`^(?:(catalog)|domain:(${SLUG})|course:(${SLUG})/(${SLUG})|consulting:(${SLUG}(?:/${SLUG})?))$`);

/** What a consulting page's `meta["consulting-brochure"]` may hold. */
const CONSULTING_BROCHURE = /^https:\/\/media\.edstellar\.com\/consulting-brochures?\/[\w-]{1,120}\.html$/i;

export async function resolveBrochure(key) {
  const match = typeof key === "string" ? KEY.exec(key) : null;
  if (!match) return null;
  const [, catalog, domainSlug, courseDomain, courseSlug, consultingSlug] = match;

  if (catalog) return FULL_CATALOG_PDF;
  if (domainSlug) return (await getDomain(domainSlug))?.brochure || null;
  if (courseSlug) return (await getCourse(courseDomain, courseSlug))?.brochure || null;
  if (consultingSlug) {
    const fromCms = (await getSitePageMeta(consultingSlug))["consulting-brochure"]?.trim();
    return fromCms && CONSULTING_BROCHURE.test(fromCms) ? fromCms : consultingBrochureUrl(consultingSlug);
  }
  return null;
}

