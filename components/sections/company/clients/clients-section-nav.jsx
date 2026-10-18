import Box from "@/components/ui/Box";
import CtaButton from "@/components/common/cta-button";

/** Sticky in-page anchor nav. Plain anchors — no JS — so it stays a Server
 * Component; the sticky behaviour is pure CSS. */
export default function ClientsSectionNav({ data }) {
  if (!data?.links?.length) return null;

  return (
    <Box
      as="nav"
      aria-label="On this page"
      className="sticky top-0 z-20 border-b border-ink/12 bg-paper/95 backdrop-blur"
    >
      <Box className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-10 py-2 max-md:px-5">
        <Box as="ul" className="flex flex-1 list-none items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {data.links.map((link) => (
            <Box as="li" key={link.href}>
              <a
                href={link.href}
                className="inline-flex min-h-11 items-center whitespace-nowrap rounded-md px-3 text-sm font-medium text-ink/70 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
              >
                {link.label}
              </a>
            </Box>
          ))}
        </Box>
        {data.cta && (
          <CtaButton
            size="sm"
            color="navy"
            className="max-md:hidden"
            render={<a href={data.cta.href} />}
          >
            {data.cta.label}
          </CtaButton>
        )}
      </Box>
    </Box>
  );
}
