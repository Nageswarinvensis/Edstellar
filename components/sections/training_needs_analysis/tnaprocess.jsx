import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import TnaProcessFlow from "./tna-process-flow";
import { cn } from "@/lib/utils";

/*
 * Converging-hub flowchart: setup → inputs → gap analysis → three outputs,
 * one row. `TnaProcessFlow` draws the animated connectors between the boxes
 * tagged with `data-hd`. At 1140px and below the chart stacks, the connectors
 * are hidden, and a ↓ between columns carries the flow instead.
 */

const COL_CLASS = "relative z-2 flex flex-none flex-col";

const ARROW_CLASS =
  "max-[1141px]:before:my-0.5 max-[1141px]:before:block max-[1141px]:before:text-center max-[1141px]:before:text-[20px] max-[1141px]:before:leading-[1.7] max-[1141px]:before:text-ink/22 max-[1141px]:before:content-['↓']";

const NODE_CLASS =
  "flex items-center justify-center rounded-[12px] border text-center transition-[translate,box-shadow] duration-200 hover:-translate-y-[3px] hover:shadow-lift motion-reduce:hover:translate-y-0 max-[1141px]:w-auto";

const LABEL_CLASS =
  "font-display text-[13.5px] leading-[1.22] font-bold tracking-[-0.01em] text-ink";

function Column({ first = false, children }) {
  return <Box className={cn(COL_CLASS, !first && ARROW_CLASS)}>{children}</Box>;
}

function Node({ label, note, ...props }) {
  return (
    <Box
      {...props}
      className={cn(NODE_CLASS, "min-h-[104px] w-[128px] border-ink/12 bg-white p-3.5")}
    >
      <Text as="span" className={LABEL_CLASS}>
        {label}
        {note ? (
          <Text
            as="span"
            className="mt-1 block text-[11.5px] leading-[1.22] font-normal tracking-normal text-ink/60"
          >
            {note}
          </Text>
        ) : null}
      </Text>
    </Box>
  );
}

export default function TnaProcess({ data }) {
  if (!data) return null;

  const { sectionId, heading, subtitle, setup, inputs, hub, outputs } = data;

  return (
    <Section id={sectionId} className="bg-paper-warm">
      <Box className="mb-10 max-w-[62ch]">
        <Reveal>
          <RichHeading heading={heading} />
        </Reveal>

        {subtitle && (
          <Reveal delay={1}>
            <Text as="p" className="mt-4 max-w-[60ch] text-[16px] leading-relaxed text-ink/70">
              {subtitle}
            </Text>
          </Reveal>
        )}
      </Box>

      <Reveal delay={2}>
        <TnaProcessFlow
          className="
            relative flex flex-nowrap items-center justify-center gap-10
            max-[1141px]:flex-col max-[1141px]:items-stretch max-[1141px]:gap-3
          "
        >
          <Column first>
            <Node data-hd="setup" label={setup} />
          </Column>

          {inputs && (
            <Column>
              <Box
                data-hd="table"
                className="w-[198px] overflow-hidden rounded-[12px] border border-ink/12 bg-white max-[1141px]:w-auto"
              >
                <Text
                  as="p"
                  className="border-b border-ink/12 bg-paper-warm px-2.5 py-[11px] text-center font-display text-[14px] leading-[1.7] font-bold text-ink"
                >
                  {inputs.label}
                </Text>
                {inputs.items?.map((item) => (
                  <Text
                    key={item}
                    as="p"
                    data-hd="input"
                    className="border-b border-ink/12 p-3 text-center text-[13px] leading-[1.25] text-ink last:border-b-0"
                  >
                    {item}
                  </Text>
                ))}
              </Box>
            </Column>
          )}

          <Column>
            <Box
              data-hd="hub"
              className={cn(
                NODE_CLASS,
                "min-h-[118px] w-[140px] border-navy bg-navy p-3.5 shadow-lift",
                "max-[1141px]:min-h-0 max-[1141px]:p-[18px]",
              )}
            >
              <Text
                as="span"
                className="font-display text-[19px] leading-[1.1] font-bold tracking-[-0.01em] text-paper"
              >
                {hub}
              </Text>
            </Box>
          </Column>

          {outputs?.map((output) => (
            <Column key={output.title}>
              <Node data-hd="output" label={output.title} note={output.note} />
            </Column>
          ))}
        </TnaProcessFlow>
      </Reveal>
    </Section>
  );
}
