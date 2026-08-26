import Section from "@/components/ui/Section";
import RichHeading from "@/components/common/rich-heading";
import Reveal from "@/components/common/reveal";
import { buildMetadata } from "@/lib/seo/metadata";
import { titleFromSlug } from "@/lib/slug";

export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const name = titleFromSlug(slug);

  return buildMetadata({
    title: `${name} | Articles`,
    description: `${name} — practical writing on capability building, instructor-led training and workforce skills`,
    path: `/resources/articles/${slug}`,
  });
}

export default async function ArticlesDetailPage({ params }) {
  const { slug } = await params;

  return (
    <Section>
      <Reveal className="flex items-center justify-center">
        <RichHeading
          as="h1"
          parts={[{ text: "Articles " }, { text: titleFromSlug(slug), is_italic: true }]}
          className="mb-2.5 text-center max-lg:text-[clamp(32px,5vw,50px)]"
        />
      </Reveal>
    </Section>
  );
}
