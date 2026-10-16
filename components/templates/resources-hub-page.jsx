import HubHero from "@/components/sections/resources_hub/hub-hero";
import HubAbout from "@/components/sections/resources_hub/hub-about";
import HubPicks from "@/components/sections/resources_hub/hub-picks";
import HubLibrarySection from "@/components/sections/resources_hub/hub-library-section";
import HubTestimonial from "@/components/sections/resources_hub/hub-testimonial";
import HubFaq from "@/components/sections/resources_hub/hub-faq";
import HubCta from "@/components/sections/resources_hub/hub-cta";
import HubDisclaimer from "@/components/sections/resources_hub/hub-disclaimer";

/**
 * Learning and Development Resources hub (`/learning-development-resources`).
 * Takes the page record from `getResourcesHub()` and lays out its sections
 * in the design's order.
 *
 * Design: `Learning_Development_Resources_Template.html`.
 */
export default function ResourcesHubPage({ page }) {
  return (
    <>
      <HubHero data={page.hero} types={page.library?.types} breadcrumbs={page.breadcrumbs} />
      <HubAbout data={page.about} />
      <HubPicks data={page.picks} />
      <HubLibrarySection data={page.library} />
      <HubTestimonial data={page.testimonial} />
      <HubFaq data={page.faqs} />
      <HubCta data={page.cta} />
      <HubDisclaimer data={page.disclaimer} />
    </>
  );
}
