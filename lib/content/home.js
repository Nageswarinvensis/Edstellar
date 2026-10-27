import "server-only";

import { HOME } from "@/content/home";

/** Home (`/`) — local content (`content/home.js`); rendered as ISR (§2.2). */
export function getHomePage() {
  return HOME;
}
