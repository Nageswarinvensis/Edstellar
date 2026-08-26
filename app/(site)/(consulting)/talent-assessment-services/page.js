import Section from "@/components/ui/Section";
import RichHeading from "@/components/common/rich-heading";
import Reveal from "@/components/common/reveal";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Talent Assessment Services",
  description:
    "Measure capability before you invest in it — role-based assessments that show where the real skill gaps are.",
  path: "/talent-assessment-services",
});
function page() {
  return (
    <Section>
      <Reveal delay={1} className="flex justify-center items-center">
        <RichHeading
          as="h1"
          parts={[
            { text: "Talent Assessments main Page" },
            { text: " Page", highlighted: true },
          ]}
          emphasisClassName="color-ink"
          className="mb-2.5 text-center max-lg:text-[clamp(32px,5vw,50px)]"
        />
      </Reveal>
    </Section>
  );
}

export default page;
