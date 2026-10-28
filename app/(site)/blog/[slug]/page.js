import fs from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import { getBlogMain, getBlogPost } from "@/lib/content/blog";
import { getBlogRailCategories } from "@/lib/content/blog-rail";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE } from "@/lib/constants";
// import SchemaOrg from "@/components/seo/schema-org";
import Section from "@/components/ui/Section";
import Breadcrumbs from "@/components/common/breadcrumbs";
import Box from "@/components/ui/Box";
import BlogDetailAccordionInteractivity from "@/components/sections/blog/detail/blog-detail-accordion-interactivity";
import BlogDetailWhatsNewInteractivity from "@/components/sections/blog/detail/blog-detail-whats-new-interactivity";
import BlogDetailHighlightReveal from "@/components/sections/blog/detail/blog-detail-highlight-reveal";
import BlogDetailGamesModal from "@/components/sections/blog/detail/blog-detail-games-modal";
import BlogDetailHero from "@/components/sections/blog/detail/blog-detail-hero";
import BlogDetailAuthorCard from "@/components/sections/blog/detail/blog-detail-author-card";
import BlogDetailContinueReading from "@/components/sections/blog/detail/blog-detail-continue-reading";
import BlogDetailSubscribeCta from "@/components/sections/blog/detail/blog-detail-subscribe-cta";
import BlogDetailToc from "@/components/sections/blog/detail/blog-detail-toc";
import BlogDetailCategories from "@/components/sections/blog/detail/blog-detail-categories";
import BlogDetailMoreInsights from "@/components/sections/blog/detail/blog-detail-more-insights";
import BlogRail from "@/components/sections/blog/detail/rail/blog-rail";

import JsonLd from "@/components/seo/json-ld";

import "@/components/sections/blog/detail/blog-content/Global.css";

export const revalidate = 300;

/**
 * Nothing is prerendered at build time (SSG is off until launch), but this
 * export is what makes the route ISR: each post is cached on its first visit
 * and re-rendered at most every 5 minutes. Without it the route renders on
 * every request, and a post deactivated in the CMS stays live indefinitely —
 * Next keeps serving the stale cached CMS response, because it only ever
 * replaces a cached fetch with a 200, never with the CMS's 404.
 */
export async function generateStaticParams() {
  return [];
}

const INTERACTIVE_BLOCKS = ["faq", "companies"];

function readBlogContentCss(filename) {
  return fs.readFileSync(
    path.join(
      process.cwd(),
      "components/sections/blog/detail/blog-content",
      filename,
    ),
    "utf8",
  );
}

/**
 * Faq.css / whats-new.css are only relevant to the subset of posts whose CMS
 * meta flags `shows_faqs` / `shows_whats_new` — a global `import` would ship
 * them (Faq.css's `body { ... }` design-token block included) to every blog
 * post regardless. Read once at module load and inlined per-post instead,
 * gated on those flags.
 */
/**
 * These files are authored as standalone-page stylesheets — Faq.css opens
 * with a bare `body { font-size: 16px; ... }` rule, CoporateCompanies.css has
 * bare `tr:nth-child(even)` rules, and so on. Inlined as a raw `<style>` tag,
 * any of those reach past `blog.body`'s own wrapper and restyle the whole
 * page. `@scope` confines every selector in the block to descendants of
 * `.blog-content.blog-content-richtext` — the exact element `blog.body` is
 * rendered into below — so a bare `body {}` rule simply matches nothing
 * instead of overwriting the real one.
 *
 * `@keyframes` can't live inside `@scope` (it has no selector to scope — an
 * animation name is looked up globally regardless), so any are pulled out
 * and kept as top-level rules alongside the scoped block.
 */
function scopeToBlogContent(css) {
  const keyframes = [];
  const rest = css.replace(
    /@keyframes\s+[\w-]+\s*\{(?:[^{}]*\{[^{}]*\})*[^{}]*\}/g,
    (match) => {
      keyframes.push(match);
      return "";
    },
  );
  return `${keyframes.join("\n")}\n@scope (.blog-content.blog-content-richtext) {\n${rest}\n}`;
}

const FAQ_CSS = scopeToBlogContent(readBlogContentCss("Faq.css"));
const WHATS_NEW_CSS = scopeToBlogContent(readBlogContentCss("whats-new.css"));

/**
 * A post has at most one of these three layout treatments, picked by the
 * CMS's `meta.layout_variant` — so only that one stylesheet is ever loaded,
 * never all three.
 */
