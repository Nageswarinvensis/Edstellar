import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import SectionHead from "@/components/common/section-head";
import PartnerForm from "@/components/forms/partner-form";
import PillTabs from "./pill-tabs";

/**
 * The dark application section: the heading and lede, a Businesses /
 * Individuals switch, and the matching `PartnerForm` under it.
 *
 * Design: partner-program.html `[data-cmp="contact-form"]` `.head.center`,
 * `.ptabs`, `.lead`, `.pform[data-ppanel]`.
 */
export default function PartnerContact({ data, thankYou }) {
  if (!data) return null;

  const tabs = data.tabs ?? [];

  return (
    <Section id={data.section_id} className="bg-navy">
      <SectionHead heading={data.heading} description={data.description} dark />

      <Reveal delay={1} className="mx-auto max-w-295">
        <PillTabs tabs={tabs} idPrefix="partner-apply" label="Apply as" dark>
          {tabs.map((tab) => (
            <PartnerForm
              key={tab.id}
              id={`partner-${tab.id}`}
              audience={tab.id}
              partnershipTypes={data.partnership_types}
              targetSegments={data.target_segments}
              submitLabel={data.submit_label}
              thankYou={thankYou}
            />
          ))}
        </PillTabs>
      </Reveal>
    </Section>
  );
}
