import Section from "@/components/ui/Section";
import Text from "@/components/ui/Text";
import RichHeading from "@/components/common/rich-heading";
import Reveal from "@/components/common/reveal";
import { buildMetadata } from "@/lib/seo/metadata";
import { getResourceSlugs } from "@/lib/content/resources";

/**
 * `/resources/case-studies` — listing for one resource type.
 *
 * Each type owns its own route and its own design (TASTE.md §1.1), so there is
 * no shared template to branch inside. Content reads go through
 * `lib/content/resources.js`, which returns empty until this type is modeled.
 */

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Case Studies",
  description:
    "How organizations built capability in-house — what they scoped, what they ran, what changed.",
  path: "/resources/case-studies",
});

export default async function CaseStudiesListingPage() {
  const slugs = await getResourceSlugs("case-studies");

  return (
    <Section>
      <Reveal>
        <RichHeading
          as="h1"
          parts={[{ text: "Case" }, { text: " Studies", is_italic: true }]}
          className="mb-4 max-lg:text-[clamp(32px,5vw,50px)]"
        />
      </Reveal>

      <Reveal delay={1}>
        <Text as="p" className="max-w-[64ch] text-ink/60">
          How organizations built capability in-house — what they scoped, what they ran, what changed.
        </Text>
      </Reveal>

      {slugs.length === 0 ? (
        <Text as="p" className="mt-10 font-mono text-[12px] uppercase tracking-[0.16em] text-ink/40">
          No case-studies published yet
        </Text>
      ) : null}
    </Section>
  );
}
