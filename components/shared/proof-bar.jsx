import Image from "next/image";
import Link from "next/link";
import { Download, Play, Star } from "lucide-react";

import Box from "@/components/ui/Box";
import { cn } from "@/lib/utils";

function Avatars({ people = [], tone }) {
  if (!people.length) return null;

  const person = people[0];

  return (
    <Box aria-hidden="true" className="flex h-7.5 w-18 flex-none items-center">
      {person.photo ? (
        <Image
          src={person.photo}
          alt=""
          width={72}
          height={30}
          sizes="72px"
          className="h-7.5 w-18 object-contain"
        />
      ) : null}
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
          ? "flex-none items-center gap-1 text-center min-[1400px]:items-start min-[1400px]:text-left"
          : cn(
              "min-w-0 flex-1 gap-2 border-l border-ink/12 pl-6 first:border-l-0 first:pl-0",
              // ≤620px the strip becomes two columns, so every odd cell starts a row.
              "max-sm:flex-[1_1_44%] max-sm:pl-4 max-sm:odd:border-l-0 max-sm:odd:pl-0",
            ),
      )}
    >
      <b
        className={cn(
          "font-display text-2xl leading-none font-bold tracking-[-0.03em] whitespace-nowrap max-md:text-[23px]",
          dark ? "text-lime" : "text-ink",
        )}
      >
        {stat.value}
      </b>
      <span
        className={cn(
          "font-mono text-[9.5px] tracking-[0.14em] uppercase max-w-52",
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
        "mt-5.5 flex flex-wrap items-center",
        dark
          ? "justify-center gap-x-5 gap-y-4 rounded-[20px] bg-navy px-5.5 py-4.5 shadow-[0_34px_70px_-46px_rgba(10,22,40,0.75)] max-lg:px-5 min-[1400px]:flex-nowrap min-[1400px]:justify-between"
          : "gap-x-6 gap-y-4 rounded-[18px] border border-ink/12 bg-white px-6 py-4.5 shadow-[0_18px_44px_-34px_rgba(10,22,40,0.35)]",
        className,
      )}
    >
      {stats.map((stat, index) => (
        <Box key={`cell-${stat.label}-${index}`} className="contents">
          {statCell(stat, index)}
          {/* Dark tone uses explicit dividers; light tone uses border-left. */}
          {dark && index < stats.length - 1 ? (
            <Box
              aria-hidden="true"
              className="h-7.5  flex-none bg-paper/15 max-md:hidden"
            />
          ) : null}
        </Box>
      ))}

      {trainers ? (
        <>
          {/* Trainers */}
          <Box
            className={cn(
              "flex flex-row items-center gap-3",
              dark
                ? "xl:border-l xl:border-paper/12 xl:pl-5"
                : "min-w-0 flex-1 border-l border-ink/12 pl-5 max-sm:pl-4",
            )}
          >
            <Avatars people={trainers.people} tone={tone} />

            <Box className="flex flex-col gap-1.5">
              <Box className="flex items-center gap-1.5 whitespace-nowrap">
                <b className="font-display text-[16px] leading-none font-bold text-lime">
                  {trainers.count || `${trainers.people?.length || 0}+`}
                </b>

                <span
                  className={cn(
                    "font-mono text-[14px] tracking-[0.02em] whitespace-nowrap",
                    dark ? "text-paper/85" : "text-ink/70",
                  )}
                >
                  {trainers.trainerLabel || "Expert trainers"}
                </span>
              </Box>

              <span
                className={cn(
                  "font-mono text-[9px] tracking-[0.14em] whitespace-nowrap uppercase hover:text-lime hover:underline hover:underline-offset-4",
                  dark ? "text-paper/55" : "text-ink/60",
                )}
              >
                {trainers.meetLabel || "Meet them"} →
              </span>
            </Box>
          </Box>

          {/* Rating */}
          {dark && trainers.stars ? (
            <Box className="flex flex-col gap-2 xl:border-l xl:border-paper/12 xl:pl-5">
              <Box className="flex items-center gap-1" aria-hidden="true">
                {Array.from({ length: trainers.stars }).map((_, index) => (
                  <Star
                    key={index}
                    size={10}
                    fill="currentColor"
                    className="text-lime"
                  />
                ))}
              </Box>

              <Box className="flex items-baseline gap-2 whitespace-nowrap">
                <span className="font-mono text-[9px] tracking-[0.12em] whitespace-nowrap text-paper/55 uppercase">
                  {trainers.value}
                </span>

                <span className="font-mono text-[9px] tracking-[0.12em] whitespace-nowrap text-paper/55 uppercase">
                  · {trainers.label}
                </span>
              </Box>
            </Box>
          ) : null}
        </>
      ) : null}

      {dark && actions.length ? (
        <Box className="flex flex-nowrap items-center gap-3 max-[1399px]:w-full max-[1399px]:justify-center max-[1399px]:border-t max-[1399px]:border-paper/13 max-[1399px]:pt-4 max-sm:flex-wrap">
          {actions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="group flex flex-none items-center gap-3 rounded-full border border-paper/14 bg-paper/5 px-4 py-2 font-mono text-[11px] whitespace-nowrap tracking-[0.04em] text-paper transition-all duration-300 ease-out hover:-translate-y-1 hover:border-lime hover:bg-paper/10"
            >
              <Box
                as="span"
                aria-hidden="true"
                className="grid size-7 flex-none place-items-center rounded-full bg-lime/20 transition-colors duration-300 group-hover:bg-lime"
              >
                {action.type === "preview" ? (
                  <Play
                    size={13}
                    fill="currentColor"
                    className="text-lime transition-colors duration-300 group-hover:text-navy"
                  />
                ) : (
                  <Download
                    size={13}
                    className="text-lime transition-colors duration-300 group-hover:text-navy"
                  />
                )}
              </Box>
              {action.label}
            </Link>
          ))}
        </Box>
      ) : null}
    </Box>
  );
}

export default ProofBar;