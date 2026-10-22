import Box from "@/components/ui/Box";

/**
 * A CMS `svg_image` field can hold either inline SVG/HTML markup (the original
 * use) or an image URL — e.g. an uploaded `.webp`. Markup starts with a tag
 * (`<svg …>`, `<img …>`); anything else is treated as the image's URL.
 */
const isInlineMarkup = (value) => /^\s*</.test(value);

/**
 * Renders a `svg_image` field both ways: inline markup is injected as-is, an
 * image URL is shown as an `<img>`. The caller styles the wrapper through
 * `className` — size whichever child renders with its `[&_svg]:…` and the
 * matching `[&_img]:…` selectors, since an `<img>` is not an `<svg>`. Decorative
 * by default (`alt=""`); pass `alt` when the illustration carries meaning.
 *
 * Plain `<img>` (not next/image) so any CMS image host loads without the
 * `next.config` `remotePatterns` allowlist, matching how the rest of the CMS
 * imagery renders.
 */
export default function SvgOrImage({ value, className, alt = "" }) {
  if (!value) return null;

  if (isInlineMarkup(value)) {
    return <Box className={className} dangerouslySetInnerHTML={{ __html: value }} />;
  }

  return (
    <Box className={className}>
      <img src={value.trim()} alt={alt} decoding="async" loading="lazy" />
    </Box>
  );
}
