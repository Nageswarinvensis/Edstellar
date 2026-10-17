import { getCorporateTrainingHub } from "@/lib/content/corporate-training-hub";
import { getTrainingDomains } from "@/lib/content/training-catalog";
import { buildMetadata } from "@/lib/seo/metadata";
import SchemaOrg from "@/components/seo/schema-org";
import CorporateTrainingHubPage from "@/components/templates/corporate-training-hub-page";

// The domain list comes from the CMS sitemap API; refreshed hourly.
export const revalidate = 3600;

export function generateMetadata() {
  return buildMetadata(getCorporateTrainingHub().seo);
}

/**
 * Corporate Training hub — copy from `content/corporate-training/hub.js`,
 * the domain list from the CMS sitemap API (so every link is a real page).
 *
 * Design: `Edstellar-New-Lanch SETUP/Edstellar_Corporate_Training_Hub 6.html`.
 */
export default async function CorporateTrainingRoute() {
  const page = getCorporateTrainingHub();
  const domains = (await getTrainingDomains()).map((domain) => ({ label: `${domain.name} Training`, href: domain.href }));

  return (
    <>
      <SchemaOrg
        webpage={{ name: page.seo.title, description: page.seo.description, path: page.seo.path }}
        breadcrumbs={page.breadcrumbs}
        faqs={page.faqs.items}
      />
      <CorporateTrainingHubPage page={page} domains={domains} />
    </>
  );
}
