import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import InlineHtml from "@/components/common/inline-html";
import V2Section from "@/components/sections/course/v2/section";
import V2SectionHead from "@/components/sections/course/v2/section-head";
import { cn } from "@/lib/utils";

/** Each training step's colour key, in order (the design's `.gl`). */
const KEY = ["bg-lime", "bg-gold", "bg-ring-3", "bg-navy"];

/**
 * v2 · 3 Program overview (the design's `#overview`) — the quotable
 * definition on a lime rule, how the instructor-led delivery works (with
 * the lab examples), and four training steps, one per key part of the
 * definition, each with a numbered label and a colour key.
 */
export default function V2Overview({ data }) {
  if (!data) return null;
  const { eyebrow, heading, definition, paragraphs = [], lab_examples = [], lead_after = [], steps = [] } = data;

  return (
    <V2Section id="overview">
      <V2SectionHead eyebrow={eyebrow} heading={heading} />

      {definition && (
        <Reveal>
          <p className="mb-5 max-w-[860px] border-l-4 border-lime py-1 pl-[18px] text-[18px] leading-[1.65] text-ink [&_strong]:font-bold">
            <InlineHtml text={definition} />
          </p>
        </Reveal>
      )}

      <Reveal className="max-w-[760px] text-[16.5px] leading-[1.7] text-ink-muted">
        {paragraphs.map((p) => (
          <Text key={p} className="mb-3 text-[16.5px] leading-[1.7]">{p}</Text>
        ))}
        {lab_examples.length > 0 && (
          <ul className="mb-3 list-disc pl-5 text-ink marker:text-ink">
            {lab_examples.map((item) => (
              <li key={item} className="my-1 text-[15px] leading-[1.6]">{item}</li>
            ))}
          </ul>
        )}
        {lead_after.map((p) => (
          <Text key={p} className="text-[16.5px] leading-[1.7]">{p}</Text>
        ))}
      </Reveal>

      {steps.length > 0 && (
        <ol className="mt-5 grid gap-4 min-[720px]:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={Math.min(i + 1, 4)}
              className="relative overflow-hidden rounded-[18px] border border-ink/12 bg-white p-[22px] before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:bg-[linear-gradient(90deg,var(--color-navy),var(--color-lime))]"
            >
              <span className="font-mono text-[11px] tracking-[0.12em] text-olive">{step.label}</span>
              <Text as="h3" className="mt-2.5 mb-1.5 text-[18.5px] leading-[1.3] tracking-[-0.02em]">
                <i aria-hidden="true" className={cn("mr-1.5 inline-block size-2.5 rounded-[3px] align-middle", KEY[i % KEY.length])} />
                {step.title}
              </Text>
              <Text className="text-[14.5px] leading-[1.6]">{step.text}</Text>
            </Reveal>
          ))}
        </ol>
      )}
    </V2Section>
  );
}
