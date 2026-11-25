import "server-only";

import { CLIENT_LOGOS, CLIENT_LOGO_STRIP } from "@/content/company/client-logos";

/**
 * Client logos — the one registry every page picks from
 * (`content/company/client-logos.js`). A page's content lists only the ids
 * it shows; the name, image, size and alt text come from here, so a logo is
 * changed in one place and every page that shows it follows.
 *
 * An unknown id throws: a typo or a removed client fails the build instead
 * of rendering a missing logo.
 */
export function getClientLogo(id) {
  const logo = CLIENT_LOGOS[id];
  if (!logo) throw new Error(`Unknown client logo id "${id}" — add it to content/company/client-logos.js`);
  return { id, ...logo };
}

/**
 * A page's logo list, in the page's order. Each entry is an id, or
 * `{ id, ...fields }` when the page attaches its own data to the logo
 * (About Us `industry`, the clients page's sector and description).
 * Those fields are kept; `src`, `alt`, `width` and `height` always come
 * from the registry.
 */
export function getClientLogos(entries = []) {
  return entries.map((entry) => {
    if (typeof entry === "string") return getClientLogo(entry);
    const { id, ...fields } = entry;
    const { src, alt, width, height, ...logo } = getClientLogo(id);
    return { ...logo, ...fields, id, src, alt, width, height };
  });
}

/** The scrolling client-logo strip (`ClientLogos`, course v2 "Why Edstellar"). */
export function getClientLogoStrip() {
  return { heading: CLIENT_LOGO_STRIP.heading, logos: getClientLogos(CLIENT_LOGO_STRIP.ids) };
}
