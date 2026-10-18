import Box from "@/components/ui/Box";
import { cn } from "@/lib/utils";

/**
 * The home page's section container — the design's `.wrap`: max-width 1320px
 * with 56px (px-14) side gutters. Vertical padding and any background/border go
 * on the outer `className`; horizontal gutters and max-width are fixed on the
 * inner rail. Used only by the home sections.
 */
export default function HomeWrap({ as = "section", className, innerClassName, children, ...props }) {
  return (
    <Box as={as} className={className} {...props}>
      <Box className={cn("mx-auto max-w-[1320px] px-14 max-lg:px-8 max-sm:px-5", innerClassName)}>
        {children}
      </Box>
    </Box>
  );
}
