import { Lock, Settings } from "lucide-react";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import { cn } from "@/lib/utils";

/** Pill per responsibility level — on the white table. */
const PILL = {
  own: "bg-navy text-lime",
  approve: "border border-ink/22 bg-lime-soft text-navy",
  consult: "border border-ink/22 bg-white text-ink",
  inform: "border border-dashed border-ink/22 bg-transparent text-ink/60",
};

/** The same pills on the navy key panel. */
const KEY_PILL = {
  own: "border border-lime bg-navy-soft text-lime",
  approve: "border border-ink/22 bg-lime-soft text-navy",
  consult: "border border-paper/40 bg-transparent text-paper",
  inform: "border border-dashed border-paper/35 bg-transparent text-paper/70",
};

const PILL_BASE =
  "inline-block rounded-full px-2.75 py-1.25 text-center font-mono text-[10.5px] leading-[1.2] tracking-[0.06em] uppercase";

function Pill({ level, levels, onDark = false, className }) {
  return (
    <Text
      as="span"
      className={cn(PILL_BASE, onDark ? KEY_PILL[level] : PILL[level], className)}
    >
      {levels?.[level] ?? level}
    </Text>
  );
}

/** "Edstellar owns <b>6</b> …" → text with the `<b>` runs in lime. */
function Summary({ text }) {
  return text.split(/(<b>[\s\S]*?<\/b>)/g).map((part, index) => {
    const bold = part.match(/^<b>([\s\S]*?)<\/b>$/);
    return bold ? (
      <b key={index} className="font-bold text-lime">
        {bold[1]}
      </b>
    ) : (
      part
    );
  });
}

/**
 * "Edstellar runs, you keep the direction": who owns each training activity,
 * as an owns / approves / consulted / informed matrix (strategic rows tinted),
 * beside a navy panel that sums up the split and keys the pills.
 *
 * Design: managed-training-services `#split`, `.mxw`, `.mxt`, `.mx-p`, `.mx-side`.
 */
export default function OwnershipMatrix({ data }) {
  if (!data?.rows?.length) return null;

  const { section_id, heading, description, caption, columns, levels, rows, side } = data;

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

      <Box className="grid grid-cols-[1fr_300px] items-start gap-6 max-[900px]:grid-cols-1">
        <Reveal>
          <Box
            as="table"
            className="w-full border-separate border-spacing-0 overflow-hidden rounded-[14px] border border-ink/12 bg-white shadow-rest"
          >
            {caption ? <caption className="sr-only">{caption}</caption> : null}
            <thead>
              <tr>
                <th
                  scope="col"
                  className="bg-navy px-5 py-4 text-left font-display text-[14px] font-bold text-paper max-[600px]:p-3 max-[420px]:px-2 max-[420px]:py-2.5 max-[420px]:text-[13px]"
                >
                  {columns?.activity}
                </th>
                {[
                  { label: columns?.edstellar, Icon: Settings, tone: "bg-navy-soft text-lime" },
                  { label: columns?.your_team, Icon: Lock, tone: "bg-lime text-navy" },
                ].map(({ label, Icon, tone }) => (
                  <th
                    key={label}
                    scope="col"
                    className="w-37.5 bg-navy px-5 py-4 text-center font-display text-[14px] font-bold text-paper max-[600px]:w-auto max-[600px]:p-3 max-[420px]:px-2 max-[420px]:py-2.5 max-[420px]:text-[13px]"
                  >
                    <span className="inline-flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        className={cn(
                          "inline-flex size-6 items-center justify-center rounded-[7px] max-[420px]:hidden",
                          tone,
                        )}
                      >
                        <Icon size={14} strokeWidth={1.9} />
                      </span>
                      {label}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.activity} className={row.strategic ? "bg-paper" : undefined}>
                  <th
                    scope="row"
                    className="border-t border-ink/12 px-5 py-3.25 text-left font-body text-[14.5px] font-medium leading-[1.4] text-ink max-[600px]:p-3 max-[420px]:px-2 max-[420px]:py-2.5 max-[420px]:text-[13px]"
                  >
                    {row.activity}
                  </th>
                  {[row.edstellar, row.your_team].map((level, index) => (
                    <td
                      key={index}
                      className="border-t border-ink/12 px-3 py-3.25 text-center max-[420px]:px-1 max-[420px]:py-2.5"
                    >
                      <Pill
                        level={level}
                        levels={levels}
                        className="min-w-23 max-[600px]:min-w-0 max-[600px]:px-2 max-[600px]:py-1 max-[600px]:text-[9.5px] max-[420px]:px-1.5 max-[420px]:text-[9px] max-[420px]:tracking-[0.02em]"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Box>
        </Reveal>

        {side ? (
          <Reveal delay={1}>
            <Box
              as="aside"
              aria-label={side.aria_label}
              className="rounded-[14px] bg-navy p-6 text-paper"
            >
              <Text
                as="p"
                className="mb-2.5 font-mono text-[10px] leading-[1.6] tracking-[0.14em] text-paper/60 uppercase"
              >
                {side.label}
              </Text>
              {side.summary ? (
                <Text
                  as="p"
                  className="mb-5 font-display text-[21px] leading-[1.25] font-bold tracking-[-0.02em] text-paper"
                >
                  <Summary text={side.summary} />
                </Text>
              ) : null}
              {side.key?.length ? (
                <Box
                  as="ul"
                  className="m-0 flex list-none flex-col gap-2.5 border-t border-paper/14 p-0 pt-4"
                >
                  {side.key.map((entry) => (
                    <Box
                      as="li"
                      key={entry.level}
                      className="flex items-center gap-2.5 text-[13px] leading-[1.4] text-paper/78"
                    >
                      <Pill level={entry.level} levels={levels} onDark className="min-w-22 flex-none" />
                      {entry.text}
                    </Box>
                  ))}
                </Box>
              ) : null}
            </Box>
          </Reveal>
        ) : null}
      </Box>
    </Section>
  );
}
