import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { ctaButtonVariants } from "@/components/common/cta-button";
import { cn } from "@/lib/utils";

/** One case study on the listing — the whole card is the link. `featured`
 * spans the grid as an image-left, copy-right row; otherwise it stacks.
 * Design: case-studies `.case`, `.case.featured`, `.case-stats`. */
export default function CaseCard({ study, featured = false }) {
  const { slug, title, industry, card } = study;

  return (
    <Link
      href={`/case-study/${slug}`}
     
      className={cn(
        "group flex flex-col overflow-hidden border border-ink/12 bg-white no-underline transition-[transform,box-shadow] duration-250 hover:-translate-y-1 hover:shadow-[0_22px_46px_-28px_rgba(10,22,40,0.5)] motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        featured ? "col-span-full rounded-[22px] lg:grid lg:grid-cols-[1fr_1.15fr]" : "rounded-[14px]",
      )}
    >
      <Box
        className={cn(
          "relative overflow-hidden bg-navy",
          // Featured: the photo sits in flow at its natural shape, so it sets
          // the row's height and is never cropped (its client logo is in a
          // corner). A soft navy fade on the right edge meets the copy.
          featured
            ? "min-h-60 lg:min-h-105 after:pointer-events-none after:absolute after:inset-0 after:bg-[linear-gradient(90deg,transparent_60%,rgba(10,22,40,0.25))] after:content-['']"
            : "aspect-[4/3]",
        )}
      >
        <img
          src={card.image.src}
          alt={title}
          width={card.image.width}
          height={card.image.height}
          loading="lazy"
          decoding="async"
          className={cn(
            "size-full object-cover transition-transform duration-600 group-hover:scale-104 motion-reduce:transition-none",
            featured ? "block" : "absolute inset-0",
          )}
        />
      </Box>

      <Box className={cn("flex flex-1 flex-col gap-3.5", featured ? "justify-center px-5.5 py-6.5 lg:px-11 lg:py-10" : "p-5.5")}>
        <Text as="span" className="font-mono text-[10.5px] tracking-[0.14em] text-olive uppercase">
          Case Study · {industry}
        </Text>
        {/* Not a heading in the design (`.case-t` is a span inside the card
            link), so it keeps the design's own bold card-title type. */}
        <Text
          as="span"
          className={cn(
            "font-display font-bold tracking-[-0.02em] text-navy",
            featured ? "text-[clamp(24px,2.6vw,34px)] leading-[1.15]" : "text-[20px] leading-[1.25]",
          )}
        >
          {title}
        </Text>

        {card.stats?.length ? (
          <Box as="ul" className="my-2.5 grid list-none grid-cols-1 gap-3 p-0 md:grid-cols-3">
            {card.stats.map((stat) => (
              <Box as="li" key={stat.value} className="rounded-[14px] border border-ink/12 bg-paper p-3.5 text-[13px] leading-[1.45] text-ink-muted">
                <Text as="span" className="mb-1 block font-display text-[28px] leading-none font-bold tracking-[-0.03em] text-navy">
                  {stat.value}
                </Text>
                {stat.label}
              </Box>
            ))}
          </Box>
        ) : null}

        {/* The card is already the link; this only looks like a button. */}
        <Text as="span" className={cn(ctaButtonVariants(), "mt-1.5 self-start group-hover:-translate-y-0.5")}>
          Know more
          <ArrowRight size={16} strokeWidth={2.25} aria-hidden="true" />
        </Text>
      </Box>
    </Link>
  );
}
