/**
 * Fills `{token}` placeholders in content-file copy — e.g.
 * `"About <span>{name}.</span>"` with `{ name: "Mehak" }`. An unknown token
 * is left as written, so a typo shows on the page instead of vanishing.
 */
export function fillTemplate(template, values) {
  if (typeof template !== "string") return template;
  return template.replace(/\{(\w+)\}/g, (token, key) => values[key] ?? token);
}
