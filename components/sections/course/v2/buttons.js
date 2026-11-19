/**
 * The v2 button looks (the design's `.btn`): navy pill with lime text
 * (primary), lime pill (lime), bordered ghost. `lg` is the hero size.
 *
 * Plain module on purpose — no "use client". A constant exported from a
 * client module reaches a Server Component as a client reference, not as
 * the string, and the button renders unstyled.
 */
const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full border border-transparent px-[22px] py-3 font-body text-[14px] font-semibold transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(10,22,40,0.18)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy";

export const V2_BUTTON = {
  primary: `${BASE} bg-navy text-lime`,
  lime: `${BASE} bg-lime text-navy shadow-[0_6px_16px_-6px_rgba(140,180,10,0.55)]`,
  ghost: `${BASE} border-ink/22 bg-transparent text-ink`,
  lg: "px-7 py-[15px] text-[15px]",
};

/** The event a section CTA fires so the quote form knows what was asked about. */
export const V2_QUOTE_TOPIC_EVENT = "course-v2:quote-topic";
