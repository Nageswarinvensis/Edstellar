import Image from "next/image";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/shared/reveal";

function ClientLogos({ data }) {
  if (!data) return null;

  return (
    <Box className="overflow-hidden bg-[#F5F3EB] py-12 border-b border-[rgba(10,22,40,0.12)]">
      {/* Content container */}
      <Box className="mx-auto max-w-7xl">
        {/* Small eyebrow */}
        <Reveal>
          <Text
            as="p"
            className="mb-8 font-mono text-[10px] tracking-[0.18em] text-ink/60 uppercase"
          >
            {data.heading}
          </Text>
        </Reveal>
      </Box>

      {/* Logo animation - full width */}
      <Reveal delay={1}>
        <Box className="w-full overflow-hidden">
          <Box className="flex w-max animate-[logoSlide_30s_linear_infinite] items-center gap-8 hover:paused">
            {[...data.logos, ...data.logos].map((logo, index) => (
              <Box
                key={`${logo.alt}-${index}`}
                className="flex h-13.5 w-35 flex-none items-center justify-center rounded-[8px] bg-white px-4 py-2"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt || ""}
                  title={logo.title || logo.alt || ""}
                  width={140}
                  height={48}
                  className="max-h-10.5 w-auto max-w-30 object-contain"
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Reveal>
    </Box>
  );
}

export default ClientLogos;
