import { cache } from "react";

/**
 * Trainer reads.
 *
 * Trainer portraits need consent before they can ship (TASTE.md §13), so no
 * trainer content is modeled yet and the directory falls back to initials.
 * The shape is here so the route can be wired without touching pages later.
 */
const TRAINERS = {};

export const getTrainer = cache(async (slug) => TRAINERS[slug] ?? null);

export const getTrainerSlugs = cache(async () => Object.keys(TRAINERS));
