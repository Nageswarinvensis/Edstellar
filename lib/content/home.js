import "server-only";

import { HOME } from "@/content/home";

/** Home (`/`) — local content (`content/home.js`); rendered as ISR (§2.2). */
export function getHomePage() {
  return HOME;
}

/** The trainer faces the home hero shows (`hero.people.trainers`) — reused
 * as the avatar stack on course and domain proof bars. */
export function getTrainerFaces() {
  return HOME.hero.people.trainers;
}
