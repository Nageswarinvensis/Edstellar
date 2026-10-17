import "server-only";

import { LEADERSHIP_RETREATS } from "@/content/leadership-retreats";

/** Leadership Retreats (`/leadership-retreats`) — local content
 * (`content/leadership-retreats/index.js`); the CMS has no page for it. */
export function getLeadershipRetreatsPage() {
  return LEADERSHIP_RETREATS;
}
