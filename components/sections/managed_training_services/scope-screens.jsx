import { ArrowRight, Check, Lock } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { Screen } from "@/components/sections/consulting/stage-screens";
import { cn } from "@/lib/utils";

/*
 * The seven "what we manage" screens, one per managed service. Decorative —
 * the figure wrapping them is aria-hidden — and registered with `StageSteps`
 * by `screen.type`, alongside the TNA engine screens.
 *
 * Every element sits above the scan sweep (`relative z-1`), as in the design.
 * Tailwind only generates classes it can see written out in full and inline
 * styles are off the table, so data-driven widths and heights go through the
 * literal maps below; a value missing from a map renders without that class.
 *
 * Design: `managed-learning-services (40).html` → `#scope`, `.o3-*`, `.cx-*`,
 * `.tn-*`, `.cov-*`, `.wk-*`, `.mo-*`, `.adb-*`, `.tt-*`.
 */

const FILL_WIDTH = {
  58: "w-[58%]",
  72: "w-[72%]",
  90: "w-[90%]",
};

const BAR_HEIGHT = {
  52: "h-[52%]",
  64: "h-[64%]",
  78: "h-[78%]",
  92: "h-[92%]",
};

const LAYER = "relative z-1";
const MONO = "font-mono uppercase";
const TILE = "rounded-[9px] border border-ink/12 bg-paper-warm";

/** Section label inside a screen; `divided` adds the rule above a second block. */
function Label({ divided, className, children }) {
  return (
    <Text
      as="p"
      className={cn(
        LAYER,
        MONO,
        "mb-3.5 text-[10px] font-medium tracking-[0.08em] text-ink",
        divided && "mt-5 border-t border-ink/12 pt-[18px]",
        className,
      )}
    >
      {children}
    </Text>
  );
}

function ScopeScreen({ screen, children }) {
  return (
    <Screen title={screen.title} variant="scope" bodyClassName="leading-[1.7]">
      {children}
    </Screen>
  );
}

/* 1 · Learning strategy — the strategy-on-a-page document. */
function StrategyScreen({ screen }) {
  return (
    <ScopeScreen screen={screen}>
      <Box className={cn(LAYER, "overflow-hidden rounded-[10px] border border-ink/12 bg-white")}>
        <Box className="flex items-baseline justify-between bg-navy px-4 py-3 text-paper">
          <Text as="span" className="font-display text-[14px] font-bold tracking-[-0.01em] text-paper">
            {screen.doc_title}
          </Text>
          <Text as="span" className="font-mono text-[10px] tracking-[0.08em] text-lime">
            {screen.doc_tag}
          </Text>
        </Box>

        {screen.rows?.map((row) => (
          <Box key={row.label} className="border-b border-ink/12 px-4 py-3 last:border-b-0">
            <Text as="p" className={cn(MONO, "mb-1.5 text-[10px] font-medium tracking-[0.08em] text-ink")}>
              {row.label}
            </Text>

            {row.text ? (
              <Text as="p" className="text-[13px] leading-[1.4] text-ink">
                {row.text}
              </Text>
            ) : null}

            {row.chips?.length ? (
              <Box className="flex flex-wrap gap-1.5">
                {row.chips.map((chip) => (
                  <Text
                    key={chip.label}
                    as="span"
                    className={cn(
                      "rounded-full px-3 py-[5px] text-[12px] font-semibold",
                      chip.hot ? "bg-lime text-navy" : "bg-paper-warm text-ink",
                    )}
                  >
                    {chip.label}
                  </Text>
                ))}
              </Box>
            ) : null}

            {row.bars?.length ? (
              <Box className="flex flex-col gap-2">
                {row.bars.map((bar) => (
                  <Box key={bar.label} className="flex items-center gap-2.5">
                    <Text as="span" className="w-[82px] flex-none text-[11.5px] text-ink">
                      {bar.label}
                    </Text>
                    <Box className="h-2 flex-1 overflow-hidden rounded-[4px] bg-paper-warm">
                      <Box className={cn("h-full rounded-[4px] bg-lime", FILL_WIDTH[bar.value])} />
                    </Box>
                  </Box>
                ))}
              </Box>
            ) : null}
          </Box>
        ))}
      </Box>
    </ScopeScreen>
  );
}

const CONTENT_STATUS = {
  published: "bg-lime text-navy",
  review: "border border-ink/12 bg-white text-ink/60",
  building: "bg-navy text-paper",
};

