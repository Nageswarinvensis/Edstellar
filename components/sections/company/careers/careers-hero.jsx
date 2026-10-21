import Box from "@/components/ui/Box";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import Breadcrumbs from "@/components/common/breadcrumbs";

/** Careers hero — a light band: the heading on the left, the photo in a
 * white lifted card on the right, the breadcrumb along the bottom. On
 * desktop it fills the first screen under the sticky header (`h-17` + its
 * 1px border).
 * Design: careers `[data-cmp="hero"]`, `.hero-grid`, `.ld-model.hero-photo`. */
export default function CareersHero({ heading, breadcrumbs, image }) {
  return (
    <Box
      as="header"
      id="top"
      className="flex flex-col bg-paper px-10 pt-6 pb-5.5 max-[900px]:pt-16 max-[900px]:pb-18 max-[600px]:px-4 max-[600px]:pt-9 max-[600px]:pb-11 min-[901px]:min-h-[calc(100svh-69px)]"
    >
      <Box className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col">
        <Box className="flex flex-1 flex-col justify-center">
          <Box className="grid grid-cols-[1.15fr_0.85fr] items-center gap-14 max-[900px]:grid-cols-1 max-[900px]:gap-9">
            <Reveal>
              <RichHeading
                as="h1"
                heading={heading}
                className="mb-3 max-w-[22ch] text-[clamp(38px,4.4vw,48px)] leading-[1.05] font-bold"
                emphasisClassName="text-[1.08em] tracking-[-0.01em] text-ink"
              />
            </Reveal>

            {image?.src ? (
              <Reveal delay={1}>
                <Box
                  as="aside"
                  aria-label={image.alt}
                  className="overflow-hidden rounded-[14px] border border-ink/12 bg-white p-3 shadow-lift"
                >
                  <img loading="eager"
                    src={image.src}
                    alt={image.alt}
                    width={500}
                    height={386}
                    decoding="async"
                    className="block h-auto w-full rounded-[10px]"
                  />
                </Box>
              </Reveal>
            ) : null}
          </Box>
        </Box>

        <Breadcrumbs
          items={breadcrumbs}
          className="mt-0 pt-3 font-body text-[13px] tracking-normal normal-case"
        />
      </Box>
    </Box>
  );
}
