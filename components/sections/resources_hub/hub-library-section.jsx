import Section from "@/components/ui/Section";
import SectionHead, { SECTION_PADDING, SECTION_WIDTH } from "@/components/common/section-head";
import HubLibrary from "@/components/sections/resources_hub/hub-library";
import { cn } from "@/lib/utils";

const SECTION_ID = "learning-resources";

/**
 * "The full library" (`#learning-resources`, the hero's jump target): the
 * section head, server-rendered, around the interactive `HubLibrary`.
 *
 * Design: Learning_Development_Resources `#learning-resources`.
 */
export default function HubLibrarySection({ data }) {
  if (!data?.items?.length) return null;

  return (
    <Section id={SECTION_ID} className={cn("scroll-mt-16", SECTION_PADDING)} innerClassName={SECTION_WIDTH}>
      <SectionHead heading={data.heading} description={data.description} />
      <HubLibrary data={data} sectionId={SECTION_ID} />
    </Section>
  );
}
