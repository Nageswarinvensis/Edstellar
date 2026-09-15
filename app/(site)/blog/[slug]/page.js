import fs from "node:fs";
import path from "node:path";

import { notFound } from "next/navigation";

import { getBlogPost } from "@/lib/content/blog";
import { buildMetadata } from "@/lib/seo/metadata";
import { blogPostingJsonLd } from "@/lib/seo/json-ld";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";

import AccordionInteractivity from "@/components/blog/accordion-interactivity";
import WhatsNewInteractivity from "@/components/blog/whats-new-interactivity";
import HighlightReveal from "@/components/blog/highlight-reveal";

import BlogHero from "@/components/blog/bloghero";
import AuthorCard from "@/components/blog/author-card";
import BlogSubscribeCta from "@/components/blog/blog-subscribe-cta";
import TableOfContents from "@/components/blog/tableofcontent";
import TrainingCard from "@/components/blog/trainingcard";
import TrainingCatalogCTA from "@/components/blog/trainingcatalogcta";
import CoachingCTA from "@/components/blog/coachingcta";
import SkillMatrixCTA from "@/components/blog/skillmatrixcta";
import BlogTrainingCTA from "@/components/blog/blogtrainingcta";
import RelatedPosts from "@/components/blog/relatedposts";

// Keep your existing imports for these components
// import TableOfContents from "...";
// import TrainingCatalogCTA from "...";
// import CoachingCTA from "...";
// import SkillMatrixCTA from "...";
// import BlogTrainingCTA from "...";
// import RelatedPost from "...";

import "@/app/styles/blog-content/BlogContent.css";

export const revalidate = 86400;

const INTERACTIVE_BLOCKS = ["faq", "companies"];

function readBlogContentCss(filename) {
  return fs.readFileSync(
    path.join(process.cwd(), "app/styles/blog-content", filename),
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
const FAQ_CSS = readBlogContentCss("Faq.css");
const WHATS_NEW_CSS = readBlogContentCss("whats-new.css");

/**
 * A post has at most one of these three layout treatments, picked by the
 * CMS's `meta.layout_variant` — so only that one stylesheet is ever loaded,
 * never all three.
 */
const LAYOUT_VARIANT_CSS = {
  "Corporate Companies": readBlogContentCss("CoporateCompanies.css"),
  "In-demand Skills": readBlogContentCss("InDemandSkills.css"),
  Games: readBlogContentCss("Games.css"),
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

  const jsonLd = blogPostingJsonLd({
    title: blog.title,
    description: blog.excerpt,
    path: `/blog/${blog.slug}`,
    image: blog.cover_image,
    datePublished: blog.published_at,
    dateModified: blog.meta?.site_published_at,
    authorName: author?.name,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogHero
        title={blog.title}
        excerpt={blog.excerpt}
        category={category?.name}
        categorySlug={category?.slug}
        authorName={author?.name}
        authorSlug={author?.slug}
        authorAvatar={author?.avatar}
        publishedAt={blog.meta?.site_published_at}
        readMinutes={post.readMinutes}
        showsWhatsNew={blog.meta?.shows_whats_new}
      />
      <Section className="bg-white py-12">
        <Box className="mx-auto grid max-w-7xl grid-cols-1 gap-4 lg:grid-cols-[200px_minmax(0,1fr)_270px]">
          {/* LEFT - Table of Contents */}
          <Box className="hidden lg:block">
            <TableOfContents />
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

            <Box className="mt-8">
              <AuthorCard
                name={author?.name}
                slug={author?.slug}
                avatar={author?.avatar}
                shortDescription={author?.short_description}
              />
            </Box>
          </Box>

          {/* RIGHT - CTA Cards */}
          <Box className="relative hidden h-full lg:block">
            <Box className="mb-4 h-[16.6%]">
              <Box className="sticky top-20">
                <TrainingCard />
              </Box>
            </Box>

            <Box className="mb-4 h-[16.6%]">
              <Box className="sticky top-20">
                <TrainingCatalogCTA />
              </Box>
            </Box>

            <Box className="mb-4 h-[16.6%]">
              <Box className="sticky top-20">
                <CoachingCTA />
              </Box>
            </Box>

            <Box className="mb-4 h-[16.6%]">
              <Box className="sticky top-20">
                <SkillMatrixCTA />
              </Box>
            </Box>

            <Box className="mb-4 h-[16.6%]">
              <Box className="sticky top-20">
                <BlogTrainingCTA />
              </Box>
            </Box>

            <Box className="mb-4 h-[16.6%]">
              <Box className="sticky top-20">
                <RelatedPosts />
              </Box>
            </Box>
          </Box>
        </Box>
      </Section>

      <BlogSubscribeCta />

      {/* Existing interactive functionality */}
      {post.styleBlocks.some((block) => INTERACTIVE_BLOCKS.includes(block)) && (
        <AccordionInteractivity />
      )}

      {blog.meta?.shows_whats_new && (
        <WhatsNewInteractivity lastRevisedDate={blog.meta?.site_published_at} />
      )}

      {post.styleBlocks.includes("highlight") && <HighlightReveal />}
    </>
  );
}
