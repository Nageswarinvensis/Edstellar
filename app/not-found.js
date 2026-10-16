import Link from "next/link";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import CtaButton from "@/components/common/cta-button";

export const metadata = {
  title: "Page not found · Edstellar",
};

export default function NotFound() {
  return (
    <Box
      as="main"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-navy-deep px-6 py-20 text-center"
    >
      {/* Decorative background number */}
      <Text
        as="span"
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[clamp(180px,30vw,320px)] font-bold leading-none text-white/[0.03]"
      >
        404
      </Text>

      <Box className="relative flex flex-col items-center gap-6">
        {/* Status pill */}
        <Box
          as="span"
          className="inline-flex items-center rounded-full border border-lime/30 bg-lime/10 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-lime"
        >
          404 · Not found
        </Box>

        <Box className="flex flex-col items-center gap-3">
          <Text
            as="h1"
            className="font-display text-[clamp(28px,4vw,42px)] font-semibold leading-[1.15] text-paper"
          >
            This page doesn't exist
          </Text>
          <Text
            as="p"
            className="max-w-[42ch] text-[clamp(15px,1.1vw,17px)] leading-[1.7] text-paper/55"
          >
            It may have been moved, renamed, or never existed. Check the URL or
            head back home.
          </Text>
        </Box>

        <Box className="flex flex-wrap items-center justify-center gap-3">
          <CtaButton color="lime" arrow render={<Link href="/" />} className="px-7 py-3.5">
            Back to home
          </CtaButton>
          <CtaButton
            variant="secondary"
            render={<Link href="/corporate-training" />}
            className="border border-paper/20 px-7 py-3.5 text-paper hover:border-paper/40 hover:bg-transparent"
          >
            Browse training
          </CtaButton>
        </Box>
      </Box>
    </Box>
  );
}
