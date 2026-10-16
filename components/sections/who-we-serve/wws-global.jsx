import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import RichHeading from "@/components/common/rich-heading";
import Reveal from "@/components/common/reveal";
import WorldMap from "@/components/sections/who-we-serve/wws-world-map";

const MODE_ICONS = {
  screen: <><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></>,
  pin:    <><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></>,
  blend:  <><circle cx="9" cy="12" r="6"/><circle cx="15" cy="12" r="6"/></>,
};

const SCALE_ICONS = {
  users: <><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5c2 .8 3.5 2.8 3.5 5.5"/></>,
  pin:   <><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></>,
  lang:  <><path d="M4 5h9M8.5 3v2M6 5c.5 3 2.5 5.5 5 7M11 5c-.5 3-3 6-6.5 7.5M13 21l4-9 4 9M14.3 18h5.4"/></>,
};

export default function WwsGlobal({ data }) {
  if (!data) return null;

  return (
    <Section
      id="global"
      aria-labelledby="global-h"
      className="scroll-mt-20 overflow-hidden bg-ink text-paper"
    >
      {/* xhead: heading left, lede right */}
      <Reveal>
        <Box className="mb-12 grid gap-6 max-[900px]:grid-cols-1 min-[901px]:grid-cols-[1.15fr_1fr] min-[901px]:items-end">
          <RichHeading
            as="h2"
            id="global-h"
            heading={data.heading}
            className="m-0 text-[clamp(32px,4vw,40px)] font-bold leading-[1.08] tracking-[-0.03em] text-paper"
            emphasisClassName="text-lime"
          />
          <Text as="p" className="m-0 text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-paper/72">
            {data.lede}
          </Text>
        </Box>
      </Reveal>

      {/* ggrid: scale cards left, map right */}
      <Reveal delay={1}>
        <Box className="grid items-stretch gap-6 max-[1200px]:grid-cols-1 min-[1201px]:grid-cols-[5fr_7fr]">

          {/* Left: scale cards */}
          <Box className="flex flex-col gap-4">
            {data.scaleHeading && (
              <Text as="h3" className="m-0 text-[18px] font-semibold leading-[1.3] text-paper">
                {data.scaleHeading}
              </Text>
            )}
            <Box className="flex flex-col gap-3">
              {data.scale.map(({ heading, lo, hi, icon }) => (
                <Box
                  key={heading}
                  className="flex items-start gap-4 rounded-[14px] border border-paper/[0.12] bg-navy-soft px-6 py-5 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(5,13,26,.5)]"
                >
                  <Box className="flex size-12 shrink-0 items-center justify-center rounded-[12px] bg-lime/10 text-lime">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
                      {SCALE_ICONS[icon] ?? SCALE_ICONS.users}
                    </svg>
                  </Box>
                  <Box className="min-w-0 flex-1">
                    <Text as="h4" className="m-0 mb-[14px] font-display text-[18px] font-bold leading-[1.3] tracking-[-0.01em] text-paper">
                      {heading}
                    </Text>
                    {/* Gradient bar */}
                    <Box
                      className="relative mx-[7px] h-[6px] rounded-full bg-gradient-to-r from-lime/22 to-lime"
                      role="img"
                      aria-label={`${heading}: from ${lo} to ${hi}`}
                    >
                      {/* Lo end dot */}
                      <Box className="absolute left-0 top-1/2 size-[14px] rounded-full border-2 border-paper/60 bg-navy-soft" style={{ transform: "translate(-50%,-50%)" }} />
                      {/* Hi end dot */}
                      <Box className="absolute right-0 top-1/2 size-[14px] rounded-full border-2 border-ink bg-lime shadow-[0_0_0_2px_#c8f135]" style={{ transform: "translate(50%,-50%)" }} />
                    </Box>
                    <Box className="mt-3 flex justify-between gap-3 text-[14px] text-paper/72">
                      <span>{lo}</span>
                      <span className="font-semibold text-paper">{hi}</span>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Right: world map */}
          <Box className="flex flex-col justify-center gap-4 rounded-[14px] border border-paper/[0.12] bg-navy-deep p-6">
            <Box aria-label="World map showing Edstellar delivery locations" className="overflow-hidden rounded-xl">
              <style>{`
                @keyframes wws-hub-pulse {
                  0%   { transform: scale(.5); opacity: 1; }
                  100% { transform: scale(1.6); opacity: 0; }
                }
                .wws-map .land { fill: #14233d; stroke: rgba(250,250,247,.12); stroke-width: 1; }
                .wws-map .cities circle { fill: #c8f135; opacity: .65; }
                .wws-map .hub .core { fill: #c8f135; }
                .wws-map .hub .ring {
                  fill: rgba(200,241,53,.22);
                  stroke: rgba(200,241,53,.65);
                  stroke-width: 1.5;
                  transform-box: fill-box;
                  transform-origin: center;
                  animation: wws-hub-pulse 2.8s ease infinite;
                  animation-delay: inherit;
                }
              `}</style>
              <Box className="wws-map">
                <WorldMap />
              </Box>
            </Box>
            {/* Legend */}
            <Box className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-paper/72" aria-hidden="true">
              <Box className="inline-flex items-center gap-2">
                <Box className="size-3 rounded-full bg-lime shadow-[0_0_0_4px_rgba(200,241,53,.22)]" />
                Major business hubs
              </Box>
              <Box className="inline-flex items-center gap-2">
                <Box className="size-1.5 rounded-full bg-lime/65" />
                Other business cities
              </Box>
            </Box>
          </Box>
        </Box>
      </Reveal>

      {/* Delivery modes */}
      <Reveal delay={2}>
        <Box
          as="ul"
          className="mt-6 grid list-none gap-3 p-0 grid-cols-3 max-[900px]:grid-cols-1"
        >
          {data.modes.map((mode) => (
            <Box
              as="li"
              key={mode.label}
              className="flex items-start gap-[14px] rounded-[14px] border border-paper/[0.12] px-5 py-4"
            >
              <Box className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-lime/10 text-lime">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
                  {MODE_ICONS[mode.icon]}
                </svg>
              </Box>
              <Box>
                <Text as="b" className="block text-[15px] font-semibold text-paper">{mode.label}</Text>
                <Text as="span" className="text-[14px] text-paper/72">{mode.desc}</Text>
              </Box>
            </Box>
          ))}
        </Box>
      </Reveal>
    </Section>
  );
}
