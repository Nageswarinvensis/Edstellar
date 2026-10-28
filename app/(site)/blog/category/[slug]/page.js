import { notFound } from "next/navigation";

import { getBlogCategory } from "@/lib/content/blog";
import { buildMetadata } from "@/lib/seo/metadata";
// import SchemaOrg from "@/components/seo/schema-org";
import JsonLd from "@/components/seo/json-ld";

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
  const BASE = "https://www.edstellar.com";
  const pageUrl = `${BASE}/blog/category/${slug}`;
  const meta = category.meta || {};

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        "url": pageUrl,
        "name": meta.meta_title || `${category.name} | Category`,
        ...((meta.meta_description || category.description) && { "description": meta.meta_description || category.description || `Articles, insights and resources about ${category.name}.` }),
        "inLanguage": "en-US"
      }} />
      {breadcrumbs?.length > 0 && (
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "@id": `${pageUrl}#breadcrumb`,
          "itemListElement": breadcrumbs.map((item, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": item.label,
            "item": item.href === "/" ? BASE : item.href?.startsWith("http") ? item.href : item.href ? `${BASE}${item.href}` : pageUrl
          }))
        }} />
      )}
      {/* <SchemaOrg breadcrumbs={breadcrumbs} /> */}
      <CategoryPageContent
        category={category}
        slug={slug}
        categories={categories}
      />
    </>
  );
}
