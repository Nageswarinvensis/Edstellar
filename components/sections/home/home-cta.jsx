import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import HomeWrap from "@/components/sections/home/home-wrap";
import RichHeading from "@/components/common/rich-heading";
import CtaButton from "@/components/common/cta-button";
import Reveal from "@/components/common/reveal";

/** Closing briefing CTA — centred on a navy field. */
export default function HomeCta({ data }) {
  if (!data) return null;

  return (
    <HomeWrap id="contact" aria-labelledby="cta-heading" className="scroll-mt-16 border-b-[1.5px] border-navy-soft bg-navy py-24 text-paper max-lg:py-16">
      <Reveal className="mx-auto flex max-w-[960px] flex-col items-center text-center">
        <RichHeading
          as="h2"
          id="cta-heading"
          heading={data.heading}
          className="m-0 font-serif text-[clamp(32px,4vw,54px)] font-normal leading-[1.06] tracking-[-0.014em] text-paper text-balance [&_span]:text-lime"
        />
        <Text as="p" className="mx-auto mt-5 max-w-[60ch] text-[clamp(15px,1.2vw,17px)] leading-[1.65] text-paper/72">
          {data.sub}
        </Text>
        <Box className="mt-8 flex flex-wrap justify-center gap-3">
          {data.actions?.map((action) => (
            <CtaButton
              key={action.label}
              variant={action.variant === "primary" ? "primary" : "ghost"}
              color={action.variant === "primary" ? "lime" : "navy"}
              arrow={Boolean(action.arrow)}
              render={<a href={action.href} />}
              className={action.variant !== "primary" ? "border-paper/30 text-paper hover:border-paper hover:bg-paper/5" : undefined}
            >
              {action.label}
            </CtaButton>
          ))}
        </Box>
      </Reveal>
    </HomeWrap>
  );
}
