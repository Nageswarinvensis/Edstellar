import { notFound } from "next/navigation";

import { getTemplatesPage } from "@/lib/content/resources";
import { buildMetadata, stripSiteSuffix } from "@/lib/seo/metadata";
// import SchemaOrg from "@/components/seo/schema-org";
import JsonLd from "@/components/seo/json-ld";
import TemplatesHubPage from "@/components/templates/templates-hub-page";

export const revalidate = 300;

const PATH = "/learning-development-templates";

export async function generateMetadata() {
  const page = await getTemplatesPage();
  if (!page) return {};
  const { seo } = page;

  return buildMetadata({
    title: stripSiteSuffix(seo?.meta_title),
    description: seo?.Meta_description,
    path: PATH,
    image: seo?.og_image_url,
  });
}

/**
 * Free L&D Tools and Templates — from the CMS site page
 * `learning-development-templates` (see `getTemplatesPage`).
 *
 * Design: `Learning_Development_Templates_Template.html`.
 */
export default async function LearningDevelopmentTemplatesPage() {
  const page = await getTemplatesPage();
  if (!page) notFound();

  const BASE = "https://www.edstellar.com";
  const pageUrl = `${BASE}/learning-development-templates`;

  return (
    <>
      {/* WebPage */}
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        "url": pageUrl,
        "name": stripSiteSuffix(page.seo?.meta_title),
        ...(page.seo?.Meta_description && { "description": page.seo?.Meta_description }),
        "inLanguage": "en-US"
      }} />

      {/* BreadcrumbList */}
      {page.breadcrumbs?.items?.length > 0 && (
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "@id": `${pageUrl}#breadcrumb`,
          "itemListElement": page.breadcrumbs.items.map((item, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": item.label,
            "item": item.href === "/" ? BASE : item.href?.startsWith("http") ? item.href : item.href ? `${BASE}${item.href}` : pageUrl
          }))
        }} />
      )}

      {/* <SchemaOrg
        webpage={{
          name: stripSiteSuffix(page.seo?.meta_title),
          description: page.seo?.Meta_description,
          path: PATH,
        }}
        breadcrumbs={page.breadcrumbs?.items}
      /> */}

      <TemplatesHubPage page={page} />
    </>
  );
}
