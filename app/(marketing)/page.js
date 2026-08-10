import Link from "next/link";

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

/**
 * Placeholder home page. Exists so the two course templates are reachable while
 * the real marketing home page is designed.
 */
export default async function HomePage() {
  const [domainSlugs, vendorSlugs] = await Promise.all([
    getDomainCourseSlugs(),
    getVendorCourseSlugs(),
  ]);

  return (
    <Box className="container flex min-h-svh flex-col justify-center gap-10 py-20">
      <Box className="flex flex-col gap-3">
        <Text as="h1">Edstellar</Text>
        <Text as="p" className="max-w-[60ch]">
          Next.js App Router · JavaScript · Tailwind CSS v4. The two course page
          templates below are built from the approved designs against static
          content.
        </Text>
      </Box>

      <Box className="flex flex-col gap-2">
        <Text
          as="span"
          className="font-mono text-[11px] tracking-[0.24em] uppercase"
        >
          Domain hub
        </Text>

        {domainSlugs.map((slug) => (
          <CtaButton
            key={slug}
            variant="ghost"
            className="self-start"
            render={<Link href={`/corporate-training/${slug}`} />}
          >
            /corporate-training/{slug}
          </CtaButton>
        ))}
      </Box>

      <Box className="flex flex-col gap-2">
        <Text
          as="span"
          className="font-mono text-[11px] tracking-[0.24em] uppercase"
        >
          Vendor course
        </Text>

        {vendorSlugs.map((slug) => (
          <CtaButton
            key={slug}
            className="self-start"
            render={<Link href={`/corporate-training/${slug}`} />}
          >
            /corporate-training/{slug}
          </CtaButton>
        ))}
      </Box>
    </Box>
  );
}
