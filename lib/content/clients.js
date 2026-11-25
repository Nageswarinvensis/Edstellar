import "server-only";

import { CLIENTS } from "@/content/company/clients";
import { getClientLogos } from "@/lib/content/client-logos";

/** Clients (`/clients`) — local content (`content/company/clients.js`); the
 * CMS has no `clients` page, so the page is fully static. */
const PAGE = {
  ...CLIENTS,
  hero: { ...CLIENTS.hero, mosaic: getClientLogos(CLIENTS.hero.mosaic) },
  explorer: { ...CLIENTS.explorer, clients: getClientLogos(CLIENTS.explorer.clients) },
  regions: {
    ...CLIENTS.regions,
    cards: CLIENTS.regions.cards.map((card) => ({ ...card, logos: getClientLogos(card.logos) })),
  },
};

/** Every logo on the page is a client logo id, resolved from the shared
 * registry (`lib/content/client-logos.js`). */
export function getClientsPage() {
  return PAGE;
}
