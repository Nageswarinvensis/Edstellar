import "server-only";

import { SUCCESS_STORIES_PAGE } from "@/content/company/success-stories";

/** Success Stories (`/success-stories`) — local content
 * (`content/company/success-stories.js`); the CMS has no page for it. */
export function getSuccessStoriesPage() {
  return SUCCESS_STORIES_PAGE;
}
