import {
  Building2,
  Check,
  Crown,
  LayoutGrid,
  MonitorSmartphone,
  Presentation,
  SlidersHorizontal,
  Users,
} from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { CtaButton } from "@/components/common/cta-button";
import RichHeading from "@/components/common/rich-heading";
import { cn } from "@/lib/utils";

const FEATURE_ICONS = {
  instructor: Presentation,
  delivery: MonitorSmartphone,
  programs: LayoutGrid,
  flexible: SlidersHorizontal,
};

const CARD_ICONS = [Users, Crown, Building2];

/**
 * One decorative package card. Lines stand in for feature text — the cards
 * are a picture of the packages, not the packages themselves (those are in
 * the pricing table), so the whole cluster is aria-hidden.
 */
function PackageCard({ card, index }) {
  const Icon = CARD_ICONS[index] ?? Users;
  const featured = Boolean(card.badge);
  const rows = featured ? 3 : 2;

  return (
    <Box
      className={cn(
        "relative rounded-[18px] border px-5 pb-5 text-center backdrop-blur-sm",
        "bg-[linear-gradient(165deg,color-mix(in_srgb,var(--color-pricing-card)_92%,transparent),color-mix(in_srgb,var(--color-pricing-mid)_85%,transparent))]",
        "shadow-[0_32px_60px_-24px_rgba(0,6,24,0.85),inset_0_1px_0_rgba(160,205,255,0.25)]",
        featured
          ? "z-2 w-52 border-pricing-sky/55 pt-11 rotate-[0.9deg] motion-safe:animate-pricing-float"
          : "w-42 border-pricing-sky/40 pt-6",
        index === 0 && "-mr-3 mt-6 [transform:perspective(900px)_rotateY(6deg)]",
        index === 2 && "-ml-3 mt-10 [transform:perspective(900px)_rotateY(-7deg)]",
      )}
    >
      {featured ? (
        <Text
          as="span"
          className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-lime px-3 py-1.5 font-mono text-[10px] leading-none font-medium tracking-[0.14em] whitespace-nowrap text-navy uppercase"
        >
          {card.badge}
        </Text>
      ) : null}

      <Icon
        size={featured ? 32 : 28}
        strokeWidth={1.8}
        aria-hidden="true"
        className={cn("mx-auto", featured ? "text-lime" : "text-pricing-kicker")}
      />
      <Text
        as="span"
        className={cn(
          "mt-3 block font-display leading-[1.2] font-semibold tracking-[-0.02em] text-white",
          featured ? "text-xl" : "text-lg",
        )}
      >
        {card.name}
      </Text>
      <Text as="span" className="mt-1 block text-[12px] leading-[1.35] text-pricing-mist/80">
        {card.text}
      </Text>

      <Box className={cn("mt-4 grid gap-3 text-left", featured && "border-t border-pricing-sky/25 pt-3")}>
        {Array.from({ length: rows }, (_, row) => (
          <Box key={row} className="flex items-center gap-2.5">
            <Box
              className={cn(
                "grid size-4.5 flex-none place-items-center rounded-full text-pricing-deep",
                featured ? "bg-lime" : "bg-pricing-kicker",
              )}
            >
              <Check size={11} strokeWidth={3} />
            </Box>
            <Box className="grid flex-1 gap-1.5">
              <Box className="h-1 rounded-full bg-pricing-kicker/45" />
              <Box className="h-1 w-3/4 rounded-full bg-pricing-kicker/45" />
            </Box>
          </Box>
        ))}
      </Box>

      <Box
        className={cn(
          "mx-auto mt-5 h-8 rounded-[9px]",
          featured ? "w-3/4 bg-lime" : "w-2/3 bg-pricing-card",
        )}
      />
    </Box>
  );
}

/**
 * Pricing hero — the blue banner: the two-line heading (global h1 size; its second
 * line a sky-blue gradient in the serif italic), the lede, the jump to the
 * pricing table and the four feature chips. From 1100px the three package
 * cards float on the right; below that the hero stacks as plain text.
 *
 * Design: corporate-training-pricing-v2 `.hero`. The design's person photo
 * (`edstellar_pricing_assets/hero_person_from_mockup.webp`) was not supplied,
 * so the right side is the card cluster alone.
 */
export default function PricingHero({ data }) {
  if (!data) return null;
  const { heading, description, cta, features = [], cards = [] } = data;

  return (
    <Box
      as="section"
      aria-label="Corporate training pricing"
      className="relative overflow-hidden bg-[radial-gradient(60%_70%_at_78%_10%,color-mix(in_srgb,var(--color-pricing-glow)_55%,transparent),transparent_70%),linear-gradient(100deg,var(--color-pricing-deep)_0%,var(--color-pricing-mid)_60%,var(--color-pricing-bright)_100%)] px-5 py-11 text-white sm:px-6 sm:py-12 lg:px-10 min-[1100px]:py-20"
    >
      <Box
        aria-hidden="true"
        className="pointer-events-none absolute -right-[12%] -bottom-[55%] hidden size-[46rem] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-pricing-azure)_22%,transparent)_55%,transparent_75%)] min-[1100px]:block"
      />

      <Box className="relative z-1 mx-auto grid max-w-295 items-center gap-12 min-[1100px]:grid-cols-[1.05fr_0.95fr]">
        <Box>

          <RichHeading
            as="h1"
            heading={heading}
            className="text-white"
            emphasisClassName="block bg-[linear-gradient(90deg,var(--color-pricing-sky)_0%,var(--color-pricing-azure)_100%)] bg-clip-text font-bold tracking-[-0.01em] text-transparent"
          />

          {description ? (
            <Text
              as="p"
              className="mt-4.5 max-w-[40ch] text-[clamp(17px,1.6vw,21px)] leading-[1.55] text-pricing-mist"
            >
              {description}
            </Text>
          ) : null}

          {cta?.href ? (
            <CtaButton color="lime" arrow render={<a href={cta.href} />} className="mt-7">
              {cta.label}
            </CtaButton>
          ) : null}

          {features.length ? (
            <Box
              as="ul"
              className="mt-9 grid max-w-130 list-none grid-cols-2 gap-x-4 gap-y-5 max-[480px]:grid-cols-1"
            >
              {features.map((feature) => {
                const Icon = FEATURE_ICONS[feature.icon] ?? LayoutGrid;
                return (
                  <Box
                    as="li"
                    key={feature.title}
                    className="flex items-center gap-3"
                  >
                    <Box className="grid size-11 flex-none place-items-center rounded-full border border-pricing-kicker/35 bg-pricing-mid">
                      <Icon size={20} strokeWidth={1.8} aria-hidden="true" className="text-pricing-sky" />
                    </Box>
                    <Box>
                      <Text
                        as="span"
                        className="block font-display text-[14.5px] leading-[1.3] font-semibold tracking-[-0.02em] text-white"
                      >
                        {feature.title}
                      </Text>
                      <Text as="span" className="block text-[13px] leading-[1.35] text-pricing-mist/85">
                        {feature.text}
                      </Text>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          ) : null}
        </Box>

        {cards.length ? (
          <Box aria-hidden="true" className="hidden items-start justify-center min-[1100px]:flex">
            {cards.map((card, index) => (
              <PackageCard key={card.name} card={card} index={index} />
            ))}
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}
