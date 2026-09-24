import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils";

/*
 * Illustrative engine screens, one per TNA stage. They are decorative
 * (the figure wrapping them is aria-hidden) and animate on a shared 6s loop.
 *
 * Tailwind only generates classes it can see written out in full, and inline
 * styles are off the table, so every data-driven delay, width, height and
 * shade goes through one of the literal lookup maps below. A value missing
 * from a map simply renders without that class — add it here when the
 * content grows a new one.
 */

const DELAY = {
  0: "[animation-delay:0ms]",
  100: "[animation-delay:100ms]",
  120: "[animation-delay:120ms]",
  140: "[animation-delay:140ms]",
  200: "[animation-delay:200ms]",
  240: "[animation-delay:240ms]",
  250: "[animation-delay:250ms]",
  280: "[animation-delay:280ms]",
  300: "[animation-delay:300ms]",
  350: "[animation-delay:350ms]",
  420: "[animation-delay:420ms]",
  450: "[animation-delay:450ms]",
  500: "[animation-delay:500ms]",
  560: "[animation-delay:560ms]",
  600: "[animation-delay:600ms]",
  700: "[animation-delay:700ms]",
  750: "[animation-delay:750ms]",
  840: "[animation-delay:840ms]",
  850: "[animation-delay:850ms]",
  950: "[animation-delay:950ms]",
};

const BAR_WIDTH = {
  34: "w-[34%]",
  44: "w-[44%]",
  48: "w-[48%]",
  55: "w-[55%]",
  58: "w-[58%]",
  62: "w-[62%]",
  64: "w-[64%]",
  68: "w-[68%]",
  70: "w-[70%]",
  80: "w-[80%]",
  88: "w-[88%]",
};

const BAR_HEIGHT = {
  40: "h-[40%]",
  60: "h-[60%]",
  80: "h-[80%]",
  95: "h-[95%]",
};

/** Matrix cell shade by proficiency level — deeper navy means closer to need. */
const LEVEL_SHADE = {
  1: "bg-navy/32",
  2: "bg-navy/55",
  3: "bg-navy/78",
  4: "bg-navy",
};

const LEGEND_SHADE = {
  1: "bg-navy/32",
  3: "bg-navy/62",
  4: "bg-navy",
};

const PILL =
  "rounded-full bg-lime-soft font-mono text-[8.5px] leading-[1.7] tracking-[0.05em] text-navy uppercase";

function Screen({ title, bodyClassName, children }) {
  return (
    <Box className="w-full overflow-hidden rounded-[14px] border border-ink/12 bg-white shadow-rest">
      <Box className="flex items-center gap-2.5 border-b border-ink/12 px-4 py-3">
        <Box className="flex gap-[5px]">
          {[0, 1, 2].map((dot) => (
            <Box key={dot} as="i" className="size-2 rounded-full bg-ink/22" />
          ))}
        </Box>
        <Text
          as="span"
          className="font-display text-[13px] leading-[1.7] font-bold tracking-[-0.01em] text-ink"
        >
          {title}
        </Text>
        <Text
          as="span"
          className="ml-auto inline-flex items-center gap-1.5 font-mono text-[10px] leading-[1.7] tracking-[0.12em] text-ink/60 uppercase"
        >
          <Box as="b" className="size-[7px] animate-scr-pulse rounded-full bg-lime" />
          Live
        </Text>
      </Box>
      <Box className={cn("p-[18px]", bodyClassName)}>{children}</Box>
    </Box>
  );
}

function Subtitle({ children }) {
  return (
    <Text as="p" className="mb-3.5 text-[11.5px] leading-[1.45] text-ink/60">
      {children}
    </Text>
  );
}

