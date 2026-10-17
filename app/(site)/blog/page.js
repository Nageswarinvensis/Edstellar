import { notFound } from "next/navigation";

import { getBlogMain } from "@/lib/content/blog";
import { buildMetadata } from "@/lib/seo/metadata";

import BlogMainPageContent from "@/components/sections/blog/main/blog-main-page-content";

export const revalidate = 86400;

export function generateMetadata() {
  return buildMetadata({
    title: "Blog",
    description: "Guides and insights on corporate training, skills and workforce planning.",
    path: "/blog",
  });
}

// Static + ISR. The stray-`?page=` redirect lives in `middleware.js`:
// reading `searchParams` here would make this page render on every request.
export default async function BlogIndexPage() {
  const payload = await getBlogMain(1);

  if (!payload?.blogs) notFound();

  return (
    <BlogMainPageContent
      posts={payload.blogs}
      categories={payload.categories}
    />
  );
}
