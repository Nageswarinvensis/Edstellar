import Box from "@/components/ui/Box";
import { cn } from "@/lib/utils";

function Section({ className, children, ...props }) {
  return (
    <Box as="section" className={cn(className)} {...props}>
      <Box className="container">{children}</Box>
    </Box>
  );
}

export default Section;
