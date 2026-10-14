import Link from "next/link";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";

/**
 * Category page header: navy band with a lime underline — breadcrumb, the
 * heading with the category name in lime serif italic, and the description.
 * Same frame as the author hero (`author/author-hero.jsx`).
 *
 * `heading` is the CMS `meta.h1` ("All Business Development Related
 * Articles"); the category name inside it is the emphasized phrase. Without
 * an h1, or when the name isn't in it, it falls back to the design's
 * "All Articles Related to {name}".
 *
 * Design: Blog Category Template `header`, `.crumb`.
 */
export default function CategoryHero({ name, heading, description }) {
  const at = heading ? heading.indexOf(name) : -1;
  const [before, after] =
    at >= 0
      ? [heading.slice(0, at), heading.slice(at + name.length)]
      : ["All Articles Related to ", ""];

  return (
    <Box as="header" className="border-b-4 border-lime bg-navy px-5 lg:px-10">
      <Box className="mx-auto max-w-7xl pb-11">
        <Box
          as="nav"
          aria-label="Breadcrumb"
          className="flex flex-wrap gap-2 pt-5.5 font-mono text-[11px] uppercase tracking-[0.08em] text-paper/50"
        >
          <Link href="/" className="text-paper/65 transition-colors hover:text-lime">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/blog" className="text-paper/65 transition-colors hover:text-lime">
            Blog
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="font-medium text-lime">
            {name}
          </span>
        </Box>

        <Reveal>
          <Text
            as="h1"
            className="mt-4.5 max-w-[22ch] text-[clamp(26px,4vw,40px)] leading-[1.15] tracking-[-0.03em] text-paper"
          >
            {before}
            <em className="font-serif font-normal text-lime">{name}</em>
            {after}
          </Text>
        </Reveal>

        {description ? (
          <Reveal delay={1}>
            <Text
              as="p"
              className="mt-4 max-w-[74ch] text-[15.5px] leading-[1.7] text-paper/75"
            >
              {description}
            </Text>
          </Reveal>
        ) : null}
      </Box>
    </Box>
  );
}
