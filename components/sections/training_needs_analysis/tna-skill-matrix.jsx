import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import TnaMatrixToggle from "./tna-matrix-toggle";
import { cn } from "@/lib/utils";

/*
 * Hero skill matrix, illustrative. Each cell carries both views — its gap
 * severity and the required proficiency level — and `data-view` on the
 * `group/matrix` root decides which one shows. The toggle is the only
 * client code; every label, number and tooltip is in the server HTML.
 *
 * As with the stage screens, data-driven colours go through literal lookup
 * maps so Tailwind can see every class written out in full. That includes
 * the `group-data-[view=req]/matrix:` prefix — building it from a template
 * string hides the class from Tailwind and it is silently never generated.
 */

const GAP_CELL = {
  none: "bg-lime-soft text-navy",
  mild: "bg-lime text-navy",
  crit: "bg-navy text-lime",
};

const REQ_CELL = {
  1: "group-data-[view=req]/matrix:bg-lime-soft group-data-[view=req]/matrix:text-navy",
  2: "group-data-[view=req]/matrix:bg-lime group-data-[view=req]/matrix:text-navy",
  3: "group-data-[view=req]/matrix:bg-navy-soft group-data-[view=req]/matrix:text-lime",
  4: "group-data-[view=req]/matrix:bg-navy group-data-[view=req]/matrix:text-lime",
};

const GAP_SWATCH = {
  none: "bg-lime-soft",
  mild: "bg-lime",
  crit: "bg-navy",
};

const REQ_SWATCH = {
  1: "bg-lime-soft",
  2: "bg-lime",
  3: "bg-navy-soft",
  4: "bg-navy",
};

/** Shown in the gap view, hidden in the required-level view — and the reverse. */
const IN_GAP_VIEW = "group-data-[view=req]/matrix:hidden";
const IN_REQ_VIEW = "hidden group-data-[view=req]/matrix:flex";

const LEGEND_CLASS = "mt-4 list-none flex-wrap gap-4 p-0";
const LEGEND_ITEM = "flex items-center gap-[7px] text-[12px] leading-[1.7] text-ink/60";

function Cell({ row, column, cell, gapLevels, reqLabel }) {
  const gap = gapLevels[cell.gap];
  const gapTip = `${row} · ${column} · ${gap.label}`;
  const reqTip = `${row} · ${column} · ${reqLabel} ${cell.req}`;

  return (
    <Box
      as="span"
      role="img"
      aria-label={`${row}, ${column}: ${gap.label.toLowerCase()}, ${reqLabel.toLowerCase()} ${cell.req}`}
      className={cn(
        "group/cell relative h-[34px] cursor-default rounded-[6px] transition-[translate,scale,box-shadow] duration-200",
        "hover:z-5 hover:-translate-y-[3px] hover:scale-105 hover:shadow-lift",
        "motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100",
        GAP_CELL[cell.gap],
        REQ_CELL[cell.req],
      )}
    >
      {[
        [gap.value, IN_GAP_VIEW],
        [cell.req, IN_REQ_VIEW],
      ].map(([value, visibility], index) => (
        <Box
          key={index}
          as="b"
          aria-hidden="true"
          className={cn(
            "absolute inset-0 items-center justify-center font-display text-[13px] font-bold",
            index === 0 ? "flex" : "",
            visibility,
          )}
        >
          {value}
        </Box>
      ))}

      {/* Tooltip: arrow, then the label for whichever view is active. */}
      <Box
        as="span"
        aria-hidden="true"
        className="invisible absolute bottom-[calc(100%+4px)] left-1/2 z-20 size-[9px] -translate-x-1/2 rotate-45 bg-navy opacity-0 transition-opacity duration-150 group-hover/cell:visible group-hover/cell:opacity-100"
      />
      <Box
        as="span"
        aria-hidden="true"
        className="invisible absolute bottom-[calc(100%+9px)] left-1/2 z-20 -translate-x-1/2 rounded-[7px] bg-navy px-[11px] py-[7px] font-body text-[12px] leading-[1.3] whitespace-nowrap text-paper opacity-0 shadow-lift transition-opacity duration-150 group-hover/cell:visible group-hover/cell:opacity-100"
      >
        <Box as="span" className={IN_GAP_VIEW}>
          {gapTip}
        </Box>
        <Box as="span" className={IN_REQ_VIEW}>
          {reqTip}
        </Box>
      </Box>
    </Box>
  );
}

export default function TnaSkillMatrix({ data }) {
  if (!data?.rows?.length) return null;

  const defaultView = data.views?.[0]?.id ?? "gap";
  const gapLevels = data.gap_levels ?? {};

  return (
    <Box
      as="aside"
      aria-label={data.aria_label}
      data-matrix
      data-view={defaultView}
      className="group/matrix rounded-[14px] border border-ink/12 bg-white px-[22px] pt-[22px] pb-5 shadow-rest"
    >
      <Box className="flex items-center justify-between gap-3">
        <Text
          as="p"
          className="m-0 font-display text-[15px] leading-[1.7] font-bold tracking-[-0.01em] text-ink"
        >
          {data.label}
        </Text>
        {data.views?.length ? (
          <TnaMatrixToggle views={data.views} defaultView={defaultView} />
        ) : null}
      </Box>

      {data.note ? (
        <Text as="p" className="mt-[3px] mb-4 text-[11.5px] leading-[1.7] text-ink/60">
          {data.note}
        </Text>
      ) : null}

      <Box className="grid grid-cols-[78px_repeat(4,1fr)] items-center gap-[5px]">
        <Box as="span" />
        {data.columns?.map((column) => (
          <Text
            key={column}
            as="span"
            className="text-center font-mono text-[10px] leading-[1.7] tracking-[0.06em] text-ink/60 uppercase"
          >
            {column}
          </Text>
        ))}

        {data.rows.map((row) => [
          <Text
            key={row.label}
            as="span"
            className="text-[12px] leading-[1.2] font-semibold text-ink"
          >
            {row.label}
          </Text>,
          ...row.cells.map((cell, index) => (
            <Cell
              key={`${row.label}-${index}`}
              row={row.label}
              column={data.columns[index]}
              cell={cell}
              gapLevels={gapLevels}
              reqLabel={data.req_label}
            />
          )),
        ])}
      </Box>

      <Box as="ul" className={cn(LEGEND_CLASS, "flex", IN_GAP_VIEW)}>
        {Object.entries(gapLevels).map(([key, level]) => (
          <Box as="li" key={key} className={LEGEND_ITEM}>
            <Box as="span" className={cn("size-4 flex-none rounded-[4px]", GAP_SWATCH[key])} />
            {level.label}
          </Box>
        ))}
      </Box>

      <Box as="ul" className={cn(LEGEND_CLASS, IN_REQ_VIEW)}>
        {data.req_levels?.map((level) => (
          <Box as="li" key={level} className={LEGEND_ITEM}>
            <Box as="span" className={cn("size-4 flex-none rounded-[4px]", REQ_SWATCH[level])} />
            {level}
          </Box>
        ))}
        {data.req_caption ? (
          <Box as="li" className={cn(LEGEND_ITEM, "text-[11.5px] leading-[1.7]")}>
            {data.req_caption}
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}
