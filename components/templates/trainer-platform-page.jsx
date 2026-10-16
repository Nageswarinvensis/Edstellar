import TrainerHero from "@/components/sections/trainer_platform/trainer-hero";
import TrainerBenefits from "@/components/sections/trainer_platform/trainer-benefits";
import TrainerReviews from "@/components/sections/trainer_platform/trainer-reviews";
import TrainerDashboard from "@/components/sections/trainer_platform/trainer-dashboard";
import TrainerImpact from "@/components/sections/trainer_platform/trainer-impact";
import TrainerSteps from "@/components/sections/trainer_platform/trainer-steps";
import TrainerResources from "@/components/sections/trainer_platform/trainer-resources";
import TrainerCta from "@/components/sections/trainer_platform/trainer-cta";

/**
 * Join as a Trainer (`/trainer-platform`). Takes the page record from
 * `getTrainerPlatformPage()` and lays out its sections in the design's order.
 *
 * Design: `Join as a Trainer.html`.
 */
export default function TrainerPlatformPage({ page }) {
  return (
    <>
      <TrainerHero data={page.hero} breadcrumbs={page.breadcrumbs?.items} />
      <TrainerBenefits data={page.benefits} />
      <TrainerReviews data={page.reviews} />
      <TrainerDashboard data={page.trainer_dashboard} />
      <TrainerImpact data={page.impact} />
      <TrainerSteps data={page.trainers_how_it_works} />
      <TrainerResources data={page.resources} />
      <TrainerCta data={page.trainer_final_cta} />
    </>
  );
}
