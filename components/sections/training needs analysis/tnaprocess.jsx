import { ArrowRight } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";

function Connector() {
  return (
    <Box
      aria-hidden="true"
      className="flex items-center justify-center py-1 lg:px-2 lg:py-0"
    >
      <ArrowRight
        size={16}
        strokeWidth={2}
        className="rotate-90 text-ink/30 lg:rotate-0"
      />
    </Box>
  );
}

function Node({ label, note }) {
  return (
    <Box className="flex min-h-24 w-full flex-col items-center justify-center rounded-2xl border border-ink/12 bg-white px-5 py-4 text-center lg:w-45">
      <Text as="span" className="text-[13.5px] font-semibold text-ink">
        {label}
      </Text>
      {note && (
        <Text as="span" className="mt-1 font-mono text-[10px] text-ink-muted">
          {note}
        </Text>
      )}
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
            <Text as="p" className="mt-4 text-[16px] leading-relaxed text-ink/70">
              {subtitle}
            </Text>
          </Reveal>
        )}
      </Box>

      <Reveal delay={2}>
        <Box className="flex flex-col items-center gap-1 lg:flex-row lg:items-stretch lg:justify-center lg:gap-0">
          <Node label={setup} />

          <Connector />

          {inputs && (
            <Box className="w-full overflow-hidden rounded-2xl border border-ink/12 bg-white lg:w-64">
              <Box className="border-b border-ink/10 px-5 py-3">
                <Text
                  as="span"
                  className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-muted"
                >
                  {inputs.label}
                </Text>
              </Box>
              <Box className="divide-y divide-ink/8">
                {inputs.items?.map((item) => (
                  <Text
                    key={item}
                    as="p"
                    className="px-5 py-2.5 text-[13px] leading-snug text-ink/75"
                  >
                    {item}
                  </Text>
                ))}
              </Box>
            </Box>
          )}

          <Connector />

          <Box className="flex min-h-24 w-full flex-col items-center justify-center rounded-2xl bg-navy px-5 py-4 text-center lg:w-45">
            <Text as="span" className="text-[14px] font-semibold text-lime">
              {hub}
            </Text>
          </Box>

          <Connector />

          <Box className="flex w-full flex-col justify-center gap-3 lg:w-45">
            {outputs?.map((output) => (
              <Node key={output.title} label={output.title} note={output.note} />
            ))}
          </Box>
        </Box>
      </Reveal>
    </Section>
  );
}
