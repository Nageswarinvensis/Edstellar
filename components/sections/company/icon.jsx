import {
  Briefcase,
  GraduationCap,
  Heart,
  Lightbulb,
  Megaphone,
  Monitor,
  Send,
  Target,
  TrendingUp,
  User,
  Users,
} from "lucide-react";

import Box from "@/components/ui/Box";
import { cn } from "@/lib/utils";

// Content `icon` names → lucide icon. Extend as the content uses more.
const ICONS = {
  briefcase: Briefcase,
  "graduation-cap": GraduationCap,
  lightbulb: Lightbulb,
  megaphone: Megaphone,
  monitor: Monitor,
  heart: Heart,
  send: Send,
  target: Target,
  "trending-up": TrendingUp,
  user: User,
  users: Users,
};

/** The navy tile with a lime line icon used on the company pages' cards. */
export default function IconTile({ name, className }) {
  const Icon = ICONS[name];
  return (
    <Box
      as="span"
      aria-hidden="true"
      className={cn("grid size-11 place-items-center rounded-[10px] bg-navy text-lime", className)}
    >
      {Icon ? <Icon size={22} strokeWidth={1.7} /> : null}
    </Box>
  );
}
