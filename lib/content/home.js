import "server-only";

import HOME from "@/content/home.json";
import { getClientLogos } from "@/lib/content/client-logos";

/**
 * Home (`/`) — local content, rendered as ISR (§2.2).
 *
 * All of the home page's content lives in one JSON file, `content/home.json`,
 * one top-level key per section in page order: `seo`, `hero`, `stats`,
 * `clients`, `definition`, `solutions`, `taxonomy`, `platforms`, `method`,
 * `priorities`, `why`, `who`, `faq`, `cta`. Field names follow the CMS's
 * snake_case convention (TASTE.md §5.4). Logos and trainer photos load from
 * `media.edstellar.com`. `clients.logos` holds client logo ids, resolved
 * from the shared registry (`lib/content/client-logos.js`).
 */
const PAGE = { ...HOME, clients: { ...HOME.clients, logos: getClientLogos(HOME.clients.logos) } };

export function getHomePage() {
  return PAGE;
}
