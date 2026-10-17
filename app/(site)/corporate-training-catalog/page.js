import { getCatalogPage } from "@/lib/content/corporate-training-catalog";
import { getTrainingDomains } from "@/lib/content/training-catalog";
import { buildMetadata } from "@/lib/seo/metadata";
import SchemaOrg from "@/components/seo/schema-org";
import CorporateTrainingCatalogPage from "@/components/templates/corporate-training-catalog-page";

// Domains and courses come from the CMS sitemap API; refreshed hourly.
export const revalidate = 3600;

export function generateMetadata() {
  return buildMetadata(getCatalogPage().seo);
}

/**
 * Corporate Training Catalog — at the live site's URL. Copy from
 * `content/corporate-training/catalog.js`; every domain and course from the
 * CMS sitemap API, so all 2,000+ course links point at real pages.
 *
 * Design: `Edstellar-New-Lanch SETUP/corporate-training-catalog 27.html`.
 */
export default async function CorporateTrainingCatalogRoute() {
  const page = getCatalogPage();
  const domains = await getTrainingDomains();

  return (
    <>
      <SchemaOrg
        webpage={{ name: page.seo.title, description: page.seo.description, path: page.seo.path }}
        breadcrumbs={page.breadcrumbs}
        faqs={page.faqs.items}
      />
      <CorporateTrainingCatalogPage page={page} domains={domains} />
    </>
  );
}
