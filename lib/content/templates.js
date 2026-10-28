import "server-only";

import { cache } from "react";

import { TEMPLATE_SHARED } from "@/content/templates";
import { getSitePage } from "@/lib/content/site-pages";
import { getSitemapIndex } from "@/lib/content/training-catalog";

/**
 * L&D template / tool pages (`/templates/{slug}`, the live site's URL).
 *
 * Each template is a CMS site page with the slug `templates/{slug}`. The CMS
 * is the only source for these sections (the JSON for one is in
 * `docs/cms/templates/{slug}/`):
 *
 *   seo · breadcrumbs · templates_detail_hero · templates_detail_about
 *   (the intro, `{ lede }`) · features · audience · steps · benefits · faqs
 *
 * What stays static (`content/templates/index.js`): the sidebar promo and
 * "Reach Us" strip (`TEMPLATE_SHARED`, the same on every page), and — when the
 * CMS page has no `breadcrumbs` — a breadcrumb the route builds from the
 * title. A page without an intro component shows no intro.
 */

/**
 * The component names a template page may use: the documented one first,
 * then the names the CMS was actually given — including the
 * `templates_detial_benifits` typo — so either works.
 */
const COMPONENT_NAMES = {
  hero: ["template_detail_hero", "templates_detail_hero"],
  intro: ["templates_detail_about", "template_intro", "templates_detail_intro"],
  features: ["template_features", "templates_detail_features"],
  audience: ["template_audience", "templates_detail_audience"],
  steps: ["template_steps", "templates_detail_steps"],
  benefits: ["template_benefits", "templates_detail_benefits", "templates_detial_benifits"],
  faqs: ["faqs", "templates_detail_faqs"],
};

/** A component's config by any of its names. Some were entered wrapped in
 * one more key (`{ features: { heading, items } }`), so a lone wrapper whose
 * name matches is unwrapped. */
function section(page, key) {
  const name = COMPONENT_NAMES[key].find((candidate) => page[candidate]);
  const config = name ? page[name] : undefined;
  if (config && typeof config === "object" && Object.keys(config).length === 1 && config[key]) {
    return config[key];
  }
  return config;
}

/** "Free Organizational Chart <span>Generator</span>" → its plain text. */
const plainText = (html = "") => html.replace(/<[^>]+>/g, "").trim();

/** A CMS site page's components in the shape the page sections read, plus
 * the static parts. A section the CMS page lacks is simply not shown. */
function toTemplate(slug, page) {
  const hero = section(page, "hero");
  return {
    slug,
    title: hero.title ?? plainText(hero.heading),
    seo: { title: page.seo?.meta_title, description: page.seo?.Meta_description },
    // The CMS `breadcrumbs` component when the page has one; otherwise the
    // route builds Home / L&D Templates / {title}.
    breadcrumbs: page.breadcrumbs?.items?.length ? page.breadcrumbs.items : undefined,
    hero,
    // `direct_tool: true` (on the hero or its `tool`) → the route opens the
    // tool itself instead of the landing page. It may arrive as a string.
    directTool: Boolean(hero.tool?.url) && [true, "true"].includes(hero.direct_tool ?? hero.tool?.direct_tool),
    lede: section(page, "intro")?.lede ?? section(page, "intro")?.text,
    features: section(page, "features"),
    audience: section(page, "audience"),
    steps: section(page, "steps"),
    benefits: section(page, "benefits"),
    faqs: section(page, "faqs"),
    promo: TEMPLATE_SHARED.promo,
    reach: TEMPLATE_SHARED.reach,
    schema: page.templateSchema ?? page.templateAppSchema ?? null,
  };
}

/**
 * One template by slug; `null` when the CMS has no published page with a
 * hero for it (the route turns that into a 404). A CMS outage throws rather
 * than returning `null`, so an already-built page keeps its last good
 * version instead of being replaced by a 404.
 */
export const getTemplate = cache(async (slug) => {
  const page = await getSitePage(`templates/${slug}`);
  return page && section(page, "hero") ? toTemplate(slug, page) : null;
});

/** Every template slug — the CMS's `templates/*` site pages. For
 * `generateStaticParams` and `sitemap.js`. */
export const getTemplateSlugs = cache(async () => {
  const index = await getSitemapIndex();
  return (index.site_pages ?? [])
    .map((page) => page.slug)
    .filter((slug) => slug.startsWith("templates/"))
    .map((slug) => slug.slice("templates/".length));
});
