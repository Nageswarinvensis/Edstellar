import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";

/**
 * Rail card — training requirement: white card, quiet mono link, image below.
 */
export default function BlogDetailTrainingCta() {
  return (
    <Box className="rounded-2xl border border-ink/12 bg-white p-6 transition-[transform,box-shadow,border-color] duration-250 hover:-translate-y-1.25 hover:border-ink/22 hover:shadow-[0_22px_46px_-28px_rgba(10,22,40,0.5)]">
      <Text
        as="h3"
        className="mb-2.5 text-[17px] leading-[1.32] font-semibold tracking-[-0.02em] text-ink"
      >
        Have a Training{" "}
        <em className="font-serif font-normal text-olive">Requirement?</em>
      </Text>

      <Link
        href="/corporate-training-pricing"
        target="_blank"
        title="Click Here to View Training Pricing Packages"
        className="inline-flex cursor-pointer items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/45 transition-colors duration-200 hover:text-olive"
      >
        View Training Pricing Packages
        <ArrowUpRight size={12} strokeWidth={2} aria-hidden="true" />
      </Link>

      <img
        src="https://cdn.prod.website-files.com/6482a3cf7db698c2a80cc5e6/6655839414c7d45134aefdb3_Group%201000005623.webp"
        alt="Have a Training Requirement?"
        loading="lazy"
        className="mt-4 w-full rounded-xl"
      />
    </Box>
  );
}
