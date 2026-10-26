import { getClientExperiencePage } from "@/lib/content/client-experience";
import { buildMetadata } from "@/lib/seo/metadata";
// import SchemaOrg from "@/components/seo/schema-org";
import ClientExperiencePage from "@/components/templates/client-experience-page";

export const revalidate = 300;

export function generateMetadata() {
  return buildMetadata(getClientExperiencePage().seo);
}

/**
 * Client Experience — at the live site's URL. Local content
 * (`content/company/client-experience.js`), so fully static.
 *
 * Design: `Edstellar-New-Lanch SETUP/exceptional-customer-experience 6.html`.
 */
export default function ClientExperienceRoute() {
  const page = getClientExperiencePage();

  return (
    <>
      {/* <SchemaOrg
        webpage={{ name: page.seo.title, description: page.seo.description, path: page.seo.path }}
        breadcrumbs={page.breadcrumbs}
        faqs={page.faqs.items}
      /> */}
      <ClientExperiencePage page={page} />
    </>
  );
}
