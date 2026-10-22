import Link from "next/link";

import { decodeEntities } from "@/lib/decode-entities";

// `<a href="…">…</a>`, `<em>…</em>` or `<strong>…</strong>` — the only markup
// local legal copy carries. Anything else stays literal text.
const TAG = /(<a href="[^"]*">[\s\S]*?<\/a>|<em>[\s\S]*?<\/em>|<strong>[\s\S]*?<\/strong>)/g;

/**
 * Renders a trusted local copy string with a fixed set of inline tags as
 * React elements, never as raw HTML. Internal links (`/…`) use `next/link`.
 */
export default function InlineHtml({ text, linkClassName, emClassName }) {
  if (!text) return null;

  return text.split(TAG).map((part, index) => {
    const link = part.match(/^<a href="([^"]*)">([\s\S]*)<\/a>$/);
    if (link) {
      const [, href, label] = link;
      return href.startsWith("/") ? (
        <Link key={index} href={href} className={linkClassName}>
          {decodeEntities(label)}
        </Link>
      ) : (
        <a key={index} href={href} className={linkClassName}>
          {decodeEntities(label)}
        </a>
      );
    }
    const em = part.match(/^<em>([\s\S]*)<\/em>$/);
    if (em) {
      return (
        <em key={index} className={emClassName}>
          {decodeEntities(em[1])}
        </em>
      );
    }
    const strong = part.match(/^<strong>([\s\S]*)<\/strong>$/);
    if (strong) return <strong key={index}>{decodeEntities(strong[1])}</strong>;
    return decodeEntities(part);
  });
}
