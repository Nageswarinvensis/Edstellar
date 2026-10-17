import TemplatesHero from "@/components/sections/resources_hub/templates-hero";
import TemplatesSection from "@/components/sections/resources_hub/templates-section";
import HubCta from "@/components/sections/resources_hub/hub-cta";

/**
 * Free L&D Tools and Templates (`/learning-development-templates`). Takes
 * the CMS page from `getTemplatesPage()` (component slugs verbatim) and lays
 * out its sections in the design's order. Shares the resource hub's card, pager and closing CTA
 * (`components/sections/resources_hub/`, the L&D resources page family).
 *
 * Design: `Learning_Development_Templates_Template.html`.
 */
export default function TemplatesHubPage({ page }) {
  return (
    <>
      <TemplatesHero data={page.template_hero} breadcrumbs={page.breadcrumbs?.items} />
      <TemplatesSection data={page.templates} />
      <HubCta data={page.template_cta} />
    </>
  );
}
