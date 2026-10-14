import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";

/**
 * Rail card — training catalog: navy card, image on top, lime button.
 */
export default function BlogDetailTrainingCatalogCta() {
  return (
    <Box className="rounded-2xl border border-navy bg-navy p-6 transition-[transform,box-shadow] duration-250 hover:-translate-y-1.25 hover:shadow-[0_22px_46px_-28px_rgba(10,22,40,0.5)]">
      <img
        src="https://cdn.prod.website-files.com/6482a3cf7db698c2a80cc5e6/68eccc1d6cc5db60ed84cf78_Frame%2010000036761%20(1).webp"
        alt="Edstellar training catalog"
        loading="lazy"
        className="mb-4 h-33 w-full rounded-xl object-cover"
      />

      <Text
        as="h3"
        className="mb-2.5 text-[17px] leading-[1.32] font-semibold tracking-[-0.02em] text-paper"
      >
        Explore High-impact instructor-led training for your{" "}
        <em className="font-serif font-normal text-lime">teams.</em>
      </Text>

      <a
        href="/corporate-training-catalog"
        title="Click Here to View Training Catalog"
        className="mt-1.5 inline-flex cursor-pointer items-center gap-2 rounded-full bg-lime px-6 py-3.25 text-[13px] font-semibold text-navy transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-12px_rgba(200,241,53,0.5)]"
      >
        View Training Catalog
      </a>
    </Box>
  );
}
