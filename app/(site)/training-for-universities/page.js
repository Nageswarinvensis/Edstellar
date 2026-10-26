import { getUniversitiesPage } from "@/lib/content/sectors";
import { buildMetadata, stripSiteSuffix } from "@/lib/seo/metadata";
// import SchemaOrg from "@/components/seo/schema-org";
import SectorPage from "@/components/templates/sector-page";

export const revalidate = 300;

export function generateMetadata() {
  const { seo } = getUniversitiesPage();

  return buildMetadata({
    title: stripSiteSuffix(seo.title),
    description: seo.description,
    path: seo.path,
  });
}

/**
 * Training for Universities — skill-development programs for students, staff
 * and alumni. Local JSON (`content/sectors/universities.json`); the design it
 * shares with Training for Government is `components/templates/sector-page`.
 */
export default function UniversitiesTrainingPage() {
  const page = getUniversitiesPage();

  return (
    <>
      {/* <SchemaOrg
        webpage={{
          name: stripSiteSuffix(page.seo.title),
          description: page.seo.description,
          path: page.seo.path,
        }}
        breadcrumbs={page.breadcrumbs}
      /> */}

      <SectorPage page={page} />
    </>
  );
}
