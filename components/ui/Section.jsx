import Box from "@/components/ui/Box";
import { cn } from "@/lib/utils";

function Section({ className, children, ...props }) {
  return (
    <Box as="section" className={cn("px-5 lg:px-10", className)} {...props}>
      <Box className="max-w-7xl mx-auto">{children}</Box>
    </Box>
  );
}

export default Section;
