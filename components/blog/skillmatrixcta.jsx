import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";

export default function SkillMatrixCTA() {
  return (
    <Box>
      <Box className="relative mt-4 flex flex-col items-center overflow-hidden rounded-[10px] border border-[#ACC8FF] bg-[linear-gradient(180deg,#EBF1F9_0%,#1B40A9_0%)] px-5 py-6 lg:bg-[linear-gradient(180deg,#EBF1F9_0%,#1B40A9_60%)]">
        {/* Background Shape */}
        <Image
          src="https://cdn.prod.website-files.com/6482a3cf7db698c2a80cc5e6/6655839314c7d45134aefd3b_Mask%20group.svg"
          alt=""
          width={400}
          height={200}
          className="absolute top-0 left-0 hidden w-full lg:block"
        />

        {/* Laptop Image */}
        <Image
          src="https://cdn.prod.website-files.com/6482a3cf7db698c2a80cc5e6/66aa1ed5aad60946c5bcd759_Skill%20matrix.webp"
          alt="Skill Matrix Tool Dashboard"
          width={244}
          height={160}
          className="relative z-10 mb-6 hidden w-61 lg:block"
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

          <Link
            href="/skill-matrix"
            target="_blank"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-[8px] bg-[#C8E130] px-6 text-[16px] font-semibold text-[#1C1C1C] transition hover:opacity-90"
          >
            <Text as="span">Get Started</Text>

            <ArrowUpRight size={12} strokeWidth={2} />
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
