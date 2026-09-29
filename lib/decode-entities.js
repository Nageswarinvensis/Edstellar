/**
 * Decode HTML entities in CMS text that is rendered as plain text.
 *
 * The CMS stores some copy HTML-escaped (`&` saved as `&amp;`), and React
 * renders strings literally, so the entity would otherwise show on the page
 * ("Compliance &amp; Audit"). Covers numeric entities and the named ones
 * that appear in editorial copy; an unknown name is left as written.
 */
const NAMED = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  ndash: "–",
  mdash: "—",
  lsquo: "‘",
  rsquo: "’",
  ldquo: "“",
  rdquo: "”",
  hellip: "…",
  middot: "·",
  times: "×",
  rarr: "→",
  larr: "←",
  copy: "©",
  reg: "®",
  trade: "™",
};

export function decodeEntities(text) {
  if (typeof text !== "string" || !text.includes("&")) return text;

  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (entity, body) => {
    if (body[0] === "#") {
      const code =
        body[1].toLowerCase() === "x" ? parseInt(body.slice(2), 16) : Number(body.slice(1));
      return Number.isFinite(code) ? String.fromCodePoint(code) : entity;
    }
    return NAMED[body.toLowerCase()] ?? entity;
  });
}
