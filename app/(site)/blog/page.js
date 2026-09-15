import { notFound, redirect } from "next/navigation";

import { getBlogMain } from "@/lib/content/blog";
import { buildMetadata } from "@/lib/seo/metadata";

import BlogMain from "@/components/blog/blog-main";

export const revalidate = 86400;

export function generateMetadata() {
  return buildMetadata({
    title: "Blog",
    description: "Guides and insights on corporate training, skills and workforce planning.",
    path: "/blog",
  });
}

export default async function BlogIndexPage({ searchParams }) {
  const { page: pageParam } = await searchParams;

  // Same as the author/category hero pages: pagination swaps posts in place
  // on the client, so the URL never carries a page number.
  if (pageParam !== undefined) {
    redirect("/blog");
  }

  const payload = await getBlogMain(1);

  if (!payload?.blogs) notFound();

  return <BlogMain posts={payload.blogs} categories={payload.categories} />;
}
