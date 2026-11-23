import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import HomeWrap from "@/components/sections/home/home-wrap";
import HomeSectionHead from "@/components/sections/home/home-section-head";

/**
 * "How to choose a learning and development partner." — a 3-column comparison
 * table: question | why it matters | how Edstellar answers (navy header).
 * On mobile the table scrolls horizontally; each row also stacks as cards
 * below the scroll breakpoint for a better reading experience.
 *
 * Design: `edstellar-homepage-ld-solutions.html` → `#choose`
 * (`.cmp.ask`, thead navy on last th, `.split-head`).
 */
export default function HomeChoose({ data }) {
  if (!data?.rows?.length) return null;
  const { heading, lede, col_question, col_why, col_answer, rows } = data;

  return (
    <HomeWrap
      id="choose"
      aria-labelledby="choose-heading"
      className="scroll-mt-16 border-y border-ink/8 bg-white py-20 max-lg:py-16"
    >
      <HomeSectionHead id="choose-heading" heading={heading} lede={lede} />

      {/* ── Desktop table (md+) ── */}
      <Reveal className="hidden overflow-x-auto md:block">
        <Box
          as="table"
          className="w-full min-w-[680px] border-collapse overflow-hidden rounded-[12px] border border-ink/12 bg-white text-[14px]"
        >
          <thead>
            <tr>
              <Box
                as="th"
                scope="col"
                className="border-b border-ink/8 bg-paper-warm px-4 py-3.5 text-left font-mono text-[10px] font-medium uppercase tracking-[0.07em] text-ink-muted"
              >
                {col_question}
              </Box>
              <Box
                as="th"
                scope="col"
                className="border-b border-ink/8 bg-paper-warm px-4 py-3.5 text-left font-mono text-[10px] font-medium uppercase tracking-[0.07em] text-ink-muted"
              >
                {col_why}
              </Box>
              <Box
                as="th"
                scope="col"
                className="bg-navy px-4 py-3.5 text-left font-mono text-[10px] font-medium uppercase tracking-[0.07em] text-lime"
              >
                {col_answer}
              </Box>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className={i % 2 === 1 ? "bg-paper-warm/40" : ""}>
                <Box
                  as="td"
                  className="border-t border-ink/8 px-4 py-3.5 align-top font-medium text-ink"
                >
                  {row.question}
                </Box>
                <Box
                  as="td"
                  className="border-t border-ink/8 px-4 py-3.5 align-top text-ink-muted"
                >
                  {row.why}
                </Box>
                <Box
                  as="td"
                  className="border-t border-ink/8 bg-paper-warm/60 px-4 py-3.5 align-top font-semibold text-ink"
                >
                  {row.answer}
                </Box>
              </tr>
            ))}
          </tbody>
        </Box>
      </Reveal>

      {/* ── Mobile cards (< md) ── */}
      <Box as="ul" className="m-0 flex list-none flex-col gap-4 p-0 md:hidden">
        {rows.map((row, i) => (
          <Reveal key={i} as="li" delay={i % 2} className="rounded-[12px] border border-ink/12 bg-white overflow-hidden">
            {/* Navy answer bar */}
            <Box className="bg-navy px-4 py-3">
              <Text as="span" className="mb-1 block font-mono text-[9px] font-medium uppercase tracking-[0.07em] text-lime">
                {col_answer}
              </Text>
              <Text as="p" className="m-0 text-[14px] font-semibold leading-[1.5] text-paper">
                {row.answer}
              </Text>
            </Box>
            {/* Question + why */}
            <Box className="px-4 py-3">
              <Text as="span" className="mb-1 block font-mono text-[9px] font-medium uppercase tracking-[0.07em] text-ink-muted">
                {col_question}
              </Text>
              <Text as="p" className="m-0 mb-3 text-[14px] font-medium leading-[1.5] text-ink">
                {row.question}
              </Text>
              <Text as="span" className="mb-1 block font-mono text-[9px] font-medium uppercase tracking-[0.07em] text-ink-muted">
                {col_why}
              </Text>
              <Text as="p" className="m-0 text-[13.5px] leading-[1.55] text-ink-muted">
                {row.why}
              </Text>
            </Box>
          </Reveal>
        ))}
      </Box>
    </HomeWrap>
  );
}
