import Link from "next/link";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";

const DECORATIVE_RINGS_SRC =
  "https://media.edstellar.com/website/Mask_group.webp";

/** Decorative concentric rings on the hero's right edge — purely visual,
 * clipped by the header's own overflow-hidden. */
function DecorativeRings() {
  return (
    <Box
      aria-hidden="true"
      className="pointer-events-none absolute right-0 bottom-0 hidden h-full md:block"
    >
      <img loading="eager" src={DECORATIVE_RINGS_SRC} alt="Decorative concentric rings" className="h-full w-auto object-cover" />
    </Box>
  );
}

/** Mono kicker + bold count, as in the author hero's article stat. */
function Stat({ value, label }) {
  return (
    <Box
      as="span"
      className="font-mono text-[11px] uppercase tracking-[0.08em] text-paper/60"
    >
      <b className="block font-display text-[17px] font-bold normal-case tracking-[-0.02em] text-paper">
        {value}
      </b>
      {label}
    </Box>
  );
}

/**
 * Blog index header: the same navy band with a lime underline as the author
 * and category heroes (`author/author-hero.jsx`, `category/category-hero.jsx`)
 * — breadcrumb, heading with its closing phrase in lime serif italic, intro,
 * the article and topic counts, and the decorative rings on the right.
 *
 * Design: Blog Category Template `header`, `.crumb`; Blog Author Template
 * `.astat`.
 */
export default function BlogMainHero({ articleCount, categoryCount }) {
  return (
    <Box as="header" className="relative overflow-hidden border-b-4 border-lime bg-navy px-5 lg:px-10">
      <DecorativeRings />

      <Box className="relative mx-auto max-w-7xl py-10 lg:py-20">
        <Reveal
          as="nav"
          aria-label="Breadcrumb"
          className="flex flex-wrap gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-paper/50"
        >
          <Link href="/" title="Click Here to View Home" className="text-paper/65 transition-colors hover:text-lime">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="font-medium text-lime">
            Blog
          </span>
        </Reveal>

        <Reveal delay={1}>
          <Text
            as="h1"
            className="mt-4.5 max-w-[26ch] text-paper"
          >
            Discover the Latest Topics on Training, L&amp;D, Talent &amp;{" "}
            <em className="font-serif font-normal text-lime">Skill Development</em>
          </Text>
        </Reveal>

        <Reveal delay={2}>
          <Text
            as="p"
            className="mt-4 max-w-[74ch] text-[15.5px] leading-[1.7] text-paper/75"
          >
            Welcome to Edstellar, where the future of corporate training,
            learning and development takes center stage. Dive into our latest
            collection of articles, news, and featured content tailored for
            organizations, HR and L&amp;D teams keen on advancing their talent,
            leadership and employee development strategies. From innovative
            skill-building techniques to transformative learning experiences,
            Edstellar is your premier source for insights and trends that
            empower your team to excel in today&apos;s fast-paced world. Join us
            in shaping the next generation of industry leaders.
          </Text>
        </Reveal>

        {articleCount || categoryCount ? (
          <Reveal delay={3} className="mt-5 flex flex-wrap items-center gap-x-6.5 gap-y-3">
            {articleCount ? (
              <Stat value={articleCount} label={articleCount === 1 ? "Article" : "Articles"} />
            ) : null}
            {categoryCount ? (
              <Stat value={categoryCount} label={categoryCount === 1 ? "Topic" : "Topics"} />
            ) : null}
          </Reveal>
        ) : null}
      </Box>
    </Box>
  );
}
