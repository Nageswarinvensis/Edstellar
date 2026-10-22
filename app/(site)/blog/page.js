import { notFound } from "next/navigation";

import { getBlogMain } from "@/lib/content/blog";
import { buildMetadata } from "@/lib/seo/metadata";

import BlogMainPageContent from "@/components/sections/blog/main/blog-main-page-content";

export const revalidate = 3600;

export function generateMetadata() {
  return buildMetadata({
    title: "Blog",
    description: "Read Edstellar's learning and development blog for ideas on corporate training, talent development and workforce skills for HR, L&D and business leaders.",
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
