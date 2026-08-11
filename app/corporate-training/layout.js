import Box from "@/components/ui/Box";

/**
 * Marketing shell. Server Component — never fetch here, it would block every
 * page on the site (TASTE.md §8.2).
 *
 * SiteHeader and SiteFooter are not built yet; they arrive with the nav and
 * footer sections. The <main> landmark lives here so no page has to remember it.
 */
export default function MarketingLayout({ children }) {
  return (
    <Box as="main" className="bg-paper text-ink">
      {children}
    </Box>
  );
}
