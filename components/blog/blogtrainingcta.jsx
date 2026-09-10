import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";

export default function BlogTrainingCTA() {
  return (
    <Box>
      <Box className="relative flex flex-col items-center justify-center overflow-hidden rounded-[5px] border border-[#ACC8FF] px-5 pt-6 pb-6 lg:pb-[240px]">
        {/* Background Image */}
        <Image
          src="https://cdn.prod.website-files.com/6482a3cf7db698c2a80cc5e6/6655839414c7d45134aefdb3_Group%201000005623.webp"
          alt="Have a Training Requirement?"
          fill
          className="-z-10 hidden rounded-[5px] object-cover lg:block"
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
            href="/enquiry-now"
            className="mb-4 inline-flex items-center justify-center rounded-lg border-2 border-[#264CBE] px-6 py-3 text-sm font-medium text-[#264CBE] transition-colors hover:bg-[#264CBE] hover:text-white"
          >
            Get a Quote now
          </Link>

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