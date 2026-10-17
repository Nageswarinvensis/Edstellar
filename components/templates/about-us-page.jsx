import SectionNav from "@/components/common/section-nav";
import RetreatForm from "@/components/forms/retreat-form";
import {
  AboutClients,
  AboutExperts,
  AboutFaqs,
  AboutGlance,
  AboutHero,
  AboutMethod,
  AboutPurpose,
  AboutReach,
  AboutShift,
  AboutSolve,
  AboutStory,
  AboutTools,
  AboutValues,
} from "@/components/sections/about/about-sections";

/** `/about-us` — top to bottom as in the design, ending with the shared
 * navy lead form (heading beside the form). */
export default function AboutUsPage({ page }) {
  return (
    <>
      <AboutHero data={page.hero} breadcrumbs={page.breadcrumbs} />
      <SectionNav data={page.section_nav} />
      <AboutStory data={page.story} />
      <AboutValues data={page.values} />
      <AboutPurpose data={page.purpose} />
      <AboutGlance data={page.glance} />
      <AboutReach data={page.reach} />
      <AboutSolve data={page.solve} />
      <AboutMethod data={page.method} />
      <AboutTools data={page.tools} />
      <AboutExperts data={page.experts} />
      <AboutClients data={page.clients} />
      <AboutShift data={page.shift} />
      <AboutFaqs faqs={page.faqs} cta={page.cta} />
      <RetreatForm data={page.form} accent="lime" split />
    </>
  );
}
