import Link from "next/link";
import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import CtaButton from "@/components/ui/CtaButton";
import { buildMetadata } from "@/lib/seo/metadata";
import {
  getDomainCourseSlugs,
  getVendorCourseSlugs,
} from "@/lib/content/courses";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Corporate Training and Consulting",
  path: "/",
});

export default async function HomePage() {
  const [domainSlugs, vendorSlugs] = await Promise.all([
    getDomainCourseSlugs(),
    getVendorCourseSlugs(),
  ]);

  return (
    <Section>
      <Box className="flex flex-col gap-4">
        <Text as="h1">Edstellar</Text>
        <Text as="p" className="max-w-[60ch] mb-4">
          The Best Corporate Training Experiences are Instructor-led
        </Text>
      </Box>
      <Box className="flex flex-col gap-4">
        <Text
          as="span"
          className="font-mono text-[11px] tracking-[0.24em] uppercase"
        >
          Corporate Page{" "}
        </Text>

        {domainSlugs.map((slug) => (
          <CtaButton
            key={slug}
            variant="ghost"
            className="self-start mb-4"
            render={<Link href={`/corporate-training`} />}
          >
            /corporate-training
          </CtaButton>
        ))}
      </Box>
      <Box className="flex flex-col gap-4">
        <Text
          as="span"
          className="font-mono text-[11px] tracking-[0.24em] uppercase"
        >
          Category Page{" "}
        </Text>

        {domainSlugs.map((slug) => (
          <CtaButton
            key={slug}
            variant="ghost"
            className="self-start mb-4"
            render={<Link href={`/corporate-training/${slug}`} />}
          >
            /corporate-training/{slug}
          </CtaButton>
        ))}
      </Box>

      <Box className="flex flex-col gap-4">
        <Text
          as="span"
          className="font-mono text-[11px] tracking-[0.24em] uppercase"
        >
          Course Page{" "}
        </Text>

        {vendorSlugs.map((slug) => (
          <CtaButton
            key={slug}
            className="self-start"
            render={
              <Link
                href={`/corporate-training/artificial-intelligence/${slug}`}
              />
            }
          >
            /corporate-training/artificial-intelligence/{slug}
          </CtaButton>
        ))}
      </Box>
    </Section>
  );
}
