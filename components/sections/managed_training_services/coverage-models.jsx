import Link from "next/link";
import { Check } from "lucide-react";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import { cn } from "@/lib/utils";

/**
 * A model's coverage: the set of "ROW:Column" cells it covers (`"all"` for
 * every cell — the CMS sends it as `["all"]`), and which row/column headers
 * to highlight — any header with a covered cell, except on the featured card,
 * which is all covered anyway.
 */
function coverageOf(model, rows, columns) {
  const all = model.cells === "all" || (model.cells?.length === 1 && model.cells[0] === "all");
  const on = new Set(
    all
      ? rows.flatMap((row) => columns.map((column) => `${row}:${column}`))
      : model.cells ?? [],
  );
  const hotRows = new Set();
  const hotColumns = new Set();
  if (!model.featured) {
    for (const key of on) {
      const [row, column] = key.split(":");
      hotRows.add(row);
      hotColumns.add(column);
    }
  }
  return { on, hotRows, hotColumns };
}

function CoverageMap({ model, data }) {
  const { rows, columns, coverage_label, count_suffix, example_label } = data;
  const { on, hotRows, hotColumns } = coverageOf(model, rows, columns);
  const total = rows.length * columns.length;
  const dark = model.featured;
  const headerClass = (hot) =>
    cn(
      "font-mono text-[8.5px] leading-none tracking-[0.02em] uppercase",
      dark ? "text-paper/75" : hot ? "font-medium text-navy" : "text-ink/60",
    );

  return (
    <Box
      role="img"
      aria-label={`${coverage_label}: ${on.size} of ${total} ${count_suffix}. ${example_label} ${model.example}.`}
      className={cn(
        "rounded-xl border px-3 pt-3 pb-2.5",
        dark ? "border-navy bg-navy" : "border-ink/12 bg-paper",
      )}
    >
      <Box aria-hidden="true" className="mb-2.5 flex items-center justify-between">
        <Text
          as="span"
          className={cn(
            "font-mono text-[9.5px] tracking-[0.1em] uppercase",
            dark ? "text-paper/60" : "text-ink/60",
          )}
        >
          {coverage_label}
        </Text>
        <Text
          as="span"
          className={cn(
            "rounded-full px-2.25 py-0.75 font-display text-[12px] leading-[1.3] font-bold whitespace-nowrap text-navy",
            dark ? "bg-lime" : "bg-lime-soft",
          )}
        >
          {on.size} of {total} {count_suffix}
        </Text>
      </Box>

      <Box aria-hidden="true" className="grid grid-cols-[34px_repeat(6,1fr)] items-center gap-1">
        <span />
        {columns.map((column) => (
          <span key={column} className={cn(headerClass(hotColumns.has(column)), "text-center")}>
            {column}
          </span>
        ))}
        {rows.map((row) => (
          <Box key={row} className="contents">
            <span className={cn(headerClass(hotRows.has(row)), "text-left")}>{row}</span>
            {columns.map((column) => {
              const isOn = on.has(`${row}:${column}`);
              return (
                <i
                  key={column}
                  className={cn(
                    "block aspect-[1.15] rounded-[4px]",
                    dark
                      ? isOn
                        ? "bg-lime"
                        : "bg-paper/15"
                      : isOn
                        ? "bg-navy"
                        : "bg-ink/12",
                  )}
                />
              );
            })}
          </Box>
        ))}
      </Box>

      {model.example ? (
        <Text
          as="p"
          aria-hidden="true"
          className={cn(
            "mt-2.5 border-t border-dashed pt-2.25 text-[12px] leading-[1.4]",
            dark ? "border-paper/22 text-paper" : "border-ink/22 text-ink",
          )}
        >
          <span
            className={cn(
              "mr-1.5 font-mono text-[9px] tracking-[0.1em] uppercase",
              dark ? "text-paper/60" : "text-ink/60",
            )}
          >
            {example_label}
          </span>
          {model.example}
        </Text>
      ) : null}
    </Box>
  );
}

/**
 * "Training outsourcing at the scope you choose": four model cards, each with
 * a coverage map (business units × regions, covered cells filled), what is
 * included and who it suits. The organization-wide card is the featured one —
 * navy map, lime cells, navy border.
 *
 * Design: managed-training-services `#models`, `.cv`, `.cv-card`, `.cv-map`, `.cv-grid`.
 */
export default function CoverageModels({ data }) {
  if (!data?.items?.length) return null;

  const { section_id, heading, description, items, best_label, note } = data;

  return (
    <Section id={section_id} className="bg-paper-warm">
      <Box className="mb-12 max-w-[760px]">
        <Reveal>
          <RichHeading heading={heading} emphasisClassName="font-normal" />
        </Reveal>
        {description ? (
          <Reveal delay={1}>
            <Text
              as="p"
              className="mt-4 max-w-[64ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink/60"
            >
              {description}
            </Text>
          </Reveal>
        ) : null}
      </Box>

      <Box className="grid grid-cols-4 gap-4 max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1">
        {items.map((model, index) => (
          <Reveal key={model.title} delay={Math.min(index + 1, 4)} className="h-full">
            <Box
              className={cn(
                "flex h-full flex-col rounded-[14px] border bg-white px-4.5 py-5 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.75 hover:shadow-lift motion-reduce:hover:translate-y-0",
                model.featured ? "border-navy shadow-lift" : "border-ink/12",
              )}
            >
              <CoverageMap model={model} data={data} />

              <Text as="h3" className="mt-4.5 mb-1.5 text-[18px] leading-[1.3] tracking-[-0.01em]">
                {model.title}
              </Text>
              {model.summary ? (
                <Text as="p" className="mb-3.5 text-[14px] leading-[1.5] text-ink/60">
                  {model.summary}
                </Text>
              ) : null}

              {model.points?.length ? (
                <Box as="ul" className="mb-4 flex list-none flex-col gap-2 p-0">
                  {model.points.map((point) => (
                    <Box
                      as="li"
                      key={point}
                      className="flex gap-2.25 text-[13.5px] leading-[1.4] text-ink"
                    >
                      <span
                        aria-hidden="true"
                        className="flex size-4.5 flex-none items-center justify-center rounded-full bg-lime-soft text-navy"
                      >
                        <Check size={10} strokeWidth={3} />
                      </span>
                      {point}
                    </Box>
                  ))}
                </Box>
              ) : null}

              {model.best_for ? (
                <Text
                  as="p"
                  className="mt-auto border-t border-ink/12 pt-3 text-[13px] leading-[1.45] text-ink"
                >
                  <span className="mb-0.75 block font-mono text-[9.5px] tracking-[0.12em] text-ink/60 uppercase">
                    {best_label}
                  </span>
                  {model.best_for}
                </Text>
              ) : null}
            </Box>
          </Reveal>
        ))}
      </Box>

      {note?.href ? (
        <Text as="p" className="mt-6 text-center text-[14px] leading-[1.6] text-ink/60">
          {note.text}{" "}
          <Link href={note.href} className="font-semibold text-ink underline underline-offset-2 hover:text-olive">
            {note.link_label}
          </Link>
          .
        </Text>
      ) : null}
    </Section>
  );
}
