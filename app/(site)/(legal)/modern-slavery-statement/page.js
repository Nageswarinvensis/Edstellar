import { notFound } from "next/navigation";

import { getModernSlaveryPage } from "@/lib/content/legal";
import { buildMetadata } from "@/lib/seo/metadata";
import LegalPage, { legalTitle } from "@/components/templates/legal-page";

export const revalidate = 300;

const PATH = "/modern-slavery-statement";

export async function generateMetadata() {
  const page = await getModernSlaveryPage();
  if (!page) return {};
  const { seo } = page;

  return buildMetadata({
    title: legalTitle(seo),
    description: seo?.Meta_description,
    path: PATH,
    image: seo?.og_image_url,
  });
}

/** Modern Slavery Statement — the shared legal template with the CMS page
 * `site-pages/modern-slavery-statement`. */
export default async function ModernSlaveryStatementPage() {
  const page = await getModernSlaveryPage();
  if (!page) notFound();

  return <LegalPage page={page} path={PATH} />;
}
