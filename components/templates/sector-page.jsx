import SectorHero from "@/components/sections/sector/sector-hero";
import SectorProof from "@/components/sections/sector/sector-proof";
import Programs from "@/components/sections/sector/programs";
import SectorSpotlight from "@/components/sections/sector/sector-spotlight";
import Concept from "@/components/sections/talent_assessment_services/concept";
import EdgeCards from "@/components/sections/sector/edge-cards";
import SuccessStories from "@/components/sections/sector/success-stories";

/**
 * A sector landing page — Training for Government
 * (`/government-employees-training-courses`) and Training for Universities
 * (`/training-for-universities`) share this one design and differ only in
 * content (`content/sectors/*.json`, via `lib/content/sectors.js`).
 *
 * Hero, proof strip, programs grid (with the catalog pop-ups), the navy
 * customised-skilling band, the numbered "Partner and Grow" list (the
 * talent-assessment concept section, given the page's own rings diagram),
 * "The Edstellar Edge" cards and the success stories.
 *
 * Design: government-employees-training-courses.html /
 * training-for-universities.html.
 */
export default function SectorPage({ page }) {
  return (
    <>
      <SectorHero data={page.hero} breadcrumbs={page.breadcrumbs} />
      <SectorProof data={page.proof} />
      <Programs data={page.programs} />
      <SectorSpotlight data={page.tool_spotlight} />
      <Concept data={page.concept} />
      <EdgeCards data={page.why} />
      <SuccessStories data={page.success_stories} />
    </>
  );
}
