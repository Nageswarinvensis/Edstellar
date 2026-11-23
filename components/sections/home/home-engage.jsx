import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import HomeWrap from "@/components/sections/home/home-wrap";
import HomeSectionHead from "@/components/sections/home/home-section-head";

/**
 * "Start small. Scale when you're ready." — three engagement model cards:
 * one program, a yearly plan, or full managed L&D. The third card is featured
 * (navy background). Scrolled to by the hero's "See how to start" CTA.
 *
 * Design: `edstellar-homepage-ld-solutions.html` → `#engage`
 * (`.engage`, `.card`, `.card.feat`, `.best`, `.chip`).
 */
export default function HomeEngage({ data }) {
  if (!data?.items?.length) return null;
  const { heading, lede, items } = data;

  return (
    <HomeWrap
      id="engage"
      aria-labelledby="engage-heading"
      className="scroll-mt-16 border-y border-ink/8 bg-white py-20 max-lg:py-16"
    >
      <HomeSectionHead id="engage-heading" heading={heading} lede={lede} />

      <Box as="ul" className="m-0 grid list-none grid-cols-1 gap-[18px] p-0 md:grid-cols-3">
        {items.map((item, i) => (
          <Reveal
            key={item.title}
            as="li"
            delay={i}
            className={`flex flex-col rounded-[14px] border p-[26px] ${
              item.featured
                ? "border-navy bg-navy text-paper"
                : "border-ink/12 bg-white"
            }`}
          >
            {/* Chip */}
            <Box
              as="span"
              className={`self-start rounded-[6px] px-[9px] py-[6px] font-mono text-[10px] font-medium uppercase leading-none tracking-[0.07em] ${
                item.featured ? "bg-lime text-navy" : "bg-paper-warm text-ink"
              }`}
            >
              {item.chip}
            </Box>

            {/* Title */}
            <Text
              as="h3"
              className={`mb-2.5 mt-4 text-[23px] font-medium leading-[1.2] tracking-[-0.02em] ${
                item.featured ? "text-paper" : "text-ink"
              }`}
            >
              {item.title}
            </Text>

            {/* Description */}
            <Text
              as="p"
              className={`m-0 flex-1 text-[14px] leading-[1.6] ${
                item.featured ? "text-paper/72" : "text-ink-muted"
              }`}
            >
              {item.text}
            </Text>

            {/* Best for */}
            {item.best_for && (
              <Box
                className={`mt-[18px] border-t pt-[14px] text-[13.5px] leading-[1.5] ${
                  item.featured ? "border-paper/14" : "border-ink/8"
                }`}
              >
                <Text
                  as="span"
                  className={`mb-1.5 block font-mono text-[9px] font-medium uppercase leading-none tracking-[0.07em] ${
                    item.featured ? "text-paper/50" : "text-ink-muted"
                  }`}
                >
                  Best for
                </Text>
                <span className={item.featured ? "text-paper/80" : "text-ink"}>
                  {item.best_for}
                </span>
              </Box>
            )}

            {/* CTA link */}
            {item.href && item.cta && (
              <Box
                as="a"
                href={item.href}
                className={`mt-[18px] inline-flex items-center gap-2 font-mono text-[10.5px] font-medium uppercase tracking-[0.07em] ${
                  item.featured ? "text-lime" : "text-ink"
                }`}
              >
                {item.cta}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Box>
            )}
          </Reveal>
        ))}
      </Box>
    </HomeWrap>
  );
}
