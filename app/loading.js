import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { Spinner } from "@/components/ui/spinner";

/**
 * Route-level Suspense fallback. Next.js renders this automatically while a
 * server component in this segment is streaming.
 */
export default function Loading() {
  return (
    <Box
      as="output"
      aria-live="polite"
      aria-busy="true"
      className="flex min-h-svh flex-col items-center justify-center gap-3"
    >
      <Spinner className="size-6 text-ink/45" />
      <Text as="span">Loading…</Text>
    </Box>
  );
}
