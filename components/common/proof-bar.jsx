import Image from "next/image";
import Link from "next/link";
import { Download, Play, Star } from "lucide-react";

import Box from "@/components/ui/Box";
import { cn } from "@/lib/utils";

const LIGHT_VALUE_CLASS = cn("font-display font-bold leading-none", "tracking-[-0.03em]", "text-2xl text-ink", "whitespace-nowrap", "max-sm:text-[20px]",
);

const LIGHT_LABEL_CLASS = cn("font-mono uppercase", "text-[10px]", "tracking-[0.14em]", "text-ink/60", "whitespace-nowrap",
);

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
  tone,
  stats = [],
  trainers,
  actions = [],
  className,
}) {
  /* tone is the ONLY design switch. */
  const isLight = tone === "light";

  if (!stats.length && !trainers) return null;

  /* LIGHT CATEGORY PAGE */

  if (isLight) {
    return (
      <Box
        className={cn("mt-0 lg:mt-5.5 w-full", "rounded-[16px]", "border border-ink/12", "bg-white", "px-6 py-4", "max-md:px-4 max-md:py-3.5",
          className,
        )}
      >
        <Box
          className={cn("grid w-full items-center", "grid-cols-4", "max-[1024px]:grid-cols-2", "max-sm:grid-cols-1",
          )}
        >
          {/* FIRST 3 STATS ONLY */}

          {stats.slice(0, 3).map((stat, index) => (
            <Box
              key={`${stat.label}-${index}`}
              className={cn("flex min-w-0 items-center", "min-h-13",
                index !== 0 && "border-l border-ink/12 pl-6",
                "max-[1024px]:pl-0", "max-[1024px]:border-l-0", "max-[1024px]:py-1", "max-sm:border-l-0 max-sm:pl-0",
              )}
            >
              <Box className="flex min-w-0 flex-col gap-1.5">
                <b className={LIGHT_VALUE_CLASS}>{stat.value}</b>

                <span className={LIGHT_LABEL_CLASS}>{stat.label}</span>
              </Box>
            </Box>
          ))}

          {/* TRAINERS */}

          {trainers && (
            <Box
              className={cn("flex min-w-0 items-center", "min-h-13", "border-l border-ink/12 pl-6", "max-[1024px]:pl-0", "max-[1024px]:border-l-0",
                "max-[1024px]:py-1", "max-sm:border-l-0 max-sm:pl-0",
              )}
            >
              <Box className="flex min-w-0 items-center gap-4 max-md:gap-3">
                <Avatars people={trainers.people} />

                <Box className="flex min-w-0 flex-col gap-1.5">
                  <b className={LIGHT_VALUE_CLASS}>{trainers.value}</b>

                  <span className={LIGHT_LABEL_CLASS}>
                    {trainers.label}
                  </span>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    );
  }

  /* DARK COURSE PAGE EXISTING DESIGN */

  return (
    <Box
      className={cn("mt-5.5 rounded-[20px] px-5 py-4", "bg-navy", "shadow-[0_34px_70px_-46px_rgba(10,22,40,0.75)]",
        "min-[1025px]:flex min-[1025px]:flex-nowrap min-[1025px]:items-center",
        "max-[1024px]:flex max-[1024px]:flex-wrap",
        "max-md:px-4 max-md:py-3.5",
        "max-sm:gap-y-4",
        className,
      )}
    >
      <Box
        className={cn("flex min-w-0 items-center", "min-[1025px]:flex-1 min-[1025px]:flex-nowrap",
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
            <Box className="flex flex-col gap-1 text-left">
              <b
                className={cn("font-display text-[20px] leading-none font-bold", "tracking-[-0.03em] whitespace-nowrap", "max-lg:text-[24px]", "text-lime",
                )}
              >
                {stat.value}
              </b>

              <span
                className={cn("font-mono max-w-52 text-[10px]", "tracking-[0.14em] uppercase", "text-paper/55",
                )}
              >
                {stat.label}
              </span>
            </Box>

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
            className={cn("flex flex-none flex-row items-center gap-3", "min-[1025px]:ml-1", "min-[1025px]:border-l", "min-[1025px]:border-paper/12",
              "min-[1025px]:pl-5", "max-[1024px]:ml-1", "max-[1024px]:border-l-0", "max-[1024px]:pl-0",
              "max-sm:ml-0",
            )}
          >
            <Avatars people={trainers.people} />

            <Box className="flex flex-col gap-1.5">
              <Box className="flex items-center gap-1.5 whitespace-nowrap">
                <b
                  className={cn("font-display leading-none font-bold text-lime", "text-[12px]",
                  )}
                >
                  {trainers.count || `${trainers.people?.length || 0}+`}
                </b>

                <span
                  className={cn("font-mono tracking-[0.02em] whitespace-nowrap", "text-[12px]", "text-paper/85",
                  )}
                >
                  {trainers.trainer_label || "Expert trainers"}
                </span>
              </Box>

              <span
                className={cn("font-mono tracking-[0.14em] whitespace-nowrap uppercase", "text-[10px]", "text-paper/55", "hover:text-lime hover:underline hover:underline-offset-4",
                )}
              >
                {trainers.meet_label || "Meet them"} →
              </span>
            </Box>
          </Box>
        )}

        {trainers?.stars && (
          <Box
            className={cn("flex flex-none flex-col gap-2", "min-[1025px]:ml-1", "min-[1025px]:border-l", "min-[1025px]:border-paper/12", "min-[1025px]:pl-5",
              "max-[1024px]:ml-0", "max-[1024px]:border-l-0", "max-[1024px]:pl-0",
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
              <span className="font-mono text-[10px] tracking-[0.12em] whitespace-nowrap text-paper/55 uppercase">
                {trainers.value}
              </span>

              <span className="font-mono text-[10px] tracking-[0.12em] whitespace-nowrap text-paper/55 uppercase">
                · {trainers.label}
              </span>
            </Box>
          </Box>
        )}
      </Box>

      {actions.length > 0 && (
        <Box
          className={cn("flex flex-none items-center gap-3", "min-[1025px]:ml-auto", "max-[1024px]:w-full max-[1024px]:justify-center", "max-sm:w-full max-sm:justify-end max-sm:gap-2",
            "max-[430px]:flex-wrap max-[430px]:justify-center",
          )}
        >
          {actions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className={cn("group flex flex-none items-center gap-3 rounded-full", "border border-paper/14 bg-paper/5 py-1.5 pr-3 pl-1.5",
                "font-mono text-[12px] tracking-[0.04em] whitespace-nowrap text-paper", "transition-all duration-300 ease-out",
                "hover:-translate-y-1 hover:border-lime hover:bg-paper/10",
                "max-lg:gap-2 max-lg:py-1 max-lg:pr-2.5 max-lg:text-[12px]",
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