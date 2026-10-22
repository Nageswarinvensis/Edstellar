import { notFound } from "next/navigation";

import { getPartnerProgramPage } from "@/lib/content/partner";
import { buildMetadata, stripSiteSuffix } from "@/lib/seo/metadata";
import SchemaOrg from "@/components/seo/schema-org";
import PartnerProgramPage from "@/components/templates/partner-program-page";

export const revalidate = 300;

const PATH = "/partner-program";

export function generateMetadata() {
  const page = getPartnerProgramPage();
  if (!page) return {};

  return buildMetadata({
    title: stripSiteSuffix(page.seo?.title),
    description: page.seo?.description,
    path: PATH,
  });
}

/**
 * Partner Program — local content (`content/company/partner-program.json`)
 * until the CMS has the page; see `getPartnerProgramPage`.
 *
 * Design: `partner-program.html`.
 */
export default function PartnerProgramRoute() {
  const page = getPartnerProgramPage();
  if (!page) notFound();

  return (
    <>
      <SchemaOrg
        webpage={{
          name: stripSiteSuffix(page.seo?.title),
          description: page.seo?.description,
          path: PATH,
        }}
        breadcrumbs={page.breadcrumbs}
        faqs={page.faq?.groups?.flatMap((group) => group.items ?? [])}
      />

      <PartnerProgramPage page={page} />
    </>
  );
}
