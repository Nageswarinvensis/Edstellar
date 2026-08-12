import Box from "@/components/ui/Box";
import QuotePanel from "@/components/sections/course/quote-panel";

/**
 * Wraps the Skills/Outcomes/Curriculum/Audience/DeliveryModes run so the
 * quote form floats as a sticky rail beside all five sections, matching the
 * source design's technique: the panel is an absolutely-positioned overlay
 * pinned to the content column's right edge, not a grid column, so each
 * wrapped section keeps its own full-bleed background instead of being
 * squeezed into a column. The wrapped sections' inner containers
 * (`.rail-container`, set by `Section`) get extra right padding at `xl` so
 * copy doesn't run under the floating panel. That reserved padding narrows
 * the readable column to ~760px at `xl`, which is too tight for Skills'
 * 4-up card grid and Audience's two-column split at their normal viewport
 * breakpoints (those only key off viewport width, not this column's actual
 * width) — so both get an `xl`-only override here, the same way the source
 * design narrows `.skill-grid`/`.aud-split` inside its `.rail-zone`.
 *
 * Below `xl` there isn't room for a 380px rail beside readable content, so
 * the same panel instance drops out of the overlay and renders as a normal
 * block after the wrapped sections instead.
 */
export default function QuoteRail({ children }) {
  return (
    <Box className="relative">
      <Box
        className="
          xl:[&_.rail-container]:pr-[440px]
          xl:[&_.skill-grid]:grid-cols-2
          xl:[&_.aud-split]:grid-cols-1
          xl:[&_.aud-split]:gap-6.5
        "
      >
        {children}
      </Box>

      <Box className="px-5 pb-10 lg:px-10 lg:pb-20 xl:pointer-events-none xl:absolute xl:inset-x-0 xl:inset-y-9 xl:px-0 xl:pb-0">
        <Box className="mx-auto flex max-w-7xl justify-center xl:h-full xl:items-start xl:justify-end xl:px-10">
          <QuotePanel
            className="w-full max-w-lg xl:pointer-events-auto xl:sticky xl:top-24 xl:w-95 xl:max-w-none xl:max-h-[calc(100vh-7.5rem)]"
            slaNote="A specialist replies within one business day."
          />
        </Box>
      </Box>
    </Box>
  );
}
