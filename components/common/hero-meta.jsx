import Box from "@/components/ui/Box";
import InfoTooltip from "@/components/common/info-tooltip";
import { cn } from "@/lib/utils";

/**
 * The lime-dot-separated facts row under the hero lede.
 *
 * Design: `.hero-meta` (dots are `<i>` elements in the original markup; here
 * they are decorative spans, since they carry no semantics).
 *
 * `items` entries are either a string, or
 * `{ label, tooltip: { heading, body } }` to attach an info popover.
 */
function HeroMeta({ items = [], className }) {
  if (!items.length) return null;

  return (
    <Box
      as="p"
      className={cn(
        "m-0 mb-5 flex flex-wrap items-center gap-x-3.5 gap-y-2.5 font-mono text-[11px] font-semibold tracking-[0.08em] text-ink uppercase",
        "max-md:mt-4.5 max-md:mb-6.5 max-md:gap-x-2.75 max-md:gap-y-2 max-md:text-[10.5px] max-w-120",
        className,
      )}
    >
      {items.map((item, index) => {
        const isString = typeof item === "string";
        const label = isString ? item : item.label;

        return (
          <Box
            as="span"
            key={`${label}-${index}`}
            className="flex flex-none items-center gap-x-3.5"
          >
            {index > 0 ? (
              <span
                aria-hidden="true"
                className="block size-1.25 flex-none rounded-full bg-lime"
              />
            ) : null}

            {isString || !item.tooltip ? (
              <span className="flex-none">{label}</span>
            ) : (
              <InfoTooltip
                label={label}
                heading={item.tooltip.heading}
                className="flex-none"
              >
                {item.tooltip.body}
              </InfoTooltip>
            )}
          </Box>
        );
      })}
    </Box>
  );
}

export default HeroMeta;
