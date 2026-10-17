import Section from "@/components/ui/Section";
import SectionHead from "@/components/common/section-head";
import FaqDetails from "@/components/common/faq-details";
import PillTabs from "./pill-tabs";

/**
 * The FAQ in two groups — Commission and Payouts, Partnership and Support —
 * switched by a pill tab; each group is the shared numbered `<details>` list.
 * Both groups are in the server HTML.
 *
 * Design: partner-program.html `[data-cmp="faq"]` `.head.center`, `.ptabs`,
 * `.faq[data-ppanel]`, `details`, `.ans`.
 */
export default function PartnerFaq({ data }) {
  const groups = data?.groups?.filter((group) => group.items?.length) ?? [];
  if (!groups.length) return null;

  return (
    <Section id={data.section_id} className="border-t border-ink/12 bg-paper">
      <SectionHead heading={data.heading} />

      <PillTabs
        tabs={groups.map((group) => ({ id: group.id, label: group.label }))}
        idPrefix="partner-faq"
        label="Question topics"
      >
        {groups.map((group) => (
          <FaqDetails key={group.id} items={group.items} className="mx-auto max-w-230" />
        ))}
      </PillTabs>
    </Section>
  );
}
