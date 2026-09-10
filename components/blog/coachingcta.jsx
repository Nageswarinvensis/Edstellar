import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";

export default function CoachingCTA() {
  return (
    <Box>
      <Box
        className="flex flex-col items-start justify-end rounded-[10px] bg-cover bg-center px-5 pt-6 pb-50"
        style={{
          backgroundImage:
            "url('https://cdn.prod.website-files.com/6482a3cf7db698c2a80cc5e6/68eccc88ae455a603ca80de0_Group%201000005608%20(1).webp')",
        }}
      >
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