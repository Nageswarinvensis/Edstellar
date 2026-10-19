import { getRfpPage } from "@/lib/content/request-for-proposal";
import { buildMetadata } from "@/lib/seo/metadata";
import SchemaOrg from "@/components/seo/schema-org";
import RequestForProposalPage from "@/components/templates/request-for-proposal-page";

export const revalidate = 3600;

export function generateMetadata() {
  return buildMetadata(getRfpPage().seo);
}

/**
 * Request for Proposal — local content
 * (`content/company/request-for-proposal.js`), so fully static.
 *
 * Design: `Edstellar-New-Lanch SETUP/request-for-proposal 1.html`.
 */
export default function RequestForProposalRoute() {
  const page = getRfpPage();

  return (
    <>
      <SchemaOrg
        webpage={{ name: page.seo.title, description: page.seo.description, path: page.seo.path }}
        breadcrumbs={page.breadcrumbs}
        faqs={page.faqs.items}
      />
      <RequestForProposalPage page={page} />
    </>
  );
}
