/**
 * A domain's brochure PDF lives on the domain record's `meta.brochure` (`meta`
 * is `[]` when empty) — on `domain` for a domain page, on `page.domain` for a
 * course page — never on a component. The CMS's brochure buttons point at
 * `#brochure`, an anchor with no section behind it, so these helpers swap in
 * the PDF, or drop the button when the domain has none.
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

/** `actions` with each brochure button pointed at `brochure`, or removed
 * when there is no PDF. Non-brochure actions pass through untouched. With a
 * `domainName`, the brochure button also gets its hover title. */
const brochureTitle = (domainName) =>
  domainName ? `Click here to download the ${lowerName(domainName)} training brochure` : undefined;

export function withBrochureActions(actions, brochure, domainName) {
  const title = brochureTitle(domainName);

  return actions
    ?.map((action) =>
      isBrochureAction(action)
        ? brochure && { ...action, href: brochure, ...(title && !action.title && { title }) }
        : action,
    )
    .filter(Boolean);
}

/** The sticky footer with its brochure pill set to `brochure`, keeping the
 * footer's own CMS label if it has one; unchanged when there is no PDF. With
 * a `domainName`, the pill gets the brochure hover title. */
export function withBrochureFooter(stickyFooter, brochure, domainName) {
  if (!brochure) return stickyFooter;
  const label = stickyFooter?.Brochure?.[0]?.Label || "Brochure";
  const title = brochureTitle(domainName);
  return { ...stickyFooter, Brochure: [{ Label: label, href: brochure, ...(title && { title }) }] };
}
