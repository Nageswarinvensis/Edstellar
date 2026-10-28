import { notFound } from "next/navigation";

import { getSitemapPage } from "@/lib/content/sitemap";
import { buildMetadata } from "@/lib/seo/metadata";
// import SchemaOrg from "@/components/seo/schema-org";
import SitemapPage from "@/components/templates/sitemap-page";
import JsonLd from "@/components/seo/json-ld";

// Rebuilt hourly from the CMS sitemap, like the XML one (`app/sitemap.js`).
export const revalidate = 300;

const PATH = "/sitemap";
const TITLE = "Sitemap";
const DESCRIPTION =
  "Navigate Edstellar's website with the sitemap. Find corporate training courses, consulting services, resources, case studies, blogs and company information.";

const BREADCRUMBS = [
  { label: "Home", href: "/" },
  { label: "Sitemap", href: null },
];

export const metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

/**
 * HTML sitemap — the CMS's `/api/v2/sitemap` plus this repo's static pages,
 * laid out like the live site's `/sitemap`. Distinct from `/sitemap.xml`
 * (`app/sitemap.js`), which is for crawlers.
 */
export default async function SitemapRoute() {
  const page = await getSitemapPage();
  if (!page) notFound();
  const BASE = "https://www.edstellar.com";
  const pageUrl = `${BASE}/sitemap`;

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        "url": pageUrl,
        "name": TITLE,
        ...(DESCRIPTION && { "description": DESCRIPTION }),
        "inLanguage": "en-US"
      }} />
      {BREADCRUMBS?.length > 0 && (
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "@id": `${pageUrl}#breadcrumb`,
          "itemListElement": BREADCRUMBS.map((item, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": item.label,
            "item": item.href === "/" ? BASE : item.href?.startsWith("http") ? item.href : item.href ? `${BASE}${item.href}` : pageUrl
          }))
        }} />
      )}
      {/* <SchemaOrg webpage={{ name: TITLE, description: DESCRIPTION, path: PATH }} breadcrumbs={BREADCRUMBS} /> */}
      <SitemapPage page={page} breadcrumbs={BREADCRUMBS} />
    </>
  );
}
