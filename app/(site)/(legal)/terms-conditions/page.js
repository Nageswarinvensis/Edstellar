import { notFound } from "next/navigation";

import { getTermsPage } from "@/lib/content/legal";
import { buildMetadata } from "@/lib/seo/metadata";
import LegalPage, { legalTitle } from "@/components/templates/legal-page";

export const revalidate = 3600;

const PATH = "/terms-conditions";

export async function generateMetadata() {
  const page = await getTermsPage();
  if (!page) return {};
  const { seo } = page;

  return buildMetadata({
    title: legalTitle(seo),
    description: seo?.Meta_description,
    path: PATH,
    image: seo?.og_image_url,
  });
}

/** Terms and Conditions — the shared legal template with the CMS page
 * `site-pages/terms-conditions`. */
export default async function TermsAndConditionsPage() {
  const page = await getTermsPage();
  if (!page) notFound();

  return <LegalPage page={page} path={PATH} />;
}
