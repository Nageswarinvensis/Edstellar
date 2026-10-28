import { getCareersPage } from "@/lib/content/company";
import { buildMetadata } from "@/lib/seo/metadata";
// import SchemaOrg from "@/components/seo/schema-org";
import JsonLd from "@/components/seo/json-ld";

import CareersHero from "@/components/sections/company/careers/careers-hero";
import WhyWork from "@/components/sections/company/careers/why-work";
import TrainerSpotlight from "@/components/sections/company/careers/trainer-spotlight";

export const revalidate = 300;

export function generateMetadata() {
  const { seo } = getCareersPage();
  // The design's title already carries its own brand suffix ("| Edstellar
  // Jobs"), so the root layout's `%s | Edstellar` template is bypassed.
  return { ...buildMetadata(seo), title: { absolute: seo.title } };
}

/**
 * Careers — local JSON (`content/company/careers.json`), so the page is
 * fully static.
 *
 * Design: `Edstellar-New-Lanch SETUP/careers.html`.
 */
export default function CareersPage() {
  const { seo, breadcrumbs, hero, why, trainer } = getCareersPage();
  const BASE = "https://www.edstellar.com";
  const pageUrl = `${BASE}/careers`;

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        "url": pageUrl,
        "name": seo.title,
        ...(seo.description && { "description": seo.description }),
        "inLanguage": "en-US"
      }} />
      {breadcrumbs?.length > 0 && (
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "@id": `${pageUrl}#breadcrumb`,
          "itemListElement": breadcrumbs.map((item, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": item.label,
            "item": item.href === "/" ? BASE : item.href?.startsWith("http") ? item.href : item.href ? `${BASE}${item.href}` : pageUrl
          }))
        }} />
      )}
      {/* <SchemaOrg
        webpage={{ name: seo.title, description: seo.description, path: seo.path }}
        breadcrumbs={breadcrumbs}
      /> */}

      <CareersHero heading={hero.heading} breadcrumbs={breadcrumbs} image={hero.image} />
      <WhyWork data={why} />
      <TrainerSpotlight data={trainer} />
    </>
  );
}
