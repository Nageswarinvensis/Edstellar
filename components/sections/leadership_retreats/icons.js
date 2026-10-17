import {
  Briefcase,
  Calendar,
  CircleCheck,
  Compass,
  ConciergeBell,
  Crown,
  Flag,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  SlidersHorizontal,
  Sparkles,
  Star,
  Sun,
  Target,
  Users,
} from "lucide-react";

/** The retreat content's icon names (the design's `#i-*` sprite ids) → lucide. */
const RETREAT_ICONS = {
  brief: Briefcase,
  cal: Calendar,
  chat: MessageSquare,
  check: CircleCheck,
  compass: Compass,
  concierge: ConciergeBell,
  crown: Crown,
  flag: Flag,
  group: Users,
  lock: Lock,
  mail: Mail,
  pin: MapPin,
  sliders: SlidersHorizontal,
  spark: Sparkles,
  star: Star,
  sun: Sun,
  target: Target,
};

/** One icon by content name; renders nothing for an unknown name. */
export function RetreatIcon({ name, size = 18, className }) {
  const Icon = RETREAT_ICONS[name];
  return Icon ? <Icon size={size} strokeWidth={1.7} aria-hidden="true" className={className} /> : null;
}

/** Seat colour per attendee type, as a dot — the legend and the audience
 * tabs read these. */
export const SEAT_CLASSES = {
  cxo: "bg-navy border-navy",
  senior: "bg-navy/65 border-transparent",
  rising: "bg-white border-navy",
  faculty: "bg-gold border-navy",
};

/** The same colours as SVG fills, for the hero's seating ring. */
export const SEAT_SVG_CLASSES = {
  cxo: "fill-navy stroke-navy",
  senior: "fill-navy/65 stroke-transparent",
  rising: "fill-white stroke-navy",
  faculty: "fill-gold stroke-navy",
};
