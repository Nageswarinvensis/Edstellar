import Box from "@/components/ui/Box";
import { cn } from "@/lib/utils";

function Section({ className, innerClassName, children, ...props }) {
  return (
    <Box
      as="section"
      className={cn("px-5 py-10 lg:px-10 lg:py-20", className)}
      {...props}
    >
      <Box className={cn("rail-container max-w-7xl mx-auto", innerClassName)}>
        {children}
      </Box>
    </Box>
  );
}

export default Section;
