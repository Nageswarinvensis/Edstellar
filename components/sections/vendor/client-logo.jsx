import Image from "next/image";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";

function ClientLogos({ data }) {
  if (!data) return null;

  return (
    <Box className="overflow-hidden bg-[#F5F3EB] py-12 border-b border-[rgba(10,22,40,0.12)]">
      {/* Content container */}
      <Box className="mx-auto max-w-7xl">
        {/* Small eyebrow */}
        <Text
          as="p"
          className="mb-8 font-mono text-[9px] tracking-[0.18em] text-ink/60 uppercase"
        >
          {data.heading}
        </Text>
      </Box>

      {/* Logo animation - full width */}
      <Box className="w-full overflow-hidden">
        <Box className="flex w-max animate-[logoSlide_30s_linear_infinite] items-center gap-8 hover:[animation-play-state:paused]">
          {[...data.logos, ...data.logos].map((logo, index) => (
            <Box
              key={`${logo.alt}-${index}`}
              className="flex h-[54px] w-[140px] flex-none items-center justify-center rounded-[4px] bg-white px-4 py-2"
            >
              <Image
                src={logo.src}
                alt={logo.alt || ""}
                title={logo.title || logo.alt || ""}
                width={140}
                height={48}
                className="max-h-[42px] w-auto max-w-[120px] object-contain"
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default ClientLogos;