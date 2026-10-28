import { getPricingPage } from "@/lib/content/company";
import { buildMetadata } from "@/lib/seo/metadata";
// import SchemaOrg from "@/components/seo/schema-org";
import PricingPage from "@/components/templates/pricing-page";
import JsonLd from "@/components/seo/json-ld";

export const revalidate = 300;

export function generateMetadata() {
  const { seo } = getPricingPage();
  return buildMetadata(seo);
}

/**
 * Corporate Training Pricing — a static page built from local JSON
 * (`content/company/corporate-training-pricing.json`, via
 * `lib/content/company.js`). The packages also go into the Service JSON-LD
 * as its offer catalog.
 *
 * Design: `corporate-training-pricing-v2.html`.
 */
export default function CorporateTrainingPricingPage() {
  const page = getPricingPage();
  const { plans } = page;
  const BASE = "https://www.edstellar.com";
  const pageUrl = `${BASE}/corporate-training-pricing`;

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
        service={{
          name: "Corporate Training Packages",
          description: page.seo.description,
          path: page.seo.path,
          serviceType: "Instructor-led corporate training",
          offers: plans.items.map((plan) => ({
            name: plan.name,
            description: plan.description.all,
          })),
        }}
        breadcrumbs={page.breadcrumbs}
        faqs={page.faqs.items}
      /> */}

      <PricingPage page={page} />
    </>
  );
}
