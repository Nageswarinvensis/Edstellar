import {
  ArrowRightLeft,
  BookOpen,
  Building2,
  Calendar,
  ChartLine,
  CirclePause,
  Compass,
  Crown,
  Eye,
  FileText,
  Globe,
  HeartHandshake,
  Layers,
  Link2,
  Lock,
  ShieldCheck,
  Sparkles,
  Sprout,
  Target,
  UserSearch,
  Users,
  Video,
  Wifi,
} from "lucide-react";

/** The coaching JSON's icon names (kebab-case lucide names) → components. */
const COACHING_ICONS = {
  "arrow-left-right": ArrowRightLeft,
  "arrow-right-left": ArrowRightLeft,
  "book-open": BookOpen,
  "building-2": Building2,
  calendar: Calendar,
  "chart-line": ChartLine,
  "circle-pause": CirclePause,
  compass: Compass,
  crown: Crown,
  eye: Eye,
  "file-text": FileText,
  globe: Globe,
  "heart-handshake": HeartHandshake,
  layers: Layers,
  link: Link2,
  lock: Lock,
  shield: ShieldCheck,
  "shield-check": ShieldCheck,
  sparkles: Sparkles,
  sprout: Sprout,
  target: Target,
  "user-search": UserSearch,
  users: Users,
  video: Video,
  wifi: Wifi,
};

/** The icon for a JSON name, or `null` when unmapped (callers skip it). */
export function coachingIcon(name) {
  return COACHING_ICONS[name] ?? null;
}
