import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import RichHeading from "@/components/common/rich-heading";

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 size-[18px] shrink-0 text-olive" aria-hidden="true">
      <circle cx="12" cy="12" r="9" /><path d="m8 12 3 3 5-6" />
    </svg>
  );
}

function OrgCard({ type }) {
  return (
    <Box
      id={type.id}
      className="flex flex-col rounded-2xl border border-ink/10 bg-white p-5 scroll-mt-24"
    >
      {/* Name + chip */}
      <Box className="mb-3 flex items-start justify-between gap-3">
        <Text as="h3" className="m-0 text-[20px] font-bold leading-[1.2] tracking-[-0.02em] text-ink">
          {type.label}
        </Text>
        <Text as="span" className="mt-0.5 shrink-0 rounded-md bg-paper-warm px-2.5 py-1 font-mono text-[9px] font-medium uppercase tracking-[0.07em] text-ink-muted">
          {type.chip}
        </Text>
      </Box>

      {/* Tagline */}
      <Text as="p" className="mb-4 text-[13.5px] leading-[1.55] text-ink-muted">
        {type.tagline}
      </Text>

      {/* Common problem */}
      {type.problem && (
        <Box className="mb-4 rounded-lg bg-paper-warm px-3.5 py-2.5">
          <Text as="p" className="mb-1 font-mono text-[9px] font-medium uppercase tracking-[0.07em] text-ink-muted">
            Common problem
          </Text>
          <Text as="p" className="m-0 text-[13px] leading-[1.5] text-ink">
            {type.problem}
          </Text>
        </Box>
      )}

      {/* Ticks */}
      <Box as="ul" className="m-0 mb-4 flex list-none flex-col gap-2 p-0">
        {type.ticks.map((tick) => (
          <Box as="li" key={tick} className="flex items-start gap-2">
            <CheckIcon />
            <Text as="span" className="text-[13.5px] leading-[1.55] text-ink">{tick}</Text>
          </Box>
        ))}
      </Box>

      {/* Usually starts with */}
      <Box className="mb-3 mt-auto">
        <Text as="p" className="mb-2 font-mono text-[9px] font-medium uppercase tracking-[0.07em] text-ink-muted">
          Usually starts with
        </Text>
        <Box className="flex flex-wrap gap-2">
          {type.starts_with.map((s) => (
            <a
              key={s.label}
              href={s.href}
              title={s.title}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-ink/15 bg-paper px-3 py-1.5 text-[12.5px] font-medium text-ink no-underline transition-colors hover:border-ink/30 hover:bg-paper-warm"
            >
              {s.label}
            </a>
          ))}
        </Box>
      </Box>

      {/* Tools */}
      <Box>
        <Text as="p" className="mb-2 font-mono text-[9px] font-medium uppercase tracking-[0.07em] text-ink-muted">
          Edstellar tools
        </Text>
        <Box className="flex flex-wrap gap-2">
          {type.tools.map((tool) =>
            tool.href ? (
              <a
                key={tool.name}
                href={tool.href}
                title={tool.title}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-ink/12 bg-paper-warm px-3 py-1.5 text-[12.5px] font-medium text-ink no-underline transition-colors hover:border-ink/30 hover:bg-paper"
              >
                {tool.name}
              </a>
            ) : (
              <Text
                key={tool.name}
                as="span"
                className="rounded-full border border-ink/12 bg-paper-warm px-3 py-1.5 text-[12.5px] font-medium text-ink-muted"
                title={tool.title}
              >
                {tool.name}
              </Text>
            )
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default function WwsOrgExplorer({ data }) {
  if (!data?.types?.length) return null;

  const typeMap = Object.fromEntries(data.types.map((t) => [t.id, t]));

  return (
    <Section
      id="types"
      aria-labelledby="types-h"
      className="scroll-mt-20 bg-paper py-16 lg:py-20"
    >
      {/* Split heading */}
      <Box className="mb-10 grid gap-6 max-[900px]:grid-cols-1 min-[901px]:grid-cols-[1.1fr_1fr] min-[901px]:items-end">
        <RichHeading
          as="h2"
          id="types-h"
          heading={data.heading}
          className="m-0 text-[clamp(32px,4vw,42px)] font-bold leading-[1.08] tracking-[-0.03em] text-ink"
        />
        <Text as="p" className="m-0 text-[clamp(15px,1.1vw,17px)] leading-[1.7] text-ink-muted">
          {data.lede}
        </Text>
      </Box>

      {/* Groups */}
      {data.groups.map((group) => {
        const cards = group.ids.map((id) => typeMap[id]).filter(Boolean);
        const isBig = cards.length >= 4;
        return (
          <Box key={group.label} className="mb-10 last:mb-0">
            {/* Group label */}
            <Box className="mb-4 flex items-baseline gap-3">
              <Text as="h3" className="m-0 text-[18px] font-semibold tracking-[-0.01em] text-ink">
                {group.label}
              </Text>
              {group.subtitle && (
                <Text as="span" className="text-[14px] text-ink-muted">
                  {group.subtitle}
                </Text>
              )}
            </Box>

            {/* Cards grid */}
            <Box className={`grid gap-4 ${isBig ? "grid-cols-1 min-[700px]:grid-cols-2" : "grid-cols-1 min-[700px]:grid-cols-2 min-[1100px]:grid-cols-3"}`}>
              {cards.map((type) => (
                <OrgCard key={type.id} type={type} />
              ))}
            </Box>
          </Box>
        );
      })}
    </Section>
  );
}
