import Section from "@/components/ui/Section";
import Reveal from "@/components/shared/reveal";
import RichHeading from "@/components/shared/rich-heading";

export default async function CategoryPage({ params }) {
  const { category } = await params;

  return (
    <Section>
      <Reveal delay={1} className="flex justify-center items-center">
        <RichHeading
          as="h1"
          parts={[
            { text: `${category} ` },
            { text: "Training Page", highlighted: true },
          ]}
          emphasisClassName="color-ink"
          className="mb-2.5 text-center max-lg:text-[clamp(32px,5vw,50px)]"
        />
      </Reveal>
    </Section>
  );
}
