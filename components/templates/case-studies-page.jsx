import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import CtaBand from "@/components/sections/consulting/cta-band";
import ListingHero from "@/components/sections/case_studies/listing-hero";
import CaseCard from "@/components/sections/case_studies/case-card";

/** `/case-studies` — hero, the case study cards, then the newsletter band.
 * The first card is featured (full width), matching the design. */
export default function CaseStudiesPage({ page, studies }) {
  return (
    <>
      <ListingHero data={page.hero} breadcrumbs={page.breadcrumbs} />

      <Section aria-label="Case Studies" className="bg-paper">
        <Box className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {studies.map((study, index) => (
            <CaseCard key={study.slug} study={study} featured={index === 0} />
          ))}
        </Box>
      </Section>

      <CtaBand data={page.cta} />
    </>
  );
}
