import Image from "next/image";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import { cn } from "@/lib/utils";

/** The client-logo strip every page shows. */
const CLIENT_LOGOS = {
  heading: "Trusted by teams at",
  logos: [
    {
      src: "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/68b6a9c115c2a0faf78d5187_Abb.webp",
      alt: "ABB",
      title: "ABB",
      width: 121,
      height: 48,
    },
    {
      src: "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/68b6aa7c4dc52f902b965f86_Aditya%20Birla%20Group.webp",
      alt: "Aditya Birla Group",
      title: "Aditya Birla Group",
      width: 86,
      height: 48,
    },
    {
      src: "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/68b587f256c7ca56ef383708_Adobe.webp",
      alt: "Adobe",
      title: "Adobe",
      width: 184,
      height: 48,
    },
    {
      src: "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/698469c6a91cef644870febe_Amazon%201%20%281%29.webp",
      alt: "Amazon",
      title: "Amazon",
      width: 86,
      height: 26,
    },
    {
      src: "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/68b6aa97d7f1555ba95b5394_AutoDesk.webp",
      alt: "Autodesk",
      title: "Autodesk",
      width: 287,
      height: 48,
    },
    {
      src: "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/68b6a9d8e0dd2f35457d1311_Emerson.webp",
      alt: "Emerson",
      title: "Emerson",
      width: 109,
      height: 48,
    },
    {
      src: "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/68b6a94748156eb2b452d94e_godrej.webp",
      alt: "Godrej",
      title: "Godrej",
      width: 100,
      height: 48,
    },
    {
      src: "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/68b587b637a6028400026a71_Intel2.webp",
      alt: "Intel",
      title: "Intel",
      width: 124,
      height: 42,
    },
    {
      src: "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/69846266b0acf082e648fdb0_Johnson%26Johnson%201.webp",
      alt: "Johnson & Johnson",
      title: "Johnson & Johnson",
      width: 120,
      height: 11,
    },
    {
      src: "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/68b588572d0fd67c6424af0a_MediaTek.webp",
      alt: "MediaTek",
      title: "MediaTek",
      width: 183,
      height: 48,
    },
    {
      src: "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/68b5873a89529b86f470b686_Microsoft.webp",
      alt: "Microsoft",
      title: "Microsoft",
      width: 219,
      height: 48,
    },
    {
      src: "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/68b6a9601c7bda326efbe969_nrsc.webp",
      alt: "NRSC",
      title: "NRSC",
      width: 50,
      height: 48,
    },
    {
      src: "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/69846830ede4cc2aea05d48a_Sportskeeda%201.webp",
      alt: "Sportskeeda",
      title: "Sportskeeda",
      width: 120,
      height: 14,
    },
    {
      src: "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/68b5887637a6028400031b44_Tata_Chemicals.webp",
      alt: "Tata Chemicals",
      title: "Tata Chemicals",
      width: 110,
      height: 48,
    },
    {
      src: "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/68b6a98ed7f1555ba95a94c2_Total.webp",
      alt: "Total",
      title: "Total",
      width: 162,
      height: 48,
    },
    {
      src: "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/68b9218334a6bbb7e0046a57_visa.webp",
      alt: "Visa",
      title: "Visa",
      width: 137,
      height: 48,
    },
  ],
};

const LOGO_MAX_HEIGHT = 36;
const LOGO_SCALE = 48;
const LOGO_RATIO_EXPONENT = -0.4;

function logoSize(logo) {
  if (!logo.width || !logo.height) return null;
  const ratio = logo.width / logo.height;
  const height = Math.min(LOGO_MAX_HEIGHT, LOGO_SCALE * ratio ** LOGO_RATIO_EXPONENT);
  return { width: Math.round(height * ratio), height: Math.round(height) };
}

/**
 * The client-logo strip — one set of logos for every page, `CLIENT_LOGOS`
 * above. A page whose eyebrow text differs passes `heading`; nothing else
 * varies by page.
 *
 * The list is rendered twice so the -50% marquee loops seamlessly; the second
 * copy is aria-hidden so screen readers announce each client once. With
 * reduced motion the strip stops, drops the copy and wraps as a static row.
 */
function ClientLogos({ heading = CLIENT_LOGOS.heading, className }) {
  const { logos } = CLIENT_LOGOS;

  return (
    <Box
      as="section"
      className={cn("px-5 lg:px-10 overflow-hidden bg-sand py-12", className,
      )}
    >
      {/* Content container */}
      <Box className="mx-auto max-w-7xl">
        {heading && (
          <Reveal>
            <Text
              as="p"
              className="mb-8 font-mono text-[10px] tracking-[0.18em] text-ink/60 uppercase"
            >
              {heading}
            </Text>
          </Reveal>
        )}
      </Box>

      {/* Logo animation - full width */}
      <Box className="w-full overflow-hidden">
        <Box
          className="
            flex w-max animate-[logoSlide_30s_linear_infinite] items-center gap-8 hover:paused
            motion-reduce:mx-auto motion-reduce:w-full motion-reduce:max-w-7xl motion-reduce:animate-none
            motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-4
          "
        >
          {[...logos, ...logos].map((logo, index) => {
            const size = logoSize(logo);
            const duplicate = index >= logos.length;
            return (
              <Box
                key={`${logo.alt}-${index}`}
                aria-hidden={duplicate || undefined}
                className={cn(
                  "flex h-13.5 flex-none items-center justify-center rounded-[8px] py-2",
                  size ? "min-w-35 px-5" : "w-35 px-4",
                  duplicate && "motion-reduce:hidden",
                )}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt || ""}
                  title={logo.title || logo.alt || ""}
                  width={size?.width ?? 140}
                  height={size?.height ?? 48}
                  className={cn(!size && "max-h-10.5 w-auto max-w-30 object-contain")}
                />
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}

export default ClientLogos;