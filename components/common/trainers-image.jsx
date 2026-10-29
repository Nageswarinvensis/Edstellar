import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * The trainer avatars — the home hero's trust line, the course and domain
 * proof bars and the course curriculum's author credit: one pre-composed strip
 * of five faces (`public/course/trainers.webp`) instead of five photos. The file
 * is 504×144 — 3× the 168×48 layout size — so it stays sharp on high-density
 * screens; `width`/`height` below are the layout size, which sets the ratio.
 * Decorative: the text beside it carries the meaning.
 * `className` sets the height; the width follows the strip's 7:2 ratio.
 */
export default function TrainersImage({ className, eager = false, src }) {
  return (
    <Image
      src={src || "/course/trainers.webp"}
      // `eager` for the home hero, where it is above the fold.
      priority={eager}
      alt=""
      aria-hidden="true"
      width={168}
      height={48}
      className={cn("h-10 w-auto flex-none", className)}
    />
  );
}
