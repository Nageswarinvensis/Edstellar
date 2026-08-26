import "server-only";

/**
 * The only `fetch` in this codebase.
 *
 * Every network call the site makes goes through `apiGet`. That is the point:
 * one place decides caching, one place decides what a 404 means, and one place
 * decides what gets logged. `lib/content/*` calls this; nothing else does, and
 * no component ever does.
 *
 * `import "server-only"` makes that structural rather than aspirational — if
 * a Client Component ever imports this module, directly or through a chain,
 * the build fails with a real error instead of leaking an API base URL into
 * the browser bundle.
 */

/** Thrown for any non-OK response that is not a 404. */
export class ApiError extends Error {
  constructor(url, status) {
    // The URL is included but never the response body: upstream payloads can
    // carry lead data, and this message may reach a log (TASTE.md §7.1).
    super(`API request failed: ${status} ${redactUrl(url)}`);
    this.name = "ApiError";
    this.status = status;
  }
}

/** Strip query strings — they are the only part of a URL likely to carry PII. */
function redactUrl(url) {
  const queryStart = url.indexOf("?");
  return queryStart === -1 ? url : `${url.slice(0, queryStart)}?…`;
}

/**
 * GET JSON with an explicit cache directive.
 *
 * @param {string} url
 * @param {object} options
 * @param {number} options.revalidate  Seconds. Required — never left to chance
 *                                     (TASTE.md §5.2).
 * @param {boolean} [options.nullOn404=true]  404 → `null` rather than a throw,
 *   so a missing record stays the caller's decision (TASTE.md §5.2). Set false
 *   when a 404 genuinely means the integration is broken.
 * @returns {Promise<object|null>}
 */
export async function apiGet(url, { revalidate, nullOn404 = true }) {
  if (typeof revalidate !== "number") {
    throw new Error(
      `apiGet requires an explicit revalidate for ${redactUrl(url)}`,
    );
  }

  const res = await fetch(url, { next: { revalidate } });

  if (res.status === 404 && nullOn404) return null;
  if (!res.ok) throw new ApiError(url, res.status);

  return res.json();
}
