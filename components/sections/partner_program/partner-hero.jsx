import Image from "next/image";

import Box from "@/components/ui/Box";
import ConsultingHero from "@/components/sections/consulting/consulting-hero";

/** The hero's right-hand panel: the partner illustration in a white card. */
function HeroPhoto({ image }) {
  if (!image?.src) return null;

  return (
    <Box
      as="aside"
      aria-label={image.alt}
      className="overflow-hidden rounded-[14px] border border-ink/12 bg-white p-3 shadow-lift"
    >
      <Image
        src={image.src}
        alt={image.alt || "Edstellar partner program"}
        width={image.width}
        height={image.height}
        priority
        sizes="(max-width: 900px) 100vw, 560px"
        className="block h-auto w-full rounded-[10px]"
      />
    </Box>
  );
}

/**
 * The Partner Program hero: the consulting hero (breadcrumbs, h1, lede and
 * the "Join as a Partner" button) with the partner illustration as its
 * right-hand panel.
 *
 * Design: partner-program.html `[data-cmp="hero"]` `.hero-grid`,
 * `.ld-model.hero-photo`, `.hero-crumbs`.
 */
export default function PartnerHero({ data, breadcrumbs }) {
  if (!data) return null;

  return (
    <ConsultingHero
      className="py-10 lg:py-20"
      data={data}
      breadcrumbItems={breadcrumbs}
      rightSideComponent={<HeroPhoto image={data.image} />}
    />
  );
}
