import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { Screen } from "@/components/sections/consulting/stage-screens";
import { cn } from "@/lib/utils";

/*
 * The seven "what we manage" screens, one per managed service. Decorative —
 * the figure wrapping them is aria-hidden — and registered with `StageSteps`
 * by `screen.type`, alongside the TNA engine screens.
 *
 * Every screen is the same vocabulary: a window holding a panel with a navy
 * header (`label`/`doc_title` + `doc_tag`) and ruled rows of mono labels,
 * pills, bars and plain lines. An optional `note` closes the panel with a
 * muted footnote row.
 *
 * Tailwind only generates classes it can see written out in full and inline
 * styles are off the table, so data-driven widths and heights go through the
 * literal maps below; a value missing from a map renders without that class.
 *
 * Design: `edstellar-managed-learning-services-final.html` → `#what-we-manage`
 * `.win`, `.panel`, `.pr`, `.pills`, `.barrow`, `.bars`, `.chip`.
 */

const FILL_WIDTH = {
  40: "w-[40%]",
  52: "w-[52%]",
  58: "w-[58%]",
  64: "w-[64%]",
  72: "w-[72%]",
  78: "w-[78%]",
  80: "w-[80%]",
  90: "w-[90%]",
  92: "w-[92%]",
};

const BAR_HEIGHT = {
  40: "h-[40%]",
  52: "h-[52%]",
  64: "h-[64%]",
  78: "h-[78%]",
  80: "h-[80%]",
  92: "h-[92%]",
};

const LAYER = "relative z-1";
const MONO_LABEL = "block font-mono text-[9px] leading-[1.4] tracking-[0.06em] text-ink-muted uppercase";

function ScopeScreen({ screen, children }) {
  return (
    <Screen title={screen.title} variant="scope" bodyClassName="p-3.5">
      {children}
    </Screen>
  );
}

/** `.panel` — a ruled card; `title` + `tag` give it the navy header. */
function Panel({ title, tag, className, children }) {
  return (
    <Box className={cn(LAYER, "overflow-hidden rounded-[8px] border border-ink/12 bg-white", className)}>
      {title ? (
        <Box className="flex items-center justify-between gap-3 bg-navy px-3 py-2.5">
          <Text as="span" className="font-display text-[13px] leading-[1.4] font-semibold text-paper">
            {title}
          </Text>
          {tag ? (
            <Text as="span" className="flex-none font-mono text-[9.5px] leading-[1.4] font-medium tracking-[0.08em] text-lime uppercase">
              {tag}
            </Text>
          ) : null}
        </Box>
      ) : null}
      {children}
    </Box>
  );
}

/** `.pr` — one ruled row of a panel, with an optional mono label. */
function Row({ label, className, children }) {
  return (
    <Box className={cn("border-t border-ink/8 px-3 py-2.5 text-[12.5px] leading-[1.5] text-ink", className)}>
      {label ? <Text as="span" className={cn(MONO_LABEL, "mb-1.25")}>{label}</Text> : null}
      {children}
    </Box>
  );
}

/** `.pills` — `hot` pills are lime. */
function Pills({ items, className }) {
  if (!items?.length) return null;
  return (
    <Box className={cn("flex flex-wrap gap-1.5", className)}>
      {items.map((item) => (
        <Text
          key={item.label}
          as="span"
          className={cn(
            "rounded-full px-2.5 py-1 text-[11.5px] leading-[1.4]",
            item.hot ? "bg-lime text-navy" : "bg-paper-warm text-ink",
          )}
        >
          {item.label}
        </Text>
      ))}
    </Box>
  );
}

/** Muted closing row — `screen.note`. */
/**
 * The CMS stores a strategy row's `chips` and `bars` as plain strings in its
 * usual "Label:value" form ("Leadership:hot", "Leadership:72"); older
 * entries are `{ label, hot }` / `{ label, value }` objects. Read either.
 */
function splitPair(entry) {
  if (typeof entry !== "string") return [entry?.label, undefined];
  const at = entry.lastIndexOf(":");
  return at === -1 ? [entry.trim(), undefined] : [entry.slice(0, at).trim(), entry.slice(at + 1).trim()];
}

function toChip(entry) {
  if (typeof entry !== "string") return { label: entry?.label, hot: Boolean(entry?.hot) };
  const [label, flag] = splitPair(entry);
  return { label, hot: flag?.toLowerCase() === "hot" };
}

function toBar(entry) {
  if (typeof entry !== "string") return { label: entry?.label, value: Number(entry?.value) };
  const [label, value] = splitPair(entry);
  return { label, value: Number(value) };
}

