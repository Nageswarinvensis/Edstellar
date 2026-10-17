import { AppWindow, BookOpen, Compass, Layers, ListChecks, MessageSquare, Mountain, Network, Search, Star, Target } from "lucide-react";

/** RFP content's icon names → lucide. */
const RFP_ICONS = {
  book: BookOpen,
  browser: AppWindow,
  chat: MessageSquare,
  compass: Compass,
  layers: Layers,
  list: ListChecks,
  mountain: Mountain,
  network: Network,
  search: Search,
  star: Star,
  target: Target,
};

export function RfpIcon({ name, size = 18, className }) {
  const Icon = RFP_ICONS[name];
  return Icon ? <Icon size={size} strokeWidth={1.8} aria-hidden="true" className={className} /> : null;
}
