import Image from "next/image";

import Box from "@/components/ui/Box";
import { cn } from "@/lib/utils";

/**
 * Overlapping round trainer photos — the home hero's trust-line avatars,
 * shared with the course and domain proof bars. Decorative: the count and
 * label beside it carry the meaning. `faceClassName` sizes each face and sets
 * its ring to the background it sits on.
 * Each photo has `alt=""` so screen readers and audits treat it as
 * decorative rather than reading "Edstellar trainer" five times.
 * `people`: `{ photo }[]` (`getTrainerFaces()`). `eager` for a hero, where
 * the faces are above the fold.
 */
export default function TrainerFaces({ people, className, faceClassName, eager = false }) {
  if (!people?.length) return null;

  return (
    <Box aria-hidden="true" className={cn("flex flex-none -space-x-3", className)}>
      {people.map((person) => (
        <Box
          key={person.photo}
          className={cn("size-10 overflow-hidden rounded-full bg-paper-warm ring-2 ring-paper", faceClassName)}
        >
          <Image loading={eager ? "eager" : "lazy"} src={person.photo} alt="" width={40} height={40} className="size-full object-cover" />
        </Box>
      ))}
    </Box>
  );
}
