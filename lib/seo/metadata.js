import { SITE } from "@/lib/constants";

/** Decode HTML entities that CMS fields sometimes contain so Next.js does not
 * double-escape them in <meta> attributes (e.g. `&#x27;` → `'`). */
function decodeEntities(str) {
  if (!str) return str;
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

/**
 * Single construction point for page metadata (TASTE.md §4.1).
 *
 * Guarantees every page gets a canonical URL plus Open Graph and Twitter tags,
 * which is the part most easily forgotten when metadata is hand-assembled in
 * page files. `metadataBase` is set once in the root layout, so `path` and
 * `image` may be relative here.
 */
export function buildMetadata({
  title,
  description,
  path = "/",
  image,
  type = "website",
  noIndex = false,
}) {
  const canonical = path;
  const resolvedDescription = decodeEntities(description || SITE.description);
  const images = image ? [{ url: image }] : undefined;

  return {
    title,
    description: resolvedDescription,
    alternates: { canonical },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type,
      siteName: SITE.name,
      title,
      description: resolvedDescription,
      url: canonical,
      images,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description: resolvedDescription,
      images: image ? [image] : undefined,
    },
  };
}

/** CMS titles end in "| Edstellar", which the root layout's title template
 * (`%s | Edstellar`) adds again — strip it so it does not render twice. */
export function stripSiteSuffix(title) {
  return title?.replace(/\s*\|\s*Edstellar\s*$/i, "").trim();
}
