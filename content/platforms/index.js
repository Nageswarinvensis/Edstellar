import { orbit } from "./orbit";
import { spectraLms } from "./spectra-lms";
import { polaris } from "./polaris";
import { meridian } from "./meridian";

export const PLATFORMS = {
  orbit: orbit,
  "spectra-lms": spectraLms,
  polaris: polaris,
  meridian: meridian,
};

export function getPlatform(slug) {
  return PLATFORMS[slug] ?? null;
}
