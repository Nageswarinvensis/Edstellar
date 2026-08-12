import { Star, User } from "lucide-react";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import { CtaButton } from "@/components/shared/CtaButton";
import RichHeading from "@/components/shared/rich-heading";
import Reveal from "@/components/shared/reveal";

/**
 * Vendor course trainer roster. Every field on `trainer` is placeholder
 * content — generic name, stand-in rating/sessions/years — until a real
 * trainer is matched at scheduling (see `trainers.note`). Swap for the
 * real roster when it exists; don't attach these stats to an invented
 * specific person's name or photo in the meantime.
 *
 * Design: `section#trainers.block.warm`, `.tr-grid`, `.tr-card`, `.tr-btn`,
 * `.tr-stats`.
 */
export default function Trainers({ trainers }) {
  if (!trainers?.people?.length) return null;

  return (
    <Section id="trainers" className="border-t border-ink/10 bg-paper-warm">
      <Reveal delay={1}>
        <RichHeading
          as="h2"
          parts={trainers.heading.parts}
          className="mb-6.5 max-w-[20ch] tracking-[-0.03em]"
        />
      </Reveal>

      <Reveal delay={2}>
        <Text
          as="p"
          className="mb-15 max-w-[64ch] text-[clamp(15px,1.2vw,17px)] leading-[1.7] text-ink/60"
        >
          {trainers.description}
        </Text>
      </Reveal>

      <Box className="grid grid-cols-4 gap-5 max-[1000px]:grid-cols-2 max-[600px]:grid-cols-1">
        {trainers.people.map((trainer, index) => (
          <Reveal key={trainer.name ?? index} delay={Math.min(index + 1, 4)}>
            <Box className="group flex h-full flex-col rounded-2xl border border-ink/10 bg-white px-5.5 py-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.25 hover:border-ink/20 hover:shadow-[0_28px_58px_-34px_rgba(10,22,40,0.5)]">
              <Box className="mb-4 flex size-16 flex-none items-center justify-center overflow-hidden rounded-full bg-navy text-lime transition-transform duration-300 group-hover:scale-[1.06]">
                {trainer.image ? (
                  <img
                    src={trainer.image}
                    alt={trainer.name || ""}
                    className="size-full object-cover"
                  />
                ) : (
                  <User size={26} strokeWidth={1.75} aria-hidden="true" />
                )}
              </Box>

              <Text
                as="h4"
                className="mb-1 font-display text-base leading-tight font-semibold tracking-[-0.02em] text-ink"
              >
                {trainer.name}
              </Text>

              {trainer.role ? (
                <Text
                  as="p"
                  className="mb-2.75 text-[13px] leading-[1.45] text-ink/60"
                >
                  {trainer.role}
                </Text>
              ) : null}

              {trainer.years ? (
                <Text
                  as="p"
                  className="mb-3.5 font-mono text-[10px] tracking-[0.13em] text-ink/60 uppercase"
                >
                  {trainer.years}
                </Text>
              ) : null}

              {trainer.rating ? (
                <Box className="mt-0.5 mb-4 flex items-center gap-2.5 rounded-[9px] bg-paper-warm px-2.75 py-2.25">
                  <Box className="inline-flex items-center gap-1.25 font-display text-sm font-bold tracking-[-0.01em] text-ink">
                    <Star size={13} strokeWidth={0} fill="currentColor" />
                    {trainer.rating}
                  </Box>

                  <Box className="h-3.25 w-px flex-none bg-ink/20" />

                  <Text
                    as="span"
                    className="font-mono text-[10px] leading-[1.3] tracking-[0.07em] text-ink/60 uppercase"
                  >
                    {trainer.sessions} sessions delivered
                  </Text>
                </Box>
              ) : null}

              {trainer.spec?.length ? (
                <Box className="mt-auto flex flex-wrap gap-1.5">
                  {trainer.spec.map((topic) => (
                    <Text
                      key={topic}
                      as="span"
                      className="rounded-[7px] bg-paper-warm px-2.5 py-1.25 text-[11.5px] font-medium text-ink"
                    >
                      {topic}
                    </Text>
                  ))}
                </Box>
              ) : null}

              <CtaButton
                variant="ghost"
                size="sm"
                arrow
                render={<a href="#apply" />}
                className="mt-4 w-full justify-center border-ink/22 px-4 py-2.5 text-[12.5px] hover:border-navy hover:bg-navy hover:text-lime"
              >
                View trainer profile
              </CtaButton>
            </Box>
          </Reveal>
        ))}
      </Box>

      {trainers.note ? (
        <Reveal delay={3}>
          <Text
            as="p"
            className="mt-7 max-w-[76ch] text-[13px] leading-[1.65] text-ink/60"
          >
            {trainers.note}
          </Text>
        </Reveal>
      ) : null}
    </Section>
  );
}
