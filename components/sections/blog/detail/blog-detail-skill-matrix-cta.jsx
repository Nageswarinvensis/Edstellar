import Link from "next/link";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { CtaButton } from "@/components/common/cta-button";

/**
 * Rail card — skill matrix: navy card, dashboard image on top, lime button.
 */
export default function BlogDetailSkillMatrixCta() {
  return (
    <Box className="mt-4 rounded-2xl border border-navy bg-navy p-6 transition-[transform,box-shadow] duration-250 hover:-translate-y-1.25 hover:shadow-[0_22px_46px_-28px_rgba(10,22,40,0.5)]">
      <Box className="mb-4 flex justify-center rounded-xl bg-navy-soft px-4 pt-4">
        <img
          src="https://cdn.prod.website-files.com/6482a3cf7db698c2a80cc5e6/66aa1ed5aad60946c5bcd759_Skill%20matrix.webp"
          alt="Skill Matrix Tool Dashboard"
          loading="lazy"
          className="w-61 max-w-full"
        />
      </Box>

      <Text
        as="h3"
        className="mb-2.5 text-[17px] leading-[1.32] font-semibold tracking-[-0.02em] text-paper"
      >
        Want to evaluate your team&apos;s{" "}
        <em className="font-serif font-normal text-lime">skill gaps?</em>
      </Text>

      <Text className="mb-4 text-[13.5px] leading-[1.65] text-paper/75">
        Do a quick Skill gap analysis with{" "}
        <span className="font-semibold text-paper">
          Edstellar&apos;s Free Skill Matrix tool
        </span>
      </Text>

      <CtaButton
        color="lime"
        arrow
        title="Click Here to View Free Skill Matrix Tool"
        render={<Link href="/skill-matrix" target="_blank" />}
        className="px-6 py-3.25 text-[13px]"
      >
        Get Started
      </CtaButton>
    </Box>
  );
}