function SetupScreen({ screen }) {
  return (
    <Screen title={screen.title}>
      <Box
        className="
          relative mb-[18px] flex justify-between
          before:absolute before:inset-x-1.5 before:top-1/2 before:h-0.5 before:-translate-y-1/2 before:bg-ink/22 before:content-['']
          after:absolute after:top-1/2 after:left-1.5 after:h-0.5 after:w-0 after:-translate-y-1/2 after:animate-scr-fill after:bg-navy after:content-['']
        "
      >
        {screen.wizard?.map((label, index) => (
          <Text
            key={label}
            as="span"
            className={cn(
              "relative z-1 rounded-full px-[9px] py-[5px] font-mono text-[9px] leading-[1.7] tracking-[0.04em] uppercase",
              index === 0 ? "bg-navy text-lime" : "bg-paper-warm text-ink/60",
            )}
          >
            {label}
          </Text>
        ))}
      </Box>

      <Box className="grid grid-cols-3 gap-[9px]">
        {screen.options?.map((option, index) => (
          <Text
            key={option}
            as="span"
            className={cn(
              "rounded-[9px] border bg-white px-2 py-3 text-center text-[11.5px] leading-[1.3] font-semibold text-ink",
              index === 0
                ? "animate-scr-ring border-navy shadow-[0_0_0_2px_rgba(10,22,40,0.1)]"
                : "border-ink/12",
            )}
          >
            {option}
          </Text>
        ))}
      </Box>

      {screen.seed_rows?.length ? (
        <Box className="mt-3.5 border-t border-ink/12 pt-3">
          <Text
            as="p"
            className="mb-2 font-mono text-[9px] leading-[1.7] tracking-[0.1em] text-ink/60 uppercase"
          >
            {screen.seed_heading}
          </Text>
          {screen.seed_rows.map((row) => (
            <Box
              key={row.label}
              className="flex items-center justify-between py-1 text-[12px] leading-[1.7]"
            >
              <Text as="span" className="text-[12px] leading-[1.7] text-ink/60">
                {row.label}
              </Text>
              <Text
                as="span"
                className="font-display text-[12px] leading-[1.7] font-bold text-ink"
              >
                {row.value}
              </Text>
            </Box>
          ))}
        </Box>
      ) : null}
    </Screen>
  );
}

function InputsScreen({ screen }) {
  return (
    <Screen title={screen.title}>
      {screen.subtitle ? <Subtitle>{screen.subtitle}</Subtitle> : null}
      <Box className="grid grid-cols-2 gap-2">
        {screen.cards?.map((card) => (
          <Box
            key={card.title}
            className="flex flex-col gap-0.5 rounded-[10px] border border-ink/12 bg-white px-3 py-[11px]"
          >
            <Text
              as="span"
              className="font-display text-[12px] leading-[1.2] font-bold tracking-[-0.01em] text-ink"
            >
              {card.title}
            </Text>
            <Text as="span" className="mt-1 text-[10.5px] leading-[1.3] text-ink/60">
              {card.description}
            </Text>
            {card.tag ? (
              <Text as="span" className={cn(PILL, "mt-1.5 self-start px-2 py-0.5 font-medium")}>
                {card.tag}
              </Text>
            ) : null}
          </Box>
        ))}
      </Box>
    </Screen>
  );
}

