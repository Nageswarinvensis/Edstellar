import { SuccessClients, SuccessFootprint, SuccessStoryList } from "@/components/sections/success_stories/success-sections";

/** `/success-stories` — the navy footprint map (with the h1), the client
 * logo strip, then the filterable story cards. */
export default function SuccessStoriesPage({ page }) {
  return (
    <>
      <SuccessFootprint data={page.footprint} />
      <SuccessClients data={page.clients} />
      <SuccessStoryList data={page.stories} breadcrumbs={page.breadcrumbs} />
    </>
  );
}
