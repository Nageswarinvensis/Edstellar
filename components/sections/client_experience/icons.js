import { BookOpen, Building2, CalendarCheck, Check, Gift, Layers, MessageSquare, Presentation, Target, User } from "lucide-react";

/** Client Experience content's icon names → lucide. */
const CX_ICONS = {
  book: BookOpen,
  building: Building2,
  calendar: CalendarCheck,
  chat: MessageSquare,
  check: Check,
  gift: Gift,
  layers: Layers,
  presentation: Presentation,
  target: Target,
  user: User,
};

export function CxIcon({ name, size = 18, className }) {
  const Icon = CX_ICONS[name];
  return Icon ? <Icon size={size} strokeWidth={1.8} aria-hidden="true" className={className} /> : null;
}
