import { getLeadershipRetreatsPage } from "@/lib/content/leadership-retreats";
import { buildMetadata } from "@/lib/seo/metadata";
// import SchemaOrg from "@/components/seo/schema-org";
import JsonLd from "@/components/seo/json-ld";
import LeadershipRetreatsPage from "@/components/templates/leadership-retreats-page";

export const revalidate = 300;

export function generateMetadata() {
  return buildMetadata(getLeadershipRetreatsPage().seo);
}

/**
 * Leadership Retreats — local content
 * (`content/leadership-retreats/index.js`), so fully static.
 *
 * Design: `Edstellar-New-Lanch SETUP/leadership-retreats 8.html`.
 */
export default function LeadershipRetreatsRoute() {
  const page = getLeadershipRetreatsPage();

  const BASE = "https://www.edstellar.com";
  const pageUrl = `${BASE}/leadership-retreats`;

  return (
    <>
      {/* WebPage */}
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        "url": pageUrl,
        "name": page.seo.title,
        ...(page.seo.description && { "description": page.seo.description }),
        "inLanguage": "en-US"
      }} />

      {/* <SchemaOrg
        webpage={{ name: page.seo.title, description: page.seo.description, path: page.seo.path }}
        breadcrumbs={page.breadcrumbs}
        faqs={page.faqs.items}
      /> */}
      <LeadershipRetreatsPage page={page} />
    </>
  );
}
