import { orbit } from "./orbit";
import { spectraLms } from "./spectra-lms";
import { polaris } from "./polaris";
import { meridian } from "./meridian";
import { tnaTniEngine } from "./tna-tni-engine";

export const PLATFORMS = {
  orbit: orbit,
  "spectra-lms": spectraLms,
  polaris: polaris,
  meridian: meridian,
  "tna-tni-engine": tnaTniEngine,
};

export function getPlatform(slug) {
  return PLATFORMS[slug] ?? null;
}
