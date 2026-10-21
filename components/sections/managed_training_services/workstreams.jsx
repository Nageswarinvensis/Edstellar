import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import WorkstreamTabs from "@/components/sections/managed_training_services/workstream-tabs";

/**
 * "Edstellar managed training services, in five workstreams" — a console of
 * tabs (one per workstream) and the selected workstream's panel: summary,
 * tag, four numbered activities and the "You get" deliverables. The heading
 * renders on the server; only the tab switching is client-side.
 *
 * Design: managed-training-services `#services`, `.cn`, `.cn-tab`, `.cn-panel`.
 */
export default function Workstreams({ data }) {
  if (!data?.items?.length) return null;

  const { section_id, heading, description, tabs_label, get_label, items } = data;

  return (
    <Section id={section_id} className="bg-paper">
      <Box className="mb-12 max-w-[760px]">
        <Reveal>
          <RichHeading heading={heading} emphasisClassName="font-normal" />
        </Reveal>
        {description ? (
          <Reveal delay={1}>
            <Text
              as="p"
              className="mt-4 max-w-[64ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink-muted"
            >
              {description}
            </Text>
          </Reveal>
        ) : null}
      </Box>

      <Reveal delay={1}>
        <WorkstreamTabs items={items} tabsLabel={tabs_label} getLabel={get_label} />
      </Reveal>
    </Section>
  );
}
