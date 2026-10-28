import { getAboutUsPage } from "@/lib/content/about-us";
import { buildMetadata } from "@/lib/seo/metadata";
// import SchemaOrg from "@/components/seo/schema-org";
import AboutUsPage from "@/components/templates/about-us-page";
import JsonLd from "@/components/seo/json-ld";

export const revalidate = 300;

export function generateMetadata() {
  const { seo } = getAboutUsPage();
  // The SEO title is "About Edstellar" exactly — the root layout's
  // `%s | Edstellar` template would repeat the brand, so it is bypassed.
  return { ...buildMetadata(seo), title: { absolute: seo.title } };
}

/**
 * About Us — local content (`content/company/about-us.js`), so fully
 * static.
 *
 * Design: `Edstellar-New-Lanch SETUP/about-us 59.html`.
 */
export default function AboutUsRoute() {
  const page = getAboutUsPage();
  const BASE = "https://www.edstellar.com";
  const pageUrl = `${BASE}/about-us`;

  return (
    <>
      {/* AboutPage — typed specifically per CMS schema; back-references stripped */}
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "@id": `${pageUrl}#webpage`,
        "url": pageUrl,
        "name": "Your Capability Transformation Partner",
        "description": "Learn about Edstellar, our purpose, values and approach to capability transformation, and how we help organizations develop their people and teams.",
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
      <AboutUsPage page={page} />
    </>
  );
}
