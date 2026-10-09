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

// The "View sample" dialog is the same placeholder for every format and never
// varied per page, so it lives here rather than in content or the CMS.
const SAMPLE_DIALOG = {
  kicker: "Sample asset",
  stage_suffix: "sample preview",
  note: "A sample of this format will play here.",
  note_cta: {
    label: "Request the full sample library",
    href: "#apply",
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
 * "The content formats we design and build" — every format, grouped by
 * family, in one table (scrolls sideways on narrow screens, as the design
 * does), then the four levels of interactivity. A Server Component; only
 * each row's "View sample" dialog is client code.
 *
 * Design: `learning-content-development (16).html` → `#formats`, `.fmt`,
 * `.fmt-fam`, `.fmt-sub`, `.il`.
 */
export default function LdFormats({ data }) {
  if (!data?.groups?.length) return null;

  const { section_id, heading, description, columns, sample_label, groups, interactivity, CTA } = data;

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
