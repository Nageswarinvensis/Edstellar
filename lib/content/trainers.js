import { cache } from "react";

import { apiGet } from "@/lib/api/client";
import { endpoints, REVALIDATE } from "@/lib/api/endpoints";

/**
 * Trainer reads. `GET /api/v2/trainer/{slug}` is the only trainer endpoint
 * the CMS exposes — there is no index, so `getTrainerSlugs` has nothing to
 * enumerate (mirrors the blog's "no index endpoint" gap; see
 * `content/trainer.jsx`'s `OTHER_TRAINERS` for the stand-in).
 */
export const getTrainer = cache(async (slug) => {
  const payload = await apiGet(endpoints.trainer(slug), {
    revalidate: REVALIDATE.trainer,
  });
  return payload?.trainer ?? null;
});

export const getTrainerSlugs = cache(async () => []);
