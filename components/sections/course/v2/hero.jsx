import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Breadcrumbs from "@/components/common/breadcrumbs";
import V2ScrollLink from "@/components/sections/course/v2/scroll-link";
import { V2_BUTTON, V2ButtonArrow } from "@/components/sections/course/v2/buttons";
import { cn } from "@/lib/utils";

/**
 * v2 · 1 Hero (the design's `.hero`) — kicker, H1 (the program keyword),
 * serif theme line, audience line, brand intro, delivery formats and two
 * CTAs, beside the transparent hero illustration (`<object>`
 * keeps the SVG's own animation).
 */
export default function V2Hero({ hero, breadcrumbs }) {
  if (!hero) return null;
  const { kicker, heading, subhead, description, intro_text, formats = [], actions = [], illustration_url } = hero;

  return (
    <Section
      id="top"
      className="overflow-hidden bg-[radial-gradient(ellipse_55%_65%_at_74%_48%,var(--color-paper-bright)_0%,transparent_72%),var(--color-paper)] pt-0 pb-11 lg:pt-0 lg:pb-10"
    >
      <Breadcrumbs items={breadcrumbs} />

      <Box className="mt-5 grid grid-cols-1 items-center gap-[22px] lg:grid-cols-[minmax(0,46fr)_minmax(0,54fr)] lg:items-start lg:gap-[clamp(20px,2.6vw,44px)]">
        <Box className="relative z-[1] max-w-[640px]">
          {kicker && (
            <Text className="mb-[18px] font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">{kicker}</Text>
          )}
          <Text as="h1" className="mb-3.5 text-[clamp(40px,4.4vw,66px)] font-semibold leading-[1.03] tracking-[-0.045em]">
            {heading}
          </Text>
          {subhead && (
            <Text className="mb-5 font-serif text-[clamp(26px,2.5vw,38px)] font-medium italic leading-[1.15] tracking-[-0.01em] text-ink">
              {subhead}
            </Text>
          )}
          {description && (
            <Text className="mb-2 text-[17px] font-semibold leading-[1.55] tracking-[-0.005em] text-ink">{description}</Text>
          )}
          {intro_text && <Text className="max-w-[560px] text-[17px] leading-[1.6]">{intro_text}</Text>}

          {formats.length > 0 && (
            <ul aria-label="Delivery formats" className="mt-5 mb-6 flex flex-wrap gap-y-1 text-[15px] text-ink">
              {formats.map((format, i) => (
                <li key={format} className="flex items-center">
                  {i > 0 && <span aria-hidden="true" className="mx-2.5 text-ink-muted">·</span>}
                  {format}
                </li>
              ))}
            </ul>
          )}

          {actions.length > 0 && (
            <Box className="flex flex-wrap gap-3">
              {actions.map((action, i) => (
                <V2ScrollLink
                  key={action.label}
                  href={action.href}
                  title={action.title || `Click here to ${action.label}`}
                  className={cn(i === 0 ? V2_BUTTON.lime : V2_BUTTON.ghost, V2_BUTTON.lg)}
                >
                  {action.label}
                  <V2ButtonArrow />
                </V2ScrollLink>
              ))}
            </Box>
          )}
        </Box>

        {illustration_url && (
          <figure className="relative mx-auto w-full max-w-[760px] min-w-0 pt-11 lg:pt-0">
            <Box className="relative aspect-[560/485] w-full">
              <object data={illustration_url} type="image/svg+xml" aria-hidden="true" className="absolute inset-0 size-full" />
            </Box>
          </figure>
        )}
      </Box>
    </Section>
  );
}
