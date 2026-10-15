import "server-only";

import { getSitePage } from "@/lib/content/site-pages";
import contactUs from "@/content/company/contact-us.json";
import enquiryNow from "@/content/company/enquiry-now.json";

/**
 * Company pages. Become a Guest Author comes from the CMS
 * (`site-pages/become-a-guest-author`), as `{ [component_slug]: config }`;
 * Contact Us and Enquire Now are still local JSON (`content/company/`).
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
