"use client";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";

export default function StickyTabs({ data }) {
  return (
    <Box
      as="nav"
      aria-label="Course navigation"
      className="
        sticky top-0 z-1
        w-full
        border-y
        border-[rgba(10,22,40,0.12)]
        bg-[rgba(250,250,247,0.94)]
        backdrop-blur-[14px]
        shadow-[0_10px_24px_-22px_rgba(10,22,40,0.5)]
      "
    >
      <Box
        className="
          mx-auto
          flex
          h-13
          w-full
          max-w-[1800px]
          items-center
          px-5
          lg:px-12.5
        "
      >
        {/* Logo */}
        <Box as="a" href="#about" className="flex shrink-0 items-center">
          <img
            src={data?.logo?.src}
            alt={data?.logo?.alt || "Edstellar"}
            className="h-7 w-auto object-contain"
          />
        </Box>

        {/* Navigation */}
        <Box
          as="ul"
          className="
            ml-8
            flex
            h-full
            flex-1
            items-center
            justify-between
            gap-2
          "
        >
          {data?.tabs?.map((tab) => (
            <Box as="li" key={tab.id} className="flex h-full items-center">
              <Box
                as="a"
                href={`#${tab.id}`}
                className={`
                  flex
                  h-8.75
                  items-center
                  justify-center
                  rounded-[10px]
                  px-3.25
                  transition-colors
                  duration-200
                  ${
                    tab.active
                      ? "bg-[#E8F6B4]"
                      : "bg-transparent hover:bg-[#F1F1EC]"
                  }
                `}
              >
                <Text
                  as="span"
                  className={`
                    whitespace-nowrap
                    text-[13px]
                    font-normal
                    leading-none
                    ${tab.active ? "text-[#0A1628]" : "text-[#626875]"}
                  `}
                >
                  {tab.label}
                </Text>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
