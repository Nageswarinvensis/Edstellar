import { notFound } from "next/navigation";

import { getBlogAuthor } from "@/lib/content/blog";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE } from "@/lib/constants";

import AuthorPageContent from "@/components/sections/blog/author/author-page-content";

export const revalidate = 300;

// ISR, none at build: each author page renders on its first request and is then
// cached for `revalidate` seconds. The stray-`?page=` redirect lives in
// `middleware.js` — reading `searchParams` here would make the page render on
// every request instead.
export function generateStaticParams() {
  return [];
}

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
    // Author pages are kept out of search (noindex, nofollow).
    noIndex: true,
    image: author.avatar || author.meta?.detail_page_image,
    type: "profile",
  });
}

export default async function AuthorPage({ params }) {
  const { slug } = await params;

  const { author, categories } = await getBlogAuthor(slug, 1);

  if (!author) notFound();

  return (
    <AuthorPageContent author={author} slug={slug} categories={categories} />
  );
}
