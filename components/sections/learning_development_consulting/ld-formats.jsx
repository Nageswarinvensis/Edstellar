import { Fragment } from "react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import LdSoftCta from "@/components/common/ld-soft-cta";
import LdFormatSample from "./ld-format-sample";

// Share of the table width per column, in `columns` order.
const COLUMN_WIDTHS = ["w-[18%]", "w-[30%]", "w-[40%]", "w-[12%]"];

const CELL = "border-b border-ink/12 px-4.5 py-3.25 align-middle text-[14px] leading-[1.5] text-ink/60";

// The "View sample" dialog's fixed copy, the same for every format.
const SAMPLE_DIALOG = {
  kicker: "Sample asset",
  note_cta: {
    label: "Request the full sample library",
    href: "#apply",
  },
};

// The live sample behind each format, keyed by the CMS's format `name`. Each
// is a self-contained page in `public/samples/learning-content/`, loaded in
// the dialog's iframe only when it opens. A format with no entry here has no
// sample and is left out of the table.
//
// Design: `learning-content-development 46.html` → the `LIVE` map.
const SAMPLES = {
  "Animation & motion graphics": {
    file: "motion-graphics",
    title: "Motion graphics sample: the forgetting curve and spaced practice",
    note: "Watch the one-minute explainer, or click the progress bar to jump between chapters.",
  },
  "Scenario & role-play video": {
    file: "scenario-video",
    title: "Scenario video sample: The late report, a one-minute animated conversation",
    note: "Watch the one-minute scene, then choose what the team lead says next and see how each choice plays out.",
  },
  "Software walkthroughs": {
    file: "software-walkthrough",
    title: "Walkthrough sample: raising an IT support ticket in a service desk",
    note: "Watch the seven steps play out, or jump to any step from the list.",
  },
  "Interactive modules": {
    file: "interactive-module",
    title: "Interactive module sample: Employee Onboarding process activity",
    note: "Try it: order the steps, explore each owner, then make the day-one call. SCORM 1.2 / 2004 ready.",
  },
  "Branching scenarios": {
    file: "branching-scenario",
    title: "Branching scenario sample: The Expensive Gift, an ethics story told in chat messages",
    note: "Try it: three decisions, three possible endings. Every choice changes what happens next.",
  },
  Simulations: {
    file: "simulation",
    title: "Software simulation sample: log a new lead and book a follow-up in a practice CRM",
    note: "Try it: six clicks in a practice CRM, with Show me hints and a score at the end. Built to mirror your own systems.",
  },
  "Serious games & gamification": {
    file: "gamification",
    title: "Gamification sample: Phish or legit? security awareness game",
    note: "Play it: 12 emails, 3 levels, a timer, combo points, badges and a personal best.",
  },
  "AR / VR immersive": {
    file: "ar-vr",
    title: "VR sample: office fire response simulation, video walkthrough and interactive 3D scene",
    note: "Watch the 44-second walkthrough, or switch to Try it in 3D and handle the fire yourself.",
  },
  "Assessments & quizzes": {
    file: "assessment-quiz",
    title: "Assessment sample: five-question workplace data privacy quiz",
    note: "Try it: five questions in four formats, with instant feedback and a pass mark.",
  },
  "Microlearning nuggets": {
    file: "microlearning-flashcards",
    title: "Microlearning sample: sales objection-handling refresher flashcards",
    note: "Try it: say your answer out loud, flip the card, then rate yourself. Cards you miss come back first.",
  },
  "Job aids & checklists": {
    file: "job-aid-checklist",
    title: "Job aid sample: interactive office safety inspection checklist",
    note: "Try it: mark each item Yes, No or N/A. Anything marked No moves to corrective actions.",
  },
  "Infographics & one-pagers": {
    file: "infographics",
    title: "Infographic sample: five one-pager formats, from process flow to framework summary",
    note: "Scroll through five one-pager formats, each answering one question at a glance.",
  },
  "Slide decks & PPT": {
    file: "slide-deck",
    title: "Slide deck sample: Giving Feedback That Lands, a nine-slide leadership deck on the SBI model",
    note: "Flip through the nine slides with the arrows or your arrow keys. Every deck we build ships as an editable PowerPoint with facilitator notes.",
  },
  "PDFs & workbooks": {
    file: "pdf-workbook",
    title: "PDF and workbook sample: Data Privacy and Protection Policy pack, three pages with a read-and-understood acknowledgement",
    note: "Read the three pages, sign off on page 3 and submit, then download your signed copy. We build policy packs, guides and participant workbooks in your brand.",
  },
  "Podcasts & audio": {
    file: "podcast",
    title: "Podcast sample: Celebrating Wins at Work, a two-and-a-half-minute learning episode",
    note: "Press play and jump between chapters. Short, two-voice episodes people finish on the commute.",
  },
};

