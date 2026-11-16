import { notFound } from "next/navigation";

import { getBlogMain } from "@/lib/content/blog";
import { buildMetadata } from "@/lib/seo/metadata";
import JsonLd from "@/components/seo/json-ld";

import BlogMainPageContent from "@/components/sections/blog/main/blog-main-page-content";

export const revalidate = 300;

export function generateMetadata() {
  return buildMetadata({
    // Already starts with the brand, so it bypasses the layout's
    // "%s | Edstellar" template instead of naming Edstellar twice.
    title: "Edstellar Blog: Insights for HR, L&D and Business Leaders",
    absoluteTitle: true,
    description: "Read the Edstellar blog for practical insights on developing people, skills and teams. Explore guides, frameworks and workplace trends for HR, L&D and business leaders.",
    path: "/blog",
  });
}

// Static + ISR. The stray-`?page=` redirect lives in `middleware.js`:
// reading `searchParams` here would make this page render on every request.
export default async function BlogIndexPage() {
  const payload = await getBlogMain(1);

  if (!payload?.blogs) notFound();
  const BASE = "https://www.edstellar.com";
  const pageUrl = `${BASE}/blog`;

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        "url": pageUrl,
        "name": "Edstellar Blog: Insights for HR, L&D and Business Leaders",
        "description": "Read the Edstellar blog for practical insights on developing people, skills and teams. Explore guides, frameworks and workplace trends for HR, L&D and business leaders.",
        "inLanguage": "en-US"
      }} />
      <BlogMainPageContent
        posts={payload.blogs}
        categories={payload.categories}
      />
    </>
  );
}
