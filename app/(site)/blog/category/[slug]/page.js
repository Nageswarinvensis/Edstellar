import { notFound, redirect } from "next/navigation";

import { getBlogCategory } from "@/lib/content/blog";
import { buildMetadata } from "@/lib/seo/metadata";

import CategoryHero from "@/components/blog/category-hero";

export const revalidate = 300;

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

export default async function CategoryPage({ params, searchParams }) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;

  // Same as the author hero: pagination swaps posts in place on the client
  // (components/blog/common/blog-posts.jsx), so the URL never carries a page
  // number — a stray `?page=` is stripped back to the canonical URL.
  if (pageParam !== undefined) {
    redirect(`/blog/category/${slug}`);
  }

  const { category, categories } = await getBlogCategory(slug, 1);

  if (!category) notFound();

  return (
    <CategoryHero category={category} slug={slug} categories={categories} />
  );
}