function Note({ children, className }) {
  if (!children) return null;
  return (
    <Row className={cn("bg-paper text-[11.5px] leading-[1.5] text-ink-muted", className)}>{children}</Row>
  );
}

/* 1 · Learning strategy — the strategy-on-a-page document. */
function StrategyScreen({ screen }) {
  return (
    <ScopeScreen screen={screen}>
      <Panel title={screen.doc_title} tag={screen.doc_tag}>
        {screen.rows?.map((row) => (
          <Row key={row.label} label={row.label}>
            {row.text}
            <Pills items={row.chips?.map(toChip)} />
            {row.bars?.map(toBar).map((bar) => (
              <Box key={bar.label} className="my-1.5 grid grid-cols-[90px_1fr] items-center gap-2.5 text-[11.5px] leading-[1.4]">
                {bar.label}
                <Box as="i" className="relative h-1.5 overflow-hidden rounded-full bg-paper-warm">
                  <Box as="b" className={cn("absolute inset-y-0 left-0 rounded-full bg-lime", FILL_WIDTH[bar.value])} />
                </Box>
              </Box>
            ))}
          </Row>
        ))}
        <Note>{screen.note}</Note>
      </Panel>
    </ScopeScreen>
  );
}

const CONTENT_CHIP = {
  published: "bg-lime text-navy",
  review: "bg-paper-warm text-ink",
  building: "border border-ink/12 bg-transparent text-ink",
};

/* 2 · Content — brief-to-published pipeline and the library it fills. */
function ContentScreen({ screen }) {
  return (
    <ScopeScreen screen={screen}>
      <Panel title={screen.pipeline_label} tag={screen.doc_tag}>
        <Row>
          <Pills items={screen.stages?.map((stage) => ({ label: stage.label, hot: Boolean(stage.state) }))} />
        </Row>
        <Row label={screen.library_label}>
          <Box className="grid gap-[7px]">
            {screen.library?.map((item) => (
              <Box key={item.name} className="flex items-center justify-between gap-3">
                {item.name}
                <Text
                  as="span"
                  className={cn(
                    "flex-none rounded-[6px] px-[9px] py-1.5 font-mono text-[10px] leading-none font-medium tracking-[0.07em] uppercase",
                    CONTENT_CHIP[item.status] ?? CONTENT_CHIP.review,
                  )}
                >
                  {[item.type, item.status_label].filter(Boolean).join(" · ")}
                </Text>
              </Box>
            ))}
          </Box>
        </Row>
        <Note>{screen.note}</Note>
      </Panel>
    </ScopeScreen>
  );
}

/* 3 · Managed training — trainer funnel, what else MTS runs, coverage. */
function DeliveryScreen({ screen }) {
  const coverage = [
    ...(screen.regions ?? []).map((region) => ({ label: `✓ ${region}`, hot: true })),
    ...(screen.tags ?? []).map((tag) => ({ label: [tag.strong, tag.text].filter(Boolean).join(" ") })),
  ];

  return (
    <ScopeScreen screen={screen}>
      {screen.network_label ? (
        <Text as="span" className={cn(LAYER, MONO_LABEL)}>{screen.network_label}</Text>
      ) : null}
      {screen.funnel?.length ? (
        <Box className={cn(LAYER, "mt-2 mb-2.5 grid grid-cols-3 gap-2 text-center")}>
          {screen.funnel.map((step) => (
            <Box
              key={step.label}
              className={cn(
                "rounded-[8px] border border-ink/12 p-2.5",
                step.hot ? "bg-navy" : "bg-white",
              )}
            >
              <Text
                as="span"
                className={cn("block font-display text-[14px] leading-[1.4] font-semibold", step.hot ? "text-lime" : "text-ink")}
              >
                {step.value}
              </Text>
              <Text
                as="span"
                className={cn(
                  "block font-mono text-[8px] leading-[1.4] tracking-[0.06em] uppercase",
                  step.hot ? "text-paper" : "text-ink-muted",
                )}
              >
                {step.label}
              </Text>
            </Box>
          ))}
        </Box>
      ) : null}

      {screen.run?.items?.length ? (
        <Panel>
          <Row label={screen.run.heading} className="border-t-0">
            <Pills items={screen.run.items.map((item) => ({ label: item, hot: true }))} />
          </Row>
        </Panel>
      ) : null}

      {screen.coverage_label ? (
        <Text as="span" className={cn(LAYER, MONO_LABEL, "mt-3")}>{screen.coverage_label}</Text>
      ) : null}
      <Pills items={coverage} className={cn(LAYER, "mt-2")} />
    </ScopeScreen>
  );
}

