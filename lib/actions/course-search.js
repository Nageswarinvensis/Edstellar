"use server";

import { apiGet } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";

/**
 * Server Action for the group-quote wizard's course search. Calls the CMS
 * type-ahead endpoint (`/api/v2/pages/search`) and returns the results.
 * An empty or whitespace-only query returns `{ results: [], pagination: null }`.
 */
export async function searchCourses(q, page = 1) {
  if (!q?.trim()) return { results: [], pagination: null };

  const data = await apiGet(endpoints.courseSearch(q, page, 20), {
    revalidate: 60,
  });

  return {
    results: data?.results ?? [],
    pagination: data?.pagination ?? null,
  };
}
