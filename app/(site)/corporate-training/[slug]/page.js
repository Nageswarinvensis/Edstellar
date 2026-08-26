import { notFound } from "next/navigation";

import {
  getTrainingSlugs,
  resolveTrainingSlug,
} from "@/lib/content/taxonomy";
import { buildMetadata } from "@/lib/seo/metadata";
import DomainPage from "@/components/templates/training/domain-page";

/**
 * `/corporate-training/{slug}` — industry, vendor, or domain.
 *
 * One route serves all three because route groups create no separate URL
 * namespace, so two `[slug]` folders at this depth is a build error. The type
 * is resolved by `lib/content/taxonomy.js` and the design is chosen by picking
 * a template (TASTE.md §1.2).
 */

export const revalidate = 3600;

/**
 * Domains, industries and vendors are few and cheap, so all of them are
 * prerendered. `getTrainingSlugs` throws on a slug collision across types —
 * which means a collision fails the build rather than silently shadowing a
 * live page.
 */
export async function generateStaticParams() {
  const slugs = await getTrainingSlugs();
  return slugs.map((slug) => ({ slug }));
}

/**
 * One template per entity type. Industry and vendor content is not modeled
 * yet, so those types resolve to nothing and 404 — adding one is a line here
 * plus a registry in `lib/content/`, with no change to this route.
 */
const TEMPLATES = {
  domain: DomainPage,
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const entry = await resolveTrainingSlug(slug);

  if (!entry) return {};

  return buildMetadata({
    title: entry.data.seo.meta_title,
    description: entry.data.seo.Meta_description,
    path: `/corporate-training/${slug}`,
    image: entry.data.seo.og_image_url,
  });
}

export default async function TrainingPage({ params }) {
  const { slug } = await params;
  const entry = await resolveTrainingSlug(slug);

  if (!entry) notFound();

  const Template = TEMPLATES[entry.type];

  if (!Template) notFound();

  return <Template domain={entry.data} />;
}
