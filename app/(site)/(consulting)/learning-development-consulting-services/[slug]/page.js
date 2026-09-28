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
import ContentDevelopmentPage from "@/components/templates/consulting/content-development-page";
import LearningTechnologyPage from "@/components/templates/consulting/learning-technology-page";

const PILLAR = "learning-development-consulting-services";

// Each sub-service record names its design in `template`.
const TEMPLATES = {
  "learning-strategy": ServicePage,
  "content-development": ContentDevelopmentPage,
  "learning-technology": LearningTechnologyPage,
};

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

  const Template = TEMPLATES[service.template];
  if (!Template) notFound();

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
      <Template data={service} />
    </>
  );
}
