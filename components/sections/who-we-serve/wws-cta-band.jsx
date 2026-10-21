import Box from "@/components/ui/Box";
import Section from "@/components/ui/Section";
import Text from "@/components/ui/Text";
import RichHeading from "@/components/common/rich-heading";

export default function WwsCtaBand({ data }) {
  if (!data) return null;

  return (
    <Section className="bg-paper-cream">
      <Box className="grid items-center gap-10 max-[900px]:grid-cols-1 max-[900px]:gap-6 min-[901px]:grid-cols-[1.4fr_1fr]">
        <Box>
          <RichHeading
            as="h2"
            heading={data.heading}
            className="m-0 text-[clamp(32px,4vw,40px)] font-bold leading-[1.08] tracking-[-0.03em] text-ink"
          />
          <Text as="p" className="mt-5 max-w-[64ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink-muted">
            {data.lede}
          </Text>
        </Box>
        <Box className="flex max-[900px]:justify-start min-[901px]:justify-end">
          <a
            href={data.btn.href}
            className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-full border-[1.5px] border-transparent bg-ink px-7 text-[14px] font-semibold text-lime transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(10,22,40,.12)]"
          >
            {data.btn.text}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="size-[18px]" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </Box>
      </Box>
    </Section>
  );
}
