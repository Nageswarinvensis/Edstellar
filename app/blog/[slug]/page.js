import { notFound } from "next/navigation";
import Image from "next/image";

import { getBlogPost, getBlogSlugs } from "@/lib/content/blog";
import { buildMetadata } from "@/lib/seo/metadata";
import { blogPostingJsonLd } from "@/lib/seo/json-ld";

import Text from "@/components/ui/Text";
import AccordionInteractivity from "@/components/blog/accordion-interactivity";

// `/blog/{slug}` is one flat route template (TASTE.md route contract), so
// Next.js's static CSS extraction merges everything reachable from this file
// into one chunk shared by every generated post — verified against the build
// output, not assumed. A per-block `next/dynamic` import was tried first and
// produced the identical merged chunk on every post, so it bought nothing;
// removed in favor of a plain static import per stylesheet. Isolating these
// per content-type would require giving each type its own route segment
// (e.g. `/blog/{type}/{slug}`), which is a routing-contract change, not a
// styling one — flagged separately rather than done silently here.
import "@/app/blog/styles/BlogContent.css";
import "@/app/blog/styles/Faq.css";
import "@/app/blog/styles/InDemandSkills.css";
import "@/app/blog/styles/CoporateCompanies.css";
import "@/app/blog/styles/Games.css";

export const revalidate = 300;

const INTERACTIVE_BLOCKS = ["faq", "companies"];

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {};
  }

  return buildMetadata({
    title: post.seo.title,
    description: post.seo.description,
    path: `/blog/${post.slug}`,
    image: post.seo.ogImage,
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

      <article className={`max-w-3xl mx-auto px-4 py-12 post-${post.slug}`}>
        {post.scopedStyle && (
          <style dangerouslySetInnerHTML={{ __html: post.scopedStyle }} />
        )}

        <Text as="h1" className="mb-6">
          {post.title}
        </Text>

        {post.coverImage && (
          <div className="relative w-full aspect-[2/1] mb-8 overflow-hidden rounded-lg">
            <Image
              src={post.coverImage.src}
              alt={post.coverImage.alt}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}

        <div
          className="blog-content blog-content-richtext"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>

      {post.styleBlocks.some((block) => INTERACTIVE_BLOCKS.includes(block)) && (
        <AccordionInteractivity />
      )}
    </>
  );
}
