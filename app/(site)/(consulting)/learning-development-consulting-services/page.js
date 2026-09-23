import { buildMetadata } from "@/lib/seo/metadata";

import TNAHero from "@/components/sections/training needs analysis/tnahero";

import heroData from "@/content/learning development consulting/L&D Consulting.json";

export const metadata = buildMetadata({
  title: "Learning and Development Consulting",
  description: "Design a learning strategy your organization can actually run — capability mapping, program architecture and measurement.",
  path: "/learning-development-consulting-services",
});
export default function LDConsultingPage() {
  return (
    <>
      <TNAHero
        data={heroData.trainingNeedsAnalysis}
        breadcrumbItems={heroData.BreadcrumbData}
      />
    </>
  );
}
