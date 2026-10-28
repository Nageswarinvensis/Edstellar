import { getClientExperiencePage } from "@/lib/content/client-experience";
import { buildMetadata } from "@/lib/seo/metadata";
// import SchemaOrg from "@/components/seo/schema-org";
import ClientExperiencePage from "@/components/templates/client-experience-page";
import JsonLd from "@/components/seo/json-ld";

export const revalidate = 300;

export function generateMetadata() {
  return buildMetadata(getClientExperiencePage().seo);
}

/**
 * Client Experience — at the live site's URL. Local content
 * (`content/company/client-experience.js`), so fully static.
 *
 * Design: `Edstellar-New-Lanch SETUP/exceptional-customer-experience 6.html`.
 */
export default function ClientExperienceRoute() {
  const page = getClientExperiencePage();
  const BASE = "https://www.edstellar.com";
  const pageUrl = `${BASE}/exceptional-customer-experience`;

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
      <ClientExperiencePage page={page} />
    </>
  );
}
