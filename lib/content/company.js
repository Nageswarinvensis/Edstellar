import "server-only";

import { getSitePage } from "@/lib/content/site-pages";
import contactUs from "@/content/company/contact-us.json";
import enquiryNow from "@/content/company/enquiry-now.json";
import pricing from "@/content/company/corporate-training-pricing.json";
import trainerPlatform from "@/content/company/trainer-platform.json";

/**
 * Company pages. Become a Guest Author and the thank-you pages come from the
 * CMS (`site-pages/become-a-guest-author`, `site-pages/thank-you/{slug}`), as
 * `{ [component_slug]: config }`; Contact Us, Enquire Now, Corporate
 * Training Pricing and the trainer platform page are still local JSON (`content/company/`).
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

export function getPricingPage() {
  return pricing;
}

export function getTrainerPlatformPage() {
  return trainerPlatform;
}

/**
 * A thank-you page by slug (`/thank-you/{slug}`): the `thank-you` component
 * (`heading`, `subtext`, `para`) of the CMS site page `thank-you/{slug}`.
 * `null` when the CMS has no published page, so the route returns a real 404
 * rather than thanking anyone for an unknown form.
 */
export async function getThankYouPage(slug) {
  const page = await getSitePage(`thank-you/${slug}`);
  return page?.["thank-you"] ?? null;
}
