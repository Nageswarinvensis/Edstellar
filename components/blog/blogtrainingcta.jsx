import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";

export default function BlogTrainingCTA() {
  return (
    <Box>
      <Box className="relative flex flex-col items-center justify-center overflow-hidden rounded-[5px] border border-[#ACC8FF] px-5 pt-6 pb-[240px]">
        {/* Background Image */}
        <Box
          as="img"
          src="https://cdn.prod.website-files.com/6482a3cf7db698c2a80cc5e6/6655839414c7d45134aefdb3_Group%201000005623.webp"
          alt="Have a Training Requirement?"
          className="absolute inset-0 -z-10 h-full w-full rounded-[5px] object-cover"
        />

        {/* Content */}
        <Box className="flex flex-col items-start">
          <Text
            as="h3"
            className="mb-5 text-[28px] font-semibold leading-9 text-[#1B40A9]"
          >
            Have a Training Requirement?
          </Text>

          <Link
            href="/corporate-training-pricing"
            target="_blank"
            className="flex items-center gap-2.5 text-black"
          >
            <Text as="span">View Training Pricing Packages</Text>

            <ArrowUpRight size={12} strokeWidth={1} />
          </Link>
        </Box>
      </Box>
    </Box>
  );
}