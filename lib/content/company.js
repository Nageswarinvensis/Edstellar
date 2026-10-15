import "server-only";

import { getSitePage } from "@/lib/content/site-pages";
import thankYou from "@/content/company/thank-you.json";
import contactUs from "@/content/company/contact-us.json";
import enquiryNow from "@/content/company/enquiry-now.json";

/**
 * Company pages. Become a Guest Author and the thank-you pages come from the
 * CMS (`site-pages/become-a-guest-author`, `site-pages/thank-you/{slug}`), as
 * `{ [component_slug]: config }`; Contact Us and Enquire Now are still local
 * JSON (`content/company/`).
 */

/** `null` when the CMS has no published page (the route turns that into a 404). */
export function getGuestAuthorPage() {
  return getSitePage("become-a-guest-author");
}

export function getContactPage() {
  return contactUs;
}

export function getEnquiryPage() {
  return enquiryNow;
}

/**
 * A thank-you page by slug (`/thank-you/{slug}`), from the CMS site page
 * `thank-you/{slug}`: its `thank-you` component (`heading`, `subtext`,
 * `para`) over the local SEO, CTA and "Reach Us" links, which the CMS does
 * not send. `null` when the CMS has no published page, so the route returns
 * a real 404 rather than thanking anyone for an unknown form.
 */
export async function getThankYouPage(slug) {
  const page = await getSitePage(`thank-you/${slug}`);
  if (!page?.["thank-you"]) return null;

  const { slugs, ...local } = thankYou;
  return { ...local, ...page["thank-you"] };
}

/** The CMS has no index endpoint, so the slugs to prerender are listed
 * locally. A CMS thank-you page missing from the list still renders on
 * demand. */
export function getThankYouSlugs() {
  return thankYou.slugs;
}
