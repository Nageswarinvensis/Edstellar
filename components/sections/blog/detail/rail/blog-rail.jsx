import Box from "@/components/ui/Box";
import CategoryExplorer from "./category-explorer";
import CatalogRail from "./catalog-rail";
import QuoteRail from "./quote-rail";
import CoachingRail from "./coaching-rail";

/**
 * The blog post's right rail. The column is split into equal segments down
 * the article; each card stays pinned (sticky) through its own segment, then
 * hands over to the next.
 *
 * Design: Blog page v2 `.blog-rail`, `.rseg`.
 */
export default function BlogRail({ categories, featuredDomain }) {
  const segments = [
    <CategoryExplorer key="explore" categories={categories} featuredDomain={featuredDomain} />,
    <CatalogRail key="catalog" />,
    <QuoteRail key="quote" />,
    <CoachingRail key="coaching" />,
  ];

  return (
    <Box as="aside" aria-label="Explore Edstellar training" className="relative flex h-full min-w-0 flex-col">
      {segments.map((card) => (
        <Box key={card.key} className="min-h-0 flex-1 basis-0 pb-50 last:pb-0">
          <Box className="sticky top-24">{card}</Box>
        </Box>
      ))}
    </Box>
  );
}
