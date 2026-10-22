import { Fragment } from "react";
import Link from "next/link";
import {
  BookOpen,
  Building2,
  CircleCheck,
  ClipboardList,
  Code,
  Cpu,
  Factory,
  FileText,
  Folder,
  Link2,
  ListChecks,
  MessagesSquare,
  Network,
  Presentation,
  SlidersHorizontal,
  Target,
  User,
  Users,
  Workflow,
} from "lucide-react";

import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import { cn } from "@/lib/utils";

/** The hub content's icon names → lucide. */
const ICONS = {
  book: BookOpen,
  building: Building2,
  chat: MessagesSquare,
  check: CircleCheck,
  clipboard: ClipboardList,
  code: Code,
  cohorts: Workflow,
  cpu: Cpu,
  factory: Factory,
  file: FileText,
  folder: Folder,
  link: Link2,
  list: ListChecks,
  network: Network,
  presentation: Presentation,
  sliders: SlidersHorizontal,
  target: Target,
  team: Network,
  user: User,
  users: Users,
};

export function HubIcon({ name, size = 20, className }) {
  const Icon = ICONS[name];
  return Icon ? <Icon size={size} strokeWidth={1.7} aria-hidden="true" className={className} /> : null;
}

/** A paragraph's text with `[label](href)` turned into links. */
export function InlineText({ text, linkClassName }) {
  return text.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, index) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!match) return <Fragment key={index}>{part}</Fragment>;
    const [, label, href] = match;
    return (
      <Link
        key={index}
        href={href}
       
        className={cn("border-b border-current text-olive hover:text-ink", linkClassName)}
      >
        {label}
      </Link>
    );
  });
}

/** Paragraphs that may carry inline links. */
export function Paragraphs({ items, className, linkClassName }) {
  return items.map((text, index) => (
    <Text as="p" key={index} className={cn("mb-4 text-[15.5px] leading-[1.75] last:mb-0", className)}>
      <InlineText text={text} linkClassName={linkClassName} />
    </Text>
  ));
}

/**
 * A section's heading and intro — the top of every section. The design's
 * "01 —— LABEL" eyebrows are left out by request.
 * Design: Edstellar_Corporate_Training `.section-head`.
 */
export function SectionHead({ data, dark = false, center = false }) {
  return (
    <Reveal className={cn("mb-11 max-w-[62rem]", center && "mx-auto text-center")}>
      <RichHeading
        as="h2"
        id={`${data.id}-h`}
        heading={data.heading}
        className={cn("max-w-[24ch]", center && "mx-auto", dark && "text-paper")}
        emphasisClassName={dark ? "text-lime" : "text-ink"}
      />
      {data.intro ? (
        <Text as="p" className={cn("mt-5 max-w-[66ch] text-[17px] leading-[1.7]", center && "mx-auto", dark && "text-paper/75")}>
          {data.intro}
        </Text>
      ) : null}
    </Reveal>
  );
}
