import "server-only";

import { CLIENTS } from "@/content/company/clients";

/** Clients (`/clients`) — local content (`content/company/clients.js`); the
 * CMS has no `clients` page, so the page is fully static. */
export function getClientsPage() {
  return CLIENTS;
}
