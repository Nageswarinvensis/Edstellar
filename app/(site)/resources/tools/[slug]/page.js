import Section from "@/components/ui/Section";
import RichHeading from "@/components/common/rich-heading";
import Reveal from "@/components/common/reveal";
import { buildMetadata } from "@/lib/seo/metadata";
import { titleFromSlug } from "@/lib/slug";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const name = titleFromSlug(slug);

  return buildMetadata({
    title: `{name} | Tools`,
    description: `${name} — a practical tool for learning and development teams.`,
    path: `/resources/tools/${slug}`,
  });
}

export default async function ToolDetailPage({ params }) {
  const { slug } = await params;

  return (
    <Section>
      <Reveal delay={1} className="flex justify-center items-center">
        <RichHeading
          as="h1"
          parts={[{ text: "Tool " }, { text: `${slug} `, highlighted: true }]}
          emphasisClassName="color-ink"
          className="mb-2.5 text-center max-lg:text-[clamp(32px,5vw,50px)]"
        />
      </Reveal>
    </Section>
  );
}
