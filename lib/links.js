/**
 * Anchor attributes that open `href` in a new tab — the readiness-check
 * buttons take the reader to the separate assessment tool, so the page they
 * were reading stays open. In-page anchors (`#apply`) are left alone: they
 * only scroll, and a new tab of the same page would be pointless.
 */
export function newTabProps(href) {
  if (!href || href.startsWith("#")) return {};
  return { target: "_blank", rel: "noopener noreferrer" };
}

/**
 * `prefetch` for a navbar link: off for the `/platforms/*` pages, so a page
 * load does not fetch them in the background; Next's default for the rest.
 */
export function navPrefetch(href) {
  return href?.startsWith("/platforms/") ? false : undefined;
}
