import Section from "@/components/ui/Section";
import RichHeading from "@/components/common/rich-heading";
import Reveal from "@/components/common/reveal";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Corporate Training Prices and Packages",
  description:
    "Edstellar offers customized corporate training packages to organizations to meet their upskilling needs. Find out corporate training pricing and the capabilities of Edstellar.",
  path: "/corporate-training-pricing",
});
function page() {
  return (
    <Section>
      <Reveal delay={1} className="flex justify-center items-center">
        <RichHeading
          as="h1"
          heading="Corporate Training <span>Pricing</span>"
          emphasisClassName="font-normal text-olive"
          className="mb-2.5 text-center max-lg:text-[clamp(32px,5vw,50px)]"
        />
      </Reveal>
    </Section>
  );
}

export default page;
