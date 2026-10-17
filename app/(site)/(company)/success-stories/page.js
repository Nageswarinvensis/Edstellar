import { getSuccessStoriesPage } from "@/lib/content/success-stories";
import { buildMetadata } from "@/lib/seo/metadata";
import SchemaOrg from "@/components/seo/schema-org";
import SuccessStoriesPage from "@/components/templates/success-stories-page";

export function generateMetadata() {
  return buildMetadata(getSuccessStoriesPage().seo);
}

/**
 * Success Stories — at the live site's URL. Local content
 * (`content/company/success-stories.js`), so fully static.
 *
 * Design: `Edstellar-New-Lanch SETUP/success-stories.html`.
 */
export default function SuccessStoriesRoute() {
  const page = getSuccessStoriesPage();

  return (
    <>
      <SchemaOrg
        webpage={{ name: page.seo.title, description: page.seo.description, path: page.seo.path }}
        breadcrumbs={page.breadcrumbs}
      />
      <SuccessStoriesPage page={page} />
    </>
  );
}