/* 2 · Content — brief-to-published pipeline and the library it fills. */
function ContentScreen({ screen }) {
  return (
    <ScopeScreen screen={screen}>
      <Label>{screen.pipeline_label}</Label>
      <Box
        className={cn(
          LAYER,
          "flex items-start justify-between",
          "before:absolute before:inset-x-5 before:top-2.5 before:-z-1 before:h-0.5 before:bg-ink/22 before:content-['']",
        )}
      >
        {screen.stages?.map((stage) => (
          <Box key={stage.label} className="flex flex-1 flex-col items-center gap-[7px] text-center">
            <Box
              as="span"
              className={cn(
                "flex size-[22px] items-center justify-center rounded-full border-2",
                stage.state === "done" && "border-navy bg-navy",
                stage.state === "on" && "border-lime bg-lime",
                !stage.state && "border-ink/22 bg-white",
              )}
            >
              {stage.state === "done" ? (
                <Box
                  as="span"
                  className="-mt-px h-[3px] w-1.5 -rotate-45 border-b-2 border-l-2 border-lime"
                />
              ) : null}
            </Box>
            <Text
              as="span"
              className={cn(
                "font-display text-[12px] font-bold",
                stage.state ? "text-ink" : "text-ink/60",
              )}
            >
              {stage.label}
            </Text>
          </Box>
        ))}
      </Box>

      <Label divided>{screen.library_label}</Label>
      <Box className={cn(LAYER, "flex flex-col gap-[7px]")}>
        {screen.library?.map((item) => (
          <Box key={item.name} className={cn(TILE, "flex items-center gap-2.5 px-[13px] py-2.5")}>
            <Text as="span" className="min-w-0 flex-1 text-[12.5px] font-semibold text-ink">
              {item.name}
            </Text>
            <Text
              as="span"
              className={cn(
                MONO,
                "flex-none rounded-full border border-ink/12 bg-white px-[9px] py-[3px] text-[9px] tracking-[0.04em] text-ink/60",
              )}
            >
              {item.type}
            </Text>
            <Text
              as="span"
              className={cn(
                MONO,
                "flex-none rounded-full px-[9px] py-[3px] text-[9px] tracking-[0.04em]",
                CONTENT_STATUS[item.status],
              )}
            >
              {item.status_label}
            </Text>
          </Box>
        ))}
      </Box>
    </ScopeScreen>
  );
}

/* 3 · Managed training — trainer funnel, vetted trainers, coverage. */
function DeliveryScreen({ screen }) {
  return (
    <ScopeScreen screen={screen}>
      <Label>{screen.network_label}</Label>
      <Box className={cn(LAYER, "mb-3 flex gap-2")}>
        {screen.funnel?.flatMap((step, index) => [
          index > 0 ? (
            <Text key={`arrow-${step.label}`} as="span" className="self-center text-[13px] text-ink/22">
              →
            </Text>
          ) : null,
          <Box
            key={step.label}
            className={cn(
              "flex-1 rounded-[9px] border px-1.5 py-[11px] text-center",
              step.hot ? "border-navy bg-navy" : "border-ink/12 bg-paper-warm",
            )}
          >
            <Text
              as="p"
              className={cn(
                "font-display text-[15px] leading-none font-bold",
                step.hot ? "text-lime" : "text-navy",
              )}
            >
              {step.value}
            </Text>
            <Text
              as="p"
              className={cn(
                MONO,
                "mt-1.5 text-[8.5px] tracking-[0.05em]",
                step.hot ? "text-paper/65" : "text-ink/60",
              )}
            >
              {step.label}
            </Text>
          </Box>,
        ])}
      </Box>

      {screen.trainers?.map((trainer) => (
        <Box
          key={trainer.area}
          className={cn(LAYER, TILE, "mb-[7px] flex items-center gap-[11px] px-[13px] py-2")}
        >
          <Text
            as="span"
            className="flex size-7 flex-none items-center justify-center rounded-full bg-lime font-display text-[10.5px] font-bold text-navy"
          >
            {trainer.initials}
          </Text>
          <Text as="span" className="flex-1 text-[12.5px] font-semibold text-ink">
            {trainer.area}
          </Text>
          <Text
            as="span"
            className={cn(MONO, "rounded-full bg-lime px-[9px] py-[3px] text-[9px] tracking-[0.04em] text-navy")}
          >
            {trainer.badge}
          </Text>
        </Box>
      ))}

      <Label divided>{screen.coverage_label}</Label>
      <Box className={cn(LAYER, "mb-3 flex gap-2")}>
        {screen.regions?.map((region) => (
          <Box
            key={region}
            className={cn(TILE, "flex flex-1 items-center justify-center gap-[7px] px-2 py-[9px]")}
          >
            <Box
              as="span"
              className="flex size-[15px] flex-none items-center justify-center rounded-full bg-lime"
            >
              <Box
                as="span"
                className="-mt-px h-[3px] w-[5px] -rotate-45 border-b-2 border-l-2 border-navy"
              />
            </Box>
            <Text as="span" className="text-[12.5px] font-semibold text-ink">
              {region}
            </Text>
          </Box>
        ))}
      </Box>
      <Box className={cn(LAYER, "flex flex-wrap gap-2")}>
        {screen.tags?.map((tag) => (
          <Text
            key={`${tag.strong ?? ""}${tag.text}`}
            as="span"
            className={cn(MONO, "rounded-full bg-paper-warm px-3 py-1.5 text-[10px] tracking-[0.05em] text-ink/60")}
          >
            {tag.strong ? (
              <Box as="b" className="font-bold text-navy">
                {tag.strong}
              </Box>
            ) : null}
            {tag.strong ? " " : ""}
            {tag.text}
          </Text>
        ))}
      </Box>
    </ScopeScreen>
  );
}

