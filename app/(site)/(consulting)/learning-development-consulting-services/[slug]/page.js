import { notFound } from "next/navigation";

import {
  getConsultingService,
  getConsultingServiceSlugs,
} from "@/lib/content/consulting";
import { buildMetadata } from "@/lib/seo/metadata";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  serviceJsonLd,
} from "@/lib/seo/json-ld";
import JsonLd from "@/components/seo/json-ld";
import ServicePage from "@/components/templates/consulting/service-page";

const PILLAR = "learning-development-consulting-services";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getConsultingServiceSlugs(PILLAR);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = await getConsultingService(PILLAR, slug);
  if (!service) return {};

  return buildMetadata({
    title: service.seo.title,
    description: service.seo.description,
    path: `/${PILLAR}/${slug}`,
  });
}

export default async function LearningDevelopmentServicePage({ params }) {
  const { slug } = await params;

  // Both segments — a sub-service only exists under its own pillar.
  const service = await getConsultingService(PILLAR, slug);
  if (!service) notFound();

  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({
            name: service.name,
            description: service.seo.description,
            path: `/${PILLAR}/${slug}`,
            serviceType: service.name,
          }),
          breadcrumbJsonLd(service.BreadcrumbData),
          faqJsonLd(service.faqData?.items),
        ]}
      />
      <ServicePage data={service} />
    </>
  );
}
