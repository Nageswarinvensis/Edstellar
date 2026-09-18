import Link from "next/link";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { CtaButton } from "@/components/common/cta-button";

export default function BlogDetailSkillMatrixCta() {
  return (
    <Box>
      <Box
        className="relative mt-4 flex flex-col items-center overflow-hidden rounded-[10px] border border-[#ACC8FF] px-5 py-6"
        style={{
          background:
            "linear-gradient(180deg, #EBF1F9 0%, #1B40A9 60%)",
        }}
      >
        {/* Background Shape */}
        <Box
          as="img"
          src="https://cdn.prod.website-files.com/6482a3cf7db698c2a80cc5e6/6655839314c7d45134aefd3b_Mask%20group.svg"
          alt=""
          className="absolute top-0 left-0 w-full"
        />

        {/* Laptop Image */}
        <Box
          as="img"
          src="https://cdn.prod.website-files.com/6482a3cf7db698c2a80cc5e6/66aa1ed5aad60946c5bcd759_Skill%20matrix.webp"
          alt="Skill Matrix Tool Dashboard"
          className="relative z-10 mb-6 w-61"
        />

        {/* Content */}
        <Box className="relative z-10 text-center">
          <Text
            as="h3"
            className="mb-4 text-[20px] font-bold leading-7 text-white"
          >
            Want to evaluate your team&apos;s skill gaps?
          </Text>

          <Text className="mb-6 text-[14px] leading-5.5 text-white">
            Do a quick Skill gap analysis with{" "}
            <span className="font-semibold">
              Edstellar&apos;s Free Skill Matrix tool
            </span>
          </Text>

          <CtaButton
            color="lime"
            arrow
            block
            title="Click Here to View Free Skill Matrix Tool"
            render={<Link href="/skill-matrix" target="_blank" />}
          >
            Get Started
          </CtaButton>
        </Box>
      </Box>
    </Box>
  );
}
