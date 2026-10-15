import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils";

/** Heading + muted intro used at the top of each guest-author section. */
export default function SectionHead({ id, heading, description, className }) {
  return (
    <Box className={cn("mb-12 max-w-[62ch]", className)}>
      <Text
        as="h2"
        id={id}
        className="mb-4"
      >
        {heading}
      </Text>
      {description ? (
        <Text as="p" className="max-w-[56ch] text-[17px] leading-[1.65]">
          {description}
        </Text>
      ) : null}
    </Box>
  );
}
