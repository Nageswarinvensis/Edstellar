import { getCorporateTrainingHub } from "@/lib/content/corporate-training-hub";
import { getTrainingDomains } from "@/lib/content/training-catalog";
import { buildMetadata } from "@/lib/seo/metadata";
// import SchemaOrg from "@/components/seo/schema-org";
import CorporateTrainingHubPage from "@/components/templates/corporate-training-hub-page";
import JsonLd from "@/components/seo/json-ld";

// The domain list comes from the CMS sitemap API; refreshed hourly.
export const revalidate = 300;

export function generateMetadata() {
  return buildMetadata(getCorporateTrainingHub().seo);
}

/**
 * Corporate Training hub — copy from `content/corporate-training/hub.js`,
 * the domain list from the CMS sitemap API (so every link is a real page).
 *
 * Design: `Edstellar-New-Lanch SETUP/Edstellar_Corporate_Training_Hub 6.html`.
 */
export default async function CorporateTrainingRoute() {
  const page = getCorporateTrainingHub();
  const domains = (await getTrainingDomains()).map((domain) => ({ label: `${domain.name} Training`, href: domain.href }));
  const BASE = "https://www.edstellar.com";
  const pageUrl = `${BASE}/corporate-training`;

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
      <CorporateTrainingHubPage page={page} domains={domains} />
    </>
  );
}