/** The four levels of interactivity, on a navy band below the table. */
function InteractivityLevels({ data }) {
  return (
    <Box className="mt-9 rounded-[18px] bg-navy px-7.5 py-7">
      <Text as="p" className="mb-1 font-display text-[18px] leading-[1.7] font-semibold text-white">
        {data.heading}
      </Text>
      <Text as="p" className="mb-5 max-w-[60ch] text-[14px] leading-[1.7] text-paper/62">
        {data.description}
      </Text>

      <Box className="grid grid-cols-1 gap-4 min-[561px]:grid-cols-2 min-[861px]:grid-cols-4">
        {data.levels?.map((level) => (
          <Box
            key={level.label}
            className="rounded-[12px] border border-white/10 bg-navy-soft p-4.5"
          >
            <Text
              as="p"
              className="mb-1.75 font-mono text-[11px] leading-[1.7] tracking-[0.1em] text-lime"
            >
              {level.label}
            </Text>
            <Text
              as="p"
              className="mb-1.75 font-display text-[15px] leading-[1.7] font-semibold text-white"
            >
              {level.title}
            </Text>
            <Text as="p" className="mb-2.25 text-[12.5px] leading-[1.5] text-paper/70">
              {level.description}
            </Text>
            <Text
              as="p"
              className="font-mono text-[10px] leading-[1.7] tracking-[0.03em] text-lime/90"
            >
              {level.examples}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

/**
 * "The content formats we design and build" — every format with a sample, grouped by
 * family, in one table (scrolls sideways on narrow screens, as the design
 * does), then the four levels of interactivity. A Server Component; only
 * each row's "View sample" dialog is client code.
 *
 * Design: `learning-content-development 46.html` → `#formats`, `.fmt`,
 * `.fmt-fam`, `.fmt-sub`, `.il`.
 */
export default function LdFormats({ data }) {
  if (!data?.groups?.length) return null;

  const { section_id, heading, description, columns, sample_label, interactivity, CTA } = data;

  // Only formats with a live sample are listed; a family left empty is dropped.
  const groups = data.groups
    .map((group) => ({ ...group, formats: group.formats?.filter((format) => SAMPLES[format.name]) }))
    .filter((group) => group.formats?.length);

  // The CMS sends the closing soft CTA as a one-entry `CTA` list
  // (`heading`, `description`, `btn_label`, `btn_link`).
  const cta = Array.isArray(CTA) ? CTA[0] : null;

  return (
    <Section id={section_id} className="scroll-mt-20 border-t border-ink/12 bg-paper-warm">
      <Box className="mb-11 max-w-[62ch]">
        <Reveal>
          <RichHeading
            heading={heading}
            className="text-[clamp(32px,4vw,40px)] leading-[1.08] hyphens-none"
            emphasisClassName="font-normal"
          />
        </Reveal>

        {description ? (
          <Reveal delay={1}>
            <Text
              as="p"
              className="mt-4 max-w-[60ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink/60 hyphens-none"
            >
              {description}
            </Text>
          </Reveal>
        ) : null}
      </Box>

      <Reveal delay={2}>
        <Box className="mt-2.5 overflow-x-auto">
          <table className="w-full min-w-260 border-collapse overflow-hidden rounded-[14px] border border-ink/12 bg-white">
            <thead>
              <tr>
                {columns?.map((column, index) => (
                  <th
                    key={column}
                    scope="col"
                    className={`${COLUMN_WIDTHS[index] ?? ""} border-b border-ink/12 bg-paper-warm px-4.5 py-3.5 text-left font-mono text-[10px] leading-[1.7] font-bold tracking-[0.1em] text-ink/60 uppercase`}
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="[&>tr:last-child>td]:border-b-0">
              {groups.map((group) => (
                <Fragment key={group.label}>
                  <tr>
                    <th
                      scope="colgroup"
                      colSpan={columns?.length ?? 4}
                      className="border-b border-ink/12 bg-navy px-4.5 py-2.75 text-left font-mono text-[11px] leading-[1.7] font-normal tracking-[0.12em] text-paper uppercase"
                    >
                      {group.label}
                    </th>
                  </tr>

                  {group.formats?.map((format) => (
                    <tr key={format.name}>
                      <th
                        scope="row"
                        className={`${CELL} text-left font-display font-semibold whitespace-nowrap text-navy`}
                      >
                        {format.name}
                      </th>
                      <td className={CELL}>{format.purpose}</td>
                      <td className={CELL}>
                        <Box className="flex flex-nowrap gap-1.5 whitespace-nowrap">
                          {format.best_for?.map((tag) => (
                            <Text
                              key={tag}
                              as="span"
                              className="rounded-full border border-ink/12 bg-paper-warm px-2.5 py-0.75 font-mono text-[10.5px] leading-[1.7] tracking-[0.03em] whitespace-nowrap text-navy"
                            >
                              {tag}
                            </Text>
                          ))}
                        </Box>
                      </td>
                      <td className={CELL}>
                        <LdFormatSample
                          name={format.name}
                          label={sample_label}
                          sample={SAMPLES[format.name]}
                          dialog={SAMPLE_DIALOG}
                        />
                      </td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </Box>
      </Reveal>

      {interactivity?.levels?.length ? (
        <Reveal delay={3}>
          <InteractivityLevels data={interactivity} />
        </Reveal>
      ) : null}

      {cta?.heading ? (
        <Box className="mt-12 sm:mt-16">
          <LdSoftCta
            data={{
              heading: cta.heading,
              description: cta.description,
              cta: { label: cta.btn_label, href: cta.btn_link },
            }}
          />
        </Box>
      ) : null}
    </Section>
  );
}
