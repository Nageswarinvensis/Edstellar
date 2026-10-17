import "server-only";

import { RFP_PAGE } from "@/content/company/request-for-proposal";

/** Request for Proposal (`/request-for-proposal`) — local content
 * (`content/company/request-for-proposal.js`); the CMS has no page for it. */
export function getRfpPage() {
  return RFP_PAGE;
}
