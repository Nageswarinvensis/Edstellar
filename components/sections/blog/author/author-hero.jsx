import Link from "next/link";
import { BadgeCheck } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import { SocialIcon } from "@/components/sections/blog/common/social-icon";

/**
 * Author page header: navy band with a lime underline — breadcrumb, avatar,
 * "Author" kicker, name (last word in lime serif italic), bio, social links
 * and the article count.
 *
 * Design: Blog Author Template `.ahead`, `.aprof`, `.astat`, `.crumb`.
 */
export default function AuthorHero({
  name,
  image,
  bio,
  verified,
  socialLinks = [],
  articleCount,
}) {
  const words = name.trim().split(/\s+/);
  const lastWord = words.length > 1 ? words.pop() : null;

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

        <Reveal className="mt-5.5 flex flex-wrap items-center gap-7">
          {image ? (
            <img
              src={image}
              alt={name}
              width={110}
              height={110}
              className="size-27.5 flex-none rounded-full border-3 border-lime/50 object-cover"
            />
          ) : null}

          <Box className="min-w-0 flex-1">
            <Text
              as="span"
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-lime"
            >
              Author
            </Text>

            <Box className="mt-1.5 flex items-center gap-2.5">
              <Text
                as="h1"
                className="text-[clamp(24px,3.4vw,34px)] leading-[1.1] text-paper"
              >
                {words.join(" ")}
                {lastWord ? (
                  <>
                    {" "}
                    <em className="font-serif font-normal text-lime">{lastWord}</em>
                  </>
                ) : null}
              </Text>
              {verified ? (
                <BadgeCheck
                  size={24}
                  className="flex-none text-lime"
                  aria-label="Verified expert"
                />
              ) : null}
            </Box>

            {bio ? (
              <Text
                as="p"
                className="mt-2.5 text-[14.5px] leading-[1.7] text-paper/75"
              >
                {bio}
              </Text>
            ) : null}

            {articleCount || socialLinks.length ? (
              <Box className="mt-4 flex flex-wrap items-center gap-x-6.5 gap-y-3">
                {articleCount ? (
                  <Box
                    as="span"
                    className="font-mono text-[11px] uppercase tracking-[0.08em] text-paper/60"
                  >
                    <b className="block font-display text-[17px] font-bold normal-case tracking-[-0.02em] text-paper">
                      {articleCount}
                    </b>
                    {articleCount === 1 ? "Article" : "Articles"}
                  </Box>
                ) : null}

                {socialLinks.length ? (
                  <Box className="flex gap-2.5">
                    {socialLinks.map(({ key, label, href }) => (
                      <a
                        key={key}
                        href={href}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        title={label}
                        aria-label={label}
                        className="flex size-8 items-center justify-center rounded-full border border-paper/25 text-paper/80 transition-[transform,color,border-color] duration-200 hover:-translate-y-0.5 hover:border-lime hover:text-lime"
                      >
                        <SocialIcon platform={key} className="size-3.5" />
                      </a>
                    ))}
                  </Box>
                ) : null}
              </Box>
            ) : null}
          </Box>

        </Reveal>
      </Box>
    </Box>
  );
}
