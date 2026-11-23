import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import HomeWrap from "@/components/sections/home/home-wrap";
import HomeSectionHead from "@/components/sections/home/home-section-head";

/**
 * "One L&D partner for every location and language." — four delivery points
 * on the left in a 2×2 grid, regions card on the right showing every region
 * with format pills and languages.
 *
 * Design: `edstellar-homepage-ld-solutions.html` → `#global`
 * (`.glob`, `.pts`, `.pt`, `.regions`, `.rg`, `.pills`).
 */
export default function HomeGlobal({ data }) {
  if (!data?.points?.length) return null;
  const { heading, lede, points, regions_label, regions_chip, regions, languages_label, languages } = data;

  return (
    <HomeWrap
      id="global"
      aria-labelledby="global-heading"
      className="scroll-mt-16 bg-paper-warm py-20 max-lg:py-16"
    >
      <HomeSectionHead id="global-heading" heading={heading} lede={lede} />

      {/* Two-column: 4 points left, regions card right */}
      <Box className="grid items-start gap-14 lg:grid-cols-[1.1fr_0.9fr]">

        {/* 4 delivery points — 2×2 grid */}
        <Box as="ul" className="m-0 grid list-none grid-cols-1 gap-x-[34px] gap-y-[30px] p-0 min-[560px]:grid-cols-2">
          {points.map((pt, i) => (
            <Reveal key={pt.title} as="li" delay={i % 2}>
              <Box className="mb-3.5 h-[2px] w-6 bg-lime" aria-hidden="true" />
              <Text as="h3" className="mb-2 text-[19px] font-medium leading-[1.3] tracking-[-0.02em] text-ink">
                {pt.title}
              </Text>
              <Text as="p" className="m-0 text-[14px] leading-[1.6] text-ink-muted">
                {pt.text}
              </Text>
            </Reveal>
          ))}
        </Box>

        {/* Regions card */}
        <Reveal delay={1}>
          <Box className="rounded-[14px] border border-ink/12 bg-white px-6 py-[22px]">

            {/* Card header */}
            <Box className="mb-1 flex items-center justify-between gap-3">
              <Text as="span" className="font-mono text-[9.5px] font-medium uppercase tracking-[0.1em] text-ink-muted">
                {regions_label}
              </Text>
              <Box
                as="span"
                className="rounded-full border border-ink/12 px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.05em] text-ink"
              >
                {regions_chip}
              </Box>
            </Box>

            {/* Region rows */}
            {regions?.map((region) => (
              <Box
                key={region.name}
                className="flex items-center justify-between gap-3 border-t border-ink/8 py-[13px]"
              >
                <Text as="span" className="text-[15px] font-medium leading-tight text-ink">
                  {region.name}
                </Text>
                <Box as="ul" className="m-0 flex list-none flex-wrap gap-1.5 p-0">
                  {region.formats.map((f) => (
                    <Box
                      as="li"
                      key={f}
                      className="rounded-full bg-paper-warm px-2.5 py-1 text-[11.5px] leading-none text-ink"
                    >
                      {f}
                    </Box>
                  ))}
                </Box>
              </Box>
            ))}

            {/* Languages footer */}
            {languages?.length > 0 && (
              <Box className="border-t border-ink/8 pt-3.5">
                <Text as="span" className="mb-2 block font-mono text-[9px] font-medium uppercase tracking-[0.07em] text-ink-muted">
                  {languages_label}
                </Text>
                <Box as="ul" className="m-0 flex list-none flex-wrap gap-1.5 p-0">
                  {languages.map((lang) => (
                    <Box
                      as="li"
                      key={lang}
                      className="rounded-full border border-ink/12 bg-white px-2.5 py-1 text-[12px] leading-none text-ink"
                    >
                      {lang}
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </Reveal>
      </Box>
    </HomeWrap>
  );
}
