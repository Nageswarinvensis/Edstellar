import { getUniversitiesPage } from "@/lib/content/sectors";
import { buildMetadata, stripSiteSuffix } from "@/lib/seo/metadata";
// import SchemaOrg from "@/components/seo/schema-org";
import SectorPage from "@/components/templates/sector-page";
import JsonLd from "@/components/seo/json-ld";

export const revalidate = 300;

export function generateMetadata() {
  const { seo } = getUniversitiesPage();

  return buildMetadata({
    title: stripSiteSuffix(seo.title),
    description: seo.description,
    path: seo.path,
  });
}

/**
 * Training for Universities — skill-development programs for students, staff
 * and alumni. Local JSON (`content/sectors/universities.json`); the design it
 * shares with Training for Government is `components/templates/sector-page`.
 */
export default function UniversitiesTrainingPage() {
  const page = getUniversitiesPage();
  const BASE = "https://www.edstellar.com";
  const pageUrl = `${BASE}/training-for-universities`;

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
