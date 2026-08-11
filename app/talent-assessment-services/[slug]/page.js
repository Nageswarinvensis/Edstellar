import Section from "@/components/ui/Section";
import RichHeading from "@/components/shared/rich-heading";
import Reveal from "@/components/shared/reveal";

export default async function TalentAssessmentDetailPage({ params }) {
  const { slug } = await params;

  return (
    <Section>
      <Reveal delay={1} className="flex justify-center items-center">
        <RichHeading
          as="h1"
          parts={[
            { text: "Talent Assessment " },
            { text: `${slug} `, highlighted: true },
          ]}
          emphasisClassName="color-ink"
          className="mb-2.5 text-center max-lg:text-[clamp(32px,5vw,50px)]"
        />
      </Reveal>
    </Section>
  );
}
