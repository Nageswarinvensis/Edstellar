import Box from "@/components/ui/Box";
import AppProviders from "@/components/providers/app-providers";
import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import ReadingProgress from "@/components/common/reading-progress";

/**
 * The site shell — header, `<main>` landmark, footer.
 *
 * This is a layout boundary, and the only one most pages ever touch. Because
 * every page under `(site)/` shares this one instance, `SiteHeader` is never
 * unmounted by navigation: dropdown state, the scroll-progress bar and the
 * `header-visibility` store all survive moving between pages. Splitting this
 * into one layout per section would break that (TASTE.md §1.4).
 *
 * Server Component. **Never fetch here** — it would block every page on the
 * site (TASTE.md §8.2).
 */
export default function SiteLayout({ children }) {
  return (
    <>
      <ReadingProgress />
      <SiteHeader />
      <AppProviders>
        <Box as="main" className="bg-paper text-ink">
          {children}
        </Box>
      </AppProviders>
      <SiteFooter />
    </>
  );
}
