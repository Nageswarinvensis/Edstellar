import Link from "next/link";

import { decodeEntities } from "@/lib/decode-entities";

// `<a href="…">…</a>`, `<em>…</em>` or `<strong>…</strong>` — the only markup
// local legal copy carries. Anything else stays literal text.
const TAG = /(<a href="[^"]*"\s*>[\s\S]*?<\/a>|<em>[\s\S]*?<\/em>|<strong>[\s\S]*?<\/strong>)/g;

// The CMS writes links to our own pages as full live URLs.
const OWN_ORIGIN = /^https?:\/\/(www\.)?edstellar\.com(?=\/|$)/;

/**
 * Renders a trusted copy string (local or CMS) with a fixed set of inline
 * tags as React elements, never as raw HTML. Internal links (`/…`, or a full
 * edstellar.com URL, made relative) use `next/link`.
 */
export default function InlineHtml({ text, linkClassName, emClassName }) {
  if (!text) return null;

  return text.split(TAG).map((part, index) => {
    const link = part.match(/^<a href="([^"]*)"\s*>([\s\S]*)<\/a>$/);
    if (link) {
      const href = link[1].replace(OWN_ORIGIN, "") || "/";
      const label = link[2];
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
