import Image from "next/image";
import Link from "next/link";
import { Download, Play, Star } from "lucide-react";

import Box from "@/components/ui/Box";
import { cn } from "@/lib/utils";

function Avatars({ people = [] }) {
  if (!people.length) return null;

  const person = people[0];

  return (
    <Box
      aria-hidden="true"
      className="flex h-7.5 w-18 flex-none items-center max-md:h-6.5 max-md:w-16"
    >
      {person.photo && (
        <Image
          src={person.photo}
          alt=""
          width={72}
          height={30}
          sizes="72px"
          className="h-7.5 w-18 object-contain max-md:h-6.5 max-md:w-16"
        />
      )}
    </Box>
  );
}

function ProofBar({
  tone = "light",
  stats = [],
  trainers,
  actions = [],
  className,
}) {
  const dark = tone === "dark";

  if (!stats.length && !trainers) return null;

  const statCell = (stat, index) => (
    <Box
      key={`${stat.label}-${index}`}
      className={cn(
        "flex flex-col",
        dark
          ? "flex-none items-start gap-1 text-left"
          : "min-w-0 flex-1 gap-2 border-l border-ink/12 pl-6 first:border-l-0 first:pl-0 max-sm:flex-[1_1_44%] max-sm:pl-4 max-sm:odd:border-l-0 max-sm:odd:pl-0",
      )}
    >
      <b
        className={cn(
          "font-display text-2xl leading-none font-bold tracking-[-0.03em] whitespace-nowrap",
          "max-lg:text-[22px] max-sm:text-[20px]",
          dark ? "text-lime" : "text-ink",
        )}
      >
        {stat.value}
      </b>

      <span
        className={cn(
          "font-mono max-w-52 text-[9.5px] tracking-[0.14em] uppercase",
          "max-lg:text-[8.5px]",
          dark ? "text-paper/55" : "text-ink/60",
        )}
      >
        {stat.label}
      </span>
    </Box>
  );

  return (
    <Box
      className={cn(
        "mt-5.5 rounded-[20px] px-5 py-4",
         dark
          ? "bg-navy shadow-[0_34px_70px_-46px_rgba(10,22,40,0.75)]"
          : "bg-white shadow-[0_18px_44px_-34px_rgba(10,22,40,0.35)]",
        "min-[1025px]:flex min-[1025px]:flex-nowrap min-[1025px]:items-center",
        "max-[1024px]:flex max-[1024px]:flex-wrap",
        "max-md:px-4 max-md:py-3.5",
        "max-sm:gap-y-4",
        className,
      )}
    >
      <Box
        className={cn(
          "flex min-w-0 items-center",
          "min-[1025px]:flex-1 min-[1025px]:flex-nowrap",
          !actions.length && "min-[1025px]:justify-between",
          actions.length && "min-[1025px]:justify-start",
          "max-[1024px]:w-full max-[1024px]:flex-wrap",
          "max-[1024px]:gap-x-6 max-[1024px]:gap-y-4",
          "max-sm:gap-x-5 max-sm:gap-y-4",
        )}
      >
        {stats.map((stat, index) => (
          <Box
            key={`stat-group-${stat.label}-${index}`}
            className="flex flex-none items-center"
          >
            {statCell(stat, index)}

            {index < stats.length - 1 && (
              <Box
                aria-hidden="true"
                className="mx-3 h-7.5 w-px flex-none bg-paper/15 max-[1024px]:hidden"
              />
            )}
          </Box>
        ))}

        {trainers && (
          <Box
            className={cn(
              "flex flex-none flex-row items-center gap-3",
              "min-[1025px]:ml-1 min-[1025px]:border-l min-[1025px]:border-paper/12 min-[1025px]:pl-5",
              "max-[1024px]:ml-1 max-[1024px]:border-l-0 max-[1024px]:pl-0",
              "max-sm:ml-0",
            )}
          >
            <Avatars people={trainers.people} />

            <Box className="flex flex-col gap-1.5">
              <Box className="flex items-center gap-1.5 whitespace-nowrap">
                <b
                  className={cn(
                    "font-display leading-none font-bold text-lime",
                    "text-[12px] max-lg:text-[11px]",
                  )}
                >
                  {trainers.count || `${trainers.people?.length || 0}+`}
                </b>

                <span
                  className={cn(
                    "font-mono tracking-[0.02em] whitespace-nowrap",
                    "text-[12px] max-lg:text-[12px]",
                    dark ? "text-paper/85" : "text-ink/70",
                  )}
                >
                  {trainers.trainer_label || "Expert trainers"}
                </span>
              </Box>

              <span
                className={cn(
                  "font-mono tracking-[0.14em] whitespace-nowrap uppercase",
                  "text-[10px] max-lg:text-[9px]",
                  "hover:text-lime hover:underline hover:underline-offset-4",
                  dark ? "text-paper/55" : "text-ink/60",
                )}
              >
                {trainers.meet_label || "Meet them"} →
              </span>
            </Box>
          </Box>
        )}

        {dark && trainers?.stars && (
          <Box
            className={cn(
              "flex flex-none flex-col gap-2",
              "min-[1025px]:ml-1 min-[1025px]:border-l min-[1025px]:border-paper/12 min-[1025px]:pl-5",
              "max-[1024px]:ml-0 max-[1024px]:border-l-0 max-[1024px]:pl-0",
              "max-sm:gap-1.5",
            )}
          >
            <Box className="flex items-center gap-1" aria-hidden="true">
              {Array.from({ length: trainers.stars }).map((_, index) => (
                <Star
                  key={index}
                  size={10}
                  fill="currentColor"
                  className="text-lime max-lg:size-2.5"
                />
              ))}
            </Box>

            <Box className="flex items-baseline gap-2 whitespace-nowrap">
              <span className="font-mono text-[10px] tracking-[0.12em] whitespace-nowrap text-paper/55 uppercase max-lg:text-[9px]">
                {trainers.value}
              </span>

              <span className="font-mono text-[10px] tracking-[0.12em] whitespace-nowrap text-paper/55 uppercase max-lg:text-[9px]">
                · {trainers.label}
              </span>
            </Box>
          </Box>
        )}
      </Box>

      {dark && actions.length > 0 && (
        <Box
          className={cn(
            "flex flex-none items-center gap-3",
            "min-[1025px]:ml-auto",
            "max-[1024px]:w-full max-[1024px]:justify-center",
            "max-sm:w-full max-sm:justify-end max-sm:gap-2",
            "max-[430px]:flex-wrap max-[430px]:justify-end",
          )}
        >
          {actions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className={cn(
                "group flex flex-none items-center gap-3 rounded-full",
                "border border-paper/14 bg-paper/5 py-1.5 pr-3 pl-1.5",
                "font-mono text-[12px] tracking-[0.04em] whitespace-nowrap text-paper",
                "transition-all duration-300 ease-out",
                "hover:-translate-y-1 hover:border-lime hover:bg-paper/10",
                "max-lg:gap-2 max-lg:py-1 max-lg:pr-2.5 max-lg:text-[11px]",
              )}
            >
              <Box
                as="span"
                aria-hidden="true"
                className="grid size-7 flex-none place-items-center rounded-full bg-lime/20 transition-colors duration-300 group-hover:bg-lime max-lg:size-6"
              >
                {action.type === "preview" ? (
                  <Play
                    size={12}
                    fill="currentColor"
                    className="text-lime transition-colors duration-300 group-hover:text-ink max-lg:size-2.5"
                  />
                ) : (
                  <Download
                    size={12}
                    className="text-lime transition-colors duration-300 group-hover:text-ink max-lg:size-2.5"
                  />
                )}
              </Box>

              {action.label}
            </Link>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default ProofBar;