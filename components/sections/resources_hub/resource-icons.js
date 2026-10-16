import {
  BookOpen,
  FileText,
  GraduationCap,
  LayoutGrid,
  LayoutTemplate,
  ListChecks,
  Mic,
  MonitorPlay,
  PenLine,
  Sheet,
  Video,
  Wrench,
} from "lucide-react";

/** One icon per resource type / pick kind, keyed by the content's `type` /
 * `icon` (design: the page's SVG symbol set, `#i-{key}`). */
export const RESOURCE_ICONS = {
  all: LayoutGrid,
  template: LayoutTemplate,
  guide: FileText,
  ebook: BookOpen,
  tool: Wrench,
  podcast: Mic,
  check: ListChecks,
  blog: PenLine,
  video: Video,
  training: GraduationCap,
  webinar: MonitorPlay,
  workbook: Sheet,
};
