import SectionNav from "@/components/common/section-nav";
import RetreatForm from "@/components/forms/retreat-form";
import { getHomePage } from "@/lib/content/home";
import {
  AboutClients,
  AboutExperts,
  AboutFaqs,
  AboutGlance,
  AboutHero,
  AboutJourney,
  AboutMethod,
  AboutPurpose,
  AboutReach,
  AboutShift,
  AboutSolve,
  AboutStory,
  AboutTools,
  AboutValues,
  AboutTrust,
  AboutWhatWeDo,
  AboutWork,
} from "@/components/sections/about/about-sections";

/** `/about-us` — top to bottom as in the design, ending with the shared
 * navy lead form (heading beside the form). */
export default function AboutUsPage({ page }) {
  const home = getHomePage();
  return (
    <>
      <AboutHero data={page.hero} breadcrumbs={page.breadcrumbs} />
      <SectionNav data={page.section_nav} />
      <AboutStory data={page.story} />
      <AboutValues data={page.values} />
      <AboutPurpose data={page.purpose} />
      <AboutWhatWeDo data={page.what_we_do} />
      <AboutGlance data={page.glance} />
      <AboutJourney data={page.journey} />
      <AboutReach data={page.reach} />
      <AboutSolve data={page.solve} />
      <AboutClients data={page.clients} homeClients={home.clients} reach={page.reach} />
      <AboutMethod data={page.method} />
      <AboutTools data={page.tools} />
      <AboutExperts data={page.experts} />
      <AboutTrust data={page.trust} />
      <AboutShift data={page.shift} />
      <AboutWork data={page.work_with_us} />
      <AboutFaqs faqs={page.faqs} cta={page.cta} />
      <RetreatForm data={page.form} accent="lime" split thankYou="about-us" />
    </>
  );
}
