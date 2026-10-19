import { notFound } from "next/navigation";

import { getPlatform } from "@/content/platforms";
import { buildMetadata } from "@/lib/seo/metadata";
import SchemaOrg from "@/components/seo/schema-org";
import OrbitPage from "@/components/templates/platform-orbit-page";
import SpectraPage from "@/components/templates/platform-spectra-page";
import PolarisPage from "@/components/templates/platform-polaris-page";
import MeridianPage from "@/components/templates/platform-meridian-page";
import TnaTniEnginePage from "@/components/templates/platform-tna-tni-engine-page";

export const revalidate = 3600;

const TEMPLATES = {
  orbit: OrbitPage,
  "spectra-lms": SpectraPage,
  polaris: PolarisPage,
  meridian: MeridianPage,
  "tna-tni-engine": TnaTniEnginePage,
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = getPlatform(slug);
  if (!page) return {};
  return buildMetadata({
    title: page.seo.title,
    description: page.seo.description,
    path: `/platforms/${slug}`,
    image: page.seo.ogImage,
  });
}

export default async function PlatformRoute({ params }) {
  const { slug } = await params;
  const page = getPlatform(slug);
  if (!page) notFound();

  const Template = TEMPLATES[slug];

  return (
    <>
      <SchemaOrg
        webpage={{
          name: page.seo.title,
          description: page.seo.description,
          path: `/platforms/${slug}`,
        }}
        breadcrumbs={page.breadcrumbs}
      />
      <Template page={page} />
    </>
  );
}
