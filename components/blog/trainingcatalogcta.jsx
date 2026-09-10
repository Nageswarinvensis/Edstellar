import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";

export default function TrainingCatalogCTA() {
  return (
    <Box
      className="flex flex-col items-start justify-end rounded-[10px] bg-cover bg-center px-5 pb-6 pt-55"
      style={{
        backgroundImage:
          "url('https://cdn.prod.website-files.com/6482a3cf7db698c2a80cc5e6/68eccc1d6cc5db60ed84cf78_Frame%2010000036761%20(1).webp')",
      }}
    >
      <Text as="h3" className="text-2xl font-bold leading-tight text-white">
        Explore High-impact instructor-led training for your teams.
      </Text>

      <a
        href="/corporate-training-catalog"
        className="mt-5 inline-flex rounded-md bg-white px-5 py-3 text-sm font-semibold text-[#1557ff]"
      >
        View Training Catalog
      </a>
    </Box>
  );
}