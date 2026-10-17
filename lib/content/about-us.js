import "server-only";

import { ABOUT_US } from "@/content/company/about-us";

/** About Us (`/about-us`) — local content (`content/company/about-us.js`);
 * the CMS has no `about-us` page. */
export function getAboutUsPage() {
  return ABOUT_US;
}
