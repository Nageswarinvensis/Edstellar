import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import InlineHtml from "@/components/common/inline-html";
import HomeWrap from "@/components/sections/home/home-wrap";
import HomeSectionHead from "@/components/sections/home/home-section-head";
import { cn } from "@/lib/utils";

const MONO_LABEL = "font-mono text-[10px] font-medium uppercase tracking-[0.07em] text-ink-muted";

/**
 * "What is workforce capability development?" — the short definition (for
 * search and AI answers) beside a comparison table: training on its own vs
 * capability development, the second column emphasised. Row labels are
 * `<th scope="row">` so the comparison reads as a real table.
 *
 * Design: `edstellar-homepage-capability-development.html` → `#what-is`
 * (`.split-head`, `.def`, `.answer`, `.more`, `.cmp`).
 */
export default function HomeDefinition({ data }) {
  if (!data) return null;
  const { heading, lede, answer, more, comparison } = data;
  const columns = comparison?.columns ?? [];
  const rows = comparison?.rows ?? [];

  return (
    <HomeWrap
      id="what-is"
      aria-labelledby="what-is-heading"
      className="scroll-mt-16 border-y border-ink/12 bg-white py-20 max-lg:py-16"
    >
      <HomeSectionHead id="what-is-heading" heading={heading} lede={lede} />

      <Box className="grid items-start gap-14 max-lg:gap-10 lg:grid-cols-2">
        <Reveal>
          {answer && (
            <Text as="p" className="m-0 text-[21px] leading-[1.55] tracking-[-0.005em] text-ink [&_strong]:font-semibold max-sm:text-[18px]">
              <InlineHtml text={answer} />
            </Text>
          )}
          {more && (
            <Text as="p" className="mt-[18px] mb-0 text-[15.5px] leading-[1.65] text-ink-muted">
              {more}
            </Text>
          )}
        </Reveal>

        {rows.length > 0 && (
          <Reveal delay={1} className="min-w-0 overflow-x-auto rounded-xl border border-ink/12 bg-white">
            <table className="w-full min-w-[460px] border-collapse text-left text-[14px] leading-[1.5] text-ink max-sm:min-w-0 max-sm:text-[13px]">
              <thead>
                <tr>
                  <th scope="col" className={cn("bg-paper-warm px-4 py-[13px] max-sm:px-3", MONO_LABEL)}>
                    <span className="sr-only">Compared on</span>
                  </th>
                  {columns.map((column, i) => (
                    <th
                      key={column}
                      scope="col"
                      className={cn(
                        "px-4 py-[13px] font-mono text-[10px] font-medium uppercase tracking-[0.07em] max-sm:px-3",
                        i === columns.length - 1 ? "bg-navy text-lime" : "bg-paper-warm text-ink-muted",
                      )}
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row" className={cn("w-[110px] border-t border-ink/8 px-4 py-[13px] align-top max-sm:w-[76px] max-sm:px-3", MONO_LABEL)}>
                      {row.label}
                    </th>
                    {row.values.map((value, i) => (
                      <td
                        key={i}
                        className={cn(
                          "border-t border-ink/8 px-4 py-[13px] align-top max-sm:px-3",
                          i === row.values.length - 1 && "bg-[color-mix(in_srgb,var(--color-lime)_6%,white)] font-semibold",
                        )}
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        )}
      </Box>
    </HomeWrap>
  );
}
