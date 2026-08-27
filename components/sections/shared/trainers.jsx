import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import RichHeading from "@/components/common/rich-heading";
import Reveal from "@/components/common/reveal";
import TrainerCarousel from "@/components/sections/shared/trainer-carousel";

export default function Trainers({ trainers }) {
  if (!trainers?.people?.length) return null;

  return (
    <Section
      id="trainers"
      className="scroll-mt-[calc(44px_+_var(--mobile-toc-h,0px))] lg:scroll-mt-[calc(4px_+_var(--mobile-toc-h,0px))] border-t border-ink/10"
    >
      <Reveal delay={1}>
        <RichHeading
          as="h2"
          parts={trainers.heading.parts}
          className="mb-6.5 max-w-[20ch] tracking-[-0.03em]"
        />
      </Reveal>

      <Reveal delay={2}>
        <Text
          as="p"
          className="mb-5 max-w-[64ch] text-[clamp(15px,1.2vw,17px)] leading-[1.7] text-ink/60"
        >
          {trainers.description}
        </Text>
      </Reveal>

      <Reveal delay={2}>
        <TrainerCarousel people={trainers.people} />
      </Reveal>

      {trainers.note ? (
        <Reveal delay={3}>
          <Text
            as="p"
            className="mt-7 max-w-[76ch] text-[13px] leading-[1.65] text-ink/60"
          >
            {trainers.note}
          </Text>
        </Reveal>
      ) : null}
    </Section>
  );
}
