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
 * Takes the CMS page from `getResourcesHub()` (component slugs verbatim) and
 * lays out its sections in the design's order.
 *
 * Design: `Learning_Development_Resources_Template.html`.
 */
export default function ResourcesHubPage({ page }) {
  return (
    <>
      <HubHero
        data={page.resources_hero}
        types={page.resources_library?.types}
        breadcrumbs={page.breadcrumbs?.items}
      />
      <HubAbout data={page.resources_about} />
      <HubPicks data={page.resources_picks} />
      <HubLibrarySection data={page.resources_library} />
      <HubTestimonial data={page["resources-testimonial"]} />
      <HubFaq data={page.faqs} />
      <HubCta data={page.resources_cta} />
      <HubDisclaimer data={page.resources_disclaimer} />
    </>
  );
}
