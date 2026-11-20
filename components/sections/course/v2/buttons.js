import { ArrowRight } from "lucide-react";

import { ctaButtonVariants } from "@/components/common/cta-button";

/**
 * The v2 buttons ARE the site's global pill button: these class strings come
 * from `ctaButtonVariants` (components/common/cta-button.jsx), so a change to
 * the global button changes every v2 button too. `lg` is the hero size.
 *
 * Plain module on purpose — no "use client". A constant exported from a
 * client module reaches a Server Component as a client reference, not as
 * the string, and the button renders unstyled.
 */
export const V2_BUTTON = {
  primary: ctaButtonVariants({ variant: "primary", color: "navy" }),
  lime: ctaButtonVariants({ variant: "primary", color: "lime" }),
  ghost: ctaButtonVariants({ variant: "ghost" }),
  lg: "px-7 py-[15px] text-[15px] leading-[1.2]",
};

/** The global button's arrow (same icon, size and stroke as `CtaButton arrow`). */
export function V2ButtonArrow() {
  return <ArrowRight size={16} strokeWidth={2.25} aria-hidden="true" className="flex-none" />;
}

/** The event a section CTA fires so the quote form knows what was asked about. */
export const V2_QUOTE_TOPIC_EVENT = "course-v2:quote-topic";
