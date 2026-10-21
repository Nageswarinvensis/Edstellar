import Image from "next/image";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import { CtaButton } from "@/components/common/cta-button";
import RichHeading from "@/components/common/rich-heading";
import Breadcrumbs from "@/components/common/breadcrumbs";
import { cn } from "@/lib/utils";

/** Column 2 drifts down while 1 and 3 drift up, each at its own pace. */
const COLUMN_MOTION = [
  "animate-wall-up",
  "animate-wall-down",
  "animate-wall-up [animation-duration:40s]",
];

/**
 * Trainer-platform hero — breadcrumb, heading (the global h1 scale), lede and the "Join as a
 * Trainer" CTA beside a wall of trainer photos in three columns that drift
 * up and down (paused on hover, still under reduced motion). Each column
 * repeats its photos once for a seamless loop; the repeat is aria-hidden.
 *
 * The CMS's `badge` ("Global network · Edstellar-Verified Trainers") is
 * deliberately not shown.
 *
 * Design: Join as a Trainer `.hero`, `.wall`.
 */
export default function TrainerHero({ data, breadcrumbs }) {
  if (!data) return null;
  const { heading, description, cta, columns = [] } = data;

  return (
    <Box
      as="section"
      aria-label="Join Edstellar as a trainer"
      className="relative overflow-hidden border-b-4 border-lime bg-navy px-5 text-paper before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(60%_70%_at_85%_30%,color-mix(in_srgb,var(--color-lime)_10%,transparent),transparent_70%),radial-gradient(40%_50%_at_0%_100%,color-mix(in_srgb,var(--color-navy-soft)_90%,transparent),transparent_70%)] before:content-[''] lg:px-10"
    >
      <Box className="relative mx-auto max-w-295 pt-7.5 pb-18">
        <Breadcrumbs
          items={breadcrumbs}
          tone="dark"
          className="mt-0 mb-13.5 text-[11px] tracking-[0.1em]"
        />

        <Box className="grid items-center gap-11 min-[901px]:grid-cols-[1.05fr_0.95fr] min-[901px]:gap-14">
          <Reveal>
            <RichHeading
              as="h1"
              heading={heading}
              className="text-paper"
              emphasisClassName="font-normal tracking-[-0.01em] text-lime"
            />
            {description ? (
              <Text as="p" className="mt-5.5 max-w-[54ch] text-[18px] leading-[1.75] text-paper/72">
                {description}
              </Text>
            ) : null}
            {cta?.href ? (
              <CtaButton color="lime" arrow render={<a href={cta.href} />} className="mt-8.5">
                {cta.label}
              </CtaButton>
            ) : null}
          </Reveal>

          {columns.length ? (
            <Reveal delay={1} className="relative">
              <Box
                role="group"
                aria-label="Edstellar trainers"
                className="group/wall grid h-95 grid-cols-3 gap-3.5 overflow-hidden [mask-image:linear-gradient(180deg,transparent,black_12%,black_88%,transparent)] min-[901px]:h-125"
              >
                {columns.map((column, columnIndex) => (
                  <Box
                    key={columnIndex}
                    className={cn(
                      "flex flex-col gap-3.5 group-hover/wall:[animation-play-state:paused] motion-reduce:animate-none",
                      COLUMN_MOTION[columnIndex % COLUMN_MOTION.length],
                    )}
                  >
                    {[...column, ...column].map((photo, index) => {
                      const repeat = index >= column.length;
                      return (
                        <Box
                          key={`${photo.src}-${index}`}
                          aria-hidden={repeat || undefined}
                          className={cn(
                            "group/photo overflow-hidden rounded-[14px] shadow-[0_18px_36px_-20px_rgba(0,0,0,0.7)]",
                            repeat && "motion-reduce:hidden",
                          )}
                        >
                          <Image loading="eager"
                            src={photo.src}
                            alt={photo.alt}
                            width={240}
                            height={300}
                            sizes="(min-width: 901px) 180px, 30vw"
                            priority={columnIndex === 0 && index === 0}
                            className="h-auto w-full contrast-[1.05] grayscale transition-[filter] duration-350 group-hover/photo:grayscale-0"
                          />
                        </Box>
                      );
                    })}
                  </Box>
                ))}
              </Box>
            </Reveal>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
}
