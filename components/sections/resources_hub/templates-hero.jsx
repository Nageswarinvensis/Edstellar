import Image from "next/image";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import Breadcrumbs from "@/components/common/breadcrumbs";
import { cn } from "@/lib/utils";

/** Where each of the three thumbnails sits in the stack (the third bobs). */
const STACK = [
  "top-6 left-0 -rotate-5",
  "top-0 right-0 rotate-4",
  "bottom-0 left-[19%] z-2 motion-safe:animate-bob",
];

/**
 * Templates hero — breadcrumb, heading and lede beside a decorative stack of
 * three real template thumbnails (aria-hidden: it has no copy of its own).
 *
 * Design: Learning_Development_Templates `.hero`, `.stack`.
 */
export default function TemplatesHero({ data, breadcrumbs }) {
  if (!data) return null;
  const images = data.images ?? [];

  return (
    <Box
      as="section"
      aria-label="Free L&D tools and templates"
      className="relative overflow-hidden border-b-4 border-lime bg-navy px-5 text-paper before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(60%_70%_at_85%_30%,color-mix(in_srgb,var(--color-lime)_10%,transparent),transparent_70%),radial-gradient(40%_50%_at_0%_100%,color-mix(in_srgb,var(--color-navy-soft)_90%,transparent),transparent_70%)] before:content-[''] lg:px-10"
    >
      <Box className="relative mx-auto max-w-295 pt-7.5 pb-18 sm:pb-21">
        <Breadcrumbs items={breadcrumbs} tone="dark" className="mt-0 mb-13.5 text-[11px] tracking-[0.1em]" />

        <Box className="grid items-center gap-11 min-[961px]:grid-cols-2 min-[961px]:gap-14">
          <Reveal>
            <RichHeading as="h1" heading={data.heading} className="text-paper" emphasisClassName="font-normal text-lime" />
            {data.description ? (
              <Text as="p" className="mt-5.5 max-w-[54ch] text-[18px] leading-[1.75] text-paper/72">
                {data.description}
              </Text>
            ) : null}
          </Reveal>

          {images.length ? (
            <Reveal delay={1} aria-hidden="true" className="relative h-55 max-w-130 min-[521px]:h-75 min-[961px]:h-85 min-[961px]:max-w-none">
              {images.slice(0, 3).map((src, index) => (
                <Image
                  key={src}
                  src={src}
                  alt=""
                  width={640}
                  height={360}
                  sizes="(min-width: 961px) 340px, 62vw"
                  priority={index === 0}
                  className={cn(
                    "absolute w-[62%] rounded-[14px] border border-paper/12 bg-navy-soft shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]",
                    STACK[index],
                  )}
                />
              ))}
            </Reveal>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
}
