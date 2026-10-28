/**
 * Removes empty leaves from a schema.org config so blank CMS placeholders
 * never reach the page. A value is "empty" when it is null/undefined, an
 * empty string, an empty array, or an object whose every leaf is empty.
 *
 * Used by page routes that consume the CMS's five schema components
 * (consultingSchema, coachingSchema, assessmentSchema, templateSchema,
 * templateAppSchema) — each of which ships a stable key set where unused
 * keys carry "" or [] rather than being absent.
 */

export function isEmpty(v) {
  if (v == null) return true;
  if (typeof v === "string") return v.trim() === "";
  if (Array.isArray(v)) return v.length === 0;
  if (typeof v === "object") return Object.values(v).every(isEmpty);
  return false;
}

export function prune(v) {
  if (Array.isArray(v)) return v.map(prune).filter((x) => !isEmpty(x));
  if (v && typeof v === "object") {
    const o = Object.fromEntries(
      Object.entries(v)
        .map(([k, x]) => [k, prune(x)])
        .filter(([, x]) => !isEmpty(x)),
    );
    return o;
  }
  return v;
}

/**
 * Turn a CMS schema component's `config` into an array of pruned node
 * objects, one per schema.org `@type` key, ready to emit as separate
 * `<script type="application/ld+json">` tags.
 *
 * @param {object|null|undefined} config  The raw `config` from the CMS component.
 * @returns {object[]}  Array of node objects (may be empty).
 */
export function schemaNodes(config) {
  if (!config) return [];
  const pruned = prune(config);
  if (!pruned || typeof pruned !== "object") return [];
  return Object.values(pruned).filter((node) => node && typeof node === "object");
}
