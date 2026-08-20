import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import RichHeading from "@/components/shared/rich-heading";
import Reveal from "@/components/shared/reveal";
import SecCta from "@/components/shared/sec-cta";
import DeliveryModeTabs from "@/components/sections/course/delivery-mode-tabs";

export default function DeliveryModes({ deliveryModes }) {
  if (!deliveryModes?.tabs?.length) return null;

  return (
    <Section id="delivery" className="border-t border-ink/10">
      <Reveal delay={1}>
        <RichHeading
          as="h2"
          parts={deliveryModes.heading.parts}
          className="mb-6.5 max-w-24ch tracking-[-0.03em]"
        />
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

      <SecCta {...deliveryModes.sectionCta} />
    </Section>
  );
}
