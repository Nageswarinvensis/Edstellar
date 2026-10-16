import TrainerHero from "@/components/sections/trainer_platform/trainer-hero";
import TrainerBenefits from "@/components/sections/trainer_platform/trainer-benefits";
import TrainerReviews from "@/components/sections/trainer_platform/trainer-reviews";
import TrainerDashboard from "@/components/sections/trainer_platform/trainer-dashboard";
import TrainerImpact from "@/components/sections/trainer_platform/trainer-impact";
import TrainerSteps from "@/components/sections/trainer_platform/trainer-steps";
import TrainerResources from "@/components/sections/trainer_platform/trainer-resources";
import TrainerCta from "@/components/sections/trainer_platform/trainer-cta";

/**
 * Join as a Trainer (`/trainer-platform`). Takes the CMS page from
 * `getTrainerPlatformPage()` (component slugs verbatim) and lays out its
 * sections in the design's order.
 *
 * Design: `Join as a Trainer.html`.
 */
export default function TrainerPlatformPage({ page }) {
  return (
    <>
      <TrainerHero data={page.trainer_platform_hero} breadcrumbs={page.breadcrumbs?.items} />
      {/* The CMS names this component "Trainer Platform Benefits"; the
          snake_case name is read too, so renaming it there won't break it. */}
      <TrainerBenefits data={page.trainer_platform_benefits ?? page["Trainer Platform Benefits"]} />
      <TrainerReviews data={page.trainer_platform_reviews} />
      <TrainerDashboard data={page.trainer_dashboard} />
      <TrainerImpact data={page.trainer_platform_impact} />
      <TrainerSteps data={page.trainers_how_it_works} />
      <TrainerResources data={page.trainer_platform_resources} />
      <TrainerCta data={page.trainer_final_cta} />
    </>
  );
}
