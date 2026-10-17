import "server-only";

import { CORPORATE_TRAINING_HUB } from "@/content/corporate-training/hub";

/** Corporate Training hub (`/corporate-training`) — local content
 * (`content/corporate-training/hub.js`); the CMS has no page for it. */
export function getCorporateTrainingHub() {
  return CORPORATE_TRAINING_HUB;
}
