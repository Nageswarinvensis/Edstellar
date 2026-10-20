import Link from "next/link";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import RichHeading from "@/components/common/rich-heading";
import Reveal from "@/components/common/reveal";

const ICONS = {
  people: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20c.6-3.6 3.3-5.5 6.5-5.5s5.9 1.9 6.5 5.5" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M17.5 14.6c2.2.4 3.6 2 4 4.4" />
    </>
  ),
  heart: <path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z" />,
  star: <path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z" />,
  doc: (
    <>
      <path d="M7 3h7l5 5v13H7z" />
      <path d="M14 3v5h5M10 13h6M10 17h6" />
    </>
  ),
};

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-4">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/** "More from Edstellar" — four cross-link cards. */
export default function ClientsRelated({ data }) {
  if (!data?.items?.length) return null;

  return (
    <Section aria-labelledby="rel-h" className="bg-paper">
      <Reveal>
        <Box className="mb-8 max-w-[640px]">
          <RichHeading
            as="h2"
            id="rel-h"
            heading={data.heading}
            className="m-0 text-[clamp(32px,4vw,40px)] font-medium leading-[1.08] tracking-[-0.03em] text-ink"
          />
        </Box>
      </Reveal>

      <Reveal delay={1}>
        <Box as="ul" className="grid list-none grid-cols-4 gap-4 p-0 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {data.items.map((item) => (
            <Box as="li" key={item.href}>
              <Link
                href={item.href}
                className="group flex h-full flex-col gap-3 rounded-[14px] border border-ink/12 border-t-[3px] border-t-transparent bg-white p-6 no-underline shadow-rest transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-t-navy hover:shadow-lift"
              >
                <Box className="flex size-11 items-center justify-center rounded-[10px] bg-paper-warm text-navy">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-[22px]">
                    {ICONS[item.icon] ?? ICONS.doc}
                  </svg>
                </Box>
                <Text as="span" className="font-mono text-[11px] uppercase leading-none tracking-[0.12em] text-ink-muted">
                  {item.tag}
                </Text>
                <Text as="h3" className="m-0 font-display text-lg font-semibold tracking-[-0.01em] text-ink">
                  {item.title}
                </Text>
                <Text as="p" className="m-0 text-sm leading-[1.6] text-ink-muted">{item.desc}</Text>
                <Text as="span" className="mt-auto flex items-center gap-2 text-sm font-semibold text-ink">
                  {item.cta}
                  <ArrowIcon />
                </Text>
              </Link>
            </Box>
          ))}
        </Box>
      </Reveal>
    </Section>
  );
}
