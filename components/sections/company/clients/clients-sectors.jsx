import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import RichHeading from "@/components/common/rich-heading";
import Reveal from "@/components/common/reveal";

// Outline icon paths per sector key, copied from the approved design.
const SECTOR_ICONS = {
  tech: [<rect key="a" x="3" y="4" width="18" height="12" rx="2" />, <path key="b" d="M8 20h8M12 16v4" />],
  mfg: [<path key="a" d="M3 20V10l5 3v-3l5 3V7l8 4v9z" />, <path key="b" d="M3 20h18" />],
  pro: [<rect key="a" x="3" y="7" width="18" height="13" rx="2" />, <path key="b" d="M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2M3 13h18" />],
  bfsi: [<path key="a" d="M3 10l9-6 9 6M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18" />],
  consumer: [<path key="a" d="M5 8h14l-1 12H6z" />, <path key="b" d="M9 8V6a3 3 0 016 0v2" />],
  health: [<path key="a" d="M12 21s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 11c0 5.6-7 10-7 10z" />, <path key="b" d="M8 12h2l1-2 2 4 1-2h2" />],
  auto: [
    <path key="a" d="M4 16l1.6-4.8A2 2 0 017.5 10h9a2 2 0 011.9 1.2L20 16v3H4z" />,
    <circle key="b" cx="8" cy="16" r="1" />,
    <circle key="c" cx="16" cy="16" r="1" />,
  ],
  re: [<path key="a" d="M4 21V5l8-2v18M12 9l8 3v9M3 21h18M7 8h2M7 12h2M7 16h2M15 14h2M15 17h2" />],
  edu: [<path key="a" d="M2 9l10-5 10 5-10 5z" />, <path key="b" d="M6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" />],
  energy: [<path key="a" d="M13 3L5 14h6l-1 7 8-11h-6z" />],
  public: [<path key="a" d="M5 21V4M5 4h12l-2.5 4L17 12H5" />],
  agri: [
    <path key="a" d="M12 21v-9" />,
    <path key="b" d="M12 12c0-4 3-7 8-7 0 5-3 7-8 7z" />,
    <path key="c" d="M12 14c0-3-2.5-5-7-5 0 4 2.5 5 7 5z" />,
  ],
  log: [
    <path key="a" d="M3 6h11v10H3zM14 10h4l3 3v3h-7" />,
    <circle key="b" cx="7" cy="18" r="1.5" />,
    <circle key="c" cx="17" cy="18" r="1.5" />,
  ],
  media: [<rect key="a" x="3" y="5" width="18" height="14" rx="2" />, <path key="b" d="M10 9l5 3-5 3z" />],
  chem: [<path key="a" d="M9 3h6M10 3v6l-5.5 9.5A1.7 1.7 0 006 21h12a1.7 1.7 0 001.5-2.5L14 9V3" />, <path key="b" d="M7 15h10" />],
  group: [<path key="a" d="M12 3l9 5-9 5-9-5z" />, <path key="b" d="M3 13l9 5 9-5" />],
};

/** Sectors Edstellar works with — a dark grid of cards, each with an outline
 * icon, the sector name and a few example clients. */
export default function ClientsSectors({ data }) {
  if (!data?.rows?.length) return null;

  return (
    <Section id="sectors" aria-labelledby="sectors-h" className="scroll-mt-16 bg-navy text-paper">
      <Reveal>
        <Box className="max-w-[640px]">
          <RichHeading
            as="h2"
            id="sectors-h"
            heading={data.heading}
            className="m-0 text-[clamp(32px,4vw,40px)] font-medium leading-[1.08] tracking-[-0.03em] text-paper [&_span]:text-lime"
          />
          <Text as="p" className="mt-4 text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-paper/60">
            {data.lede}
          </Text>
        </Box>
      </Reveal>

      <Reveal delay={1}>
        <Box as="ul" className="mt-10 grid list-none grid-cols-4 gap-4 p-0 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {data.rows.map((row) => (
            <Box
              as="li"
              key={row.key}
              className="flex flex-col gap-3 rounded-[14px] border border-paper/12 bg-navy-soft p-6 max-sm:p-5"
            >
              <Text as="span" className="flex size-11 items-center justify-center rounded-[10px] border border-paper/12 text-lime">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-6">
                  {SECTOR_ICONS[row.key]}
                </svg>
              </Text>
              <Text as="h3" className="m-0 font-body text-base font-semibold leading-[1.35] text-paper">
                {row.label}
              </Text>
              <Text as="p" className="m-0 text-sm leading-[1.5] text-paper/60">
                {row.summary}
              </Text>
            </Box>
          ))}
        </Box>
      </Reveal>
    </Section>
  );
}
