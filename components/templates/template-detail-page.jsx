import EnquiryFallback from "@/components/sections/company/enquiry-fallback";
import { TemplateArticle, TemplateHero } from "@/components/sections/template_detail/template-sections";

/** `/templates/{slug}` — an L&D template or free tool: navy hero
 * with "Access Tool", the article beside a sticky promo, then the shared
 * "Reach Us" strip. */
export default function TemplateDetailPage({ template, breadcrumbs }) {
  return (
    <>
      <TemplateHero template={template} breadcrumbs={breadcrumbs} />
      <TemplateArticle template={template} />
      <EnquiryFallback data={template.reach} />
    </>
  );
}
