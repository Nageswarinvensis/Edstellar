/**
 * A domain's brochure PDF lives on the domain record's `meta.brochure` (`meta`
 * is `[]` when empty) — on `domain` for a domain page, on `page.domain` for a
 * course page — never on a component. The CMS's brochure buttons point at
 * `#brochure`, an anchor with no section behind it. These helpers keep it
 * at `#brochure` (normalising any other brochure href) so `BrochureGate`
 * opens its drawer — the PDF URL itself never reaches the page source; it is
 * resolved on the server when the form is sent (`lib/content/brochures.js`).
 * A domain with no PDF loses the button.
 */

const isBrochureAction = (action) =>
  action.type === "brochure" ||
  action.href === "#brochure" ||
  /brochure/i.test(action.label ?? "");

/** Lowercase a name for a link title, keeping acronyms ("AI", "SAP"). */
export const lowerName = (name) =>
  name
    .split(" ")
    .map((word) => (word.length > 1 && word === word.toUpperCase() ? word : word.toLowerCase()))
    .join(" ");

/** `actions` with each brochure button pointed at `#brochure`, or removed
 * when there is no PDF. Non-brochure actions pass through untouched. With a
 * `domainName`, the brochure button also gets its hover title. */
const brochureTitle = (domainName) =>
  domainName ? `Click here to download the ${lowerName(domainName)} training brochure` : undefined;

export function withBrochureActions(actions, brochure, domainName) {
  const title = brochureTitle(domainName);

  return actions
    ?.map((action) =>
      isBrochureAction(action)
        ? brochure && { ...action, href: "#brochure", ...(title && !action.title && { title }) }
        : action,
    )
    .filter(Boolean);
}

/** The sticky footer with its brochure pill set to `#brochure`, keeping the
 * footer's own CMS label if it has one; unchanged when there is no PDF. With
 * a `domainName`, the pill gets the brochure hover title. */
export function withBrochureFooter(stickyFooter, brochure, domainName) {
  if (!brochure) return stickyFooter;
  const label = stickyFooter?.Brochure?.[0]?.Label || "Brochure";
  const title = brochureTitle(domainName);
  return { ...stickyFooter, Brochure: [{ Label: label, href: "#brochure", ...(title && { title }) }] };
}

/** A brochure on the media host: a PDF under `/brochure/` or `/brochures/` or a consulting
 * page's HTML brochure under `/consulting-brochure/` (formerly `/consulting-brochures/`). */
const BROCHURE_URL = /^https?:\/\/media\.edstellar\.com\/(?:brochures?\/\S+\.pdf|consulting-brochures?\/\S+\.html)$/i;

/**
 * `value` with every brochure URL string, at any depth, replaced by
 * `#brochure`. CMS site pages (the consulting pages) carry the brochure link
 * directly in their buttons — the proof band's download pill, the sticky
 * footer — and the SEO team does not want brochure URLs in the page source.
 * `#brochure` is what `BrochureGate` opens its drawer for; the real URL is
 * resolved on the server when the form is sent (`lib/content/brochures.js`).
 * Copy is untouched — only the link.
 */
export function hideBrochureUrls(value) {
  if (typeof value === "string") return BROCHURE_URL.test(value.trim()) ? "#brochure" : value;
  if (Array.isArray(value)) return value.map(hideBrochureUrls);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, hideBrochureUrls(item)]));
  }
  return value;
}
