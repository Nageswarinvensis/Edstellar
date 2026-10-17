import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { buildMetadata } from "@/lib/seo/metadata";
import { getPageIndex } from "@/lib/content/sitemap";
import PageIndex from "@/components/sections/home/page-index";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Corporate Training and Consulting",
  path: "/",
});

/** Where the page index links point: the Vercel deployment. */
const PAGE_INDEX_ORIGIN = "https://edstellar-two.vercel.app";

export default async function HomePage() {
  const pageIndex = await getPageIndex();

  return (
    <Section>
      <Box className="flex flex-col gap-4">
        <Text as="h1">Edstellar</Text>
        <Text as="p" className="max-w-[60ch]">
          The Best Corporate Training Experiences are Instructor-led
        </Text>
      </Box>

      {pageIndex ? (
        <PageIndex
          origin={PAGE_INDEX_ORIGIN}
          sources={[
            {
              kicker: "CMS",
              heading: "Pages from the CMS",
              note: "Published CMS site pages; edit their content in the CMS.",
              warning: pageIndex.cmsUnavailable
                ? "The CMS could not be reached, so its pages are missing. Reload to retry."
                : null,
              ...pageIndex.cms,
            },
            {
              kicker: "Local",
              heading: "Local static pages",
              note: "Content lives in this repo (content/); changes need a deploy.",
              ...pageIndex.local,
            },
            {
              kicker: "Detail pages",
              heading: "One example of each detail page",
              note: "One real page for each detail route that has content: domain, course, blog post, author, category, template, case study, trainer and thank-you (industry and vendor appear once they have pages).",
              ...pageIndex.details,
            },
          ]}
        />
      ) : null}
    </Section>
  );
}