const LAYOUT_VARIANT_CSS = {
  "Corporate Companies": scopeToBlogContent(
    readBlogContentCss("CoporateCompanies.css"),
  ),
  "In-demand Skills": scopeToBlogContent(
    readBlogContentCss("InDemandSkills.css"),
  ),
  Games: scopeToBlogContent(readBlogContentCss("Games.css")),
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {};
  }

  const { blog } = post;

  return buildMetadata({
    title: blog.meta?.meta_title || blog.title,
    description: blog.meta?.meta_description || blog.excerpt,
    path: `/blog/${blog.slug}`,
    image: blog.meta?.og_image || blog.cover_image,
    type: "article",
  });
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const { blog, author, category } = post;
  const railCategories = await getBlogRailCategories();

  // "More Blog Insights": the newest posts from the listing, minus this one.
  const latest = await getBlogMain(1);
  const morePosts = (latest?.blogs?.data ?? [])
    .filter((item) => item.slug !== blog.slug)
    .slice(0, 6);

  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    ...(category
      ? [
          {
            label: category.name,
            href: category.slug ? `/blog/category/${category.slug}` : undefined,
          },
        ]
      : []),
    { label: blog.title },
  ];

  const BASE = "https://www.edstellar.com";
  const pageUrl = `${BASE}/blog/${blog.slug}`;
  const pageTitle = blog.meta?.meta_title || blog.title;
  const pageDescription = blog.meta?.meta_description || blog.excerpt;
  const authorUrl = author?.slug ? `${BASE}/blog/author/${author.slug}` : null;

  return (
    <>
      {/* 1 — WebPage */}
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        "url": pageUrl,
        "name": pageTitle,
        ...(pageDescription && { "description": pageDescription }),
        "inLanguage": "en-US"
      }} />

      {/* 3 — BreadcrumbList */}
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        "itemListElement": breadcrumb.map((item, i) => ({
          "@type": "ListItem",
          "position": i + 1,
          "name": item.label,
          "item": item.href === "/" ? BASE : item.href?.startsWith("http") ? item.href : item.href ? `${BASE}${item.href}` : pageUrl
        }))
      }} />

      {/* 4 — BlogPosting */}
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${pageUrl}#article`,
        "url": pageUrl,
        "headline": blog.title,
        ...(pageDescription && { "description": pageDescription }),
        ...(blog.meta?.og_image || blog.cover_image ? { "image": blog.meta?.og_image || blog.cover_image } : {}),
        ...(blog.meta?.site_published_at && { "datePublished": blog.meta.site_published_at }),
        ...(blog.published_at && { "dateModified": blog.published_at }),
        ...(category?.name && { "articleSection": category.name }),
        "inLanguage": "en-US",
        ...(author?.name && {
          "author": {
            "@type": "Person",
            ...(authorUrl && { "@id": `${authorUrl}#person` }),
            "name": author.name,
            ...(author.designation && { "jobTitle": author.designation }),
            ...(author.avatar && { "image": author.avatar }),
            ...(authorUrl && { "url": authorUrl })
          }
        }),
        "publisher": { "@id": `${BASE}/#organization` },
        "mainEntityOfPage": { "@id": `${pageUrl}#webpage` }
      }} />

      {/* <SchemaOrg
        blogPosting={{
          title: blog.title,
          description: blog.excerpt,
          path: `/blog/${blog.slug}`,
          image: blog.cover_image,
          datePublished: blog.published_at,
          dateModified: blog.published_at,
          authorName: author?.name,
        }}
        breadcrumbs={breadcrumb}
      /> */}
      <BlogDetailHero
        title={blog.title}
        excerpt={blog.excerpt}
        category={category?.name}
        categorySlug={category?.slug}
        authorName={author?.name}
        authorSlug={author?.slug}
        authorAvatar={author?.avatar}
        authorDesignation={author?.designation}
        authorVerifiedExpert={author?.verified_expert}
        publishedAt={blog.published_at}
        readMinutes={post.readMinutes}
        showsWhatsNew={blog.meta?.shows_whats_new}
        layoutVariant={blog.meta?.layout_variant}
        shareUrl={`${SITE.url}/blog/${blog.slug}`}
      />

      <Section className="bg-white lg:py-5">
        <Breadcrumbs items={breadcrumb} className="mt-0" />
      </Section>

      <Section className="bg-white pt-0 lg:pt-0">
        <Box className="mx-auto grid max-w-7xl grid-cols-1 gap-4 lg:grid-cols-[200px_minmax(0,1fr)_300px]">
          {/* LEFT - Table of Contents */}
          <Box className="hidden lg:block">
            <BlogDetailToc />
          </Box>

          {/* MIDDLE - Existing Blog Content */}
          <Box className={`min-w-0 post-${blog.slug}`}>
            {blog.meta?.shows_faqs && (
              <style dangerouslySetInnerHTML={{ __html: FAQ_CSS }} />
            )}

            {blog.meta?.shows_whats_new && (
              <style dangerouslySetInnerHTML={{ __html: WHATS_NEW_CSS }} />
            )}

            {LAYOUT_VARIANT_CSS[blog.meta?.layout_variant] && (
              <style
                dangerouslySetInnerHTML={{
                  __html: LAYOUT_VARIANT_CSS[blog.meta.layout_variant],
                }}
              />
            )}

            {post.scopedStyle && (
              <style
                dangerouslySetInnerHTML={{
                  __html: post.scopedStyle,
                }}
              />
            )}

            <Box
              className="blog-content blog-content-richtext"
              dangerouslySetInnerHTML={{
                __html: blog.body,
              }}
            />

            <BlogDetailContinueReading orphanLinks={blog.orphan_links} />

            <Box className="mt-8">
              <BlogDetailAuthorCard
                name={author?.name}
                slug={author?.slug}
                avatar={author?.avatar}
                shortDescription={author?.short_description}
                linkedin={author?.linkedin}
                twitter={author?.twitter}
                facebook={author?.facebook}
                medium={author?.medium}
              />
            </Box>
          </Box>

          {/* RIGHT - training rail (explore, catalog, quote, coaching) */}
          <Box className="hidden h-full lg:block">
            <BlogRail categories={railCategories} />
          </Box>
        </Box>
      </Section>

      <BlogDetailSubscribeCta />

      <BlogDetailMoreInsights posts={morePosts} />

      <BlogDetailCategories
        categories={post.categories}
        currentSlug={category?.slug}
      />

      {post.styleBlocks.some((block) => INTERACTIVE_BLOCKS.includes(block)) && (
        <BlogDetailAccordionInteractivity />
      )}

      {blog.meta?.shows_whats_new && (
        <BlogDetailWhatsNewInteractivity />
      )}

      {post.styleBlocks.includes("highlight") && <BlogDetailHighlightReveal />}

      {blog.meta?.layout_variant === "Games" && <BlogDetailGamesModal />}
    </>
  );
}
