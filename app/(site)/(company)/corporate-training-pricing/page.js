import { getPricingPage } from "@/lib/content/company";
import { buildMetadata } from "@/lib/seo/metadata";
import SchemaOrg from "@/components/seo/schema-org";
import PricingPage from "@/components/templates/pricing-page";

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

  return (
    <>
      <SchemaOrg
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
      />

      <PricingPage page={page} />
    </>
  );
}
