import { getGovernmentPage } from "@/lib/content/sectors";
import { buildMetadata, stripSiteSuffix } from "@/lib/seo/metadata";
import SchemaOrg from "@/components/seo/schema-org";
import SectorPage from "@/components/templates/sector-page";

export const revalidate = 3600;

export function generateMetadata() {
  const { seo } = getGovernmentPage();

  return buildMetadata({
    title: stripSiteSuffix(seo.title),
    description: seo.description,
    path: seo.path,
  });
}

/**
 * Training for Government — skill-development programs for public-sector
 * teams. Local JSON (`content/sectors/government.json`); the design it
 * shares with Training for Universities is `components/templates/sector-page`.
 */
export default function GovernmentTrainingPage() {
  const page = getGovernmentPage();

  return (
    <>
      <SchemaOrg
        webpage={{
          name: stripSiteSuffix(page.seo.title),
          description: page.seo.description,
          path: page.seo.path,
        }}
        breadcrumbs={page.breadcrumbs}
      />

      <SectorPage page={page} />
    </>
  );
}
