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

import "@/app/styles/blog-content/BlogContent1.css";
import "@/app/styles/blog-content/Faq.css";
import "@/app/styles/blog-content/InDemandSkills.css";
import "@/app/styles/blog-content/CoporateCompanies.css";
import "@/app/styles/blog-content/Games.css";
import "@/app/styles/blog-content/whats-new.css";

export const revalidate = 86400;

const INTERACTIVE_BLOCKS = ["faq", "companies"];

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {};
  }

  return buildMetadata({
    title: post.seo.meta_title,
    description: post.seo.Meta_description,
    path: `/blog/${post.slug}`,
    image: post.seo.og_image_url,
    type: "article",
  });
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const jsonLd = blogPostingJsonLd({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    image: post.coverImage?.src,
    datePublished: post.publishedDate,
    dateModified: post.updatedDate,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogHero />
      <Section className="bg-white py-12">
        <Box className="mx-auto grid max-w-7xl grid-cols-[200px_minmax(0,1fr)_270px] gap-4">
          {/* LEFT - Table of Contents */}
          <Box className="hidden lg:block">
            <TableOfContents />
          </Box>

          {/* MIDDLE - Existing Blog Content */}
          <Box className={`min-w-0 post-${post.slug}`}>
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
                __html: post.contentHtml,
              }}
            />
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

      {/* Existing interactive functionality */}
      {post.styleBlocks.some((block) =>
        INTERACTIVE_BLOCKS.includes(block)
      ) && <AccordionInteractivity />}

      {post.styleBlocks.includes("whatsNew") && <WhatsNewInteractivity />}

      {post.styleBlocks.includes("highlight") && <HighlightReveal />}
    </>
  );
}