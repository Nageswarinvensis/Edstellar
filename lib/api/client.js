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

/** Retries for a 429 before giving up — a build fans out many concurrent
 * requests to the same upstream, so a rate limit here is expected, not
 * exceptional. */
const MAX_RATE_LIMIT_RETRIES = 6;
const RETRY_BASE_DELAY_MS = 500;
const RETRY_MAX_DELAY_MS = 15_000;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Paces every outgoing request to at least `MIN_DISPATCH_INTERVAL_MS` apart.
 *
 * Retrying a 429 does not help when the 429 comes from a requests-per-window
 * quota rather than a concurrent-connections limit — a blog build with
 * hundreds of pages otherwise fires requests as fast as each static-
 * generation worker can go, against a public unauthenticated API with no
 * quota of its own to spend. Limiting concurrency alone still let the
 * cumulative rate exceed that quota; this is what actually keeps the rate
 * down. `dispatchChain` serializes the wait itself so concurrent callers
 * queue for a turn rather than all computing the same wait and firing
 * together.
 */
const MIN_DISPATCH_INTERVAL_MS = 300;
let dispatchChain = Promise.resolve();
let lastDispatchAt = 0;

function throttleDispatch() {
  const turn = dispatchChain.then(async () => {
    const wait = lastDispatchAt + MIN_DISPATCH_INTERVAL_MS - Date.now();
    if (wait > 0) await sleep(wait);
    lastDispatchAt = Date.now();
  });
  dispatchChain = turn;
  return turn;
}

async function fetchWithRetries(url, revalidate) {
  let res;
  for (let attempt = 0; ; attempt += 1) {
    await throttleDispatch();
    res = await fetch(url, { next: { revalidate } });

    if (res.status !== 429 || attempt >= MAX_RATE_LIMIT_RETRIES) break;

    const retryAfter = Number(res.headers.get("retry-after"));
    const delay = Number.isFinite(retryAfter)
      ? retryAfter * 1000
      : Math.min(
          RETRY_BASE_DELAY_MS * 2 ** attempt * (1 + Math.random()),
          RETRY_MAX_DELAY_MS,
        );
    await sleep(delay);
  }
  return res;
}

/**
 * Static generation fans out one call to `apiGet(url, …)` per page — e.g.
 * every blog post page independently re-requests the same bulk blog listing.
 * React's `cache()` cannot help here: it dedupes calls within one page's
 * render, not across the many separate page renders a build fires
 * concurrently. Without this, that fan-out is exactly what was tripping the
 * upstream rate limit even after retries/throttling were added. Keyed by
 * URL and cleared once the request settles, so a later call (e.g. after an
 * ISR revalidation window) still goes through Next's own Data Cache/fetch
 * rather than being pinned to a stale in-flight entry forever.
 */
const inFlightRequests = new Map();

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
export function apiGet(url, { revalidate, nullOn404 = true }) {
  if (typeof revalidate !== "number") {
    throw new Error(
      `apiGet requires an explicit revalidate for ${redactUrl(url)}`,
    );
  }

  const inFlight = inFlightRequests.get(url);
  if (inFlight) return inFlight;

  const request = fetchWithRetries(url, revalidate)
    .then((res) => {
      if (res.status === 404 && nullOn404) return null;
      if (!res.ok) throw new ApiError(url, res.status);
      return res.json();
    })
    .finally(() => inFlightRequests.delete(url));

  inFlightRequests.set(url, request);
  return request;
}
