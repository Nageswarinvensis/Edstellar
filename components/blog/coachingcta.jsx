import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";

export default function CoachingCTA() {
  return (
    <Box>
      <Box className="flex flex-col items-start justify-start rounded-[10px] bg-[#495151] px-5 py-6 lg:justify-end lg:bg-[url('https://cdn.prod.website-files.com/6482a3cf7db698c2a80cc5e6/68eccc88ae455a603ca80de0_Group%201000005608%20(1).webp')] lg:bg-cover lg:bg-center lg:pb-50">
        <Box className="flex flex-col items-stretch">
          <Text
            as="h3"
            className="mb-2.5 text-[24px] font-bold leading-8 text-white"
          >
            Coaching that Unlocks Potential
          </Text>

          <Text className="mb-5 text-[16px] leading-6 text-white">
            <span className="font-semibold">
              Create dynamic leaders and cohesive teams.
            </span>{" "}
            Learn more now!
          </Text>

          <Link
            href="/coaching-solutions"
            target="_blank"
            className="flex items-center gap-2.5 text-[#FCD635] transition-opacity hover:opacity-80"
          >
            <Text className="text-white" as="span">Explore 50+ Coaching Programs</Text>

            <ArrowUpRight size={12} strokeWidth={1} />
          </Link>
        </Box>
      </Box>
    </Box>
  );
}