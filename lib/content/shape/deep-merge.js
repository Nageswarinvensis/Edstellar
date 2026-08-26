/**
 * Merge `override` onto `base`, recursing into plain objects.
 *
 * **Arrays replace, they never merge.** A CMS `modules: [...]` is the complete
 * list; merging it element-wise with a stale fallback would splice two
 * different curricula together — which is worse than either alone.
 *
 * `undefined` and `null` on the override are treated as "not supplied" so a
 * field the CMS has not filled in falls back rather than blanking the page.
 */
export function deepMerge(base, override) {
  if (!isPlainObject(base) || !isPlainObject(override)) {
    return override ?? base;
  }

  const out = { ...base };

  for (const [key, value] of Object.entries(override)) {
    if (value === undefined || value === null) continue;
    out[key] = isPlainObject(value) ? deepMerge(base[key], value) : value;
  }

  return out;
}

function isPlainObject(value) {
  return (
    typeof value === "object" && value !== null && !Array.isArray(value)
  );
}
