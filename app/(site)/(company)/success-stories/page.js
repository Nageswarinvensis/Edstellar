import { getSuccessStoriesPage } from "@/lib/content/success-stories";
import { buildMetadata } from "@/lib/seo/metadata";
// import SchemaOrg from "@/components/seo/schema-org";
import SuccessStoriesPage from "@/components/templates/success-stories-page";
import JsonLd from "@/components/seo/json-ld";

export const revalidate = 300;

export function generateMetadata() {
  return buildMetadata(getSuccessStoriesPage().seo);
}

/**
 * Success Stories — at the live site's URL. Local content
 * (`content/company/success-stories.js`), so fully static.
 *
 * Design: `Edstellar-New-Lanch SETUP/success-stories.html`.
 */
export default function SuccessStoriesRoute() {
  const page = getSuccessStoriesPage();
  const BASE = "https://www.edstellar.com";
  const pageUrl = `${BASE}/success-stories`;

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        "url": pageUrl,
        "name": page.seo.title,
        ...(page.seo.description && { "description": page.seo.description }),
        "inLanguage": "en-US"
      }} />
      {page.breadcrumbs?.length > 0 && (
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "@id": `${pageUrl}#breadcrumb`,
          "itemListElement": page.breadcrumbs.map((item, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": item.label,
            "item": item.href === "/" ? BASE : item.href?.startsWith("http") ? item.href : item.href ? `${BASE}${item.href}` : pageUrl
          }))
        }} />
      )}
      {/* <SchemaOrg
        webpage={{ name: page.seo.title, description: page.seo.description, path: page.seo.path }}
        breadcrumbs={page.breadcrumbs}
      /> */}
      <SuccessStoriesPage page={page} />
    </>
  );
}
