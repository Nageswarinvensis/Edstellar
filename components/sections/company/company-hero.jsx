import Link from "next/link";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";

/**
 * Navy hero shared by the static company pages: heading, lede, a slot for the
 * page's call to action (`children`), the breadcrumb under a hairline, and a
 * framed photo on the right. With no `image`, `aside` fills the right column
 * instead (the enquiry page puts its form there); with neither, the text runs
 * in a single column.
 *
 * Design: become-a-guest-author / contact-us `.hero`, `.hero-grid`,
 * `.media-frame`; enquiry-form `.enquire`, `.enquire-grid`.
 */
export default function CompanyHero({ id, heading, description, breadcrumbs, image, aside, children }) {
  return (
    <Box
      as="section"
      id={id}
      className="relative overflow-hidden bg-[linear-gradient(160deg,var(--color-navy-deep),var(--color-navy)_60%,var(--color-navy-soft))] px-5 py-14 text-white lg:px-10 lg:py-26"
    >
      <Box
        aria-hidden="true"
        className="pointer-events-none absolute -right-[10%] -bottom-[40%] size-105 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-lime)_22%,transparent),transparent_70%)]"
      />

      <Box
        className={
          aside
            ? "relative z-1 mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16"
            : image
              ? "relative z-1 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-18"
              : "relative z-1 mx-auto max-w-7xl"
        }
      >
        <Box>
          <Reveal>
            <RichHeading
              as="h1"
              heading={heading}
              className="mb-6 max-w-[20ch] text-white"
              emphasisClassName="font-normal text-lime-soft"
            />
          </Reveal>

          {description ? (
            <Reveal delay={1}>
              <Text
                as="p"
                className="mb-8 max-w-[54ch] text-[clamp(16px,1.6vw,19px)] leading-[1.6] text-white/82"
              >
                {description}
              </Text>
            </Reveal>
          ) : null}

          {children ? <Reveal delay={2}>{children}</Reveal> : null}

          {breadcrumbs?.length ? (
            <Reveal
              delay={3}
              as="nav"
              aria-label="Breadcrumb"
              className="mt-12 border-t border-white/16 pt-6 font-mono text-[12.5px] tracking-[0.02em] text-white/62"
            >
              {breadcrumbs.map((item, index) => (
                <Box as="span" key={item.label}>
                  {index > 0 ? (
                    <Box as="span" aria-hidden="true" className="px-2 text-white/40">
                      /
                    </Box>
                  ) : null}
                  {item.href ? (
                    <Link href={item.href} title={`Click Here to View ${item.label}`} className="hover:underline">
                      {item.label}
                    </Link>
                  ) : (
                    <Box as="span" aria-current="page" className="text-lime-soft">
                      {item.label}
                    </Box>
                  )}
                </Box>
              ))}
            </Reveal>
          ) : null}
        </Box>

        {image ? (
          <Reveal delay={1}>
            <Box className="aspect-video overflow-hidden rounded-[14px] border border-white/16 bg-navy-soft shadow-[0_24px_60px_rgba(0,0,0,0.35)] lg:aspect-[4/3]">
              <img loading="eager"
                src={image.src}
                alt={image.alt}
                width={1200}
                height={900}
                fetchPriority="high"
                decoding="async"
                className="size-full object-cover"
              />
            </Box>
          </Reveal>
        ) : null}

        {aside ? <Reveal delay={1}>{aside}</Reveal> : null}
      </Box>
    </Box>
  );
}
