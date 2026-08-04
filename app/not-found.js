import Link from "next/link";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import CtaButton from "@/components/ui/CtaButton";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <Box
      as="main"
      className="flex min-h-svh flex-col items-center justify-center gap-6 px-6 py-16 text-center"
    >
      <Box className="flex flex-col items-center gap-2">
        <Text as="span" className="text-6xl font-bold tabular-nums">
          404
        </Text>
        <Text as="h1">This page could not be found</Text>
        <Text as="p" className="max-w-prose">
          The page you are looking for may have been moved, renamed, or never
          existed.
        </Text>
      </Box>

      <Box className="flex flex-wrap items-center justify-center gap-3">
        <CtaButton render={<Link href="/" />}>Back to home</CtaButton>
      </Box>
    </Box>
  );
}
