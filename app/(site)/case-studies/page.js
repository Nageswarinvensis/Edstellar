import { getCaseStudies, getCaseStudiesPage } from "@/lib/content/case-studies";
import { buildMetadata } from "@/lib/seo/metadata";
// import SchemaOrg from "@/components/seo/schema-org";
import CaseStudiesPage from "@/components/templates/case-studies-page";
import JsonLd from "@/components/seo/json-ld";

export const revalidate = 300;

export function generateMetadata() {
  return buildMetadata(getCaseStudiesPage().seo);
}

/**
 * Case Studies listing — the live site's `/case-studies` URL (TASTE.md §1.1).
 * Local content (`content/case-studies/index.js`), so fully static.
 */
export default function CaseStudiesListingPage() {
  const page = getCaseStudiesPage();
  const BASE = "https://www.edstellar.com";
  const pageUrl = `${BASE}/case-studies`;

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
      <CaseStudiesPage page={page} studies={getCaseStudies()} />
    </>
  );
}
