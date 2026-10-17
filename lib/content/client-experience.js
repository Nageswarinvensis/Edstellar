import "server-only";

import { CLIENT_EXPERIENCE } from "@/content/company/client-experience";

/** Client Experience (`/exceptional-customer-experience`) — local content
 * (`content/company/client-experience.js`); the CMS has no page for it. */
export function getClientExperiencePage() {
  return CLIENT_EXPERIENCE;
}