/* 4 · Learning technology — what we run beside what you keep. */
function PlatformScreen({ screen }) {
  return (
    <ScopeScreen screen={screen}>
      <Panel title={screen.label} tag={screen.doc_tag}>
        <Box className="grid grid-cols-2">
          {[screen.run, screen.keep].map((column, index) =>
            column?.items?.length ? (
              <Row key={column.heading} label={column.heading} className={cn(index === 0 && "border-r")}>
                <Box className="grid gap-1.5">
                  {column.items.map((item) => (
                    <Text key={item} as="span" className="text-[12.5px] leading-[1.5] text-ink">
                      {item}
                    </Text>
                  ))}
                </Box>
              </Row>
            ) : null,
          )}
        </Box>
        <Note>{screen.note}</Note>
      </Panel>
    </ScopeScreen>
  );
}

/* 5 · Vendor management — every other supplier consolidated into one partner. */
function VendorsScreen({ screen }) {
  return (
    <ScopeScreen screen={screen}>
      <Panel title={screen.label} tag={screen.doc_tag}>
        {screen.vendors?.length ? (
          <Row label={screen.vendors_label}>
            <Pills items={screen.vendors.map((vendor) => ({ label: vendor }))} />
          </Row>
        ) : null}
        {screen.partner?.name ? (
          <Row className="text-center">
            <Text as="span" className="block font-display text-[15px] leading-[1.4] font-semibold text-ink">
              {screen.partner.name}
            </Text>
            {screen.partner.note ? (
              <Text as="span" className={MONO_LABEL}>{screen.partner.note}</Text>
            ) : null}
          </Row>
        ) : null}
        {screen.footer ? <Row className="text-center text-[12px] leading-[1.5]">{screen.footer}</Row> : null}
        <Note>{screen.note}</Note>
      </Panel>
    </ScopeScreen>
  );
}

/* 6 · Analytics — KPI tiles and an indexed reach chart. */
function AnalyticsScreen({ screen }) {
  const bars = screen.chart?.bars ?? [];
  const chartLabel = [screen.chart?.title, screen.chart?.unit && `(${screen.chart.unit})`].filter(Boolean).join(" ");

  return (
    <ScopeScreen screen={screen}>
      <Panel title={screen.label} tag={screen.doc_tag}>
        {screen.kpis?.length ? (
          <Box className="grid grid-cols-3">
            {screen.kpis.map((kpi, index) => (
              <Row key={kpi.label} label={kpi.label} className={cn(index < screen.kpis.length - 1 && "border-r")}>
                <Text as="span" className="block font-display text-[20px] leading-[1.3] font-semibold text-ink">
                  {kpi.value}
                </Text>
                <Text as="span" className="block text-[10px] leading-[1.4] text-ink-muted">
                  {kpi.note}
                </Text>
              </Row>
            ))}
          </Box>
        ) : null}
        {bars.length ? (
          <Row label={chartLabel}>
            <Box className="flex h-15 items-end gap-2">
              {bars.map((bar) => (
                <Box
                  key={bar.label}
                  as="i"
                  className={cn("block w-[34px] rounded-[2px] bg-navy last:bg-lime", BAR_HEIGHT[bar.height])}
                />
              ))}
            </Box>
          </Row>
        ) : null}
        <Note className="bg-white">{screen.note}</Note>
      </Panel>
    </ScopeScreen>
  );
}

/* 7 · Staff augmentation — Edstellar specialists slotted into your team. */
function TeamScreen({ screen }) {
  const pill = (member) => ({ label: [member.initials, member.role].filter(Boolean).join(" · "), hot: !member.own });
  const own = screen.members?.filter((member) => member.own) ?? [];
  const ours = screen.members?.filter((member) => !member.own) ?? [];

  return (
    <ScopeScreen screen={screen}>
      <Panel title={screen.label} tag={screen.doc_tag}>
        {own.length ? (
          <Row label={screen.legend?.own ?? screen.team_heading}>
            <Pills items={own.map(pill)} />
          </Row>
        ) : null}
        {ours.length ? (
          <Row label={screen.legend?.ours}>
            <Pills items={ours.map(pill)} />
          </Row>
        ) : null}
        {screen.footer ? (
          <Row className="text-[12px] leading-[1.5] text-ink-muted">{screen.footer}</Row>
        ) : null}
        <Note>{screen.note}</Note>
      </Panel>
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
