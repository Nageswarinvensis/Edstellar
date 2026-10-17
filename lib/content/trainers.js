import { cache } from "react";

import { apiGet } from "@/lib/api/client";
import { endpoints, REVALIDATE } from "@/lib/api/endpoints";

/**
 * Trainer reads. `GET /api/v2/trainer/{slug}` is the only trainer endpoint
 * the CMS exposes — there is no index, so `getTrainerSlugs` has nothing to
 * enumerate (mirrors the blog's "no index endpoint" gap). "Other trainers"
 * therefore reads a hand-picked slug list from
 * `content/trainers/trainer-page.js`.
 */
export const getTrainer = cache(async (slug) => {
  const payload = await apiGet(endpoints.trainer(slug), {
    revalidate: REVALIDATE.trainer,
  });
  return payload?.trainer ?? null;
});

export const getTrainerSlugs = cache(async () => []);

/**
 * Several trainer records by slug, in the given order — for the "Other
 * trainers" cards. Unknown or failing slugs are dropped rather than failing
 * the page, and `exclude` (the current trainer) never appears.
 */
export const getTrainersBySlugs = cache(async (slugs, exclude, limit = slugs.length) => {
  const wanted = slugs.filter((slug) => slug !== exclude).slice(0, limit);
  const trainers = await Promise.all(wanted.map((slug) => getTrainer(slug).catch(() => null)));
  return trainers.filter(Boolean);
});
