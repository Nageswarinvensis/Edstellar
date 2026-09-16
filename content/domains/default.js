/**
 * Scaffolding every domain page shares. Mirrors `content/courses/defaults.js`
 * — merged in beneath every domain by `lib/content/domains.js` so a section
 * the CMS has not modeled yet (the client-logo strip) still renders.
 */

import { CLIENT_LOGOS_DATA } from "@/lib/constants";

export const DOMAIN_DEFAULTS = {
  ClientsLogosData: CLIENT_LOGOS_DATA,
};
