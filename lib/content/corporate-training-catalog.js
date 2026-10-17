import "server-only";

import { CATALOG_PAGE } from "@/content/corporate-training/catalog";

/** Corporate Training Catalog (`/corporate-training-catalog`) copy — local
 * (`content/corporate-training/catalog.js`). Its domains and courses come
 * from `getTrainingDomains()` in `lib/content/training-catalog.js`. */
export function getCatalogPage() {
  return CATALOG_PAGE;
}
