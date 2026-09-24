import { buildMetadata } from "@/lib/seo/metadata";

import TNAHero from "@/components/sections/training needs analysis/tnahero";
import LearningStats from "@/components/sections/learning development consulting/learningstats";
import ClientLogos from "@/components/common/client-logos";
import StickyTabs from "@/components/sections/domain/sticky-navbar";
import WhyLandD from "@/components/sections/learning development consulting/whylandd";
import Maturity from "@/components/sections/learning development consulting/maturity";
import LandDCTA from "@/components/sections/learning development consulting/ldcta";
import Methodology from "@/components/sections/learning development consulting/methodology";
import Transform from "@/components/sections/learning development consulting/transform";
import TnaRelated from "@/components/sections/training needs analysis/tnarelated";
import Engagements from "@/components/sections/learning development consulting/engagements";

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
      <ClientLogos data={heroData.clientsLogosData}/>
      <StickyTabs data={heroData.stickyNavbarData} />
      <WhyLandD data={heroData.WhyLandDData} />
      <Maturity data={heroData.maturityData}/>
      <LandDCTA data={heroData.landdctaData}/>
      <Methodology data={heroData.methodologyData}/>
      <Transform data={heroData.transformData}/>
      <TnaRelated data={heroData.relatedData}/>
      <Engagements data={heroData.engagementsData}/>
    </>
  );
}
