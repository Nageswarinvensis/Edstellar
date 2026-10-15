/**
 * Course durations are approximate. The CMS sends them as plain strings
 * ("24 Hours"), with or without a leading "~" — normalize to "~ 24 Hours".
 * An empty string stays empty (the duration is on request).
 */
export function approxDuration(duration) {
  const text = typeof duration === "string" ? duration.trim() : "";
  if (!text) return "";
  return `~ ${text.replace(/^~\s*/, "")}`;
}
