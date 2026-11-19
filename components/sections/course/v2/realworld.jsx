import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import V2Section from "@/components/sections/course/v2/section";
import V2SectionHead from "@/components/sections/course/v2/section-head";

/**
 * v2 · 8 In the real world (the design's `#realworld`) — public third-party
 * examples of the concept (not Edstellar clients), each with the point it
 * shows and its public source as plain text.
 */
export default function V2RealWorld({ data }) {
  if (!data?.examples?.length) return null;
  const { heading, lead, examples } = data;

  return (
    <V2Section id="realworld">
      <V2SectionHead heading={heading} lead={lead} />
      <ul className="grid gap-4 min-[720px]:grid-cols-2 lg:grid-cols-3">
        {examples.map((ex, i) => (
          <Reveal as="li" key={ex.name} delay={Math.min(i + 1, 4)} className="relative overflow-hidden rounded-[18px] border border-ink/12 bg-white p-[22px]">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.12em] text-olive">{ex.stage}</p>
            <Text as="h3" className="mb-1.5 text-[18.5px] leading-[1.3]">{ex.name}</Text>
            <Text className="mb-3 text-[15px] leading-[1.65] text-ink">{ex.text}</Text>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-muted">Source: {ex.source}</p>
          </Reveal>
        ))}
      </ul>
    </V2Section>
  );
}
