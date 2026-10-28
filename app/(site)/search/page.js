import { searchSite } from "@/lib/content/search";
import { buildMetadata } from "@/lib/seo/metadata";
import SearchPage from "@/components/templates/search-page";
import JsonLd from "@/components/seo/json-ld";

/**
 * Site search (`/search?q=…`) — the header search box submits here. The one
 * route that reads `searchParams`, so it renders per request; `noindex`,
 * since a results page is not content (TASTE.md §2.2, §2.4).
 */
export async function generateMetadata({ searchParams }) {
  const { q } = await searchParams;
  const query = typeof q === "string" ? q.trim().slice(0, 100) : "";

  return buildMetadata({
    title: query ? `Search results for "${query}"` : "Search",
    description: "Search Edstellar's corporate training courses, training domains, services and articles.",
    path: "/search",
    noIndex: true,
  });
}

export default async function SearchRoute({ searchParams }) {
  const { q } = await searchParams;
  const results = await searchSite(typeof q === "string" ? q : "");
  const BASE = "https://www.edstellar.com";
  const pageUrl = `${BASE}/search`;
  const query = typeof q === "string" ? q.trim().slice(0, 100) : "";

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        "url": pageUrl,
        "name": query ? `Search results for "${query}"` : "Search",
        "description": "Search Edstellar's corporate training courses, training domains, services and articles.",
        "inLanguage": "en-US"
      }} />
      <SearchPage results={results} />
    </>
  );
}
