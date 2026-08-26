import Box from "@/components/ui/Box";
import AppProviders from "@/components/providers/app-providers";

/**
 * Shell-free layout boundary: no header, no footer, no nav.
 *
 * For pages that must not offer a way out — post-conversion confirmations and
 * standalone campaign landing pages. Providers are still mounted because forms
 * and tooltips are exactly what these pages contain.
 */
export default function BareLayout({ children }) {
  return (
    <AppProviders>
      <Box as="main" className="bg-paper text-ink">
        {children}
      </Box>
    </AppProviders>
  );
}
