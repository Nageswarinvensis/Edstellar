import { notFound } from "next/navigation";

import { getPartnerProgramPage } from "@/lib/content/partner";
import { buildMetadata, stripSiteSuffix } from "@/lib/seo/metadata";
// import SchemaOrg from "@/components/seo/schema-org";
import PartnerProgramPage from "@/components/templates/partner-program-page";
import JsonLd from "@/components/seo/json-ld";

export const revalidate = 300;

const PATH = "/partner-program";

export function generateMetadata() {
  const page = getPartnerProgramPage();
  if (!page) return {};

  return buildMetadata({
    title: stripSiteSuffix(page.seo?.title),
    description: page.seo?.description,
    path: PATH,
  });
}

/**
 * Partner Program — local content (`content/company/partner-program.json`)
 * until the CMS has the page; see `getPartnerProgramPage`.
 *
 * Design: `partner-program.html`.
 */
export default function PartnerProgramRoute() {
  const page = getPartnerProgramPage();
  if (!page) notFound();
  const BASE = "https://www.edstellar.com";
  const pageUrl = `${BASE}/partner-program`;

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        "url": pageUrl,
        "name": stripSiteSuffix(page.seo?.title),
        ...(page.seo?.description && { "description": page.seo?.description }),
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
          name: stripSiteSuffix(page.seo?.title),
          description: page.seo?.description,
          path: PATH,
        }}
        breadcrumbs={page.breadcrumbs}
        faqs={page.faq?.groups?.flatMap((group) => group.items ?? [])}
      /> */}

      <PartnerProgramPage page={page} />
    </>
  );
}
