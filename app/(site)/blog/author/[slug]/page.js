import { notFound, redirect } from "next/navigation";

import { getBlogAuthor } from "@/lib/content/blog";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE } from "@/lib/constants";

import AuthorHero from "@/components/blog/author-hero";

export const revalidate = 300;

/** The CMS's author `meta_title` already ends in "| Edstellar" — the root
 * layout's title template (`%s | Edstellar`) would otherwise double it up. */
function stripSiteSuffix(title) {
  return title?.replace(new RegExp(`\\s*\\|\\s*${SITE.name}\\s*$`, "i"), "");
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { author } = await getBlogAuthor(slug);

  if (!author) return {};

  return buildMetadata({
    title:
      stripSiteSuffix(author.meta?.meta_title) || `${author.name} | Author`,
    description:
      author.meta?.meta_description ||
      author.short_description ||
      `Articles and insights written by ${author.name}.`,
    path: `/blog/author/${author.slug}`,
    image: author.avatar || author.meta?.detail_page_image,
    type: "profile",
  });
}

export default async function AuthorPage({ params, searchParams }) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;

  // The URL never carries the page number — pagination swaps posts in place
  // on the client (components/blog/common/blog-posts.jsx) — so a stray
  // `?page=` (an old link, a stale bookmark) is stripped back to the canonical URL.
  if (pageParam !== undefined) {
    redirect(`/blog/author/${slug}`);
  }

  const { author, categories } = await getBlogAuthor(slug, 1);

  if (!author) notFound();

  return <AuthorHero author={author} slug={slug} categories={categories} />;
}
