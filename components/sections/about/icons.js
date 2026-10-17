import {
  ArrowRight,
  Building2,
  Check,
  Filter,
  Languages,
  Layers,
  MapPin,
  MessageSquare,
  Monitor,
  Orbit,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

/** About Us content's icon names → lucide. */
const ABOUT_ICONS = {
  arrow: ArrowRight,
  building: Building2,
  chat: MessageSquare,
  check: Check,
  filter: Filter,
  languages: Languages,
  layers: Layers,
  monitor: Monitor,
  orbit: Orbit,
  pin: MapPin,
  sparkles: Sparkles,
  star: Star,
  users: Users,
};

export function AboutIcon({ name, size = 18, className }) {
  const Icon = ABOUT_ICONS[name];
  return Icon ? <Icon size={size} strokeWidth={1.8} aria-hidden="true" className={className} /> : null;
}
