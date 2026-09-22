import TNAHero from "@/components/sections/training needs analysis/tnahero";
import DomainInfo from "@/components/sections/domain/domain-info";
import ClientLogos from "@/components/common/client-logos";
import StickyTabs from "@/components/sections/domain/sticky-navbar";
import CtaTrainer from "@/components/sections/trainers details/ctatrainer";

import heroData from "@/content/training needs analysis/trainingneedsanalysisdata.json";

export default function TrainingNeedsAnalysisPage() {
  return (
    <>
      <TNAHero
        data={heroData.trainingNeedsAnalysis}
        breadcrumbItems={heroData.BreadcrumbData}
      />
      <DomainInfo proof={heroData.proof} />
      <ClientLogos data={heroData.ClientsLogosData} />
      <StickyTabs data={heroData.stickyNavbarData} />
      <CtaTrainer data={heroData.ctaTrainerData} 
    />
    </>
  );
}