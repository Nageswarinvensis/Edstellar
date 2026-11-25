/**
 * An author's name split for the accent the author page puts on the surname:
 * the last word, or — when the name ends in initials — all the trailing
 * initials together.
 *
 *   "Deepesh Agrawal" → { lead: "Deepesh",  accent: "Agrawal" }
 *   "Subbaiah M U"    → { lead: "Subbaiah", accent: "M U" }
 *   "Madonna"         → { lead: "Madonna",  accent: null }
 *
 * Shared by the author hero and the "Articles By …" heading so both always
 * emphasize the same words. Plain module — no "use client".
 */
export function splitAuthorName(name = "") {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length < 2) return { lead: words.join(" "), accent: null };

  const isInitial = (word) => /^\p{L}\.?$/u.test(word);
  let split = words.length - 1;
  while (split > 1 && isInitial(words[split]) && isInitial(words[split - 1])) split -= 1;

  return { lead: words.slice(0, split).join(" "), accent: words.slice(split).join(" ") };
}
