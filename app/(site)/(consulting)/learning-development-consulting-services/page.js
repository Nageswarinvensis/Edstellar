import { buildMetadata } from "@/lib/seo/metadata";

import TNAHero from "@/components/sections/training needs analysis/tnahero";
import LearningStats from "@/components/sections/learning development consulting/learningstats";
import StickyTabs from "@/components/sections/domain/sticky-navbar";
import Maturity from "@/components/sections/learning development consulting/maturity";

import heroData from "@/content/learning development consulting/L&D Consulting.json";

export const metadata = buildMetadata({
  title: "Learning and Development Consulting",
  description: "Design a learning strategy your organization can actually run — capability mapping, program architecture and measurement.",
  path: "/learning-development-consulting-services",
});

export default function LDConsultingPage() {
  return (
    <>
      <TNAHero data={heroData.ldheroData} breadcrumbItems={heroData.BreadcrumbData} />
      <LearningStats data={heroData.proof} />
      <StickyTabs data={heroData.stickyNavbarData} />
      <Maturity data={heroData.maturityData} />
    </>
  );
}
