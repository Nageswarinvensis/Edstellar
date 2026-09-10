import Link from "next/link";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";

export default function TrainingCatalogCTA() {
  return (
    <Box
      className="flex flex-col items-start justify-start rounded-[10px] bg-[#1B40A9] px-5 py-6 lg:justify-end lg:bg-[url('https://cdn.prod.website-files.com/6482a3cf7db698c2a80cc5e6/68eccc1d6cc5db60ed84cf78_Frame%2010000036761%20(1).webp')] lg:bg-cover lg:bg-center lg:pt-55 lg:pb-6"
    >
      <Text as="h3" className="text-2xl font-bold leading-tight text-white">
        Explore High-impact instructor-led training for your teams.
      </Text>

      <Link
        href="/corporate-training-catalog"
        className="mt-5 inline-flex rounded-md bg-white px-5 py-3 text-sm font-semibold text-[#1557ff]"
      >
        View Training Catalog
      </Link>
    </Box>
  );
}