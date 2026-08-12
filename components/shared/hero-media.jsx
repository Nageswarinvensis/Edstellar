import Image from "next/image";
import Box from "@/components/ui/Box";
import { cn } from "@/lib/utils";

/**
 * The hero visual.
 *
 * Design: `.hero-photo` / `.hero-vid`. Three distinct behaviours:
 *   ≤620px       hidden entirely — the design drops it on phones
 *   621–1140px   a 280px block above the copy, faded out at the bottom
 *   ≥1141px      absolutely positioned, bleeding off the right viewport edge
 *                and masked in from the left so the copy stays readable
 *
 * Positioned against the hero <header> (which is `relative`), NOT the grid —
 * the design's `left: calc(22% + 56px)` is a percentage of the full hero width.
 * Do not add `relative` to the grid wrapper or these offsets shift.
 *
 * `video` wins over `image` when both are supplied. With neither, a tonal
 * placeholder renders so layout and spacing are still reviewable.
 */
function HeroMedia({ image, video, alt = "", poster, className }) {
  const hasMedia = Boolean(video || image);

  return (
    <Box
      role={hasMedia ? "img" : undefined}
      aria-label={hasMedia ? alt : undefined}
      aria-hidden={hasMedia ? undefined : "true"}
      className={cn(
        "hidden",
        "sm:mb-1.5 sm:block sm:h-70 sm:w-full sm:overflow-hidden sm:rounded-[14px] sm:hero-mask-y",
        "lg:pointer-events-none lg:absolute lg:-top-16 lg:-bottom-6 lg:left-[calc(22%+56px)] lg:right-0 lg:z-0 lg:mb-0 lg:h-auto lg:w-auto lg:rounded-none lg:hero-mask-x",
        className,
      )}
    >
      {video ? (
        <video
          className="absolute inset-0 block size-full object-cover object-right"
          muted
          playsInline
          loop
          preload="metadata"
          poster={poster || undefined}
          aria-hidden="true"
        >
          <source src={video} type="video/mp4" />
        </video>
      ) : image ? (
        <Image
          src={image}
          alt={alt}
          fill
          priority
          sizes="(max-width: 620px) 0px, (max-width: 1140px) 100vw, 60vw"
          className="object-cover object-right"
        />
      ) : (
        <Box className="size-full bg-[linear-gradient(135deg,var(--color-navy)_0%,var(--color-navy-soft)_55%,var(--color-paper-cream)_100%)] opacity-90" />
      )}
    </Box>
  );
}

export default HeroMedia;