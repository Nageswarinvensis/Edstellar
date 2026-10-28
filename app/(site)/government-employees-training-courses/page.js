import { getGovernmentPage } from "@/lib/content/sectors";
import { buildMetadata, stripSiteSuffix } from "@/lib/seo/metadata";
// import SchemaOrg from "@/components/seo/schema-org";
import SectorPage from "@/components/templates/sector-page";
import JsonLd from "@/components/seo/json-ld";

export const revalidate = 300;

export function generateMetadata() {
  const { seo } = getGovernmentPage();

  return buildMetadata({
    title: stripSiteSuffix(seo.title),
    description: seo.description,
    path: seo.path,
  });
}

/**
 * Training for Government — skill-development programs for public-sector
 * teams. Local JSON (`content/sectors/government.json`); the design it
 * shares with Training for Universities is `components/templates/sector-page`.
 */
export default function GovernmentTrainingPage() {
  const page = getGovernmentPage();
  const BASE = "https://www.edstellar.com";
  const pageUrl = `${BASE}/government-employees-training-courses`;

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        "url": pageUrl,
        "name": stripSiteSuffix(page.seo.title),
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
        webpage={{
          name: stripSiteSuffix(page.seo.title),
          description: page.seo.description,
          path: page.seo.path,
        }}
        breadcrumbs={page.breadcrumbs}
      /> */}

      <SectorPage page={page} />
    </>
  );
}
