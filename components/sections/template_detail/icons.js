import { LayoutTemplate, MessageSquare, MousePointer2, Network, RefreshCw, Share2, UserCheck, Zap } from "lucide-react";

/** Template content's benefit icon names → lucide. */
const TEMPLATE_ICONS = {
  chat: MessageSquare,
  layout: LayoutTemplate,
  network: Network,
  pointer: MousePointer2,
  refresh: RefreshCw,
  share: Share2,
  "user-check": UserCheck,
  zap: Zap,
};

export function TemplateIcon({ name, size = 18, className }) {
  const Icon = TEMPLATE_ICONS[name];
  return Icon ? <Icon size={size} strokeWidth={1.8} aria-hidden="true" className={className} /> : null;
}
