import { notFound } from "next/navigation";

import { getContactPage } from "@/lib/content/company";
import { buildMetadata, stripSiteSuffix } from "@/lib/seo/metadata";
import SchemaOrg from "@/components/seo/schema-org";

import CompanyHero from "@/components/sections/company/company-hero";
import ContactReach from "@/components/sections/company/contact-reach";

export const revalidate = 300;

const PATH = "/contact-us";

/** The CMS sends the hero image without alt text. */
const HERO_IMAGE_ALT = "Two colleagues collaborating at a desk";

export async function generateMetadata() {
  const page = await getContactPage();
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
 * Contact Us — everything comes from the CMS site page `contact-us`: its
 * `seo` component, and `contact_page` for the hero, the phone lines and
 * offices, and the enquiry form's heading and button. A valid submit goes
 * to `/thank-you/contact-us`.
 *
 * Design: `Edstellar Static Pages/contact-us.html`.
 */
export default async function ContactUsPage() {
  const page = await getContactPage();
  const contact = page?.contact_page;
  if (!contact) notFound();

  return (
    <>
      <SchemaOrg
        webpage={{
          name: stripSiteSuffix(page.seo?.meta_title),
          description: page.seo?.Meta_description,
          path: PATH,
        }}
        breadcrumbs={contact.breadcrumbs}
      />

      <CompanyHero
        heading={contact.heading}
        description={contact.description}
        breadcrumbs={contact.breadcrumbs}
        image={contact.image?.src ? { alt: HERO_IMAGE_ALT, ...contact.image } : null}
      >
        <a
          href={`mailto:${contact.email}`}
          title="Click Here to Email Edstellar"
          className="border-b-2 border-transparent font-display text-[clamp(20px,2.4vw,28px)] font-semibold text-lime transition-colors hover:border-lime"
        >
          {contact.email}
        </a>
      </CompanyHero>
      <ContactReach
        data={{
          heading: contact.reach_heading,
          description: contact.reach_description,
          phones: contact.phones,
          offices: contact.offices,
        }}
        form={{ heading: contact.form_heading, submit_label: contact.submit_label }}
      />
    </>
  );
}
