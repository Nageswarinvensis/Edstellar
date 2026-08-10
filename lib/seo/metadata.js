import { SITE } from "@/lib/constants";

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
  const resolvedDescription = description || SITE.description;
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
