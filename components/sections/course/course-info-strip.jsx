import Image from "next/image";
import Link from "next/link";
import { Clock, Download, FileText, Monitor, Play, Star } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils";

/**
 * The course page's dark info strip: hours · modules · delivery · trainers,
 * then the two CTAs. Course-only — the domain page keeps `ProofBar`.
 *
 * Reads the CMS `proof` config verbatim: `stats` (Hours, Modules), `trainers`
 * and `actions`. Delivery is not in the CMS; it is passed in as a constant.
 *
 * Layout: one row once the strip itself is 1170px wide — a container query,
 * so browser zoom and page padding are accounted for. That is the narrowest
 * width the row fits with a "24-40" hours range, and only because the
 * delivery formats line may wrap. Below it the four stats keep their row
 * from `lg`, each centred, with the CTAs centred beneath them. Below `lg`
 * the icons shrink: 2×2 on tablets; on phones hours and modules (icon
 * beside value) share a row above full-width delivery and trainers.
 */

/* A stat cell. Divided by a hairline whenever the stats sit in a row. */
const CELL_CLASS = cn(
  "flex min-h-14 min-w-0 items-center gap-2.5",
  "lg:flex-auto lg:border-l lg:border-paper/25 lg:px-3.5",
  "lg:first:border-l-0 lg:first:pl-0",
  "justify-center @min-[1170px]:justify-start",
  "max-sm:flex-col max-sm:text-center",
);

function IconBadge({ icon: Icon }) {
  return (
    <Box
      as="span"
      aria-hidden="true"
      className="grid size-10 flex-none place-items-center rounded-full bg-lime/15 text-lime max-lg:size-8"
    >
      <Icon size={19} strokeWidth={1.8} className="max-lg:size-4" />
    </Box>
  );
}

/* Hours and modules keep the icon beside the value even on phones, where
   the other cells stack it on top. */
const NUMBER_CELL_CLASS = cn(
  CELL_CLASS,
  "max-sm:flex-row max-sm:gap-2 max-sm:text-left",
);

const NUMBER_CLASS =
  "font-display text-[28px] leading-none font-bold tracking-[-0.04em] whitespace-nowrap text-paper";

