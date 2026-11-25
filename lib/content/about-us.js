import "server-only";

import { ABOUT_US } from "@/content/company/about-us";
import { getClientLogos } from "@/lib/content/client-logos";

/** About Us (`/about-us`) — local content (`content/company/about-us.js`);
 * the CMS has no `about-us` page. */
const PAGE = { ...ABOUT_US, clients: { ...ABOUT_US.clients, logos: getClientLogos(ABOUT_US.clients.logos) } };

export function getAboutUsPage() {
  return PAGE;
}
