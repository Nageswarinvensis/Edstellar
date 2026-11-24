import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import CtaButton from "@/components/common/cta-button";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import Breadcrumbs from "@/components/common/breadcrumbs";

const BREADCRUMBS = [
  { label: "Home", href: "/" },
  { label: "Who we serve" },
];

export default function WwsHero({ data }) {
  if (!data) return null;
  const { jumpCard } = data;

  return (
    <Section
      id="top"
      className="overflow-hidden bg-paper pb-0 lg:pb-0"
      innerClassName="max-w-7xl"
    >
      <Reveal>
        <Breadcrumbs items={BREADCRUMBS} className="mt-0" />
      </Reveal>

      <Box className="grid items-center gap-12 pt-6 pb-16 max-[900px]:grid-cols-1 max-[900px]:gap-10 max-[900px]:pb-10 min-[901px]:grid-cols-[1.05fr_.95fr]">
        {/* Copy */}
        <Box className="min-w-0">
          {data.eyebrow && (
            <Reveal>
              <Text as="p" className="mb-4 flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-ink-muted">
                <span className="inline-block h-[2px] w-6 bg-lime" aria-hidden="true" />
                {data.eyebrow}
              </Text>
            </Reveal>
          )}
          <Reveal delay={1}>
            <RichHeading
              as="h1"
              heading={data.heading}
              className="text-[clamp(38px,4.4vw,48px)] font-bold leading-[1.05] tracking-[-0.035em] text-ink"
            />
          </Reveal>

          <Reveal delay={2}>
            <Text
              as="p"
              className="mt-5 max-w-[64ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink-muted"
            >
              {data.lede}
            </Text>
          </Reveal>

          <Reveal delay={3}>
            <Box className="mt-8 flex flex-wrap gap-3">
              <CtaButton arrow render={<a href={data.primaryBtn.href} title={data.primaryBtn.title} />}>
                {data.primaryBtn.text}
              </CtaButton>
              <CtaButton arrow
                variant="secondary"
                render={<a href={data.secondaryBtn.href} title={data.secondaryBtn.title} />}
                className="border border-ink text-ink hover:bg-transparent"
              >
                {data.secondaryBtn.text}
              </CtaButton>
            </Box>
            {data.trustBar?.length > 0 && (
              <Box as="ul" className="mt-5 flex list-none flex-wrap gap-x-4 gap-y-1.5 p-0">
                {data.trustBar.map((item) => (
                  <Box as="li" key={item} className="flex items-center gap-1.5">
                    <span className="size-[5px] rounded-full bg-lime" aria-hidden="true" />
                    <Text as="span" className="font-mono text-[10px] font-medium uppercase tracking-[0.07em] text-ink-muted">
                      {item}
                    </Text>
                  </Box>
                ))}
              </Box>
            )}
          </Reveal>
        </Box>

        {/* Jump-to card */}
        <Reveal delay={2}>
          <Box className="rounded-2xl border border-ink/12 bg-white p-5 shadow-[0_2px_16px_rgba(10,22,40,.07)] min-[901px]:ml-auto min-[901px]:max-w-[460px]">
            {/* Card header */}
            <Box className="mb-4 flex items-center justify-between">
              <Text as="span" className="font-mono text-[10px] font-medium uppercase tracking-[0.07em] text-ink-muted">
                {jumpCard.header}
              </Text>
              <Text as="span" className="rounded-md bg-paper-warm px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.06em] text-ink">
                {jumpCard.badge}
              </Text>
            </Box>

            {/* Groups */}
            {jumpCard.groups.map((group) => (
              <Box key={group.label} className="mb-4">
                <Text as="p" className="mb-2 font-mono text-[10px] font-medium uppercase tracking-[0.07em] text-ink-muted">
                  {group.label}
                </Text>
                <Box className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      title={item.title}
                      className="rounded-full border border-ink/15 bg-paper px-4 py-2 text-[13.5px] font-medium text-ink no-underline transition-colors hover:border-ink/30 hover:bg-paper-warm"
                    >
                      {item.label}
                    </a>
                  ))}
                </Box>
              </Box>
            ))}

            {/* Note */}
            <a
              href={jumpCard.noteHref}
              title="Compare all seven organization types"
              className="mt-1 block rounded-lg bg-lime/20 px-4 py-3 text-[13.5px] font-medium text-ink no-underline transition-colors hover:bg-lime/30"
            >
              {jumpCard.note}
            </a>
          </Box>
        </Reveal>
      </Box>
    </Section>
  );
}
