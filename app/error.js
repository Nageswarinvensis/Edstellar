"use client";

import { useEffect } from "react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import CtaButton from "@/components/ui/CtaButton";

/**
 * Segment-level error boundary. Catches render/data errors thrown below it
 * while keeping the root layout mounted, so the user never loses the shell.
 */
export default function Error({ error, reset }) {
  useEffect(() => {
    // Replace with your monitoring transport (Sentry, Datadog, …).
    console.error(error);
  }, [error]);

  return (
    <Box
      as="main"
      className="flex min-h-svh flex-col items-center justify-center gap-6 px-6 py-16 text-center"
    >
      <Box className="flex flex-col items-center gap-2">
        <Text as="h1">Something went wrong</Text>
        <Text as="p" className="max-w-prose">
          An unexpected error occurred while rendering this page. You can retry,
          or head back home if the problem persists.
        </Text>
        {error?.digest ? (
          <Text as="span" className="font-mono text-xs">
            Reference: {error.digest}
          </Text>
        ) : null}
      </Box>

      <Box className="flex flex-wrap items-center justify-center gap-3">
        <CtaButton onClick={reset}>Try again</CtaButton>
        <CtaButton variant="ghost" onClick={() => window.location.assign("/")}>
          Back to home
        </CtaButton>
      </Box>
    </Box>
  );
}
