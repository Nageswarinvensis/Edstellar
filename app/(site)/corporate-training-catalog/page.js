import { getCatalogPage } from "@/lib/content/corporate-training-catalog";
import { getTrainingDomains } from "@/lib/content/training-catalog";
import { buildMetadata } from "@/lib/seo/metadata";
// import SchemaOrg from "@/components/seo/schema-org";
import CorporateTrainingCatalogPage from "@/components/templates/corporate-training-catalog-page";
import JsonLd from "@/components/seo/json-ld";

// Domains and courses come from the CMS sitemap API; refreshed hourly.
export const revalidate = 300;

export function generateMetadata() {
  return buildMetadata(getCatalogPage().seo);
}

/**
 * Corporate Training Catalog — at the live site's URL. Copy from
 * `content/corporate-training/catalog.js`; every domain and course from the
 * CMS sitemap API, so all 2,000+ course links point at real pages.
 *
 * Design: `Edstellar-New-Lanch SETUP/corporate-training-catalog 27.html`.
 */
export default async function CorporateTrainingCatalogRoute() {
  const page = getCatalogPage();
  const domains = await getTrainingDomains();
  const BASE = "https://www.edstellar.com";
  const pageUrl = `${BASE}/corporate-training-catalog`;

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
        faqs={page.faqs.items}
      /> */}
      <CorporateTrainingCatalogPage page={page} domains={domains} />
    </>
  );
}
