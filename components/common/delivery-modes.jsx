import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import SecCta from "@/components/common/sec-cta";
import DeliveryModeTabs from "@/components/sections/course/delivery-mode-tabs";
import { cn } from "@/lib/utils";

export default function DeliveryModes({
  deliveryModes,
  className,
  showSectionCta = true,
}) {
  if (!deliveryModes?.tabs?.length) return null;

  return (
    <Section
      id="delivery"
      className={cn(
        "scroll-mt-[calc(44px_+_var(--mobile-toc-h,0px))] lg:scroll-mt-[calc(4px_+_var(--mobile-toc-h,0px))] border-t border-ink/10",
        className,
      )}
    >
      <Reveal delay={1}>
        <RichHeading
          heading={deliveryModes.heading}
          className="mb-6.5 max-w-[24ch]"
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

      {showSectionCta ? <SecCta {...deliveryModes.section_cta} /> : null}
    </Section>
  );
}
