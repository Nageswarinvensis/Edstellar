import Image from "next/image";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import { cn } from "@/lib/utils";
import { getClientLogoStrip } from "@/lib/content/client-logos";

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
 * The client-logo strip — one set of logos for every page, the ids in
 * `CLIENT_LOGO_STRIP` (`content/company/client-logos.js`). A page whose
 * eyebrow text differs passes `heading`; nothing else varies by page.
 *
 * The list is rendered twice so the -50% marquee loops seamlessly; the second
 * copy is aria-hidden so screen readers announce each client once. With
 * reduced motion the strip stops, drops the copy and wraps as a static row.
 */
function ClientLogos({ heading, className }) {
  const strip = getClientLogoStrip();
  const { logos } = strip;
  heading ??= strip.heading;

  return (
    <Box
      as="div"
      className={cn("px-5 lg:px-10 overflow-hidden bg-sand py-12", className,
      )}
    >
      {/* Content container */}
      <Box className="mx-auto max-w-7xl">
        {heading && (
          <Reveal>
            <Text
              as="p"
              className="mb-8 font-mono text-[10px] tracking-[0.18em] text-ink-muted uppercase"
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
                key={`${logo.id}-${index}`}
                aria-hidden={duplicate || undefined}
                className={cn(
                  "flex h-13.5 flex-none items-center justify-center rounded-[8px] py-2",
                  size ? "min-w-35 px-5" : "w-35 px-4",
                  duplicate && "motion-reduce:hidden",
                )}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  title={logo.alt}
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