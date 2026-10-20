/**
 * Minimal pub-sub so a page-level sticky sub-nav (e.g. the course tab bar)
 * can tell the global SiteHeader to get out of the way once the sub-nav
 * takes over the top of the viewport. SiteHeader lives in the root layout,
 * far outside a page's own component tree, so a shared external store is
 * simpler here than threading context through a Server Component layout.
 *
 * Only pages with a pinned in-page nav call `setHeaderHidden(true)` — the
 * course/TNA tab bar and `HeaderHideSentinel` (SectionNav, clients nav) — so
 * every other route's header is unaffected.
 */
let hidden = false;
const listeners = new Set();

export function setHeaderHidden(value) {
  if (hidden === value) return;
  hidden = value;
  listeners.forEach((listener) => listener());
}

export function subscribeHeaderHidden(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

export function getHeaderHiddenSnapshot() {
  return hidden;
}

export function getHeaderHiddenServerSnapshot() {
  return false;
}
