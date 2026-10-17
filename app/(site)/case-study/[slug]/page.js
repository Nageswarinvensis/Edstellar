import { notFound } from "next/navigation";

import { getCaseStudy, getCaseStudySlugs } from "@/lib/content/case-studies";
import { buildMetadata } from "@/lib/seo/metadata";
import SchemaOrg from "@/components/seo/schema-org";
import CaseStudyPage from "@/components/templates/case-study-page";

// Every case study is local content, so the full set is known at build time
// and anything else is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

const pathOf = (slug) => `/case-study/${slug}`;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  return buildMetadata({ ...study.seo, path: pathOf(slug) });
}

/**
 * Case study detail — the live site's `/case-study/{slug}` URL (singular,
 * TASTE.md §1.1).
 */
export default async function CaseStudyDetailPage({ params }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Case Studies", href: "/case-studies" },
    { label: study.title, href: null },
  ];

  return (
    <>
      <SchemaOrg
        webpage={{ name: study.seo.title, description: study.seo.description, path: pathOf(slug) }}
        breadcrumbs={breadcrumbs}
      />
      <CaseStudyPage study={study} breadcrumbs={breadcrumbs} />
    </>
  );
}
