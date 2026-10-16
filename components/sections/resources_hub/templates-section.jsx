import Section from "@/components/ui/Section";
import SectionHead, { SECTION_PADDING, SECTION_WIDTH } from "@/components/common/section-head";
import TemplatesGrid from "@/components/sections/resources_hub/templates-grid";

/**
 * "Explore our curated L&D templates" — the section head around the
 * paginated `TemplatesGrid`.
 *
 * Design: Learning_Development_Templates `#templates`.
 */
export default function TemplatesSection({ data }) {
  if (!data?.items?.length) return null;

  return (
    <Section id="templates" className={SECTION_PADDING} innerClassName={SECTION_WIDTH}>
      <SectionHead heading={data.heading} description={data.description} className="max-w-225" />
      <TemplatesGrid data={data} />
    </Section>
  );
}
