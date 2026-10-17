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
/**
 * The hero's "In the library" numbers, counted from the library's actual
 * cards rather than the CMS's typed `total` and `types[].count`, which drift
 * (it said 539 with 537 cards, and 94 eBooks with 92). Item types are matched
 * to the type keys the same way `HubLibrary` does ("videos" → "video"), so
 * the hero and the filter pills always show the same numbers.
 */
function withLiveCounts(hero, library) {
  if (!hero || !library?.items) return { hero, types: library?.types };
  const keys = new Set((library.types ?? []).map((type) => type.key));
  const keyOf = (type = "") => (keys.has(type) ? type : type.replace(/s$/, ""));
  const counts = {};
  for (const item of library.items) counts[keyOf(item.type)] = (counts[keyOf(item.type)] ?? 0) + 1;

  return {
    hero: { ...hero, library: { ...hero.library, total: library.items.length.toLocaleString("en-US") } },
    types: (library.types ?? [])
      .map((type) => ({ ...type, count: type.key === "all" ? library.items.length : (counts[type.key] ?? 0) }))
      .filter((type) => type.key === "all" || type.count > 0),
  };
}

export default function ResourcesHubPage({ page }) {
  const { hero, types } = withLiveCounts(page.resources_hero, page.resources_library);

  return (
    <>
      <HubHero data={hero} types={types} breadcrumbs={page.breadcrumbs?.items} />
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
