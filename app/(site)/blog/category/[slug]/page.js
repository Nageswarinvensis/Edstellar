import { notFound } from "next/navigation";

import { getBlogCategory } from "@/lib/content/blog";
import { buildMetadata } from "@/lib/seo/metadata";
// import SchemaOrg from "@/components/seo/schema-org";

import CategoryPageContent from "@/components/sections/blog/category/category-page-content";

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

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  const { category, categories } = await getBlogCategory(slug, 1);

  if (!category) notFound();

  const breadcrumbs = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
    { label: category.name },
  ];

  return (
    <>
      {/* <SchemaOrg breadcrumbs={breadcrumbs} /> */}
      <CategoryPageContent
        category={category}
        slug={slug}
        categories={categories}
      />
    </>
  );
}
