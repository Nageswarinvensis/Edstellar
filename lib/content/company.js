import "server-only";

import { getSitePage } from "@/lib/content/site-pages";
import pricing from "@/content/company/corporate-training-pricing.json";
import trainerPlatform from "@/content/company/trainer-platform.json";
import universityEnquiry from "@/content/company/university-enquiry.json";
import governmentEnquiry from "@/content/company/government-enquiry.json";

/**
 * Company pages. Become a Guest Author, Contact Us, Enquire Now and the thank-you pages
 * come from the CMS (`site-pages/become-a-guest-author`, `site-pages/thank-you/{slug}`), as
 * `{ [component_slug]: config }`; Corporate Training
 * Pricing and the trainer platform page are still local JSON (`content/company/`).
 */

/** `null` when the CMS has no published page (the route turns that into a 404). */
export function getGuestAuthorPage() {
  return getSitePage("become-a-guest-author");
}

/**
 * Contact Us (`/contact-us`), from the CMS site page `contact-us`:
 * `{ seo, contact_page }`. `null` when the CMS has no published page (the
 * route turns that into a 404).
 */
export function getContactPage() {
  return getSitePage("contact-us");
}

/**
 * Enquire Now (`/enquiry-now`), from the CMS site page `enquiry-form`:
 * `{ seo, enquiry_page }`. `null` when the CMS has no published page (the
 * route turns that into a 404).
 */
export function getEnquiryPage() {
  return getSitePage("enquiry-form");
}

export function getPricingPage() {
  return pricing;
}

/**
 * Join as a Trainer (`/trainer-platform`): the CMS site page
 * `trainer-platform` (`seo`, `breadcrumbs`, `trainer_dashboard`,
 * `trainers_how_it_works`, `trainer_final_cta`) beside the sections the CMS
 * does not send yet — hero, benefits, reviews, impact, resources — still in
 * `content/company/trainer-platform.json`. `null` when the CMS has no
 * published page (the route turns that into a 404).
 */
export async function getTrainerPlatformPage() {
  const cms = await getSitePage("trainer-platform");
  if (!cms) return null;
  return { ...trainerPlatform, ...cms };
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

/** Training for University Enquiry (`/training-for-universities-enquiry`) —
 * local JSON (`content/company/university-enquiry.json`) until the CMS has a
 * page for it. */
export function getUniversityEnquiryPage() {
  return universityEnquiry;
}

/** Training for Government Enquiry (`/training-for-government-enquiry`) —
 * local JSON (`content/company/government-enquiry.json`) until the CMS has
 * a page for it. */
export function getGovernmentEnquiryPage() {
  return governmentEnquiry;
}