function HoursStat({ value }) {
  return (
    <Box className={NUMBER_CELL_CLASS}>
      <IconBadge icon={Clock} />

      <Box className="flex items-end gap-2">
        <Text as="span" className={NUMBER_CLASS}>
          {value}
        </Text>

        <Box className="flex flex-col gap-0.5 pb-px">
          <Text
            as="span"
            className="font-body text-[11px] leading-none text-paper/60 italic"
          >
            approx
          </Text>
          <Text
            as="span"
            className="font-body text-[15px] leading-none font-medium text-paper/90"
          >
            hours
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

function ModulesStat({ value }) {
  return (
    <Box className={NUMBER_CELL_CLASS}>
      <IconBadge icon={FileText} />

      <Box className="flex flex-col gap-1">
        <Text as="span" className={NUMBER_CLASS}>
          {value}
        </Text>
        <Text
          as="span"
          className="font-body text-[15px] leading-none text-paper/75"
        >
          modules
        </Text>
      </Box>
    </Box>
  );
}

function DeliveryStat({ delivery }) {
  return (
    <Box className={cn(CELL_CLASS, "max-sm:col-span-2")}>
      <IconBadge icon={Monitor} />

      <Box className="flex flex-col">
        <Text
          as="span"
          className="font-display text-[17px] leading-none font-bold tracking-[-0.01em] text-lime"
        >
          {delivery.title}
        </Text>
        <Text
          as="span"
          className="mt-1.5 font-body text-[13px] leading-tight whitespace-nowrap text-paper/70"
        >
          {delivery.mode}
        </Text>
        <Text
          as="span"
          className="font-body text-[11px] leading-tight text-paper/60"
        >
          {delivery.formats}
        </Text>
      </Box>
    </Box>
  );
}

function TrainersStat({ trainers }) {
  const photo = trainers.people?.[0]?.photo;

  return (
    <Box
      className={cn(
        CELL_CLASS,
        "flex-col items-center justify-center gap-2 max-sm:col-span-2",
        "@min-[1170px]:items-start",
      )}
    >
      <Box className="flex items-center gap-2.5">
        {photo && (
          <Image
            src={photo}
            alt=""
            aria-hidden="true"
            width={84}
            height={27}
            sizes="84px"
            className="h-6.75 w-21 flex-none object-contain"
          />
        )}

        <Text
          as="span"
          className="font-display text-[13px] leading-none font-semibold whitespace-nowrap text-paper"
        >
          {trainers.count && (
            <Box as="span" className="font-bold text-lime">
              {trainers.count}{" "}
            </Box>
          )}
          {trainers.trainer_label || "Expert trainers"}
        </Text>
      </Box>

      {trainers.stars > 0 && (
        <Box className="flex items-center gap-2.5 whitespace-nowrap">
          <Box
            className="flex items-center gap-1"
            role="img"
            aria-label={`${trainers.stars} out of 5 stars`}
          >
            {Array.from({ length: trainers.stars }).map((_, index) => (
              <Star
                key={index}
                size={12}
                fill="currentColor"
                strokeWidth={0}
                className="text-lime"
              />
            ))}
          </Box>

          <Text
            as="span"
            className="font-body text-[13px] leading-none text-paper/90"
          >
            {trainers.value}
          </Text>

          {trainers.label && (
            <>
              <Box
                as="span"
                aria-hidden="true"
                className="size-1 rounded-full bg-paper/50"
              />
              <Text
                as="span"
                className="font-body text-[13px] leading-none text-paper/60"
              >
                {trainers.label}
              </Text>
            </>
          )}
        </Box>
      )}
    </Box>
  );
}

function ActionLink({ action }) {
  const isPreview = action.type === "preview";
  const Icon = isPreview ? Play : Download;

  return (
    <Link
      href={action.href}
      title={`Click Here to ${action.label}`}
      className={cn(
        "group flex h-11 flex-none items-center gap-2.5 rounded-full",
        "border border-paper/20 pr-4 pl-1.5",
        "font-display text-[13px] font-semibold whitespace-nowrap text-paper",
        "transition-colors duration-300",
        "hover:border-lime hover:bg-lime/6",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime",
        "max-sm:justify-center",
      )}
    >
      <Box
        as="span"
        aria-hidden="true"
        className="grid size-7.5 flex-none place-items-center rounded-full bg-lime/15 text-lime transition-colors duration-300 group-hover:bg-lime group-hover:text-ink"
      >
        <Icon
          size={isPreview ? 13 : 15}
          strokeWidth={isPreview ? 0 : 2.2}
          fill={isPreview ? "currentColor" : "none"}
          className={isPreview ? "translate-x-px" : undefined}
        />
      </Box>

      {action.label}
    </Link>
  );
}

function CourseInfoStrip({ stats = [], delivery, trainers, actions = [] }) {
  const findStat = (label) =>
    stats.find((stat) => stat.label?.toLowerCase() === label);
  const hours = findStat("hours");
  const modules = findStat("modules");

  if (!hours && !modules && !trainers) return null;

  return (
    <Box className="@container mt-5.5">
      <Box
        className={cn(
          "flex flex-col gap-5 rounded-[18px] bg-navy px-5 py-5",
          "shadow-[0_34px_70px_-46px_rgba(10,22,40,0.75)]",
          "@min-[1170px]:flex-row @min-[1170px]:items-center @min-[1170px]:gap-0 @min-[1170px]:py-4.5",
        )}
      >
        <Box
          className={cn(
            "grid grid-cols-2 gap-x-6 gap-y-5",
            "max-sm:grid-cols-[auto_auto] max-sm:justify-evenly max-sm:gap-x-3",
            "lg:flex lg:items-center lg:gap-0",
            "@min-[1170px]:flex-1",
          )}
        >
          {hours && <HoursStat value={hours.value} />}
          {modules && <ModulesStat value={modules.value} />}
          {delivery && <DeliveryStat delivery={delivery} />}
          {trainers && <TrainersStat trainers={trainers} />}
        </Box>

        {actions.length > 0 && (
          <Box
            className={cn(
              "flex flex-none items-center gap-2.5",
              "justify-center border-t border-paper/15 pt-5",
              "@min-[1170px]:min-h-14 @min-[1170px]:border-t-0 @min-[1170px]:border-l",
              "@min-[1170px]:border-paper/25 @min-[1170px]:pt-0 @min-[1170px]:pl-3.5",
              "max-sm:flex-col max-sm:items-stretch",
            )}
          >
            {actions.map((action) => (
              <ActionLink key={action.label} action={action} />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default CourseInfoStrip;
