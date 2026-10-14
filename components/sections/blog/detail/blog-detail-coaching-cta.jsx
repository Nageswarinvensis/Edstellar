import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";

/**
 * Rail card — coaching: navy card, lime link with an underline that draws
 * in, image below.
 */
export default function BlogDetailCoachingCta() {
  return (
    <Box className="rounded-2xl border border-navy bg-navy p-6 transition-[transform,box-shadow] duration-250 hover:-translate-y-1.25 hover:shadow-[0_22px_46px_-28px_rgba(10,22,40,0.5)]">
      <Text
        as="h3"
        className="mb-2.5 text-[17px] leading-[1.32] font-semibold tracking-[-0.02em] text-paper"
      >
        Coaching that Unlocks{" "}
        <em className="font-serif font-normal text-lime">Potential</em>
      </Text>

      <Text className="mb-1 text-[13.5px] leading-[1.65] text-paper/75">
        <span className="font-semibold text-paper">
          Create dynamic leaders and cohesive teams.
        </span>{" "}
        Learn more now!
      </Text>

      <Link
        href="/coaching-solutions"
        target="_blank"
        title="Click Here to View 50+ Coaching Programs"
        className="relative mt-3.5 inline-flex cursor-pointer items-center gap-1.75 text-[13px] font-semibold text-lime after:absolute after:-bottom-1.25 after:left-0 after:h-[1.5px] after:w-0 after:bg-lime after:transition-[width] after:duration-250 after:content-[''] hover:after:w-full"
      >
        Explore 50+ Coaching Programs
        <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
      </Link>

      <img
        src="https://cdn.prod.website-files.com/6482a3cf7db698c2a80cc5e6/68eccc88ae455a603ca80de0_Group%201000005608%20(1).webp"
        alt="Edstellar coaching programs"
        loading="lazy"
        className="mt-4 h-33 w-full rounded-xl object-cover"
      />
    </Box>
  );
}
