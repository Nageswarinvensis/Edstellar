import { notFound } from "next/navigation";

import { getBlogMain, parseListingPage } from "@/lib/content/blog";
import { buildMetadata } from "@/lib/seo/metadata";
import JsonLd from "@/components/seo/json-ld";

import BlogMainPageContent from "@/components/sections/blog/main/blog-main-page-content";

export const revalidate = 300;

/**
 * Blog index pages 2+ — real URLs so crawlers can walk the whole archive
 * (TASTE.md §2.5). `middleware.js` 301s `/blog/page/1` to `/blog` and 404s
 * a page past `last_page` before this renders; the guards here are the
 * fallback. None at build, like `/blog/[slug]`.
 */
export async function generateStaticParams() {
  return [];
}

const DESCRIPTION =
  "Read Edstellar's learning and development blog for ideas on corporate training, talent development and workforce skills for HR, L&D and business leaders.";

export async function generateMetadata({ params }) {
  const page = parseListingPage((await params).n);
  if (!page) return {};

  // Archive pages stay out of search results but their post links are
  // still followed (TASTE.md §2.5). `buildMetadata`'s `noIndex` would also
  // set nofollow, so `robots` is set here.
  return {
    ...buildMetadata({
      title: `Blog – Page ${page}`,
      description: `${DESCRIPTION} Page ${page}.`,
      path: `/blog/page/${page}`,
    }),
    robots: { index: false, follow: true },
  };
}

export default async function BlogIndexPagedPage({ params }) {
  const page = parseListingPage((await params).n);
  if (!page) notFound();

  const payload = await getBlogMain(page);
  const lastPage = payload?.blogs?.pagination?.last_page ?? 0;
  if (!payload?.blogs?.data?.length || page > lastPage) notFound();

  const pageUrl = `https://www.edstellar.com/blog/page/${page}`;

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        "url": pageUrl,
        "name": `Blog – Page ${page}`,
        "description": `${DESCRIPTION} Page ${page}.`,
        "inLanguage": "en-US"
      }} />
      <BlogMainPageContent
        posts={payload.blogs}
        categories={payload.categories}
      />
    </>
  );
}
