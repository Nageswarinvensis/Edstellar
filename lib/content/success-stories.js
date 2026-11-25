import "server-only";

import { SUCCESS_STORIES_PAGE } from "@/content/company/success-stories";
import { getClientLogos } from "@/lib/content/client-logos";

/** Success Stories (`/success-stories`) — local content
 * (`content/company/success-stories.js`); the CMS has no page for it. */
const PAGE = {
  ...SUCCESS_STORIES_PAGE,
  clients: { ...SUCCESS_STORIES_PAGE.clients, logos: getClientLogos(SUCCESS_STORIES_PAGE.clients.logos) },
};

export function getSuccessStoriesPage() {
  return PAGE;
}
