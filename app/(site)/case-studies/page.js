import { getCaseStudies, getCaseStudiesPage } from "@/lib/content/case-studies";
import { buildMetadata } from "@/lib/seo/metadata";
import SchemaOrg from "@/components/seo/schema-org";
import CaseStudiesPage from "@/components/templates/case-studies-page";

export const revalidate = 3600;

export function generateMetadata() {
  return buildMetadata(getCaseStudiesPage().seo);
}

/**
 * Case Studies listing — the live site's `/case-studies` URL (TASTE.md §1.1).
 * Local content (`content/case-studies/index.js`), so fully static.
 */
export default function CaseStudiesListingPage() {
  const page = getCaseStudiesPage();

  return (
    <>
      <SchemaOrg
        webpage={{ name: page.seo.title, description: page.seo.description, path: page.seo.path }}
        breadcrumbs={page.breadcrumbs}
      />
      <CaseStudiesPage page={page} studies={getCaseStudies()} />
    </>
  );
}
