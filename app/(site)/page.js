import { getHomePage } from "@/lib/content/home";
import { buildMetadata } from "@/lib/seo/metadata";
// import SchemaOrg from "@/components/seo/schema-org";
import HomePage from "@/components/templates/home-page";
import JsonLd from "@/components/seo/json-ld";

export const revalidate = 300;

export function generateMetadata() {
  const { seo } = getHomePage();
  return buildMetadata(seo);
}

/**
 * Home (`/`) — local content (`content/home.js`), rendered as ISR (§2.2).
 *
 * Design: `Edstellar-New-Lanch SETUP/edstellar-homepage 51.html`.
 */
export default function HomeRoute() {
  const page = getHomePage();

  const BASE = "https://www.edstellar.com";

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${BASE}#webpage`,
        "url": BASE,
        "name": page.seo.title,
        ...(page.seo.description && { "description": page.seo.description }),
        "inLanguage": "en-US"
      }} />
      {/* <SchemaOrg
        webpage={{ name: page.seo.title, description: page.seo.description, path: page.seo.path }}
      /> */}
      <HomePage page={page} />
    </>
  );
}
