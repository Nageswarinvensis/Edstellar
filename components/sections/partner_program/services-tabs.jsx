import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import SectionHead from "@/components/common/section-head";
import ServicesTablist from "./services-tablist";
import { decodeEntities } from "@/lib/decode-entities";

/**
 * Partnership models by partner type: a vertical tab per type on the left,
 * its image and description in a sticky panel on the right. The tab
 * behaviour is the `ServicesTablist` client leaf.
 *
 * Design: partner-program.html `[data-cmp="services-tabs"]` `.head`, `.sx`.
 */
export default function ServicesTabs({ data }) {
  if (!data?.items?.length) return null;

  // The tablist's accessible name is the heading without its accent markup.
  const label = decodeEntities(data.heading.replace(/<\/?span>/g, ""));

  return (
    <Section id={data.section_id} className="border-t border-ink/12 bg-paper">
      <SectionHead heading={data.heading} align="start" />
      <Reveal>
        <ServicesTablist items={data.items} label={label} />
      </Reveal>
    </Section>
  );
}
