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

/** `actions` with each brochure button pointed at `brochure`, or removed
 * when there is no PDF. Non-brochure actions pass through untouched. */
export function withBrochureActions(actions, brochure) {
  return actions
    ?.map((action) =>
      isBrochureAction(action) ? brochure && { ...action, href: brochure } : action,
    )
    .filter(Boolean);
}

/** The sticky footer with its brochure pill set to `brochure`, keeping the
 * footer's own CMS label if it has one; unchanged when there is no PDF. */
export function withBrochureFooter(stickyFooter, brochure) {
  if (!brochure) return stickyFooter;
  const label = stickyFooter?.Brochure?.[0]?.Label || "Brochure";
  return { ...stickyFooter, Brochure: [{ Label: label, href: brochure }] };
}