function MatrixScreen({ screen }) {
  return (
    <Screen
      title={screen.title}
      bodyClassName="
        relative overflow-hidden
        after:pointer-events-none after:absolute after:inset-0 after:animate-scr-scan after:content-['']
        after:bg-[linear-gradient(105deg,transparent_42%,rgba(255,255,255,0.5)_50%,transparent_58%)]
      "
    >
      <Box as="table" className="w-full table-fixed border-separate border-spacing-[5px]">
        <Box as="thead">
          <Box as="tr">
            <Box as="th" className="w-[92px]" />
            {screen.columns?.map((column) => (
              <Box
                as="th"
                key={column}
                className="pb-0.5 text-center font-mono text-[9.5px] font-medium tracking-[0.05em] text-ink/60 uppercase"
              >
                {column}
              </Box>
            ))}
          </Box>
        </Box>
        <Box as="tbody">
          {screen.rows?.map((row, rowIndex) => (
            <Box as="tr" key={row.label}>
              <Box
                as="td"
                className="w-[92px] pr-2 text-left text-[12px] font-semibold whitespace-nowrap text-ink"
              >
                {row.label}
              </Box>
              {row.levels.map((level, colIndex) => (
                <Box
                  as="td"
                  key={colIndex}
                  className={cn(
                    "h-[26px] animate-scr-cell rounded-[5px] text-center align-middle font-display text-[12px] font-bold text-paper",
                    LEVEL_SHADE[level],
                    DELAY[(rowIndex + colIndex) * 140],
                  )}
                >
                  {level}
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>

      {screen.legend?.length ? (
        <Box className="mt-3 flex flex-wrap gap-3.5">
          {screen.legend.map((item) => (
            <Text
              key={item.label}
              as="span"
              className="inline-flex items-center gap-1.5 text-[10.5px] leading-[1.7] text-ink/60"
            >
              <Box
                as="i"
                className={cn("size-3 flex-none rounded-[3px]", LEGEND_SHADE[item.level])}
              />
              {item.label}
            </Text>
          ))}
        </Box>
      ) : null}

      {screen.note ? (
        <Text as="p" className="mt-2.5 text-[11.5px] leading-[1.45] text-ink/60">
          <Box as="b" className="text-ink">
            {screen.note_strong}
          </Box>{" "}
          {screen.note}
        </Text>
      ) : null}
    </Screen>
  );
}

function ReportScreen({ screen }) {
  const kicker =
    "mb-2 font-mono text-[9.5px] leading-[1.7] tracking-[0.1em] text-ink/60 uppercase";

  return (
    <Screen title={screen.title}>
      <Box className="mb-4 grid grid-cols-3 gap-3 border-b border-ink/12 pb-3.5">
        {screen.metrics?.map((metric) => (
          <Box key={metric.label}>
            <Text
              as="span"
              className="block font-display text-[22px] leading-[1.1] font-bold text-ink"
            >
              {metric.value}
            </Text>
            <Text as="span" className="text-[10.5px] leading-[1.7] text-ink/60">
              {metric.label}
            </Text>
          </Box>
        ))}
      </Box>

      <Text as="p" className={kicker}>
        {screen.priorities_heading}
      </Text>
      <Box as="ul" className="mb-4 list-none p-0">
        {screen.priorities?.map((priority, index) => (
          <Box
            as="li"
            key={priority}
            className={cn(
              "animate-scr-slide border-b border-ink/12 py-2 text-[12.5px] leading-[1.7] text-ink last:border-b-0",
              DELAY[index * 120],
            )}
          >
            {priority}
          </Box>
        ))}
      </Box>

      <Text as="p" className={kicker}>
        {screen.domains_heading}
      </Text>
      <Box className="flex h-[74px] items-end gap-2.5">
        {screen.domains?.map((domain, index) => (
          <Box
            key={domain.label}
            className="flex h-full flex-1 flex-col items-center justify-end gap-[5px]"
          >
            <Box
              as="span"
              className={cn(
                "w-full origin-bottom animate-scr-bar-up rounded-t-[4px]",
                index === 0 ? "bg-lime" : "bg-navy",
                BAR_HEIGHT[domain.value],
                DELAY[index * 100],
              )}
            />
            <Text as="span" className="text-center text-[9px] leading-[1.15] text-ink/60">
              {domain.label}
            </Text>
          </Box>
        ))}
      </Box>

      {screen.evidence || screen.tag ? (
        <Box className="mt-3.5 flex flex-wrap items-center justify-between gap-2 border-t border-ink/12 pt-3">
          <Text as="span" className="text-[11px] leading-[1.7] text-ink/60">
            {screen.evidence}
          </Text>
          <Text as="span" className={cn(PILL, "px-2.5 py-1")}>
            {screen.tag}
          </Text>
        </Box>
      ) : null}
    </Screen>
  );
}

function RoadmapScreen({ screen }) {
  return (
    <Screen title={screen.title}>
      {screen.subtitle ? <Subtitle>{screen.subtitle}</Subtitle> : null}
      <Box className="grid grid-cols-4 gap-3 max-sm:grid-cols-2">
        {screen.quarters?.map((quarter, quarterIndex) => (
          <Box key={quarter.label} className="rounded-[10px] bg-paper-warm px-3 pt-3 pb-3.5">
            <Text
              as="span"
              className="font-mono text-[10px] leading-[1.7] tracking-[0.08em] text-ink/60 uppercase"
            >
              {quarter.label}
            </Text>
            {quarter.programs.map((program, index) => (
              <Box key={program.name} className="mt-2.5">
                <Text
                  as="span"
                  className="mb-[5px] block text-[10.5px] leading-[1.7] font-semibold tracking-[-0.01em] text-ink"
                >
                  {program.name}
                </Text>
                <Box
                  as="span"
                  className={cn(
                    "block h-[11px] origin-left animate-scr-bar-in rounded-[4px]",
                    index === 0 ? "bg-lime" : "bg-navy",
                    BAR_WIDTH[program.value],
                    DELAY[quarterIndex * 250 + index * 100],
                  )}
                />
              </Box>
            ))}
          </Box>
        ))}
      </Box>
      {screen.footnote ? (
        <Text as="p" className="mt-3 text-[11px] leading-[1.7] text-ink/60">
          {screen.footnote}
        </Text>
      ) : null}
    </Screen>
  );
}

function CalendarScreen({ screen }) {
  const events = new Map(screen.events?.map((event) => [event.day, event.label]));
  const days = Array.from({ length: screen.days || 0 }, (_, index) => index + 1);

  return (
    <Screen title={screen.title}>
      <Box className="mb-3 flex items-center gap-2 font-display text-[14px] leading-[1.7] font-bold text-ink">
        {screen.month}
        <Text as="span" className="text-[12px] leading-[1.7] font-normal text-ink/60">
          {screen.year}
        </Text>
        {screen.sync_label ? (
          <Text as="span" className={cn(PILL, "ml-auto px-[9px] py-[3px]")}>
            {screen.sync_label}
          </Text>
        ) : null}
      </Box>

      <Box className="mb-1.5 grid grid-cols-5 gap-1.5">
        {screen.weekdays?.map((weekday) => (
          <Text
            key={weekday}
            as="span"
            className="text-center font-mono text-[8.5px] leading-[1.7] tracking-[0.05em] text-ink/60 uppercase"
          >
            {weekday}
          </Text>
        ))}
      </Box>

      <Box className="grid grid-cols-5 gap-1.5">
        {days.map((day) => {
          const event = events.get(day);
          return (
            <Box
              key={day}
              className={cn(
                "relative h-[58px] overflow-hidden rounded-[6px]",
                event ? "bg-lime-soft" : "bg-paper-warm",
              )}
            >
              <Text
                as="span"
                className="absolute top-1 left-1.5 text-[9px] leading-[1.7] font-semibold text-ink/60"
              >
                {day}
              </Text>
              {event ? (
                <Text
                  as="span"
                  className="absolute inset-x-1.5 bottom-[5px] max-h-5 overflow-hidden font-display text-[8px] leading-[1.15] font-bold tracking-[-0.01em] text-navy"
                >
                  {event}
                </Text>
              ) : null}
            </Box>
          );
        })}
      </Box>
    </Screen>
  );
}

const SCREENS = {
  setup: SetupScreen,
  inputs: InputsScreen,
  matrix: MatrixScreen,
  report: ReportScreen,
  roadmap: RoadmapScreen,
  calendar: CalendarScreen,
};

export default function TnaStageScreen({ screen }) {
  const Component = screen && SCREENS[screen.type];
  return Component ? <Component screen={screen} /> : null;
}
