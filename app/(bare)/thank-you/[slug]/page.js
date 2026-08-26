import Section from "@/components/ui/Section";
import RichHeading from "@/components/common/rich-heading";
import Reveal from "@/components/common/reveal";
import { buildMetadata } from "@/lib/seo/metadata";
import { titleFromSlug } from "@/lib/slug";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const name = titleFromSlug(slug);

  return buildMetadata({
    title: `{name} | Thank You`,
    description: `Your enquiry has reached our team.`,
    path: `/thank-you/${slug}`,
    noIndex: true,
  });
}
function page() {
  return (
    <Section>
      <Reveal delay={1} className="flex justify-center items-center">
        <RichHeading
          as="h1"
          parts={[
            { text: "Thank you Dynamic" },
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
