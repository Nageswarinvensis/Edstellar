import "server-only";

import guestAuthor from "@/content/company/become-a-guest-author.json";
import contactUs from "@/content/company/contact-us.json";
import enquiryNow from "@/content/company/enquiry-now.json";

/**
 * Static company pages whose copy lives in local JSON (`content/company/`),
 * not the CMS. Each page is fully prerendered from its file.
 */
export function getGuestAuthorPage() {
  return guestAuthor;
}

export function getContactPage() {
  return contactUs;
}

export function getEnquiryPage() {
  return enquiryNow;
}
