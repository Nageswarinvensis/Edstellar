import Image from "next/image";

import Box from "@/components/ui/Box";
import ConsultingHero from "@/components/sections/consulting/consulting-hero";

/**
 * Splits a `<span>`-marked heading into text and serif-italic `<em>` nodes —
 * what `RichHeading` does, but as children, because `ConsultingHero` renders
 * its own `<h1>` around `title`. Light background, so the accent keeps the
 * heading colour.
 */
function headingNodes(heading) {
  return heading.split(/(<span>[\s\S]*?<\/span>)/g).map((fragment, index) => {
    const match = fragment.match(/^<span>([\s\S]*?)<\/span>$/);
    return match ? (
      <em key={index} className="font-serif font-normal italic">
        {match[1]}
      </em>
    ) : (
      fragment
    );
  });
}

/**
 * The sector pages' hero: breadcrumbs, the h1, lede and two buttons on the
 * left, the page's photo in a white card on the right. Composes the
 * consulting hero (same layout family) and hands it the photo as its right
 * panel.
 *
 * `data`: `heading` (emphasis in `<span>`), `description`, `primary_cta` /
 * `secondary_cta` `{ label, href }`, `image` `{ src, alt, width, height }`.
 * The breadcrumbs sit at the top of the copy column, as on the other heroes,
 * rather than under the grid as in the design.
 *
 * Design: government-employees-training-courses / training-for-universities
 * `[data-cmp="hero"]` `.hero-grid`, `.hero-photo`, `.hero-crumbs`.
 */
export default function SectorHero({ data, breadcrumbs }) {
  if (!data?.heading) return null;

  const { heading, description, primary_cta, secondary_cta, image } = data;

  return (
    <ConsultingHero
      className="py-10 lg:py-20"
      breadcrumbItems={breadcrumbs}
      data={{
        title: headingNodes(heading),
        description,
        primaryBtnText: primary_cta?.label,
        primaryBtnHref: primary_cta?.href,
        secondaryBtnText: secondary_cta?.label,
        secondaryBtnHref: secondary_cta?.href,
      }}
      rightSideComponent={
        image?.src ? (
          <Box className="overflow-hidden rounded-[14px] border border-ink/12 bg-white p-3 shadow-lift">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              priority
              sizes="(max-width: 900px) 100vw, 560px"
              className="block h-auto w-full rounded-[10px]"
            />
          </Box>
        ) : null
      }
    />
  );
}
