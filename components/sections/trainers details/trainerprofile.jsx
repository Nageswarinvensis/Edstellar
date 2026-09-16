import Link from "next/link";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";

import TrainerHero from "@/components/sections/trainers details/trainerhero";

export default function TrainerProfile({ trainer }) {
  return (
    <main className="bg-white">
      <Box className="border-b border-[#e5e7eb] bg-[#fafaf8]">
        <Box className="mx-auto max-w-7xl px-5 py-4">
          <Box className="flex items-center gap-2">
            <Text className="text-[12px] text-[#687385]">
              <Link
                href="/"
                title="Home"
                className="transition-all duration-200 hover:underline hover:text-black hover:underline-offset-4"
              >
                Home
              </Link>
            </Text>

            <Text className="text-[12px] text-[#b8bec8]">/</Text>

            <Text className="text-[12px] text-[#687385]">
              <Link
                href="/trainers"
                title="Trainers"
                className="transition-all duration-200 hover:underline hover:text-black hover:underline-offset-4"
              >
                Trainers
              </Link>
            </Text>

            <Text className="text-[12px] text-[#b8bec8]">/</Text>

            <Text className="text-[12px] text-[#536174]">
              {trainer?.name}
            </Text>
          </Box>
        </Box>
      </Box>

      <TrainerHero trainer={trainer} />
    </main>
  );
}