import Image from "next/image";
import Link from "next/link";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { CtaButton } from "@/components/common/cta-button";

/** Edstellar's own pages open in the same tab; anything else in a new one. */
const isExternal = (href) => /^https?:\/\//.test(href) && !/^https?:\/\/(www\.)?edstellar\.com/.test(href);

/** `rel` for a card's link: `nofollow` when the CMS marks it
 * `is_follow: false`, `noopener` for a new tab. */
function linkProps(cta) {
  const external = isExternal(cta.href);
  const rel = [cta.is_follow === false && "nofollow", external && "noopener"].filter(Boolean).join(" ");
  return { href: cta.href, ...(external && { target: "_blank" }), ...(rel && { rel }) };
}

/**
 * One resource card — thumbnail, type tag, title, short description, date
 * and the CMS call to action. `linkTitle` also links the title (the
 * templates page). Used by the resource hub's library and the templates
 * page.
 *
 * Design: Learning_Development_Resources / _Templates `.card`.
 */
export default function ResourceCard({ item, linkTitle = false }) {
  return (
    <Box
      as="article"
      className="group flex flex-col overflow-hidden rounded-[18px] border border-ink/12 bg-white transition-[transform,box-shadow,border-color] duration-250 hover:-translate-y-1.5 hover:border-ink/22 hover:shadow-[0_26px_54px_-30px_rgba(10,22,40,0.45)]"
    >
      <Box className="aspect-video overflow-hidden border-b border-ink/12 bg-paper-warm">
        <Image
          src={item.image}
          alt={item.image_alt || item.title}
          width={640}
          height={360}
          sizes="(min-width: 961px) 380px, (min-width: 601px) 50vw, 100vw"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-104"
        />
      </Box>
      <Box className="flex flex-1 flex-col px-5.5 pt-5 pb-5.5">
        <Text
          as="span"
          className="mb-3.5 self-start rounded-full bg-lime/22 px-2.75 py-1.25 font-mono text-[10px] leading-none tracking-[0.14em] text-olive uppercase"
        >
          {item.tag}
        </Text>
        <Text as="h3" className="text-[17.5px] leading-[1.35] font-medium tracking-[-0.02em]">
          {linkTitle && item.cta?.href ? (
            <Link
              {...linkProps(item.cta)}
              title={`Click Here to View ${item.title}`}
              className="transition-colors duration-200 hover:text-olive"
            >
              {item.title}
            </Link>
          ) : (
            item.title
          )}
        </Text>
        <Text as="p" className="mt-2.5 line-clamp-3 text-[14px] leading-[1.65]">
          {item.description}
        </Text>
        <Box className="mt-auto flex items-center justify-between gap-3 pt-4.5">
          <Text as="span" className="font-mono text-[10.5px] leading-none tracking-[0.12em] text-ink-muted uppercase">
            {item.date_label}
          </Text>
          {item.cta?.href ? (
            <CtaButton arrow
              variant="ghost"
              render={<a {...linkProps(item.cta)} />}
              title={`Click Here to ${item.cta.label}: ${item.title}`}
              className="px-4.5 py-2.5 text-[13px] leading-none"
            >
              {item.cta.label}
            </CtaButton>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
}
