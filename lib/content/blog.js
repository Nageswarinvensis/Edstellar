import { cache } from "react";
import sanitizeHtml from "sanitize-html";

import { apiGet } from "@/lib/api/client";
import { endpoints, REVALIDATE } from "@/lib/api/endpoints";

/**
 * Blog content layer — Webflow CMS via a thin REST wrapper (TASTE.md §5:
 * all content reads go through lib/content/).
 *
 * `main-tag` and `author-in-articles` are Webflow reference item IDs with no
 * name-resolution endpoint available yet, so they are carried through as
 * opaque ids and never rendered directly — showing a raw id to a visitor is
 * worse than omitting it. Revisit once the API (or a static lookup table)
 * exposes the names.
 */

/**
 * Which of the shared stylesheets under app/styles/blog-content a post needs, keyed
 * by class names that only ever appear in that stylesheet's block. Detected
 * from the post's own markup rather than `main-tag`, because `main-tag` has
 * no reliable mapping to a content type and can't be resolved to a name.
 */
const STYLE_BLOCK_SIGNATURES = {
  faq: ["faq-item", "faq-question", "toggle-icon"],
  skills: ["skill-card", "skill-number", "develop-card"],
  companies: ["co-card", "crit-item", "nz-accordion", "ph-stat"],
  games: ["gdemo", "tabs-wrap", "activity-card"],
};

function detectStyleBlocks(html) {
  return Object.entries(STYLE_BLOCK_SIGNATURES)
    .filter(([, markers]) => markers.some((marker) => html.includes(marker)))
    .map(([block]) => block);
}

/**
 * ~1/3 of posts embed their own bespoke `<style>` block instead of relying
 * only on the shared stylesheets. Pulled out and scoped to `.post-{slug}`
 * with native CSS `@scope`, so a post-specific `.template-heading` rule can
 * never bleed onto another post that happens to reuse the same class name.
 */
function extractInlineStyle(html, slug) {
  let css = "";
  const withoutStyleTags = html.replace(
    /<style[^>]*>([\s\S]*?)<\/style>/gi,
    (_, block) => {
      css += `${block}\n`;
      return "";
    },
  );

  if (!css.trim()) {
    return { html: withoutStyleTags, scopedStyle: null };
  }

  return {
    html: withoutStyleTags,
    scopedStyle: `@scope (.post-${slug}) {\n${css}}`,
  };
}

const SANITIZE_OPTIONS = {
  allowedTags: [
    "p", "div", "span", "a", "strong", "em", "b", "i", "u", "br",
    "ul", "ol", "li",
    "h2", "h3", "h4", "h5", "blockquote",
    "img", "figure", "figcaption",
    "table", "thead", "tbody", "tr", "td", "th",
    "button", "svg", "path", "line", "polyline",
    "iframe",
  ],
  allowedAttributes: {
    a: ["href", "target", "rel", "title", "class"],
    img: ["src", "alt", "title", "width", "height", "loading", "class"],
    iframe: ["src", "title", "allow", "allowfullscreen", "loading", "width", "height", "class"],
    th: ["scope", "class"],
    svg: ["viewbox", "width", "height", "fill", "stroke", "class"],
    path: ["d", "fill", "stroke", "stroke-width", "stroke-linecap", "stroke-linejoin"],
    line: ["x1", "y1", "x2", "y2"],
    polyline: ["points"],
    "*": ["class", "id", "style"],
  },
  // Source content only ever uses these for icon sizing and image max-width —
  // narrow enough to allow inline style (CLAUDE.md's "no inline styles" rule
  // is a Tailwind-authoring rule; it doesn't have a lever over CMS body HTML).
  allowedStyles: {
    "*": {
      width: [/^\d+(px|%)$/],
      height: [/^\d+(px|%)$/],
      "max-width": [/^\d+(px|%)$/],
    },
  },
  allowedIframeHostnames: ["www.youtube.com"],
  transformTags: {
    img: (tagName, attribs) => ({
      tagName,
      attribs: { ...attribs, loading: attribs.loading || "lazy" },
    }),
    a: (tagName, attribs) =>
      attribs.target === "_blank"
        ? { tagName, attribs: { ...attribs, rel: "noopener noreferrer" } }
        : { tagName, attribs },
  },
};

/** Column headers in the source tables never carry `scope` — added back for AT. */
function addTableHeaderScope(html) {
  return html.replace(/<th(?![^>]*\bscope=)([^>]*)>/gi, '<th scope="col"$1>');
}

function normalizePost(item) {
  const fd = item.fieldData;
  const { html: withoutStyleTags, scopedStyle } = extractInlineStyle(fd.content || "", fd.slug);
  const styleBlocks = detectStyleBlocks(withoutStyleTags);
  const contentHtml = addTableHeaderScope(sanitizeHtml(withoutStyleTags, SANITIZE_OPTIONS));

  return {
    slug: fd.slug,
    title: fd.name,
    description: fd.description,
    // Same field names the CMS uses for course and domain pages, so every
    // template in the codebase reads one convention regardless of which API
    // the content came from.
    seo: {
      meta_title: fd["meta-title"] || fd.name,
      Meta_description: fd["meta-description"] || fd.description,
      canonical_url: fd["canonical-links"] || `/blog/${fd.slug}`,
      og_image_url: fd["og-image"]?.url,
    },
    coverImage: fd["cover-photo"]
      ? { src: fd["cover-photo"].url, alt: fd["cover-photo"].alt || fd.name }
      : null,
    publishedDate: fd["post-published-date"] || null,
    updatedDate: item.lastUpdated || null,
    contentHtml,
    scopedStyle,
    styleBlocks,
  };
}

export const getBlogPosts = cache(async () => {
  const items = await apiGet(endpoints.blogPosts(), {
    revalidate: REVALIDATE.blog,
  });
  if (!items) return [];
  return items
    .filter((item) => !item.isDraft && !item.isArchived)
    .map(normalizePost);
});

export const getBlogSlugs = cache(async () => {
  const posts = await getBlogPosts();
  return posts.map((post) => post.slug);
});

export const getBlogPost = cache(async (slug) => {
  const item = await apiGet(endpoints.blogPost(slug), {
    revalidate: REVALIDATE.blog,
  });
  if (!item || item.isDraft || item.isArchived) return null;
  return normalizePost(item);
});
