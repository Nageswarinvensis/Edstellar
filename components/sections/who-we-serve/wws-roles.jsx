import Link from "next/link";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import RichHeading from "@/components/common/rich-heading";

function RoleCard({ card }) {
  return (
    <Box className="flex flex-col rounded-2xl border border-ink/10 bg-white p-6">
      {/* Chip */}
      <Text as="span" className="mb-3 inline-block self-start rounded-md bg-paper-warm px-2.5 py-1 font-mono text-[9px] font-medium uppercase tracking-[0.07em] text-ink-muted">
        {card.chip}
      </Text>

      {/* Role name */}
      <Text as="h3" className="mb-3 text-[22px] font-bold leading-[1.2] tracking-[-0.02em] text-ink">
        {card.role}
      </Text>

      {/* Goal + desc */}
      <Text as="p" className="mb-5 flex-1 text-[14.5px] leading-[1.6] text-ink">
        <strong>{card.goal}</strong>{" "}
        <Text as="span" className="text-ink-muted">{card.desc}</Text>
      </Text>

      {/* Usually starts with */}
      <Box className="border-t border-ink/10 pt-4">
        <Text as="p" className="mb-3 font-mono text-[9px] font-medium uppercase tracking-[0.07em] text-ink-muted">
          Usually starts with
        </Text>
        <Box className="flex flex-wrap gap-2">
          {card.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              title={link.title}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-medium text-ink underline decoration-olive underline-offset-2 transition-colors hover:text-olive"
            >
              {link.label}
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default function WwsRoles({ data }) {
  if (!data?.cards?.length) return null;

  const row1 = data.cards.slice(0, 3);
  const row2 = data.cards.slice(3);

  return (
    <Section
      id="roles"
      aria-labelledby="roles-h"
      className="scroll-mt-20 bg-paper py-16 lg:py-20"
    >
      {/* Split heading */}
      <Box className="mb-14 grid gap-10 max-[900px]:grid-cols-1 min-[901px]:grid-cols-[1.1fr_1fr] min-[901px]:items-start">
        <RichHeading
          as="h2"
          id="roles-h"
          heading={data.heading}
          className="m-0 text-[clamp(32px,4vw,42px)] font-bold leading-[1.08] tracking-[-0.03em] text-ink"
        />
        <Text as="p" className="m-0 border-l-2 border-ink/15 pl-6 text-[clamp(15px,1.1vw,17px)] leading-[1.75] text-ink-muted">
          {data.lede}
        </Text>
      </Box>

      {/* Row 1 — 3 cards */}
      <Box className="mb-6 grid gap-6 grid-cols-1 min-[700px]:grid-cols-2 min-[1000px]:grid-cols-3">
        {row1.map((card) => <RoleCard key={card.id} card={card} />)}
      </Box>

      {/* Row 2 — 2 cards */}
      <Box className="grid gap-6 grid-cols-1 min-[700px]:grid-cols-2">
        {row2.map((card) => <RoleCard key={card.id} card={card} />)}
      </Box>
    </Section>
  );
}
