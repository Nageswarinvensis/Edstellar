import { getEnquiryPage } from "@/lib/content/company";
import { buildMetadata } from "@/lib/seo/metadata";
import SchemaOrg from "@/components/seo/schema-org";

import CompanyHero from "@/components/sections/company/company-hero";
import EnquiryIntro from "@/components/sections/company/enquiry-intro";
import EnquiryFallback from "@/components/sections/company/enquiry-fallback";
import EnquiryForm from "@/components/forms/enquiry-form";

export function generateMetadata() {
  const { seo } = getEnquiryPage();
  return buildMetadata(seo);
}

/**
 * Enquire Now — a standalone landing page (the `(bare)` shell: no header or
 * footer) built from local JSON (`content/company/enquiry-now.json`, via
 * `lib/content/company.js`). The form sits in the hero's right column.
 *
 * Design: `Edstellar Static Pages/enquiry-form.html`.
 */
export default function EnquiryNowPage() {
  const page = getEnquiryPage();
  const { hero } = page;

  return (
    <>
      <SchemaOrg
        webpage={{
          name: page.seo.title,
          description: page.seo.description,
          path: page.seo.path,
        }}
        breadcrumbs={hero.breadcrumbs}
      />

      <CompanyHero
        heading={hero.heading}
        description={hero.description}
        breadcrumbs={hero.breadcrumbs}
        aside={
          <EnquiryForm
            data={page.form}
            thankYou="enquire"
            className="scroll-mt-20 shadow-[0_18px_50px_rgba(5,13,26,0.28)]"
          />
        }
      >
        <EnquiryIntro points={hero.points} badges={hero.badges} />
      </CompanyHero>
      <EnquiryFallback data={page.fallback} />
    </>
  );
}
