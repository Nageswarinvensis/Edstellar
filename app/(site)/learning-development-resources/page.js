import { getResourcesHub } from "@/lib/content/resources";
import { buildMetadata } from "@/lib/seo/metadata";
import SchemaOrg from "@/components/seo/schema-org";
import ResourcesHubPage from "@/components/templates/resources-hub-page";

export function generateMetadata() {
  const { seo } = getResourcesHub();
  return buildMetadata(seo);
}

/**
 * Learning and Development Resources — the free L&D resource hub, a static
 * page built from local JSON (`content/resources/learning-development-resources.json`,
 * via `lib/content/resources.js`). The library's filters and pagination run
 * on the client over cards that are all in the server HTML.
 *
 * Design: `Learning_Development_Resources_Template.html`.
 */
export default function LearningDevelopmentResourcesPage() {
  const page = getResourcesHub();

  return (
    <>
      <SchemaOrg
        webpage={{
          name: page.seo.title,
          description: page.seo.description,
          path: page.seo.path,
        }}
        breadcrumbs={page.breadcrumbs}
        faqs={page.faqs?.items}
      />

      <ResourcesHubPage page={page} />
    </>
  );
}
