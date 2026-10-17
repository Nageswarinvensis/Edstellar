import { notFound } from "next/navigation";

import { getBlogCategory } from "@/lib/content/blog";
import { buildMetadata } from "@/lib/seo/metadata";

import CategoryPageContent from "@/components/sections/blog/category/category-page-content";

export const revalidate = 300;

// ISR, none at build: each category page renders on its first request and is then
// cached for `revalidate` seconds. The stray-`?page=` redirect lives in
// `middleware.js` — reading `searchParams` here would make the page render on
// every request instead.
export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { category } = await getBlogCategory(slug);

  if (!category) return {};

  const meta = category.meta || {};

  return buildMetadata({
    title: meta.meta_title || `${category.name} | Category`,
    description:
      meta.meta_description ||
      category.description ||
      `Articles, insights and resources about ${category.name}.`,
    path: `/blog/category/${category.slug}`,
  });
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  const { category, categories } = await getBlogCategory(slug, 1);

  if (!category) notFound();

  return (
    <CategoryPageContent
      category={category}
      slug={slug}
      categories={categories}
    />
  );
}
