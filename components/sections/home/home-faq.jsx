import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import InlineHtml from "@/components/common/inline-html";
import HomeWrap from "@/components/sections/home/home-wrap";

/**
 * "Capability development FAQs." — native `<details>` rows (the first open),
 * so every answer is in the page source for crawlers and AI answers. The
 * route adds the matching FAQPage schema from the same content.
 *
 * Design: `edstellar-homepage-capability-development.html` → `#faq`
 * (`h2.sh`, `.faq details / summary`).
 */
export default function HomeFaq({ data }) {
  if (!data?.items?.length) return null;
  const { heading, items } = data;

  return (
    <HomeWrap id="faq" aria-labelledby="faq-heading" className="scroll-mt-16 bg-paper py-20 max-lg:py-16">
      <Reveal>
        <RichHeading
          as="h2"
          id="faq-heading"
          heading={heading}
          className="mx-auto max-w-[720px] text-center text-[clamp(30px,3vw,38px)] font-medium leading-[1.08] tracking-[-0.03em] text-ink"
        />
      </Reveal>

      <Box className="mx-auto mt-[34px] max-w-[740px]">
        {items.map((item, i) => (
          <Box as="details" key={item.question} open={i === 0} className="group border-b border-ink/12">
            <Box
              as="summary"
              className="flex cursor-pointer list-none items-start justify-between gap-5 py-5 font-body text-[17px] leading-[1.4] font-medium text-ink italic [&::-webkit-details-marker]:hidden"
            >
              {item.question}
              <span aria-hidden="true" className="flex-none font-body text-[22px] leading-none font-light not-italic">
                <span className="group-open:hidden">+</span>
                <span className="hidden group-open:inline">–</span>
              </span>
            </Box>
            <Text as="p" className="-mt-1 mb-5 max-w-[660px] text-[15px] leading-[1.65] text-ink-muted">
              <InlineHtml text={item.answer} linkClassName="border-b border-lime font-medium text-ink no-underline hover:text-olive" />
            </Text>
          </Box>
        ))}
      </Box>
    </HomeWrap>
  );
}
