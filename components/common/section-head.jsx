import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import { cn } from "@/lib/utils";

/**
 * The header every section of the static marketing pages (pricing, trainer
 * platform) opens with: the heading at the site-wide `<Text as="h2">` size
 * (its `<span>` phrase in the serif italic accent) and an optional lede.
 * Centred unless `align="start"`. On light sections the italic accent keeps
 * the heading's colour; `dark` sets it in lime for the navy sections.
 *
 * Design: corporate-training-pricing-v2 / Join as a Trainer `.sec-head`.
 */
export default function SectionHead({ heading, description, dark = false, align = "center", className }) {
  const center = align === "center";

  return (
    <Reveal className={cn("mb-9 max-w-190 sm:mb-12", center && "mx-auto text-center", className)}>
      <RichHeading
        as="h2"
        heading={heading}
        className={cn(dark && "text-paper")}
        emphasisClassName={cn("font-normal", dark && "text-lime")}
      />

      {description ? (
        <Text
          as="p"
          className={cn("mt-4 text-[17px] leading-[1.75]", dark ? "text-paper/72" : "text-ink/60")}
        >
          {description}
        </Text>
      ) : null}
    </Reveal>
  );
}

/** Padding and width those sections share (design `.sec`, `.wrap`). */
export const SECTION_PADDING = "py-17 sm:py-24";
export const SECTION_WIDTH = "max-w-295";
