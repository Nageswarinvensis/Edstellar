import { notFound } from "next/navigation";

import { getEnquiryPage } from "@/lib/content/company";
import { buildMetadata, stripSiteSuffix } from "@/lib/seo/metadata";
import SchemaOrg from "@/components/seo/schema-org";

import CompanyHero from "@/components/sections/company/company-hero";
import EnquiryIntro from "@/components/sections/company/enquiry-intro";
import EnquiryFallback from "@/components/sections/company/enquiry-fallback";
import EnquiryForm from "@/components/forms/enquiry-form";

export const revalidate = 300;

const PATH = "/enquiry-now";

export async function generateMetadata() {
  const page = await getEnquiryPage();
  if (!page) return {};
  const { seo } = page;

  return buildMetadata({
    title: stripSiteSuffix(seo?.meta_title),
    description: seo?.Meta_description,
    path: PATH,
    image: seo?.og_image_url,
  });
}

/**
 * Enquire Now — a landing page in the `(site)` shell (header + footer).
 * Everything comes from the CMS site page `enquiry-now`: its `seo`
 * component, and `enquiry_page` for the hero, the form's heading and button,
 * and the "talk to us directly" contacts. The form sits in the hero's right
 * column; a valid submit goes to `/thank-you/enquire`.
 *
 * Design: `Edstellar Static Pages/enquiry-form.html`.
 */
export default async function EnquiryNowPage() {
  const page = await getEnquiryPage();
  const enquiry = page?.enquiry_page;
  if (!enquiry) notFound();

  return (
    <>
      <SchemaOrg
        webpage={{
          name: stripSiteSuffix(page.seo?.meta_title),
          description: page.seo?.Meta_description,
          path: PATH,
        }}
        breadcrumbs={enquiry.breadcrumbs}
      />

      <CompanyHero
        heading={enquiry.heading}
        description={enquiry.description}
        breadcrumbs={enquiry.breadcrumbs}
        aside={
          <EnquiryForm
            data={{ heading: enquiry.form_heading, submit_label: enquiry.submit_label }}
            thankYou="enquire"
            className="scroll-mt-20 shadow-[0_18px_50px_rgba(5,13,26,0.28)]"
          />
        }
      >
        <EnquiryIntro points={enquiry.points} badges={enquiry.badges} />
      </CompanyHero>
      <EnquiryFallback
        data={{ heading: enquiry.fallback_heading, email: enquiry.email, phones: enquiry.phones }}
      />
    </>
  );
}
