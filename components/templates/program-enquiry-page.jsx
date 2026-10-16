import SchemaOrg from "@/components/seo/schema-org";
import CompanyHero from "@/components/sections/company/company-hero";
import EnquiryFallback from "@/components/sections/company/enquiry-fallback";
import EnquiryForm from "@/components/forms/enquiry-form";

/**
 * A program enquiry page — the form that a sector's program links point to
 * with `?{queryParam}={program-slug}` (`/training-for-universities-enquiry`,
 * `/training-for-government-enquiry`). The form copies that parameter into
 * its hidden `program` field on the client, so one static page serves every
 * program. Navy hero with the form on the right, then the "Reach Us" strip.
 *
 * `page`: `seo`, `breadcrumbs`, `hero` (`heading`, `description`), `form`,
 * `reach`. A valid submit goes to `/thank-you/enquire`.
 *
 * Design: edstellar.com/training-for-universities-enquiry, in the
 * `/enquiry-now` layout.
 */
export default function ProgramEnquiryPage({ page, queryParam }) {
  return (
    <>
      <SchemaOrg
        webpage={{
          name: page.seo.title,
          description: page.seo.description,
          path: page.seo.path,
        }}
        breadcrumbs={page.breadcrumbs}
      />

      <CompanyHero
        heading={page.hero.heading}
        description={page.hero.description}
        breadcrumbs={page.breadcrumbs}
        aside={
          <EnquiryForm
            data={page.form}
            thankYou="enquire"
            queryParam={queryParam}
            className="scroll-mt-20 shadow-[0_18px_50px_rgba(5,13,26,0.28)]"
          />
        }
      />
      <EnquiryFallback data={page.reach} />
    </>
  );
}
