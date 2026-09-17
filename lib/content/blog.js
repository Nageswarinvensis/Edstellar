import { cache } from "react";
import sanitizeHtml from "sanitize-html";

import { apiGet } from "@/lib/api/client";
import { endpoints, REVALIDATE } from "@/lib/api/endpoints";

/**
 * Blog content layer (TASTE.md §5: all content reads go through
 * lib/content/). Every read here goes through our own CMS (`CMS_API_URL`),
 * which resolves `author` and `category` to names instead of leaving raw
 * Webflow reference ids on the response.
 */

/**
 * Which of the shared stylesheets under components/blog/detail/blog-content
 * a post needs, keyed by class names that only ever appear in that
 * stylesheet's block. Detected
 * from the post's own markup rather than `main-tag`, because `main-tag` has
 * no reliable mapping to a content type and can't be resolved to a name.
 */
const STYLE_BLOCK_SIGNATURES = {
  faq: ["faq-item", "faq-question", "toggle-icon"],
  skills: ["skill-card", "skill-number", "develop-card"],
  companies: ["co-card", "crit-item", "nz-accordion", "ph-stat"],
  games: ["gdemo", "tabs-wrap", "activity-card"],
  highlight: ["highlet"],
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
    "ul", "ol", "li", "section", "article",
    "h2", "h3", "h4", "h5", "blockquote",
    "img", "figure", "figcaption",
    "table", "thead", "tbody", "tr", "td", "th",
    "button", "svg", "path", "line", "polyline",
    "iframe",
  ],
  allowedAttributes: {
    a: ["href", "target", "rel", "title", "class", "data-fs-toc"],
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

/**
 * Column headers in the source tables never carry `scope` — added back for AT.
 * The lookahead requires `th` to be followed by whitespace or `>` so this
 * only ever matches a `<th>` cell, never the `<thead>` tag itself — `<th`
 * is a literal prefix of `<thead`, and without the boundary check the regex
 * mangled `<thead>` into `<th scope="col"ead>`, which browsers can't parse
 * as an element, silently dropping the header row into `<tbody>`.
 */
function addTableHeaderScope(html) {
  return html.replace(/<th(?=[\s>])(?![^>]*\bscope=)([^>]*)>/gi, '<th scope="col"$1>');
}

function slugifyHeadingText(text) {
  return text
    .replace(/<[^>]+>/g, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Headings ship from the CMS with no `id` — Webflow's Finsweet TOC widget
 * assigned those client-side, and that library isn't part of this pipeline.
 * The "What's New" box's `.custom-scroll` links (and any future in-page TOC)
 * need a real anchor to jump to, so ids are generated here from the heading
 * text, the same way Finsweet's slugs read (lowercase, non-alphanumeric runs
 * collapsed to a single hyphen) — verified against a live post's
 * `data-fs-toc="frequently-asked-questions"` matching its `<h2>Frequently
 * Asked Questions</h2>`.
 */
function addHeadingIds(html) {
  const seen = new Map();
  return html.replace(
    /<(h[234])(\s[^>]*)?>([\s\S]*?)<\/\1>/gi,
    (match, tag, attrs = "", inner) => {
      if (/\bid=/.test(attrs)) return match;
      const slug = slugifyHeadingText(inner);
      if (!slug) return match;
      const count = seen.get(slug) || 0;
      seen.set(slug, count + 1);
      const id = count > 0 ? `${slug}-${count + 1}` : slug;
      return `<${tag}${attrs} id="${id}">${inner}</${tag}>`;
    },
  );
}

/** Shared by both upstreams: sanitize, scope any embedded `<style>`, detect
 * which stylesheet blocks a post needs, and add heading anchors. */
function processBody(html, slug) {
  const { html: withoutStyleTags, scopedStyle } = extractInlineStyle(html || "", slug);
  const styleBlocks = detectStyleBlocks(withoutStyleTags);
  const contentHtml = addHeadingIds(
    addTableHeaderScope(sanitizeHtml(withoutStyleTags, SANITIZE_OPTIONS)),
  );
  return { contentHtml, scopedStyle, styleBlocks };
}

/** ~200wpm, rounded to the nearest minute (minimum 1) — derived from the
 * sanitized body text itself, not a CMS field. */
function estimateReadMinutes(contentHtml) {
  const words = contentHtml
    .replace(/<[^>]+>/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/**
 * Single-post detail read — `/api/v2/blog/{slug}` on our own CMS
 * (`CMS_API_URL`). The response already resolves `author` and `category` to
 * names, so both are returned verbatim (CLAUDE.md #10: components read the
 * CMS's field names as-is, no adapter layer) alongside the sanitized
 * `blog.body` and the derived reading-time estimate.
 */
export const getBlogPost = cache(async (slug) => {
  const payload = await apiGet(endpoints.blogPost(slug), {
    revalidate: REVALIDATE.cms,
  });
  if (!payload?.blog) return null;

  const { author, category, ...blog } = payload.blog;
  const { contentHtml, scopedStyle, styleBlocks } = processBody(blog.body, blog.slug);

  return {
    blog: { ...blog, body: contentHtml },
    author: author ?? null,
    category: category ?? null,
    // Sibling of `blog` in the payload, not nested under it — same category's
    // other posts: `{ category_name, tag_title, blogs: [{ id, name, slug }] }`.
    relatedBlogs: payload.related_blogs ?? null,
    // Also a sibling of `blog` — every blog endpoint (this one, authors,
    // categories, the index) now sends the full category list on its own
    // response, so no page needs a second call just to get it.
    categories: payload.categories ?? null,
    scopedStyle,
    styleBlocks,
    readMinutes: estimateReadMinutes(contentHtml),
  };
});

/**
 * A blog author's profile plus their paginated post list — `/api/v2/blog/authors/{slug}`,
 * same CMS as `getBlogPost`. Returned verbatim (snake_case field names, CLAUDE.md #10):
 * `author.meta` carries the bio/socials, `author.blogs.data` the post list, and
 * `author.blogs.pagination` the page info. The author page's URL never carries the
 * page number (pagination swaps posts client-side via `lib/actions/blog-author.js`),
 * so `page` here is only ever called with 1 from the route and with the clicked
 * page number from that Server Action.
 */
export const getBlogAuthor = cache(async (slug, page = 1, q) => {
  const payload = await apiGet(endpoints.blogAuthor(slug, page, q), {
    revalidate: REVALIDATE.author,
  });
  return {
    author: payload?.author ?? null,
    // Sibling of `author` — same full category list every blog endpoint sends.
    categories: payload?.categories ?? null,
  };
});

/**
 * A blog category's name/description plus its paginated post list —
 * `/api/v2/blog/categories/{slug}`. Same shape as `getBlogAuthor`'s `blogs`
 * (CLAUDE.md #10, read verbatim): `category.meta.h1`/`description` for the
 * heading copy, `category.blogs.data`/`blogs.pagination` for the post list.
 * Unlike an author, a category has no avatar or socials.
 */
export const getBlogCategory = cache(async (slug, page = 1, q) => {
  const payload = await apiGet(endpoints.blogCategory(slug, page, q), {
    revalidate: REVALIDATE.category,
  });
  return {
    category: payload?.category ?? null,
    // Sibling of `category` — same full category list every blog endpoint sends.
    categories: payload?.categories ?? null,
  };
});

/**
 * The blog index's paginated post list — `/api/v2/blog`. Its `blogs.data`
 * items carry `site_published_at` and `category_name` instead of the
 * `published_at`/nested `category` shape `getBlogAuthor`/`getBlogCategory`
 * return — a real difference between CMS endpoints, not something to paper
 * over with an adapter (CLAUDE.md #10). Also carries `categories`, the full
 * category list with post counts, unused for now but free on this response.
 */
export const getBlogMain = cache(async (page = 1, q) => {
  const payload = await apiGet(endpoints.blogMain(page, q), {
    revalidate: REVALIDATE.main,
  });
  return payload ?? null;
});
