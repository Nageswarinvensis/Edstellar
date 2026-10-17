import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import Breadcrumbs from "@/components/common/breadcrumbs";

/** Navy listing hero — breadcrumb and heading in the left column, the lede
 * in the right, both top-aligned, closed by a lime rule.
 * Design: case-studies `.cs-hero`, `.cs-crumbs`, `.cs-hero-grid`. */
export default function ListingHero({ data, breadcrumbs }) {
  return (
    <Section className="relative overflow-hidden border-b-4 border-lime bg-navy">
      <Box
        aria-hidden="true"
        className="pointer-events-none absolute -top-55 -right-40 size-130 rounded-full bg-[radial-gradient(circle,rgba(200,241,53,0.18),transparent_70%)]"
      />
      <Box className="relative">
        <Box className="grid grid-cols-1 items-start gap-4 md:grid-cols-[1fr_1.2fr] md:gap-12">
          <Box>
            <Breadcrumbs items={breadcrumbs} tone="dark" className="mt-0 mb-6" />
            <Reveal>
              <RichHeading as="h1" heading={data.heading} className="text-paper" emphasisClassName="text-lime" />
            </Reveal>
          </Box>
          {data.description ? (
            <Reveal delay={1}>
              <Text as="p" className="text-[17px] leading-[1.7] text-paper/75">
                {data.description}
              </Text>
            </Reveal>
          ) : null}
        </Box>
      </Box>
    </Section>
  );
}
