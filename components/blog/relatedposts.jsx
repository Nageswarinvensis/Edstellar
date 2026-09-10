import Link from "next/link";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";

export default function RelatedPosts() {
  const posts = [
    "10 Must-have Skills for a Frontend Developer in 2026",
    "10 Must-Have Skills for a System Administrator in 2026",
    "12 Must-have Skills for a Site Reliability Engineer (SRE) in 2026",
    "10 Must-Have Skills for Talent Acquisition Manager",
  ];

  return (
    <Box>
      <Box className="relative w-full px-2 py-0">
        <Text
          as="h2"
          className="mb-4 text-2xl font-bold text-[#3b3b3b]"
        >
          Related Posts
        </Text>

        <Box className="space-y-7">
          {posts.map((post, index) => (
            <Box
              as="article"
              key={index}
              className="border-l border-black pl-4"
            >
              <Text className="mb-2 text-base text-[#333]">
                In-Demand Skills
              </Text>

              <Link href="">
                <Text
                  as="h3"
                  className="text-[16px] font-semibold leading-[1.35] text-[#202020] transition-colors duration-300 hover:text-blue-600"
                >
                  {post}
                </Text>
              </Link>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}