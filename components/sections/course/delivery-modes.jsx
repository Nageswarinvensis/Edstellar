import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import SecCta from "@/components/common/sec-cta";
import DeliveryModeTabs from "@/components/sections/course/delivery-mode-tabs";

const SECTION_CTA = {
  title: "Need a training format that works for your team?",
  description:
    "Full days, half days across weeks, or split by module. Tell us the delivery window and we schedule the cohort around it.",
  cta: { label: "Plan Your Training", href: "#apply" },
};

export default function DeliveryModes({ deliveryModes }) {
  if (!deliveryModes?.tabs?.length) return null;

  return (
    <Section
      id="delivery"
      className="scroll-mt-[calc(44px_+_var(--mobile-toc-h,0px))] lg:scroll-mt-[calc(4px_+_var(--mobile-toc-h,0px))] border-t border-ink/10"
    >
      <Reveal delay={1}>
        <Text as="h2" className="mb-6.5 max-w-[24ch] tracking-[-0.03em]">
          {deliveryModes.heading?.parts
            ? deliveryModes.heading.parts.map((p, i) =>
                (p.is_italic || p.em) ? <em key={i} className="font-serif font-normal italic">{p.text}</em> : p.text
              )
            : (typeof deliveryModes.heading === "string" ? deliveryModes.heading : "").split(/(<span>[\s\S]*?<\/span>)/g).map((fragment, i) => {
                const match = fragment.match(/^<span>([\s\S]*?)<\/span>$/);
                return match ? <em key={i} className="font-serif font-normal italic">{match[1]}</em> : fragment;
              })
          }
        </Text>
      </Reveal>

      <Reveal delay={2}>
        <Text
          as="p"
          className="mb-15 max-w-[64ch] text-[16.5px] leading-[1.7] text-ink/60"
        >
          {deliveryModes.description}
        </Text>
      </Reveal>

      <Reveal delay={2}>
        <DeliveryModeTabs tabs={deliveryModes.tabs} />
      </Reveal>

      <SecCta {...SECTION_CTA} />
    </Section>
  );
}
