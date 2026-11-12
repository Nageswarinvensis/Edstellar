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

/** The share image for any page without its own — the full Edstellar logo
 * on white, 1200×630. */
export const DEFAULT_OG_IMAGE = "/og/edstellar-og-v2.png";

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
  twitterImage,
  type = "website",
  noIndex = false,
  absoluteTitle = false,
}) {
  const canonical = path;
  const resolvedDescription = decodeEntities(description || SITE.description);
  // The Open Graph and Twitter titles are the page's FINAL title — what the
  // root layout's `%s | Edstellar` template renders in <title> — so all three
  // match. `absoluteTitle` pages (their title carries its own suffix, e.g.
  // "| Free Download") bypass the template, in <title> and here alike.
  const fullTitle = !title || absoluteTitle ? title : `${title} | ${SITE.name}`;
  const resolvedTitle = decodeEntities(fullTitle);
  // Next replaces the layout's `openGraph`/`twitter` wholesale rather than
  // merging them, so the fallback must be set here, not only in the layout.
  // The CMS sends a missing image as null, "", whitespace or even the string
  // "null" — anything that isn't a real URL or path falls back.
  const usable = (value) => {
    const clean = typeof value === "string" ? value.trim() : "";
    return clean && !/^(null|undefined)$/i.test(clean) ? clean : null;
  };
  const shareImage = usable(image) ?? DEFAULT_OG_IMAGE;
  // A page may send its own Twitter card image (blog posts: the CMS's
  // `twitter_image`); without one, Twitter gets the share image.
  const twitterCardImage = usable(twitterImage) ?? shareImage;
  const images = [{ url: shareImage, width: 1200, height: 630, alt: resolvedTitle }];

  return {
    title: absoluteTitle && title ? { absolute: title } : title,
    description: resolvedDescription,
    alternates: { canonical },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type,
      siteName: SITE.name,
      title: fullTitle,
      description: resolvedDescription,
      url: canonical,
      images,
    },
    twitter: {
      card: "summary_large_image",
      site: "@edstellarglobal",
      title: fullTitle,
      description: resolvedDescription,
      images: [twitterCardImage],
    },
  };
}

/** CMS titles end in "| Edstellar", which the root layout's title template
 * (`%s | Edstellar`) adds again — strip it so it does not render twice. */
export function stripSiteSuffix(title) {
  return title?.replace(/\s*\|\s*Edstellar\s*$/i, "").trim();
}
