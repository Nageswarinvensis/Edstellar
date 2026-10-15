import { FileText, HeartHandshake, Lock, Sparkles } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils";

/**
 * The four Meridian product screens shown in the showcase — illustrative mock
 * UIs drawn from content (`meridian.tabs[].panel`), each picked by its
 * `type`: `match`, `questions`, `report`, `share`.
 *
 * Design: coaching-hub `.mw`, `.mx`, `.mc`, `.qx`, `.rx`, `.sx`, `.tg`.
 */

const LABEL = "mb-2 block font-mono text-[10px] uppercase leading-[1.5] tracking-[0.12em] text-paper/55";
const CHIP = "rounded-full border border-paper/18 px-2 py-0.75 text-[11px] leading-none text-paper";

function MatchPanel({ panel }) {
  return (
    <Box className="grid grid-cols-[200px_1fr] gap-4 max-[900px]:grid-cols-1">
      <Box as="aside" className="min-w-0 rounded-xl border border-paper/8 bg-paper/4 p-3.5">
        <Text as="span" className={LABEL}>{panel.brief.label}</Text>
        <Text as="p" className="mb-3 font-display text-[16px] leading-[1.3] font-semibold text-paper">
          {panel.brief.title}
        </Text>
        <Box as="dl" className="m-0 grid gap-1">
          {panel.brief.fields.map((field) => (
            <Box key={field.label}>
              <Box as="dt" className="mt-1.5 text-[11.5px] text-paper/55">{field.label}</Box>
              <Box as="dd" className="m-0 flex flex-wrap gap-1 text-[13px] leading-[1.5] text-paper">
                {field.tags?.length
                  ? field.tags.map((tag) => (
                      <Text as="span" key={tag} className={CHIP}>{tag}</Text>
                    ))
                  : field.value}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Box className="min-w-0">
        <Text as="span" className={LABEL}>{panel.list_label}</Text>
        {panel.coaches.map((coach) => (
          <Box
            key={coach.name}
            className={cn(
              "mb-2 grid grid-cols-[38px_1fr_90px] items-center gap-3.5 rounded-xl border px-3 py-2.5 max-[600px]:grid-cols-[38px_1fr]",
              coach.selected ? "border-lime bg-lime/7" : "border-paper/10",
            )}
          >
            <Text
              as="span"
              className={cn(
                "grid size-9.5 place-items-center rounded-full font-display text-[13px] font-semibold",
                coach.selected ? "bg-lime text-navy" : "bg-paper/12 text-paper",
              )}
            >
              {coach.initials}
            </Text>
            <Box className="min-w-0">
              <Text as="span" className="block text-[14.5px] font-bold text-paper">{coach.name}</Text>
              <Text as="span" className="mt-px mb-1.25 block text-[12.5px] text-paper/55">{coach.focus}</Text>
              <Box className="flex flex-wrap gap-1">
                {coach.tags.map((tag) => (
                  <Text as="span" key={tag} className={CHIP}>{tag}</Text>
                ))}
              </Box>
            </Box>
            <Box className="text-right max-[600px]:col-span-full max-[600px]:flex max-[600px]:items-center max-[600px]:gap-2.5 max-[600px]:text-left">
              <Text as="span" className={cn("font-display text-[18px] font-bold", coach.selected ? "text-lime" : "text-paper")}>
                {coach.score}%
              </Text>
              {/* Match bar — an SVG so the data-driven width needs no inline style */}
              <svg
                viewBox="0 0 100 5"
                preserveAspectRatio="none"
                aria-hidden="true"
                className="my-1 block h-1.25 w-full overflow-hidden rounded-[3px] max-[600px]:flex-1"
              >
                <rect width="100" height="5" className="fill-paper/12" />
                <rect width={coach.score} height="5" rx="2.5" className={coach.selected ? "fill-lime" : "fill-paper/50"} />
              </svg>
              <Text as="span" className="font-mono text-[10px] uppercase tracking-[0.12em] text-paper/55">
                {panel.match_label}
              </Text>
            </Box>
          </Box>
        ))}
        <Text as="p" className="mt-1.5 inline-flex items-center gap-2 text-[12.5px] text-paper/70">
          <HeartHandshake size={16} className="text-lime" aria-hidden="true" />
          {panel.foot}
        </Text>
      </Box>
    </Box>
  );
}

function QuestionsPanel({ panel }) {
  return (
    <Box className="flex flex-col gap-3">
      <Box className="rounded-xl border border-paper/8 bg-paper/4 px-3.5 py-3">
        <Text as="span" className={LABEL}>{panel.focus_label}</Text>
        <Text as="p" className="m-0 font-serif text-[19px] leading-[1.35] text-paper italic">{panel.focus}</Text>
      </Box>
      <Box className="grid flex-1 grid-cols-2 gap-4 max-[900px]:grid-cols-1">
        <Box className="min-w-0">
          <Text as="span" className={LABEL}>{panel.chat_label}</Text>
          {panel.chat.map((line) => (
            <Text
              as="p"
              key={line.text}
              className={cn(
                "mb-1.5 max-w-[90%] rounded-[10px] px-2.75 py-2 text-[13px] leading-[1.5] text-paper",
                line.side === "coach" ? "ml-auto bg-lime/10" : "bg-paper/6",
              )}
            >
              {line.text}
            </Text>
          ))}
        </Box>
        <Box className="min-w-0">
          <Text as="span" className={cn(LABEL, "flex items-center gap-1.5 text-lime")}>
            <Sparkles size={13} aria-hidden="true" />
            {panel.ai_label}
          </Text>
          {panel.questions.map((question) => (
            <Box
              key={question.text}
              className={cn(
                "mb-1.5 flex justify-between gap-2.5 rounded-[10px] border border-paper/10 px-2.75 py-2.25 text-[13px] leading-[1.5] text-paper",
                question.used && "opacity-55",
              )}
            >
              {question.text}
              <Text as="span" className="text-[11.5px] font-semibold whitespace-nowrap text-lime">{question.status}</Text>
            </Box>
          ))}
          <Text as="p" className="mt-1.5 text-[12px] text-paper/55">{panel.note}</Text>
        </Box>
      </Box>
      <Box>
        <Text as="span" className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-paper/55">{panel.track}</Text>
        <Box className="mt-2 flex gap-1">
          {panel.track_steps.map((step, index) => (
            <span
              key={index}
              className={cn(
                "h-1.5 flex-1 rounded-[3px]",
                step === "done" ? "bg-lime/60" : step === "now" ? "bg-lime" : "bg-paper/12",
              )}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

function ReportPanel({ panel }) {
  return (
    <Box className="grid grid-cols-[1fr_220px] gap-5 max-[900px]:grid-cols-1">
      <Box className="min-w-0 rounded-xl bg-paper px-4.5 py-4 text-ink">
        <Text as="span" className={cn(LABEL, "text-ink/60")}>{panel.doc_label}</Text>
        <Text as="p" className="mb-2.5 font-display text-[18px] font-bold text-ink">{panel.doc_title}</Text>
        <Text as="p" className="mb-2.5 text-[13px] leading-[1.6] text-ink/60">{panel.summary}</Text>
        <Text as="p" className="mt-1 mb-2 font-display text-[13px] font-semibold text-ink">{panel.questions_label}</Text>
        <Box as="ul" className="m-0 mb-2.5 pl-4.5 text-[13px] leading-[1.6] text-ink">
          {/* A question is a string, or `{ text, used, status }` as the CMS
              sends it for the questions panel. */}
          {panel.questions.map((question) => {
            const text = typeof question === "string" ? question : question?.text;
            return <li key={text}>{text}</li>;
          })}
        </Box>
        <Text as="p" className="mt-1 mb-2 font-display text-[13px] font-semibold text-ink">{panel.assignment_label}</Text>
        <Text as="p" className="m-0 rounded-lg bg-lime-soft px-3 py-2.5 text-[13px] leading-[1.5] text-ink">{panel.assignment}</Text>
      </Box>
      <Box as="aside" className="flex min-w-0 flex-col gap-3.5">
        <Box className="grid gap-2">
          {panel.stats.map((stat) => (
            <Text as="span" key={stat.label} className="flex items-baseline gap-2 rounded-[10px] bg-paper/5 px-3 py-2 text-[12.5px] text-paper/70">
              <b className="font-display text-[18px] text-paper">{stat.value}</b>
              {stat.label}
            </Text>
          ))}
        </Box>
        <Box>
          <Text as="span" className={LABEL}>{panel.resources_label}</Text>
          {panel.resources.map((resource) => (
            <Text as="p" key={resource} className="mb-2 flex items-center gap-2 text-[12.5px] text-paper">
              <FileText size={16} className="flex-none text-lime" aria-hidden="true" />
              {resource}
            </Text>
          ))}
        </Box>
        <Text as="span" className="mt-auto rounded-full bg-lime p-2.5 text-center text-[13.5px] font-semibold text-navy">{panel.approve}</Text>
        <Text as="span" className="text-center text-[12.5px] text-paper/65">{panel.edit}</Text>
      </Box>
    </Box>
  );
}

function SharePanel({ panel }) {
  return (
    <Box className="grid grid-cols-2 gap-5 max-[900px]:grid-cols-1">
      <Box className="min-w-0">
        <Text as="span" className={LABEL}>{panel.program_label}</Text>
        <Box className="mb-2.5 flex gap-2.5">
          {panel.stats.map((stat) => (
            <Text as="span" key={stat.label} className="flex-1 rounded-[10px] bg-paper/5 p-2.5 text-[12px] text-paper/65">
              <b className="block font-display text-[16px] text-paper">{stat.value}</b>
              {stat.label}
            </Text>
          ))}
        </Box>
        <Box className="mb-2.5 rounded-[10px] border border-paper/10 px-3 py-2.5">
          <Text as="span" className={LABEL}>{panel.goal_label}</Text>
          <Text as="p" className="m-0 font-serif text-[16px] leading-[1.35] text-paper italic">{panel.goal}</Text>
        </Box>
        <Text as="span" className={LABEL}>{panel.toggles_label}</Text>
        {panel.toggles.map((toggle) => (
          <Box key={toggle.label} className="flex items-center justify-between border-b border-paper/10 py-1.75 text-[13.5px] text-paper">
            {toggle.label}
            <span
              className={cn(
                "relative h-5 w-9 flex-none rounded-[10px] after:absolute after:top-0.75 after:size-3.5 after:rounded-full after:content-['']",
                toggle.on ? "bg-lime after:left-4.75 after:bg-navy" : "bg-paper/20 after:left-0.75 after:bg-paper",
              )}
            />
          </Box>
        ))}
      </Box>
      <Box className="flex min-w-0 flex-col">
        <Text as="span" className={LABEL}>{panel.preview_label}</Text>
        <Box className="rounded-xl bg-paper px-4 py-1.5 text-ink">
          {panel.preview.map((row) => (
            <Box key={row.label} className="flex justify-between gap-3 border-b border-ink/12 py-2.5 text-[13px] last:border-0">
              <Text as="span" className="text-[13px] text-ink/60">{row.label}</Text>
              <b className={cn("text-right", row.shared ? "text-ink" : "font-normal text-ink/60")}>{row.value}</b>
            </Box>
          ))}
        </Box>
        <Text as="p" className="my-2.5 flex items-center gap-2 text-[12.5px] text-paper/70">
          <Lock size={16} className="flex-none text-lime" aria-hidden="true" />
          {panel.note}
        </Text>
        <Text as="span" className="mt-auto rounded-full bg-lime p-2.5 text-center text-[13.5px] font-semibold text-navy">{panel.button}</Text>
      </Box>
    </Box>
  );
}

const PANELS = { match: MatchPanel, questions: QuestionsPanel, report: ReportPanel, share: SharePanel };

/** A Meridian window (title bar + the screen for `panel.type`). */
export function MeridianWindow({ panel }) {
  const Screen = PANELS[panel?.type];
  if (!Screen) return null;

  return (
    <Box className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-paper/12 bg-navy text-paper">
      <Box className="flex items-center gap-3.5 border-b border-paper/10 px-4 py-2.75 text-[13px]">
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="size-2.25 rounded-full bg-paper/18" />
          <i className="size-2.25 rounded-full bg-paper/18" />
          <i className="size-2.25 rounded-full bg-paper/18" />
        </span>
        <b className="font-display font-semibold text-paper">{panel.title}</b>
        <Text as="span" className="ml-auto font-mono text-[10.5px] uppercase tracking-[0.12em] text-lime max-[600px]:hidden">
          {panel.role}
        </Text>
      </Box>
      <Box className="min-h-0 flex-1 overflow-hidden p-4 max-[1200px]:overflow-visible">
        <Screen panel={panel} />
      </Box>
    </Box>
  );
}