/* 4 · Learning technology — what we run beside what you keep. */
function PlatformScreen({ screen }) {
  const columns = [
    { ...screen.run, keep: false, Icon: Check },
    { ...screen.keep, keep: true, Icon: Lock },
  ];

  return (
    <ScopeScreen screen={screen}>
      <Label>{screen.label}</Label>
      <Box className={cn(LAYER, "grid grid-cols-1 gap-2.5 min-[561px]:grid-cols-2")}>
        {columns.map(({ heading, items, keep, Icon }) => (
          <Box
            key={heading}
            className={cn(
              "rounded-[10px] border p-3.5",
              keep ? "border-navy bg-navy" : "border-ink/12",
            )}
          >
            <Text
              as="p"
              className={cn(
                MONO,
                "mb-3 text-[10px] tracking-[0.06em]",
                keep ? "text-lime" : "text-ink/60",
              )}
            >
              {heading}
            </Text>
            {items?.map((item) => (
              <Box
                key={item}
                className={cn(
                  "mb-[9px] flex items-start gap-[9px] text-[12.5px] leading-[1.35] last:mb-0",
                  keep ? "text-paper" : "text-ink",
                )}
              >
                <Icon
                  size={16}
                  strokeWidth={keep ? 2 : 2.2}
                  className={cn("mt-px flex-none", keep ? "text-lime" : "text-navy")}
                />
                {item}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </ScopeScreen>
  );
}

/* 5 · Vendor management — many suppliers consolidated into one partner. */
function VendorsScreen({ screen }) {
  return (
    <ScopeScreen screen={screen}>
      <Label className="mb-[11px] tracking-[0.07em]">{screen.label}</Label>
      <Box className={cn(LAYER, "flex items-center gap-3.5 max-[560px]:flex-col")}>
        <Box className="grid flex-1 grid-cols-2 gap-1.5 max-[560px]:w-full">
          {screen.vendors?.map((vendor) => (
            <Text
              key={vendor}
              as="span"
              className="rounded-[7px] border border-ink/12 bg-paper-warm px-[9px] py-2 text-center text-[11px] text-ink/60"
            >
              {vendor}
            </Text>
          ))}
        </Box>
        <Box className="flex flex-none flex-col items-center gap-1 text-ink/60 max-[560px]:rotate-90">
          <ArrowRight size={26} strokeWidth={1.8} />
          <Text as="span" className={cn(MONO, "text-[8px] tracking-[0.05em]")}>
            {screen.arrow_label}
          </Text>
        </Box>
        <Box className="flex-[0_0_42%] rounded-[12px] bg-navy px-4 py-[22px] text-center text-paper max-[560px]:w-full max-[560px]:flex-auto">
          <Text as="span" className="block font-display text-[18px] font-bold text-paper">
            {screen.partner?.name}
          </Text>
          <Text as="span" className={cn(MONO, "mt-1.5 block text-[9px] tracking-[0.06em] text-lime")}>
            {screen.partner?.note}
          </Text>
        </Box>
      </Box>
      <Text as="p" className={cn(LAYER, MONO, "mt-3.5 text-center text-[10px] tracking-[0.06em] text-ink/60")}>
        {screen.footer}
      </Text>
    </ScopeScreen>
  );
}

/* 6 · Analytics — KPI tiles and an indexed reach chart. */
function AnalyticsScreen({ screen }) {
  const bars = screen.chart?.bars ?? [];

  return (
    <ScopeScreen screen={screen}>
      <Label className="mb-[11px] tracking-[0.07em]">{screen.label}</Label>
      <Box className={cn(LAYER, "mb-[18px] flex gap-2")}>
        {screen.kpis?.map((kpi) => (
          <Box key={kpi.label} className={cn(TILE, "flex-1 p-3")}>
            <Text as="span" className={cn(MONO, "mb-1.5 block text-[9px] tracking-[0.05em] text-ink/60")}>
              {kpi.label}
            </Text>
            <Text
              as="span"
              className="font-display text-[22px] leading-none font-bold tracking-[-0.01em] text-navy"
            >
              {kpi.value}
            </Text>
            <Text as="span" className="mt-[5px] block font-mono text-[9px] text-ink/60">
              {kpi.note}
            </Text>
          </Box>
        ))}
      </Box>

      <Box className={cn(LAYER, "mb-3 flex items-baseline justify-between")}>
        <Text as="span" className={cn(MONO, "text-[9.5px] tracking-[0.05em] text-ink/60")}>
          {screen.chart?.title}
        </Text>
        <Text as="span" className="font-mono text-[9px] text-ink/60">
          {screen.chart?.unit}
        </Text>
      </Box>
      <Box className={cn(LAYER, "flex h-[120px] items-end gap-3")}>
        {bars.map((bar, index) => (
          <Box key={bar.label} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
            <Text as="span" className="font-display text-[13px] font-bold text-navy">
              {bar.value}
            </Text>
            <Box
              as="i"
              className={cn(
                "block w-full rounded-t-[6px]",
                index === bars.length - 1 ? "bg-navy" : "bg-lime",
                BAR_HEIGHT[bar.height],
              )}
            />
          </Box>
        ))}
      </Box>
      <Box className={cn(LAYER, "mt-2 flex gap-3")}>
        {bars.map((bar) => (
          <Text key={bar.label} as="span" className={cn(MONO, "flex-1 text-center text-[9px] text-ink/60")}>
            {bar.label}
          </Text>
        ))}
      </Box>
    </ScopeScreen>
  );
}

/* 7 · Staff augmentation — Edstellar specialists slotted into your team. */
function TeamScreen({ screen }) {
  return (
    <ScopeScreen screen={screen}>
      <Label className="mb-[11px] tracking-[0.07em]">{screen.label}</Label>
      <Box className={cn(LAYER, "rounded-[12px] border border-ink/12 bg-paper-warm p-4")}>
        <Text as="p" className="mb-3.5 text-center font-display text-[14px] font-bold text-ink">
          {screen.team_heading}
        </Text>
        <Box className="flex flex-wrap justify-center gap-2.5">
          {screen.members?.map((member) => (
            <Box key={member.role} className="flex w-[74px] flex-col items-center gap-1.5">
              <Text
                as="span"
                className={cn(
                  "flex size-[42px] items-center justify-center rounded-full font-display text-[13px] font-bold",
                  member.own ? "border border-ink/22 bg-white text-ink/60" : "bg-lime text-navy",
                )}
              >
                {member.initials}
              </Text>
              <Text as="span" className="text-center text-[9.5px] leading-[1.2] text-ink/60">
                {member.role}
              </Text>
            </Box>
          ))}
        </Box>
        <Box className="mt-4 flex justify-center gap-[18px]">
          {[
            { label: screen.legend?.own, className: "border border-ink/22 bg-white" },
            { label: screen.legend?.ours, className: "bg-lime" },
          ].map((entry) => (
            <Text key={entry.label} as="span" className="flex items-center gap-[7px] text-[11px] text-ink/60">
              <Box as="i" className={cn("size-[13px] rounded-full", entry.className)} />
              {entry.label}
            </Text>
          ))}
        </Box>
      </Box>
      <Text as="p" className={cn(LAYER, MONO, "mt-3.5 text-center text-[10px] tracking-[0.06em] text-ink/60")}>
        {screen.footer}
      </Text>
    </ScopeScreen>
  );
}

/** Registered with `StageSteps` as `screens` — keys are each step's `screen.type`. */
export const SCOPE_SCREENS = {
  strategy: StrategyScreen,
  content: ContentScreen,
  delivery: DeliveryScreen,
  platform: PlatformScreen,
  vendors: VendorsScreen,
  analytics: AnalyticsScreen,
  team: TeamScreen,
};
