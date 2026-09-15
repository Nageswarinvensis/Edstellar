import fs from "node:fs";
import path from "node:path";

import { notFound } from "next/navigation";

import { getBlogPost, getBlogMain } from "@/lib/content/blog";
import { buildMetadata } from "@/lib/seo/metadata";
import { blogPostingJsonLd } from "@/lib/seo/json-ld";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Breadcrumbs from "@/components/common/breadcrumbs";

import BlogDetailAccordionInteractivity from "@/components/blog/detail/blog-detail-accordion-interactivity";
import BlogDetailWhatsNewInteractivity from "@/components/blog/detail/blog-detail-whats-new-interactivity";
import BlogDetailHighlightReveal from "@/components/blog/detail/blog-detail-highlight-reveal";

import BlogDetailHero from "@/components/blog/detail/blog-detail-hero";
import BlogDetailAuthorCard from "@/components/blog/detail/blog-detail-author-card";
import BlogDetailSubscribeCta from "@/components/blog/detail/blog-detail-subscribe-cta";
import BlogDetailToc from "@/components/blog/detail/blog-detail-toc";
import BlogDetailTrainingCard from "@/components/blog/detail/blog-detail-training-card";
import BlogDetailTrainingCatalogCta from "@/components/blog/detail/blog-detail-training-catalog-cta";
import BlogDetailCoachingCta from "@/components/blog/detail/blog-detail-coaching-cta";
import BlogDetailSkillMatrixCta from "@/components/blog/detail/blog-detail-skill-matrix-cta";
import BlogDetailTrainingCta from "@/components/blog/detail/blog-detail-training-cta";
import BlogDetailRelated from "@/components/blog/detail/blog-detail-related";
import BlogDetailCategories from "@/components/blog/detail/blog-detail-categories";

import "@/components/blog/detail/blog-content/Global.css";

export const revalidate = 86400;

const INTERACTIVE_BLOCKS = ["faq", "companies"];

function readBlogContentCss(filename) {
  return fs.readFileSync(
    path.join(process.cwd(), "components/blog/detail/blog-content", filename),
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
  const [post, blogMain] = await Promise.all([getBlogPost(slug), getBlogMain(1)]);

  if (!post) {
    notFound();
  }

  const { blog, author, category } = post;

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
      <BlogDetailHero
        title={blog.title}
        excerpt={blog.excerpt}
        category={category?.name}
        categorySlug={category?.slug}
        authorName={author?.name}
        authorSlug={author?.slug}
        authorAvatar={author?.avatar}
        authorLinkedin={author?.linkedin}
        authorDesignation={author?.designation}
        authorVerifiedExpert={author?.verified_expert}
        publishedAt={blog.meta?.site_published_at}
        readMinutes={post.readMinutes}
        showsWhatsNew={blog.meta?.shows_whats_new}
      />

      <Section className="bg-white lg:py-5">
        <Breadcrumbs items={breadcrumb} className="mt-0" />
      </Section>

      <Section className="bg-white pt-0 lg:pt-0">
        <Box className="mx-auto grid max-w-7xl grid-cols-1 gap-4 lg:grid-cols-[200px_minmax(0,1fr)_270px]">
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

          {/* RIGHT - CTA Cards */}
          <Box className="relative hidden h-full lg:block">
            <Box className="mb-4 h-[16.6%]">
              <Box className="sticky top-20">
                <BlogDetailTrainingCard />
              </Box>
            </Box>

            <Box className="mb-4 h-[16.6%]">
              <Box className="sticky top-20">
                <BlogDetailTrainingCatalogCta />
              </Box>
            </Box>

            <Box className="mb-4 h-[16.6%]">
              <Box className="sticky top-20">
                <BlogDetailCoachingCta />
              </Box>
            </Box>

            <Box className="mb-4 h-[16.6%]">
              <Box className="sticky top-20">
                <BlogDetailSkillMatrixCta />
              </Box>
            </Box>

            <Box className="mb-4 h-[16.6%]">
              <Box className="sticky top-20">
                <BlogDetailTrainingCta />
              </Box>
            </Box>

            <Box className="mb-4 h-[16.6%]">
              <Box className="sticky top-20">
                <BlogDetailRelated
                  categoryName={post.relatedBlogs?.category_name}
                  blogs={post.relatedBlogs?.blogs}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Section>

      <BlogDetailSubscribeCta />

      <BlogDetailCategories categories={blogMain?.categories} />

      {post.styleBlocks.some((block) => INTERACTIVE_BLOCKS.includes(block)) && (
        <BlogDetailAccordionInteractivity />
      )}

      {blog.meta?.shows_whats_new && (
        <BlogDetailWhatsNewInteractivity
          lastRevisedDate={blog.meta?.site_published_at}
        />
      )}

      {post.styleBlocks.includes("highlight") && <BlogDetailHighlightReveal />}
    </>
  );
}
