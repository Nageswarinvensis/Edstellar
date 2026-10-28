import { getClientsPage } from "@/lib/content/clients";
import { buildMetadata } from "@/lib/seo/metadata";
// import SchemaOrg from "@/components/seo/schema-org";
import ClientsPage from "@/components/templates/clients-page";
import JsonLd from "@/components/seo/json-ld";

export const revalidate = 300;

export function generateMetadata() {
  const { seo } = getClientsPage();
  return buildMetadata(seo);
}

/**
 * Clients (`/clients`) — local content (`content/company/clients.js`), so the
 * page is fully static (SSG).
 *
 * Design: `Edstellar-New-Lanch SETUP/clients 9.html`.
 */
export default function ClientsRoute() {
  const page = getClientsPage();
  const BASE = "https://www.edstellar.com";
  const pageUrl = `${BASE}/clients`;

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
        faqs={page.faqs.items.map((item) => ({ question: item.q, answer: item.a }))}
      /> */}
      <ClientsPage page={page} />
    </>
  );
}
